'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function BoardGameSearchResultsButton({ boardgameId} : { boardgameId: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSelect(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
          params.set('game', term);
          params.delete('query');
        } else {
          params.delete('game');
        }
        replace(`${pathname}?${params.toString()}`);
      }

      return <button onClick={() => handleSelect(boardgameId)} className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs">Select</button>;

}