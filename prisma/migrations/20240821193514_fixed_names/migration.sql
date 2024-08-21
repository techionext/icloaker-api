-- CreateEnum
CREATE TYPE "domainStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "campaignDevices" AS ENUM ('IPHONE', 'ANDROID', 'WINDOWS', 'MACBOOK', 'LINUX');

-- CreateEnum
CREATE TYPE "campaignAntiSpy" AS ENUM ('VPN', 'PROXY', 'TOR', 'RELAY', 'BOT');

-- CreateTable
CREATE TABLE "Domains" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" "domainStatus" NOT NULL DEFAULT 'INACTIVE',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Domains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaigns" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "origin" TEXT[],
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "safePage" TEXT,
    "offerPage" TEXT,
    "languages" TEXT[],
    "countries" TEXT[],
    "devices" "campaignDevices"[],
    "domainStatus" "domainStatus" NOT NULL DEFAULT 'PENDING',
    "manualReview" BOOLEAN NOT NULL DEFAULT false,
    "allowIsps" TEXT[],
    "allowRefererOrigins" TEXT[],
    "allowQueries" TEXT[],
    "allowIps" TEXT[],
    "antiSpy" "campaignAntiSpy"[],
    "denyLanguages" TEXT[],
    "denyCountries" TEXT[],
    "denyIps" TEXT[],
    "denyIsps" TEXT[],
    "denyQueries" TEXT[],
    "denyRefererOrigins" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaigns_pkey" PRIMARY KEY ("id")
);

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
    "ipInfo" JSONB,
    "deviceInfo" JSONB,
    "apiResponse" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampaignLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Campaigns_userId_idx" ON "Campaigns"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignLogs_id_key" ON "CampaignLogs"("id");

-- CreateIndex
CREATE INDEX "CampaignLogs_campaignId_idx" ON "CampaignLogs"("campaignId");

-- AddForeignKey
ALTER TABLE "Domains" ADD CONSTRAINT "Domains_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaigns" ADD CONSTRAINT "Campaigns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignLogs" ADD CONSTRAINT "CampaignLogs_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
