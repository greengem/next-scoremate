-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'guestAvatar.png',

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayToGuests" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlayToGuests_AB_unique" ON "_PlayToGuests"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayToGuests_B_index" ON "_PlayToGuests"("B");

-- AddForeignKey
ALTER TABLE "_PlayToGuests" ADD CONSTRAINT "_PlayToGuests_A_fkey" FOREIGN KEY ("A") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayToGuests" ADD CONSTRAINT "_PlayToGuests_B_fkey" FOREIGN KEY ("B") REFERENCES "Play"("id") ON DELETE CASCADE ON UPDATE CASCADE;
