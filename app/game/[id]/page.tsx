import prisma from "@/db/prisma"
import { clerkClient } from "@clerk/nextjs";

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

  const creator = await clerkClient.users.getUser(play.creatorId);
  const friends = play.players.filter(player => player.userId !== null && player.userId !== play.creatorId);
  const guests = play.players.filter(player => player.userId === null);

  return (
    <div>
      <pre>{JSON.stringify(play, null, 2)}</pre>

      <h2 className="text-xl mb-3">Creator: {creator.firstName} {creator.lastName}</h2>

      <div className="mb-3">
        <p className="text-xl">Friends: </p>
        {friends.map((friend, index) => (
          <div key={index}>
            <h3>{friend.guestName}</h3>
          </div>
        ))}
      </div>

      <div className="mb-3">
        <p className="text-xl">Guests: </p>
        {guests.map((guest, index) => (
          <div key={index}>
            <h3>{guest.guestName}</h3>
          </div>
        ))}
      </div>

    </div>
  );
}