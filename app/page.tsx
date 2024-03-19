import { auth } from "@clerk/nextjs";
import PageHeading from "@/ui/PageHeading";
import prisma from "@/db/prisma";
import { Button } from "@nextui-org/button";
import Link from "next/link";

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
      <Button color="primary" size="sm" as={Link} href='/new-game' className="mb-3">New Game</Button>
      <pre>{JSON.stringify(games, null, 2)}</pre>    
    </>
  );
}