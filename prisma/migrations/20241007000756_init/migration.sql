-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "jobStatus" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);
