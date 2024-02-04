import fetchBoardGameSearch from "@/data/FetchBoardGameSearch";
import Link from "next/link";

export default async function BoardGameSearchResults({ query } : { query: string }) {
    const searchResults = await fetchBoardGameSearch(query);
    return (
        <ul>
            {searchResults.map((searchItem: any) => (
                <li key={searchItem.id}>
                    <Link href={`/new-game/${searchItem.id}`}>
                        {searchItem.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
