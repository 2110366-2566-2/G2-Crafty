/*
  Warnings:

  - You are about to drop the column `user1Id` on the `Chatroom` table. All the data in the column will be lost.
  - You are about to drop the column `user2Id` on the `Chatroom` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chatRoomId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `crafteeId` to the `Chatroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crafterId` to the `Chatroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Chatroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatRoomId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chatroom" DROP CONSTRAINT "Chatroom_user1Id_fkey";

-- DropForeignKey
ALTER TABLE "Chatroom" DROP CONSTRAINT "Chatroom_user2Id_fkey";

-- AlterTable
ALTER TABLE "Chatroom" DROP COLUMN "user1Id",
DROP COLUMN "user2Id",
ADD COLUMN     "crafteeId" TEXT NOT NULL,
ADD COLUMN     "crafterId" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "chatRoomId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_chatRoomId_key" ON "Product"("chatRoomId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "Chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatroom" ADD CONSTRAINT "Chatroom_crafterId_fkey" FOREIGN KEY ("crafterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatroom" ADD CONSTRAINT "Chatroom_crafteeId_fkey" FOREIGN KEY ("crafteeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
