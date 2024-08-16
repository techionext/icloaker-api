/*
  Warnings:

  - A unique constraint covering the columns `[googleEmail]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "googleEmail" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_googleEmail_key" ON "Users"("googleEmail");
