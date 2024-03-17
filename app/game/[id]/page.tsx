import prisma from "@/db/prisma"

export default async function Page({ params } : { params: { id: string } }) {
  const game = await prisma.play.findUnique({
    where: { id: params.id },
    include: {
      players: true,
      guests: true,
    }
  });

  return (
    <div>
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </div>
  );
}