'use client'
import { format } from 'date-fns';
import DeletePlayButton from "./DeletePlayButton"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import {User} from "@nextui-org/user";
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function DashboardActiveTable({
    activeGamesWithBoardData,
} : {
    activeGamesWithBoardData: any[],
}) {
    
    const columns = [
        {
          key: "game",
          label: "Game",
        },
        {
          key: "delete",
          label: "Delete",
        },
    ];

    return (
        <>
            <p className='text-2xl font-semibold mb-3'>Active Games</p>
            <Table 
                aria-label="Active Games" 
                className='mb-5'
                shadow='none'
                classNames={{
                    wrapper: 'bg-ctp-crust shadow-md',
                    th: 'bg-ctp-mantle',
                }}
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={activeGamesWithBoardData}>
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
                            <TableCell>
                                <div className='flex gap-2 items-center'>
                                    <Button as={Link} href={`/game/${game.id}`} size='sm'>Continue</Button>
                                    <DeletePlayButton playId={game.id} />
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}