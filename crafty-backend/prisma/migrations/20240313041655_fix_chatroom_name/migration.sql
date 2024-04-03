/*
  Warnings:

  - You are about to drop the column `chatRoomId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `chatRoomId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chatroomId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chatroomId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatroomId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatRoomId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_chatRoomId_fkey";

-- DropIndex
DROP INDEX "Product_chatRoomId_key";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "chatRoomId",
ADD COLUMN     "chatroomId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "chatRoomId",
ADD COLUMN     "chatroomId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_chatroomId_key" ON "Product"("chatroomId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "Chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "Chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
