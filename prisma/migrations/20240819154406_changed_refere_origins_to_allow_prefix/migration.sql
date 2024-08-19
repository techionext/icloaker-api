/*
  Warnings:

  - You are about to drop the column `refererOrigins` on the `Campaign` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "refererOrigins",
ADD COLUMN     "allowrefererOrigins" TEXT[];
