/*
  Warnings:

  - You are about to drop the column `url` on the `Advertisement` table. All the data in the column will be lost.
  - Added the required column `adUrl` to the `Advertisement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forwardUrl` to the `Advertisement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Advertisement" DROP COLUMN "url",
ADD COLUMN     "adUrl" TEXT NOT NULL,
ADD COLUMN     "forwardUrl" TEXT NOT NULL;
