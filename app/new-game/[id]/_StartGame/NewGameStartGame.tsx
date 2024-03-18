'use client'
import { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { handleStartGame } from "@/server-actions/handleStartGame";
import { User } from "@nextui-org/user";
import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/card';

export default function NewGameStartGame({
    gameId,
    userId,
    userName,
    userAvatar
}: {
    gameId: string;
    userId: string;
    userName: string;
    userAvatar: string | undefined;
}) {
    const [players, setPlayers] = useState([{ id: userId, name: userName, avatar: userAvatar, isGuest: false, userType: 'Me' }]);
    const [guestName, setGuestName] = useState('');
    const [userType, setUserType] = useState('Guest');

    const addGuest = () => {
        setPlayers([...players, { id: Math.random().toString(), name: guestName, avatar: undefined, isGuest: true, userType }]);
        setGuestName('');
    };

    const startGame = (event: React.FormEvent) => {
        event.preventDefault();
        handleStartGame({ gameId, players });
    };

    return (
        <Card className='max-w-96 mx-auto'>
            <CardHeader>Players</CardHeader>
            <CardBody>

            <div className="flex gap-2 items-center mb-5">
                <Input size='sm' className="grow" labelPlacement="outside" placeholder="Guest name..." value={guestName} onChange={(e) => setGuestName(e.target.value)} />
                <Button size='sm' className="shrink-0" onClick={addGuest}>Add Guest</Button> 
                <select onChange={(e) => setUserType(e.target.value)} value={userType} className='hidden'>
                    <option value="Guest">Guest</option>
                    <option value="Friend">Friend</option>
                </select>
            </div>


            <div className='flex flex-col items-start space-y-3'>
                {players.map(player => (
                    <User
                        key={player.id}
                        name={player.name}
                        description={player.userType}
                        avatarProps={{
                            src: player.avatar
                        }}
                    />
                ))}
            </div>
            </CardBody>
            <CardFooter>
                <form onSubmit={startGame}>
                    <input type="hidden" name="gameId" value={gameId} />
                    <Button type="submit">Start Game</Button>
                </form>
            </CardFooter>
        </Card>
    );
}