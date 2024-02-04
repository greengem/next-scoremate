import fetchBoardGameData from '@/data/FetchBoardGameData';
import PageHeading from '@/ui/PageHeading';
import Image from 'next/image';
import { Chip } from "@nextui-org/chip";
import NewGameSettings from './_settings/NewGameSettings';
import NewGameUsers from './_users/NewGameUsers';
import { Suspense } from 'react';
import { NewGameAddUsers } from './_add-users/NewGameAddUsers';

interface PlayGamePageProps {
    params: { id: string };
}

export default async function PlayGamePage({ params } : PlayGamePageProps) {
    const boardGame = await fetchBoardGameData(params.id);
    const pageTitle = `New Game of ${boardGame.name}`;


    return (
        <>
            <PageHeading title={pageTitle} />
            <NewGameSettings />
            <Suspense fallback={<p>Loading Users</p>}><NewGameUsers /></Suspense>
            <NewGameAddUsers />
        </>
    )
}