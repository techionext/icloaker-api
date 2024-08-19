/*
  Warnings:

  - You are about to drop the column `manualreview` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `offerpage` on the `Campaign` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "manualreview",
DROP COLUMN "offerpage",
ADD COLUMN     "manualReview" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "offerPage" TEXT;
