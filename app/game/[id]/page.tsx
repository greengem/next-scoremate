import prisma from "@/db/prisma"
import { clerkClient } from "@clerk/nextjs";
import ScoreForm from "./ScoreForm";

export default async function Page({ params } : { params: { id: string } }) {

  const playId = params.id;

  const play = await prisma.play.findUnique({
    where: { id: playId },
    include: {
      players: true,
    }
  });

  if (!play) {
    return <div>Game not found</div>;
  }

  const sortedPlayers = [...play.players].sort((a, b) => a.order - b.order);

  const playersData = await Promise.all(sortedPlayers.map(async player => {
    if (!player.isGuest) {
      const userData = await clerkClient.users.getUser(player.userId);
      return { 
        id: player.userId,
        username: userData.username, 
        imageUrl: userData.imageUrl, 
        order: player.order 
      };
    } else {
      return { 
        id: player.userId,
        username: player.guestName, 
        imageUrl: player.guestAvatar, 
        order: player.order 
      };
    }
}));

  return <ScoreForm playersData={playersData} playId={playId}  />;
}