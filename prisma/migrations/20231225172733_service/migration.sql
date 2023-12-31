-- AlterTable
ALTER TABLE "Services" ALTER COLUMN "servicePriceRange" DROP NOT NULL,
ALTER COLUMN "serviceDescription" DROP NOT NULL,
ALTER COLUMN "serviceLocation" DROP NOT NULL,
ALTER COLUMN "serviceCancellationPolicy" DROP NOT NULL,
ALTER COLUMN "serviceAvailability" DROP NOT NULL,
ALTER COLUMN "serviceType" DROP NOT NULL;
