/*
  Warnings:

  - Added the required column `photoUrl` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "photoUrl" TEXT NOT NULL;
