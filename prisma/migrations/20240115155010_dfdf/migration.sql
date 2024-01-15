/*
  Warnings:

  - You are about to drop the column `currentAdress` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `parmanentAddress` on the `profiles` table. All the data in the column will be lost.
  - Made the column `paymentMethod` on table `payment_info` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "payment_info" ALTER COLUMN "paymentMethod" SET NOT NULL;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "currentAdress",
DROP COLUMN "parmanentAddress",
ADD COLUMN     "currentAddress" TEXT,
ADD COLUMN     "permanentAddress" TEXT;
