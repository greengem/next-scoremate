'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@nextui-org/input';
export default function SearchForBoardGames() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <Input
            placeholder='Search for board games'
            className='mb-2'
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get('query')?.toString()}
        />
    )
}
