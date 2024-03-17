-- CreateTable
CREATE TABLE "Play" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Play_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayToPlayers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlayToPlayers_AB_unique" ON "_PlayToPlayers"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayToPlayers_B_index" ON "_PlayToPlayers"("B");

-- AddForeignKey
ALTER TABLE "Play" ADD CONSTRAINT "Play_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayToPlayers" ADD CONSTRAINT "_PlayToPlayers_A_fkey" FOREIGN KEY ("A") REFERENCES "Play"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayToPlayers" ADD CONSTRAINT "_PlayToPlayers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
