import { auth } from "@clerk/nextjs";
import fetchBoardGameData from '@/data/FetchBoardGameData';
import PageHeading from '@/ui/PageHeading';
import NewGameStartGame from './_StartGame/NewGameStartGame';

interface PlayGamePageProps {
    params: { id: string };
}

export default async function PlayGamePage({ params } : PlayGamePageProps) {
    const { userId } = auth();
    if (!userId) {
      throw new Error("No user ID");
    }

    const boardGame = await fetchBoardGameData(params.id);
    const pageTitle = `New Game of ${boardGame.name}`;

    return (
        <>
            <PageHeading title={pageTitle} />
            <NewGameStartGame 
                gameId={params.id}
                creator={session}
            />
        </>
    )
}