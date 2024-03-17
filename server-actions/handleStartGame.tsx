'use server';
import prisma from '@/db/prisma';
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation'

interface Player {
    id: string;
    name: string;
    avatar: string;
    isGuest: boolean;
}

interface StartGameData {
    players: Player[];
    gameId: string;
}

export async function handleStartGame(data: StartGameData) {
    const { userId } = auth();
    if (!userId) {
      throw new Error("No user ID");
    }

    const { players, gameId } = data;

    const userIds = players.filter(p => !p.isGuest).map(p => p.id);
    const guests = players.filter(p => p.isGuest).map(g => ({ name: g.name, avatar: g.avatar }));

    const gameData: any = {
        gameId: gameId,
        guests: {
            create: guests,
        },
        creator: {
            connect: { id: creatorId },
        },
    };

    if (userIds.length > 0) {
        gameData.players = {
            connect: userIds.map(userId => ({ id: userId })),
        };
    }

    const createdGame = await prisma.play.create({
        data: gameData
    });

    redirect(`/game/${createdGame.id}`);
}