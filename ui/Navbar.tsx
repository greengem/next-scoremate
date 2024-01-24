import Link from "next/link";

export default function Navbar() {
    return(
        <nav className="flex justify-between items-center bg-black px-5 py-3 text-white">
            <h4 className="text-xl tracking-tight"><Link href='/'>Brand</Link></h4>
            <ul className="flex gap-3">
                <li>
                    <Link href='/play'>Play</Link>
                </li>
                <li>
                    <Link href='#'>Link</Link>
                </li>
                <li>
                    <Link href='#'>Link</Link>
                </li>
            </ul>
        </nav>
    )
}