import { auth } from "@/auth";
import {CheckboxGroup, Checkbox} from "@nextui-org/checkbox";

export default async function NewGameUsers() {
    const session = await auth();
    if (!session) {
        return <div>User not authenticated</div>;
      }
    return (
        <div>
            <h2 className="text-lg font-semibold">Players</h2>
            <CheckboxGroup>
                <Checkbox value='value'>{session?.user?.name}</Checkbox>
            </CheckboxGroup>
        </div>
    );
}