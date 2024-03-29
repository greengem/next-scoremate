'use client'
import cuid from 'cuid';
import { useState } from 'react';
import { Button } from "@nextui-org/button";
import { handleStartGame } from '@/server-actions/GameServerActions';
import { User } from "@nextui-org/user";
import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/card';
import { IconUserCircle, IconX } from '@tabler/icons-react';
import { Divider } from '@nextui-org/react';
import { Reorder } from "framer-motion";
import PlayerSelectTabs from './PlayerSelectTabs';
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover";
import Image from 'next/image';

type PlayerType = {
    id: string;
    name: string;
    avatar: string | undefined;
    isGuest: boolean;
    userType: 'Creator' | 'Guest';
};

const preGeneratedAvatarUrls = [
    '/avatars/cali.svg',
    '/avatars/midnight.svg',
    '/avatars/milo.svg',
    '/avatars/rocky.svg',
    '/avatars/zoe.svg',
];


const friends = [
    { label: 'John Doe', value: 'john-doe' },
    { label: 'Jane Doe', value: 'jane-doe' },
    { label: 'John Smith', value: 'john-smith' }
];

export default function NewGameStartGame({
    gameId,
    gameTitle,
    gameImage,
    creatorId,
    creatorName,
    creatorAvatar
}: {
    gameId: string;
    gameTitle: string;
    gameImage: string;
    creatorId: string;
    creatorName: string;
    creatorAvatar: string | undefined;
}) {
    const [players, setPlayers] = useState<PlayerType[]>([
        { 
            id: creatorId,
            name: creatorName, 
            avatar: creatorAvatar, 
            isGuest: false, 
            userType: 'Creator' 
        }
    ]);
    //console.log('players:', players);
    
    const [guestName, setGuestName] = useState('');

    const addGuest = () => {
        const guestId = 'guest-' + cuid();
        setPlayers([...players, { id: guestId, name: guestName, avatar: undefined, isGuest: true, userType: 'Guest' }]);
        setGuestName('');
    };
    

    const removePlayer = (id: string) => {
        setPlayers(players.filter(player => player.id !== id));
    };

    const startGame = (event: React.FormEvent) => {
        event.preventDefault();
        const playerData = players.map((player, index) => ({
            id: player.id,
            name: player.name,
            avatar: player.avatar || null,
            order: index,
            isGuest: player.isGuest
        }));
        console.log('playerData:', playerData);
        handleStartGame({ gameId, players: playerData });
    };
    
    
    
    const assignAvatarToGuest = (guestId: string, avatarUrl: string) => {
        setPlayers(players.map(player => {
            if (player.id === guestId) {
                return { ...player, avatar: avatarUrl };
            }
            return player;
        }));
    };
    
    return (
        <Card shadow='none' className='bg-ctp-surface0 shadow-lg text-ctp-text w-full max-w-96 mx-auto'>
            <CardHeader className='flex flex-row gap-3'>
                <Image src={gameImage} alt="Game Image" width={48} height={48} className='w-10 aspect-square object-cover object-top rounded-lg' />
                <p className='text-xl font-semibold'>{gameTitle}</p>
            </CardHeader>
            <CardBody>
                
                <PlayerSelectTabs 
                    friends={friends}
                    guestName={guestName}
                    setGuestName={setGuestName}
                    addGuest={addGuest}
                />

                <Divider className='mb-3 mt-1' />

                <p className='text-lg font-semibold mb-3'>Player Order</p>
                <Card className='bg-ctp-base shadow-md' shadow='none'>
                    <CardBody>
                        <Reorder.Group axis="y" values={players} onReorder={setPlayers} className='flex flex-col items-start space-y-3'>
                            {players.map((player) => (
                                <Reorder.Item key={player.id} value={player} className='flex w-full justify-between items-center cursor-move'>
                                    <User name={player.name} description={player.userType} avatarProps={{ src: player.avatar }} classNames={{
                                        name: 'text-ctp-text',
                                        description: 'text-ctp-subtext'
                                    }} />
                                    <div className='flex gap-3'>
                                        {player.userType === 'Guest' && 
                                            <Popover placement="top">
                                                <PopoverTrigger>
                                                    <Button isIconOnly size='sm'><IconUserCircle size={20} /></Button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <div className="grid grid-cols-5 w-full gap-3 px-1 py-2">
                                                        {preGeneratedAvatarUrls.map((avatarUrl, index) => (
                                                            <Image 
                                                                key={index} 
                                                                src={avatarUrl} 
                                                                alt={`Avatar ${index}`} 
                                                                height={16}
                                                                width={16}
                                                                className="w-16 h-16 m-1 cursor-pointer" 
                                                                onClick={() => assignAvatarToGuest(player.id, avatarUrl)}
                                                            />
                                                        ))}
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        }
                                        <Button isIconOnly size='sm' onClick={() => removePlayer(player.id)}><IconX size={20} /></Button>
                                    </div>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </CardBody>
                </Card>
            </CardBody>
            
            <CardFooter>
                <form onSubmit={startGame} className='w-full'>
                    <input type="hidden" name="gameId" value={gameId} />
                    <Button color='primary' type="submit" className='w-full bg-ctp-mauve text-ctp-crust'>Start Game</Button>
                </form>
            </CardFooter>
        </Card>
    );
}
