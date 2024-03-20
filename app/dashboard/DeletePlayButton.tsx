'use client'
import { handleDeletePlay } from "@/server-actions/GameServerActions";
import { useTransition } from "react";
import { Button } from "@nextui-org/button";

export default function DeletePlayButton({
    playId
}: {
    playId: string;
}) {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        if (window.confirm("Are you sure you want to delete this play?")) {
          startTransition(() => {
            handleDeletePlay(playId);
          });
        }
      };

    return (
        <Button onClick={handleClick} isDisabled={isPending}>
            Delete
        </Button>
    )
}