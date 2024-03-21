import { auth } from "@clerk/nextjs";
import prisma from "@/db/prisma";
import PageHeading from "@/ui/PageHeading";
import fetchBoardGameData from "@/data/FetchBoardGameData";
import DashboardRecentTable from "./DashboardRecentTable";
import DashboardActiveTable from "./DashboardActiveTable";
import { clerkClient } from "@clerk/nextjs";

export default async function DashboardPage() {
    const { userId } = auth();

    if (!userId) {
        throw new Error("No user ID");
    }

    const activeGames = await prisma.play.findMany({
        where: {
            isCompleted: false,
            players: {
                some: {
                    userId
                }
            }
        }
    });
    
    const activeGamesWithBoardData = await Promise.all(activeGames.map(async game => {
        const boardGame = await fetchBoardGameData(game.gameId);
        const { name, thumbnail } = boardGame;
        return { ...game, boardGame: { name, thumbnail } };
    }));
    
    const recentGames = await prisma.play.findMany({
        where: {
            isCompleted: true,
            players: {
                some: {
                    userId
                }
            }
        },
        include: {
            players: true,
            scores: true
        }
    });
    
    const recentGamesWithBoardData = await Promise.all(recentGames.map(async game => {
        const boardGame = await fetchBoardGameData(game.gameId);
        const { name, thumbnail } = boardGame;
    
        // Fetch user data for all players
        const playersWithUserData = await Promise.all(game.players.map(async player => {
            if (player.isGuest) {
                return player;
            } else {
                const userData = await clerkClient.users.getUser(player.userId);
                // Convert the user object to a plain JavaScript object
                const user = JSON.parse(JSON.stringify(userData));
                return { ...player, user };
            }
        }));
    
        // Get the player names
        const playerNames = playersWithUserData.map(player => {
            if ('user' in player) {
                return player.user.username;
            } else {
                return player.guestName;
            }
        });
    
        // Calculate the winners
        const scores = game.scores;
        const highestScore = Math.max(...scores.map(score => score.value));
        const winnerIds = scores.filter(score => score.value === highestScore).map(score => score.playerId);
        const winners = playersWithUserData.filter(player => winnerIds.includes(player.id));

        let winnerNames;
        if (winners.length > 0) {
            winnerNames = winners.map(winner => {
                if ('user' in winner) {
                    return winner.user.username;
                } else {
                    return winner.guestName;
                }
            }).join(', ');
        } else {
            winnerNames = 'Unknown';
        }

        return { ...game, boardGame: { name, thumbnail }, playerNames, winner: winnerNames };
    }));

    // console.log(recentGamesWithBoardData);

    return (
        <>
            <PageHeading title="Dashboard" />
            {activeGamesWithBoardData.length > 0 && (
                <DashboardActiveTable activeGamesWithBoardData={activeGamesWithBoardData} />
            )}
            <DashboardRecentTable recentGamesWithBoardData={recentGamesWithBoardData} />            
        </>
    )
}
