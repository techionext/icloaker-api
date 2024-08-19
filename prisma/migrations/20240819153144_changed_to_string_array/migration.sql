/*
  Warnings:

  - You are about to drop the column `allowQuerys` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `denyQuerys` on the `Campaign` table. All the data in the column will be lost.
  - The `origin` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `languages` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `countries` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "allowQuerys",
DROP COLUMN "denyQuerys",
ADD COLUMN     "allowQueries" TEXT,
ADD COLUMN     "denyQueries" TEXT,
DROP COLUMN "origin",
ADD COLUMN     "origin" TEXT[],
DROP COLUMN "languages",
ADD COLUMN     "languages" TEXT[],
DROP COLUMN "countries",
ADD COLUMN     "countries" TEXT[];
