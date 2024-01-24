import fetchBoardGameSearch from "@/data/FetchBoardGameSearch";
import BoardGameSearchResultsButton from "./BoardGameSearchResultsButton";

export default async function BoardGameSearchResults({ query } : { query: string }) {
    const searchResults = await fetchBoardGameSearch(query);
    return (
        <ul className="space-y-2">
            {searchResults.map((searchItem) => (
                <li key={searchItem.id} className="flex items-center gap-2">
                    <BoardGameSearchResultsButton boardgameId={searchItem.id} />
                    {searchItem.name}
                </li>
            ))}
            
        </ul>
    )
}
