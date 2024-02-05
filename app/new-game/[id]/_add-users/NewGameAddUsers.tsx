import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export function NewGameAddUsers() {
    return (
        <div className="flex gap-2">
            <Button className="shrink-0">Add Freind</Button>
            <div className="flex gap-2 items-center">
                <Button className="shrink-0">Add Guest</Button> 
                <Input className="shrink-0" labelPlacement="outside" placeholder="Guest name..." />
            </div>
        </div>
    )
}