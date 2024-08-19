/*
  Warnings:

  - The `allowIsps` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `allowIps` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `denyLanguages` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `denyCountries` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `denyIps` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `denyIsps` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `denyRefererOrigins` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `refererOrigins` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `allowQueries` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `denyQueries` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "allowIsps",
ADD COLUMN     "allowIsps" TEXT[],
DROP COLUMN "allowIps",
ADD COLUMN     "allowIps" TEXT[],
DROP COLUMN "denyLanguages",
ADD COLUMN     "denyLanguages" TEXT[],
DROP COLUMN "denyCountries",
ADD COLUMN     "denyCountries" TEXT[],
DROP COLUMN "denyIps",
ADD COLUMN     "denyIps" TEXT[],
DROP COLUMN "denyIsps",
ADD COLUMN     "denyIsps" TEXT[],
DROP COLUMN "denyRefererOrigins",
ADD COLUMN     "denyRefererOrigins" TEXT[],
DROP COLUMN "refererOrigins",
ADD COLUMN     "refererOrigins" TEXT[],
DROP COLUMN "allowQueries",
ADD COLUMN     "allowQueries" TEXT[],
DROP COLUMN "denyQueries",
ADD COLUMN     "denyQueries" TEXT[];
