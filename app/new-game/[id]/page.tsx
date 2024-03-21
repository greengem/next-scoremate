import { currentUser } from "@clerk/nextjs";
import fetchBoardGameData from '@/data/FetchBoardGameData';
import PageHeading from '@/ui/PageHeading';
import PlayerSelect from './PlayerSelect';

interface PlayGamePageProps {
    params: { id: string };
}

export default async function PlayGamePage({ params } : PlayGamePageProps) {
    // Get user info
    const user = await currentUser()
    if (!user) {
        throw new Error('User not found');
    }
    const userId = user?.id;
    const userName = user?.username || 'User';
    const userAvatar = user?.imageUrl || '';

    // Get game info
    const boardGame = await fetchBoardGameData(params.id);

    // Set page title
    const pageTitle = `New Game of ${boardGame.name}`;

    return (
        <>
            <PageHeading title={pageTitle} />
            <div className="flex flex-col grow items-center justify-center">
                <PlayerSelect
                    gameId={params.id}
                    gameTitle={boardGame.name}
                    gameImage={boardGame.image}
                    creatorId={userId}
                    creatorName={userName}
                    creatorAvatar={userAvatar}
                />
            </div>
        </>
    )
}