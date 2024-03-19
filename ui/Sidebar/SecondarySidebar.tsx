import { IconActivity, IconAddressBook, IconCat, IconDashboard, IconDice, IconDice2, IconDog, IconFolderX, IconForms, IconHome } from "@tabler/icons-react";

export default function SecondarySidebar() {
    return (
        <aside className="fixed top-14 bottom-0 left-16 w-64 shrink-0 bg-ctp-mantle p-5">
            <ul className="space-y-5 text-sm">
                <li className="flex items-center gap-x-3">
                    <IconHome /> Home
                </li>
                <li className="flex items-center gap-x-3">
                    <IconDashboard /> Dashboard
                </li>
                <li className="flex items-center gap-x-3">
                    <IconActivity /> Activity
                </li>
                <li className="flex items-center gap-x-3">
                    <IconCat /> Cat Page ???
                </li>
                <li className="flex items-center gap-x-3">
                    <IconForms /> Contact
                </li>
                <li className="flex items-center gap-x-3">
                    <IconAddressBook /> Something
                </li>

            </ul>
        </aside>
    )
}