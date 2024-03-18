import { auth, currentUser } from "@clerk/nextjs";
import fetchBoardGameData from '@/data/FetchBoardGameData';
import PageHeading from '@/ui/PageHeading';
import NewGameStartGame from './_StartGame/NewGameStartGame';

interface PlayGamePageProps {
    params: { id: string };
}

export default async function PlayGamePage({ params } : PlayGamePageProps) {
    const user = await currentUser()
    if (!user) {
        throw new Error('User not found');
    }
    const userId = user?.id;
    const userName = user?.firstName || 'User';
    const userAvatar = user?.imageUrl || '';

    const boardGame = await fetchBoardGameData(params.id);

    const pageTitle = `New Game of ${boardGame.name}`;

    return (
        <>
            <PageHeading title={pageTitle} />
            <NewGameStartGame 
                gameId={params.id}
                userId={userId}
                userName={userName}
                userAvatar={userAvatar}
            />
        </>
    )
}