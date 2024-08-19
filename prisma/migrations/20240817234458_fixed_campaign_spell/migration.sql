/*
  Warnings:

  - You are about to drop the column `sagePage` on the `Campaign` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "sagePage",
ADD COLUMN     "safePage" TEXT;
