'use server';
import prisma from '@/db/prisma';
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation'

type PlayerData = {
    userId: string | null;
    name: string | null;
    avatar: string | null;
    order: number;
};

type StartGameData = {
    gameId: string;
    players: PlayerData[];
};

export async function handleStartGame(data: StartGameData) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("No user ID");
    }

    const { players, gameId } = data;

    const createdPlay = await prisma.play.create({
        data: {
            gameId: gameId,
            creatorId: userId,
            players: {
                create: players.map(player => ({
                    userId: player.userId,
                    guestName: player.userId ? null : player.name,
                    guestAvatar: player.userId ? null : player.avatar,
                    order: player.order
                }))
            }
        }
    });

    redirect(`/game/${createdPlay.id}`);
}


type ScoreData = {
    playerId: string;
    value: number;
};

type SaveScoresData = {
    playId: string;
    scores: ScoreData[];
};

export async function handleSaveScores(data: SaveScoresData) {
    const { playId, scores } = data;

    await prisma.play.update({
        where: { id: playId },
        data: {
            isCompleted: true,
            scores: {
                create: scores.map(score => ({
                    playerId: score.playerId,
                    value: score.value
                }))
            }
        }
    });
}