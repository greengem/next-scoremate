import prisma from "@/db/prisma"
import { clerkClient } from "@clerk/nextjs";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";

export default async function Page({ params } : { params: { id: string } }) {

  const play = await prisma.play.findUnique({
    where: { id: params.id },
    include: {
      players: true,
    }
  });

  if (!play) {
    return <div>Game not found</div>;
  }

  const sortedPlayers = [...play.players].sort((a, b) => a.order - b.order);

  const playersData = await Promise.all(sortedPlayers.map(async player => {
    if (player.userId) {
      const userData = await clerkClient.users.getUser(player.userId);
      return { 
        username: userData.username, 
        imageUrl: userData.imageUrl, 
        order: player.order 
      };
    } else {
      return { 
        username: player.guestName, 
        imageUrl: player.guestAvatar, 
        order: player.order 
      };
    }
  }));

  return (
    <form>
      <div className="grid grid-cols-3 gap-5 mb-5">
        {sortedPlayers.map((player, index) => (
          <Card key={player.id} shadow="none" className="bg-ctp-surface0 shadow-lg text-ctp-text">
            <CardBody className="p-5">
              <p className="text-center text-xl font-semibold mb-5">{playersData[index].username}</p>
              <img src={playersData[index].imageUrl ?? undefined} alt={playersData[index].username ?? undefined} className="rounded-full mb-5" />
              <Input type="number" placeholder={`${playersData[index].username}'s Score`} className="w-full" />
            </CardBody>
          </Card>
        ))}
      </div>
      <Button className="bg-ctp-mauve text-ctp-base">Save Game</Button>
    </form>
  );
}