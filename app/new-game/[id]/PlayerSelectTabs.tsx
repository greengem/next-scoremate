'use client'
import { MouseEventHandler } from 'react';
import { IconFriends, IconPlus, IconUser, IconX } from '@tabler/icons-react';
import { Tabs, Tab } from "@nextui-org/tabs";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

type FriendItem = {
    value: string;
    label: string;
};

interface PlayerSelectTabsProps {
    friends: FriendItem[];
    guestName: string;
    setGuestName: (value: string) => void;
    addGuest: MouseEventHandler<HTMLButtonElement>;
}


export default function PlayerSelectTabs({
    friends, guestName, setGuestName, addGuest
} : 
    PlayerSelectTabsProps
){

    return (
        <Tabs aria-label="Add Players" fullWidth color='primary'>
            <Tab 
                key="friend"
                title={
                    <div className="flex items-center space-x-2">
                    <IconFriends size={18} />
                    <span>Friends</span>
                    </div>
                }
            >
                <Autocomplete
                    label="Friends"
                    placeholder="Search for friends"
                    defaultItems={friends}
                    size='sm'
                >
                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                </Autocomplete>
            </Tab>
            <Tab 
                key="guest"
                title={
                    <div className="flex items-center space-x-2">
                    <IconUser size={18} />
                    <span>Guests</span>
                    </div>
                }
            >
                <div className="flex gap-2 items-center">
                    <Input 
                        label="Guest" placeholder="Guest name..."
                        size='sm' 
                        value={guestName} 
                        onChange={(e) => setGuestName(e.target.value)} 
                        className='grow'
                    />
                    <Button variant='flat' radius='sm' isIconOnly size='lg' className="shrink-0" onClick={addGuest}><IconPlus /></Button> 
                </div>

            </Tab>
        </Tabs>
    )
}