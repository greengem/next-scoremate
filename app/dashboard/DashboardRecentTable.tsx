'use client'
import { format } from 'date-fns';
import DeletePlayButton from "./DeletePlayButton"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import {User} from "@nextui-org/user";
import { IconTrophy } from '@tabler/icons-react';

export default function DashboardRecentTable({
    recentGamesWithBoardData
} : {
    recentGamesWithBoardData: any[]
}) {
    
    const columns = [
        {
          key: "game",
          label: "Game",
        },
        {
          key: "players",
          label: "Players",
        },
        {
          key: "winner",
          label: "Winner",
        },
        {
          key: "delete",
          label: "Delete",
        },
    ];

    return (
        <>
            <p className='text-2xl font-semibold mb-3'>Recent Games</p>
            <Table 
                aria-label="Recent Games"
                shadow='none'
                classNames={{
                    wrapper: 'bg-ctp-crust shadow-md',
                    th: 'bg-ctp-mantle',
                }}
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={recentGamesWithBoardData}>
                    {(game) => (
                        <TableRow key={game.id}>
                            <TableCell>
                                <User   
                                    name={game.boardGame.name}
                                    description={format(new Date(game.date), 'dd/MM/yyyy')}
                                    avatarProps={{
                                        src: game.boardGame.thumbnail
                                    }}
                                />
                            </TableCell>
                            <TableCell>{game.playerNames.join(', ')}</TableCell>
                            <TableCell>
                                <div className='flex gap-3 items-center'>
                                    <IconTrophy /> {game.winner}
                                </div>
                            </TableCell>
                            <TableCell><DeletePlayButton playId={game.id} /></TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}