import MainSidebar from "./MainSidebar";
import SecondarySidebar from "./SecondarySidebar";

interface SidebarProps {
    secondarySidebar?: boolean;
}

export default function Sidebar({ secondarySidebar = false }: SidebarProps) {
    return (
        <>
            <MainSidebar />
            {secondarySidebar && <SecondarySidebar />}
        </>
    )
}