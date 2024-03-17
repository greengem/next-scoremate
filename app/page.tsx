import { auth } from "@clerk/nextjs";
import PageHeading from "@/ui/PageHeading";
import prisma from "@/db/prisma";

export default async function HomePage() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("No user ID");
  }

  const games = await prisma.play.findMany({
    where: {
      creatorId: userId
    },
  });

  return (
    <>
      <PageHeading title="Home" />
      <pre>{JSON.stringify(games, null, 2)}</pre>    
    </>
  );
}