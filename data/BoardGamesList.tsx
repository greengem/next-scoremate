import prisma from '@/db/prisma';

export async function BoardGamesList() {
    const allBoardGames = await prisma.boardGame.findMany();
    return (
        <>
            {allBoardGames.map((boardGame) => (
                <div key={boardGame.id}>
                    <p>{boardGame.title}</p>
                </div>
            ))}
        </>
    )
}