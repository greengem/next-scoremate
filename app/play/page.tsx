import Link from "next/link";

export default function PlayPage() {
    const gameId = '266192'; // Wingspan

    return(
        <>
            <h1>Play Page</h1>

            <h4>What are you playing?</h4>            
            <input type="search" defaultValue="Search for a game" className="block" />

            <h4>Who is playing?</h4>
            <input type="search" defaultValue="Search for a game" className="block" />

            <Link href={`/play/${gameId}`} className="bg-blue-500 p-2 block">Play now</Link>

        </>
    )
}
