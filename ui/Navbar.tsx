import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
    return(
        <nav className="fixed top-0 left-0 right-0 z-10 dark:bg-ctp-crust flex justify-between items-center px-5 py-3 navbar h-14">
            <h4 className="text-xl tracking-tight"><Link href='/'>Brand</Link></h4>
            <ul className="flex gap-3 items-center">
                <li><UserButton /></li>
            </ul>
        </nav>
    )
}