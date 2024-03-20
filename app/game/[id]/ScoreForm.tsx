'use client'
import { handleSaveScores } from "@/server-actions/GameServerActions";
import { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Image from "next/image";

export default function ScoreForm({
    playersData,
    playId,
} : {
    playersData: any[];
    playId: string;
}) {
    const [scores, setScores] = useState(playersData.map(player => {
        return { playerId: player.id, value: 0 };
    }));

    const handleScoreChange = (index: number, value: number) => {
        const newScores = [...scores];
        newScores[index].value = value;
        setScores(newScores);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Submitting scores:", scores);
        await handleSaveScores({ playId, scores });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-5 mb-5">
            {playersData.map((player, index) => (
                <Card key={index} shadow="none" className="bg-ctp-surface0 shadow-lg text-ctp-text">
                <CardBody className="p-5">
                    <p className="text-center text-xl font-semibold mb-5">{player.username}</p>
                    <Image src={player.imageUrl ?? undefined} alt={player.username ?? undefined} className="rounded-full mb-5" width={600} height={600} />
                    <Input type="number" placeholder={`${player.username}'s Score`} className="w-full" onChange={e => handleScoreChange(index, Number(e.target.value))} />
                </CardBody>
                </Card>
            ))}
            </div>
            <Button color="primary" type="submit">
                Finish Game
            </Button>
        </form>
    )
}