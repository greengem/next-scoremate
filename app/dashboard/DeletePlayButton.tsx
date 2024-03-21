'use client'
import { handleDeletePlay } from "@/server-actions/GameServerActions";
import { useTransition } from "react";
import { Button } from "@nextui-org/button";
import { IconTrash } from "@tabler/icons-react";

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
        <Button isIconOnly size="sm" onClick={handleClick} isDisabled={isPending}>
            <IconTrash size={20} />
        </Button>
    )
}