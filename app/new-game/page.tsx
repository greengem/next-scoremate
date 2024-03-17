import { Suspense } from "react";
import BoardGameSearchResults from "./components/BoardGameSearchResults";
import SearchForBoardGames from "./components/SearchForBoardGames";
import PageHeading from "@/ui/PageHeading";

export default async function PlayPage({ searchParams } : { searchParams?: { query?: string }}) {
    const query = searchParams?.query || '';

    return(
        <>
            <PageHeading title="Play" />
            <SearchForBoardGames />
            <Suspense fallback={<p>Loading search results</p>}>
                <BoardGameSearchResults query={query} />
            </Suspense>
        </>
    )
}
