/*
  Warnings:

  - Added the required column `sender` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "sender" TEXT NOT NULL;
