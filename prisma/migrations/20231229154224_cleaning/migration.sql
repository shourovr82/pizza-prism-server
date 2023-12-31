/*
  Warnings:

  - The values [CLEAING] on the enum `ServiceType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ServiceType_new" AS ENUM ('TENANT_SCREENING', 'MAINTENANCE_AND_REPAIR', 'CLEANING', 'PEST_CONTROL', 'LAWN_CARE', 'SECURITY_AND_SAFETY', 'INSURANCE', 'INSPECTION', 'MARKETING', 'TECHNOLOGY');
ALTER TABLE "Services" ALTER COLUMN "serviceType" TYPE "ServiceType_new" USING ("serviceType"::text::"ServiceType_new");
ALTER TYPE "ServiceType" RENAME TO "ServiceType_old";
ALTER TYPE "ServiceType_new" RENAME TO "ServiceType";
DROP TYPE "ServiceType_old";
COMMIT;
