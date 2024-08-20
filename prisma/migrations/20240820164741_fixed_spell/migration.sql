/*
  Warnings:

  - You are about to drop the column `created` on the `CampaignLogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CampaignLogs" DROP COLUMN "created",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
