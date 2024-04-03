-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
