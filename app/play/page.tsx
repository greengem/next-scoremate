import { Suspense } from "react";
import BoardGameSearchResults from "./components/BoardGameSearchResults";
import SearchForBoardGames from "./components/SearchForBoardGames";
import Link from "next/link";

export default async function PlayPage({
    searchParams,
}: {
    searchParams?: {
      query?: string;
    };
}) {
    const query = searchParams?.query || '';
    const gameId = '266192'; // Wingspan

    return(
        <>
            <h1>Play Page</h1>

            <h4>What are you playing?</h4>            
            <SearchForBoardGames />
            <Suspense fallback={<p>Loading search results</p>}>
                <BoardGameSearchResults query={query} />
            </Suspense>
            <h4>Who is playing?</h4>
            <input type="search" defaultValue="Search for a game" className="block" />

            <Link href={`/play/${gameId}`} className="bg-blue-500 p-2 block">Play now</Link>

        </>
    )
}
