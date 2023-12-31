/*
  Warnings:

  - You are about to drop the column `phone` on the `serviceProviders` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `serviceProviders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "serviceProviders" DROP COLUMN "phone",
DROP COLUMN "photo",
ADD COLUMN     "companyAddress" TEXT,
ADD COLUMN     "companyEmailAddress" TEXT,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "companyPhoneNumber" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "profileImage" TEXT;
