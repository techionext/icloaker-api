-- CreateEnum
CREATE TYPE "domainStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Domains" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" "domainStatus" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Domains_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Domains" ADD CONSTRAINT "Domains_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
