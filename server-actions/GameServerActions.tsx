'use server';
import prisma from '@/db/prisma';
import { auth } from "@clerk/nextjs";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'

type PlayerData = {
    id: string;
    name: string;
    avatar: string | null;
    order: number;
    isGuest: boolean;
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
                    userId: player.id,
                    guestName: player.isGuest ? player.name : null,
                    guestAvatar: player.isGuest ? player.avatar : null,
                    order: player.order,
                    isGuest: player.isGuest
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
    const { userId } = auth();

    if (!userId) {
        throw new Error("No user ID");
    }

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
    redirect('/dashboard');
}

export async function handleDeletePlay(playId: string) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("No user ID");
    }

    await prisma.score.deleteMany({
        where: { playId }
    });

    // Delete associated Player records
    await prisma.player.deleteMany({
        where: { playId }
    });

    // Delete the Play record
    await prisma.play.delete({
        where: { id: playId }
    });

    revalidatePath('/dashboard');
}