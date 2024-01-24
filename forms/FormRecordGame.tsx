import prisma from '@/db/prisma';
import { Suspense } from 'react';

async function SelectGame() {
    const allBoardGames = await prisma.boardGame.findMany();
    return (
        <select>
            {allBoardGames.map((boardGame) => (
                <option key={boardGame.id} value="volvo">{boardGame.title}</option>
            ))}
        </select>
    )
}

async function SelectUsers() {
    const allUsers = await prisma.user.findMany();
    return (
        <fieldset>      
            <legend>Who is playing?</legend>
            {allUsers.map((user) => (
                <label key={user.id}>
                    <input type="checkbox" value={user.username} />
                    {user.username}
                </label>
            ))}
        </fieldset>
    )
}

function InputScores() {
    return (
    <ul> //for each user show an li with an input
        <li>
            Name: <input type='number' />
        </li>
    </ul>
    )
}

export default function FormRecordGame() {
    return (
        <form>
            <Suspense fallback="Loading Games...">
                <SelectGame />
            </Suspense>
            <Suspense fallback="Loading Users...">
                <SelectUsers />
            </Suspense>
        </form>
    )
}