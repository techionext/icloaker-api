/*
  Warnings:

  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_campaignId_fkey";

-- DropTable
DROP TABLE "Log";

-- CreateTable
CREATE TABLE "CampaignLogs" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "ip" TEXT,
    "redirectTo" TEXT,
    "page" TEXT,
    "referer" TEXT,
    "userAgent" TEXT,
    "language" TEXT,
    "ipinfo" JSONB,
    "deviceInfo" JSONB,
    "apiResponse" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampaignLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CampaignLogs_id_key" ON "CampaignLogs"("id");

-- CreateIndex
CREATE INDEX "CampaignLogs_campaignId_idx" ON "CampaignLogs"("campaignId");

-- AddForeignKey
ALTER TABLE "CampaignLogs" ADD CONSTRAINT "CampaignLogs_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
