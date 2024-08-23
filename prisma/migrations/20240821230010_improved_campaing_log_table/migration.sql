/*
  Warnings:

  - You are about to drop the column `deviceInfo` on the `CampaignLogs` table. All the data in the column will be lost.
  - You are about to drop the column `ip` on the `CampaignLogs` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `CampaignLogs` table. All the data in the column will be lost.
  - You are about to drop the column `page` on the `CampaignLogs` table. All the data in the column will be lost.
  - You are about to drop the column `referer` on the `CampaignLogs` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `CampaignLogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CampaignLogs" DROP COLUMN "deviceInfo",
DROP COLUMN "ip",
DROP COLUMN "language",
DROP COLUMN "page",
DROP COLUMN "referer",
DROP COLUMN "userAgent",
ADD COLUMN     "pageUrl" TEXT,
ADD COLUMN     "refererPage" TEXT,
ADD COLUMN     "requestInfo" JSONB;
