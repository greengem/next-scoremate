'use client'
import clsx from "clsx";
import Sidebar from "./Sidebar/Sidebar"

interface LayoutWrapperProps {
    children: React.ReactNode;
    secondarySidebar?: boolean;
}

export default function LayoutWrapper({ 
    children, 
    secondarySidebar = false,
}: LayoutWrapperProps) {
    return (
        <div className="flex grow mt-14">
            <Sidebar secondarySidebar={secondarySidebar} />
            <main className={clsx("flex flex-col grow p-5", {
                'ml-80': secondarySidebar,
                'ml-16': !secondarySidebar,
            })}>
                {children}
            </main>
        </div>
    )
}