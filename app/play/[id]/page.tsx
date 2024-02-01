import fetchBoardGameData from '@/data/FetchBoardGameData';
import PageHeading from '@/ui/PageHeading';
import Image from 'next/image';
import { Chip } from "@nextui-org/chip";

interface PlayGamePageProps {
    params: { id: string };
}

export default async function PlayGamePage({ params } : PlayGamePageProps) {
    const boardGame = await fetchBoardGameData(params.id);

    return (
        <>
            <PageHeading title={boardGame.name} />
            <div className='flex gap-2 mb-5'>
                <Chip radius='none' size='sm'>{boardGame.yearPublished}</Chip>
                <Chip radius='none' size='sm'>{boardGame.minPlayers}-{boardGame.maxPlayers} Players</Chip>
                <Chip radius='none' size='sm'>Age: {boardGame.age}+</Chip>
                <Chip radius='none' size='sm'>Playtime: {boardGame.minPlayTime}-{boardGame.maxPlayTime}m</Chip>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <Image className='w-full h-auto' src={boardGame.image} alt='image' height={800} width={800} />
                <div dangerouslySetInnerHTML={{ __html: boardGame.description }} />
            </div>
            
            
        </>
    )
}