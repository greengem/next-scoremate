import { IconCat, IconDashboard, IconDice, IconDice2, IconDice3, IconDice4, IconDice5Filled, IconDice6Filled, IconDog, IconHome } from "@tabler/icons-react";
import Link from "next/link";
import { ThemeSwitcher } from "../ThemeSwitcher";

export default function MainSidebar() {
    return (
        <aside className="fixed flex flex-col justify-between top-14 bottom-0 left-0 w-16 shrink-0 bg-ctp-crust py-5">
            <ul className="space-y-5">
                <li className="flex justify-center">
                    <Link href="/"><IconHome /></Link>
                </li>
                <li className="flex justify-center">
                    <Link href="/dashboard"><IconDashboard /></Link>
                </li>
                <li className="flex justify-center">
                    <Link href="/new-game"><IconDice3 /></Link>
                </li>
            </ul>

            <ThemeSwitcher />
        </aside>
    )
}