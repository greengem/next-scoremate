'use client'
import { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { handleStartGame } from "@/server-actions/handleStartGame";
import { User } from "@nextui-org/user";

export default function NewGameStartGame({
    gameId,
    creator
}: {
    gameId: string;
    creator: any;
}) {
    const [players, setPlayers] = useState([{ id: creator.user.id, name: creator.user.name, avatar: creator.user.image, isGuest: false, userType: 'Me' }]);
    const [guestName, setGuestName] = useState('');
    const [userType, setUserType] = useState('Guest');

    const addGuest = () => {
        setPlayers([...players, { id: Math.random().toString(), name: guestName, avatar: 'guestAvatar.png', isGuest: true, userType }]);
        setGuestName('');
    };

    const startGame = (event: React.FormEvent) => {
        event.preventDefault();
        handleStartGame({ gameId, players });
    };

    return (
        <div className="space-y-5">
            <div className="flex gap-2">
                <div className="flex gap-2 items-center">
                    <Button className="shrink-0" onClick={addGuest}>Add Guest</Button> 
                    <Input className="shrink-0" labelPlacement="outside" placeholder="Guest name..." value={guestName} onChange={(e) => setGuestName(e.target.value)} />
                    <select onChange={(e) => setUserType(e.target.value)} value={userType}>
                        <option value="Guest">Guest</option>
                        <option value="Friend">Friend</option>
                    </select>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold">Players</h2>
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
            </div>

            <form onSubmit={startGame}>
                <input type="hidden" name="gameId" value={gameId} />
                <Button type="submit">Start Game</Button>
            </form>
        </div>
    );
}