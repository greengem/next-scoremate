import fetchBoardGameSearch from "@/data/FetchBoardGameSearch";
import BoardGameSearchResultsTable from "./BoardGameSearchResultsTable";

export default async function BoardGameSearchResults({ query } : { query: string }) {
    const searchResults = await fetchBoardGameSearch(query);
    return (
        <ul>
            {searchResults.map((searchItem: any) => (
                <li key={searchItem.id}>{searchItem.name}</li>
            ))}
        </ul>
    )
}
