/*
  Warnings:

  - You are about to drop the column `denyRefferOrigins` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `refferOrigins` on the `Campaign` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "denyRefferOrigins",
DROP COLUMN "refferOrigins",
ADD COLUMN     "denyRefererOrigins" TEXT,
ADD COLUMN     "refererOrigins" TEXT;
