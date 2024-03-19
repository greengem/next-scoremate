import { auth } from "@clerk/nextjs";
import prisma from "@/db/prisma";
import PageHeading from "@/ui/PageHeading";
import { Button } from "@nextui-org/button";
import DeletePlayButton from "./DeletePlayButton";

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
    
    const recentGames = await prisma.play.findMany({
        where: {
            isCompleted: true,
            players: {
                some: {
                    userId
                }
            }
        }
    });

    return (
        <>
            <PageHeading title="Dashboard" />

            <div>
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Active Games</h2>
                    <ul className="space-y-3">
                        {activeGames.map(game => (
                            <li key={game.id} className="flex justify-between items-center">
                                <a href={`/game/${game.id}`}>{game.gameId}</a>
                                <DeletePlayButton playId={game.id} />
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Recent Games</h2>
                    <ul className="space-y-3">
                        {recentGames.map(game => (
                            <li key={game.id} className="flex justify-between items-center">
                                <a href={`/game/${game.id}`}>{game.gameId}</a>
                                <DeletePlayButton playId={game.id} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}