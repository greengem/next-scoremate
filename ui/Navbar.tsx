import Link from "next/link";
import { Button } from "@nextui-org/button";
export default function Navbar() {
    return(
        <nav className="flex justify-between items-center bg-black px-5 py-3 text-white">
            <h4 className="text-xl tracking-tight"><Link href='/'>Brand</Link></h4>
            <ul className="flex gap-3">
                <li><Button color="primary" size="sm" as={Link} href='/new-game'>New Game</Button></li>
            </ul>
        </nav>
    )
}