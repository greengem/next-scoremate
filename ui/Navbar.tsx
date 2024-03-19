import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
export default function Navbar() {
    return(
        <nav className="dark:bg-ctp-crust flex justify-between items-center px-5 py-3 navbar h-14">
            <h4 className="text-xl tracking-tight"><Link href='/'>Brand</Link></h4>
            <ul className="flex gap-3 items-center">
                <li><ThemeSwitcher /></li>
                <li><UserButton /></li>
            </ul>
        </nav>
    )
}