'use client'
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function PlayNowButton() {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    console.log(params);
    return <Link href={`/play/`} className="bg-blue-500 p-2 block">Play now</Link>;
}