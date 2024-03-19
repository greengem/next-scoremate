import { IconCat, IconDice, IconDice2, IconDice3, IconDice4, IconDice5Filled, IconDice6Filled, IconDog } from "@tabler/icons-react";

export default function MainSidebar() {
    return (
        <aside className="fixed top-14 bottom-0 left-0 w-16 shrink-0 bg-ctp-crust py-5">
            <ul className="space-y-5">
                <li className="flex justify-center"><IconCat /></li>
                <li className="flex justify-center"><IconDog /></li>
                <li className="flex justify-center"><IconDice /></li>
                <li className="flex justify-center"><IconDice2 /></li>
                <li className="flex justify-center"><IconDice3 /></li>
                <li className="flex justify-center"><IconDice4 /></li>
                <li className="flex justify-center"><IconDice5Filled /></li>
                <li className="flex justify-center"><IconDice6Filled /></li>


            </ul>
        </aside>
    )
}