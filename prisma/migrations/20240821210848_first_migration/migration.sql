-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('USER', 'COLLABORATOR', 'ADMIN', 'ROOT');

-- CreateEnum
CREATE TYPE "profileProviders" AS ENUM ('GOOGLE');

-- CreateEnum
CREATE TYPE "domainStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "campaignDevices" AS ENUM ('IPHONE', 'ANDROID', 'WINDOWS', 'MACBOOK', 'LINUX');

-- CreateEnum
CREATE TYPE "campaignAntiSpy" AS ENUM ('VPN', 'PROXY', 'TOR', 'RELAY', 'BOT');

-- CreateEnum
CREATE TYPE "safePageMethods" AS ENUM ('EXTERNAL', 'INTERNAL');

-- CreateEnum
CREATE TYPE "offerPageMethods" AS ENUM ('SINGLE', 'AB');

-- CreateEnum
CREATE TYPE "pageTypes" AS ENUM ('PHISIC', 'MIDIA');

-- CreateEnum
CREATE TYPE "origins" AS ENUM ('FACEBOOK', 'GOOGLE', 'TIKTOK', 'KWAI', 'MGID', 'OUTBRAIN', 'TABOOLA');

-- CreateEnum
CREATE TYPE "googleTrafficSource" AS ENUM ('YOUTUBE', 'SEARCH', 'DISPLAY_NETWORK', 'P_MAX', 'DEMAND');

-- CreateTable
CREATE TABLE "Profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "profileProviders" NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerEmail" TEXT NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "avatar" TEXT,
    "avatarKey" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "password" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "userRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecoverPassword" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expirationAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecoverPassword_pkey" PRIMARY KEY ("id")
);

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
    "slug" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "origin" "origins"[],
    "googleSources" "googleTrafficSource"[],
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "safePage" TEXT,
    "safePageMethod" "safePageMethods" NOT NULL,
    "offerPage" TEXT[],
    "offerPageMethod" "offerPageMethods" NOT NULL,
    "languages" TEXT[],
    "countries" TEXT[],
    "devices" "campaignDevices"[],
    "domainStatus" "domainStatus" NOT NULL DEFAULT 'PENDING',
    "manualReview" BOOLEAN NOT NULL DEFAULT false,
    "pageType" "pageTypes" NOT NULL,
    "disclaimer" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "vat" TEXT NOT NULL,
    "supportPhone" TEXT NOT NULL,
    "supportEmail" TEXT NOT NULL,
    "logo" TEXT,
    "logoKey" TEXT,
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
CREATE UNIQUE INDEX "Profiles_provider_providerId_key" ON "Profiles"("provider", "providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "Campaigns_userId_idx" ON "Campaigns"("userId");

-- CreateIndex
CREATE INDEX "Campaigns_slug_idx" ON "Campaigns"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignLogs_id_key" ON "CampaignLogs"("id");

-- CreateIndex
CREATE INDEX "CampaignLogs_campaignId_idx" ON "CampaignLogs"("campaignId");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecoverPassword" ADD CONSTRAINT "RecoverPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Domains" ADD CONSTRAINT "Domains_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaigns" ADD CONSTRAINT "Campaigns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignLogs" ADD CONSTRAINT "CampaignLogs_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
