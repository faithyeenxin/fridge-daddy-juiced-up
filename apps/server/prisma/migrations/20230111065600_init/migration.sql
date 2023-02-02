-- CreateTable
CREATE TABLE "Files" (
    "id" TEXT NOT NULL,
    "urls" TEXT[],

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);
