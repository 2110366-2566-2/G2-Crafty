-- CreateTable
CREATE TABLE "ProductHistory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "deadline" TEXT,
    "status" TEXT,
    "note" TEXT,
    "imageUrl" TEXT,
    "isPaid" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "crafterId" TEXT NOT NULL,
    "crafteeId" TEXT NOT NULL,

    CONSTRAINT "ProductHistory_pkey" PRIMARY KEY ("id")
);
