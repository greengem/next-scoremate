import prisma from '@/db/prisma';
import { format } from "date-fns";

export async function GameInstanceList() {
  const gameInstances = await prisma.gameInstance.findMany({
    include: {
      boardGame: true,
      scores: {
        include: {
          user: true,
        },
        orderBy: {
          scoreValue: 'desc',
        },
      },
    },
  });
  
  

  return (
    <div>
      {gameInstances.map((gameInstance) => (
        <div key={gameInstance.id}>
          <h4>Board Game: {gameInstance.boardGame.title}</h4>
          <p>Date Played: {format(new Date(gameInstance.instanceDate), "yyyy-MM-dd HH:mm")}</p>
          <p>Winner: {gameInstance.scores[0]?.user.username}</p>
          <ul>
            {gameInstance.scores.map(score => (
              <li key={score.id}>{score.user.username}: {score.scoreValue} points</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}