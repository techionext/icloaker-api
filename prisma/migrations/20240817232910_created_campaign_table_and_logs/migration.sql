-- CreateEnum
CREATE TYPE "CampaignDevices" AS ENUM ('IPHONE', 'ANDROID', 'WINDOWS', 'MACBOOK', 'LINUX');

-- CreateEnum
CREATE TYPE "CampaignAntiSpy" AS ENUM ('VPN', 'PROXY', 'TOR', 'RELAY', 'BOT');

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "sagePage" TEXT,
    "offerpage" TEXT,
    "languages" TEXT,
    "countries" TEXT,
    "devices" "CampaignDevices"[],
    "domainStatus" "domainStatus" NOT NULL DEFAULT 'PENDING',
    "manualreview" BOOLEAN NOT NULL DEFAULT false,
    "allowIsps" TEXT,
    "refferOrigins" TEXT,
    "allowQuerys" TEXT,
    "allowIps" TEXT,
    "antiSpy" "CampaignAntiSpy"[],
    "denyLanguages" TEXT,
    "denyCountries" TEXT,
    "denyIps" TEXT,
    "denyIsps" TEXT,
    "denyQuerys" TEXT,
    "denyRefferOrigins" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
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
    "apiresponse" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_id_key" ON "Campaign"("id");

-- CreateIndex
CREATE INDEX "Campaign_userId_idx" ON "Campaign"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Log_id_key" ON "Log"("id");

-- CreateIndex
CREATE INDEX "Log_campaignId_idx" ON "Log"("campaignId");

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
