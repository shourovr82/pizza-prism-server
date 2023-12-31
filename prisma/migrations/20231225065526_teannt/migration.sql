/*
  Warnings:

  - You are about to drop the column `CurrentEmployer` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `EmployerContactInfo` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `isAgree` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `isLatePaid` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `isPetVacinated` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `tenants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tenants" DROP COLUMN "CurrentEmployer",
DROP COLUMN "EmployerContactInfo",
DROP COLUMN "comment",
DROP COLUMN "isAgree",
DROP COLUMN "isLatePaid",
DROP COLUMN "isPetVacinated",
DROP COLUMN "phone",
DROP COLUMN "photo",
ADD COLUMN     "CurrentEmployerOrBusinessContactInfo" TEXT,
ADD COLUMN     "CurrentEmployerOrBusinessName" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "isAnyExtraToMention" TEXT,
ADD COLUMN     "isAnyLatePaymentReason" TEXT,
ADD COLUMN     "isPetVaccinated" BOOLEAN,
ADD COLUMN     "isWillingToSignLeasingAgreement" INTEGER,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "profileImage" TEXT;
