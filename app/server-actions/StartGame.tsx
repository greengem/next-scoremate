'use server';
import prisma from '@/db/prisma';
import { auth } from "@/auth";
import { z } from 'zod';

interface StartGameData{
    gameId: string;
    players: string;
}

const StartGameDataSchema = z.object({
    players: z.string().min(1),
    gameId: z.string().min(1),
});

// Create Task
export async function handleCreateTask(data: StartGameData) {
    try {
        const session = await auth();
        const creatorId = session?.user?.id;

        if (!creatorId) {
            return { success: false, message: 'User is not authenticated' };
        }

        const parse = StartGameDataSchema.safeParse(data);

        if (!parse.success) {
            return { success: false, message: 'Failed to create task' };
        }

        const createdTask = await prisma.play.create({
            data: {
                gameId: parse.data.gameId,
                players: parse.data.players,
                creator: creatorId,
            }
        });

        return { success: true, message: `Added task` };
    } catch (e) {
        return { success: false, message: `Failed to create task` };
    }
}