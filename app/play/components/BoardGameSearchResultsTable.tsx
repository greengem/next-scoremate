'use client'
import Link from "next/link";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";

export default function BoardGameSearchResultsTable({ searchResults } : { searchResults: any }) {
    return (
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display."}>
                {searchResults.map((searchItem: any) => (
                    <TableRow key={searchItem.id}>
                        <TableCell>{searchItem.name}</TableCell>
                        <TableCell><Link href={`/play/${searchItem.id}`}>Link</Link></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
