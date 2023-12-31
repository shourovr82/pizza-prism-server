/*
  Warnings:

  - The primary key for the `customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `customerId` on the `customers` table. All the data in the column will be lost.
  - The required column `profileId` was added to the `customers` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "customers" DROP CONSTRAINT "customers_pkey",
DROP COLUMN "customerId",
ADD COLUMN     "profileId" TEXT NOT NULL,
ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("profileId");
