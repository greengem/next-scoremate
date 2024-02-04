import { IconSettings } from "@tabler/icons-react";

export default function NewGameSettings() {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Settings</h2>
                <IconSettings />
            </div>
            <ul>
                <li>game platy with rounds</li>
                <li>with player timers</li>
                <li>timer mode</li>
            </ul>
        </div>
    )
}