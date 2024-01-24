import FetchBoardGameData from '@/data/FetchBoardGameData';
import Image from 'next/image';

interface PlayGamePageProps {
    params: { id: string };
}

export default async function PlayGamePage({ params } : PlayGamePageProps) {
    const boardGame = await FetchBoardGameData(params.id);
    return (
        <>
            <h2>{boardGame.name}</h2>
            <Image src={boardGame.image} alt='image' height={100} width={100} />
        </>
    )
}