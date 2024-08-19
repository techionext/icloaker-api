/*
  Warnings:

  - You are about to drop the column `allowrefererOrigins` on the `Campaign` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "allowrefererOrigins",
ADD COLUMN     "allowRefererOrigins" TEXT[];
