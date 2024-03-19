import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
export default function Navbar() {
    return(
        <nav className="flex justify-between items-center dark:bg-black px-5 py-3 dark:text-white border-b-2 border-zinc-500">
            <h4 className="text-xl tracking-tight"><Link href='/'>Brand</Link></h4>
            <ul className="flex gap-3 items-center">
                <li><ThemeSwitcher /></li>
                <li><UserButton /></li>
            </ul>
        </nav>
    )
}