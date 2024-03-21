'use client'
import { handleSaveScores } from "@/server-actions/GameServerActions";
import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { User } from "@nextui-org/user";
import CustomInput from "@/ui/CustomNextUI/CustomInput";

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
                {playersData.map((player, index) => (
                    <Card key={index} shadow="none" className="bg-ctp-surface0 shadow-lg text-ctp-text">
                        <CardHeader>
                            <User   
                                name={player.username}
                                description="Product Designer"
                                avatarProps={{
                                    src: player.imageUrl ?? undefined,
                                }}
                            />
                        </CardHeader>
                        <CardBody>
                            <CustomInput 
                                type="number"
                                label="Score" placeholder={`${player.username}'s Score`}
                                className="w-full"
                                onChange={e => handleScoreChange(index, Number(e.target.value))}
                            />
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
