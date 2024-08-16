/*
  Warnings:

  - You are about to drop the column `googleEmail` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `googleId` on the `Users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "profileProviders" AS ENUM ('GOOGLE');

-- DropIndex
DROP INDEX "Users_googleEmail_key";

-- DropIndex
DROP INDEX "Users_googleId_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "googleEmail",
DROP COLUMN "googleId";

-- CreateTable
CREATE TABLE "Profiles" (
    "id" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    "provider" "profileProviders" NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerEmail" TEXT NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_provider_providerId_key" ON "Profiles"("provider", "providerId");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
