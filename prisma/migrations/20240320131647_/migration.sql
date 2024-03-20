/*
  Warnings:

  - Added the required column `isGuest` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Player` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "isGuest" BOOLEAN NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;
