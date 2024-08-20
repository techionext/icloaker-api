/*
  Warnings:

  - You are about to drop the column `ipinfo` on the `CampaignLogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CampaignLogs" DROP COLUMN "ipinfo",
ADD COLUMN     "ipInfo" JSONB;
