import fetchBoardGameSearch from "@/data/FetchBoardGameSearch";
import BoardGameSearchResultsButton from "./BoardGameSearchResultsButton";
import Link from "next/link";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";

export default async function BoardGameSearchResults({ query } : { query: string }) {
    const searchResults = await fetchBoardGameSearch(query);
    return (
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display."}>
                {searchResults.map((searchItem) => (
                    <TableRow key={searchItem.id}>
                        <TableCell>{searchItem.name}</TableCell>
                        <TableCell><Link href={`/play/${searchItem.id}`}>Link</Link></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
