/*
  Warnings:

  - Added the required column `language` to the `AdvertisementStatistics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `AdvertisementStatistics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdvertisementStatistics" ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL;
