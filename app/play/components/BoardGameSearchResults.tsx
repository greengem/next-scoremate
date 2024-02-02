import fetchBoardGameSearch from "@/data/FetchBoardGameSearch";
import BoardGameSearchResultsTable from "./BoardGameSearchResultsTable";

export default async function BoardGameSearchResults({ query } : { query: string }) {
    const searchResults = await fetchBoardGameSearch(query);
    return (<BoardGameSearchResultsTable searchResults={searchResults} />)
}
