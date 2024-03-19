/*
  Warnings:

  - You are about to drop the column `players` on the `Play` table. All the data in the column will be lost.
  - You are about to drop the `Guest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlayToGuests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PlayToGuests" DROP CONSTRAINT "_PlayToGuests_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayToGuests" DROP CONSTRAINT "_PlayToGuests_B_fkey";

-- AlterTable
ALTER TABLE "Play" DROP COLUMN "players",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "notes" TEXT;

-- DropTable
DROP TABLE "Guest";

-- DropTable
DROP TABLE "_PlayToGuests";

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "playId" TEXT NOT NULL,
    "userId" TEXT,
    "guestName" TEXT,
    "guestAvatar" TEXT,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "playerId" TEXT NOT NULL,
    "playId" TEXT NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Play_gameId_date_idx" ON "Play"("gameId", "date");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_playId_fkey" FOREIGN KEY ("playId") REFERENCES "Play"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_playId_fkey" FOREIGN KEY ("playId") REFERENCES "Play"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
