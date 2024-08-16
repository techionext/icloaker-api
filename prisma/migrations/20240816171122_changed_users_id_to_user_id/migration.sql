/*
  Warnings:

  - You are about to drop the column `usersId` on the `Profiles` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_usersId_fkey";

-- AlterTable
ALTER TABLE "Profiles" DROP COLUMN "usersId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
