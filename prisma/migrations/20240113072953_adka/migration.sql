-- AlterTable
ALTER TABLE "restaurant_information" ALTER COLUMN "restaurantName" DROP NOT NULL,
ALTER COLUMN "restaurantEmail" DROP NOT NULL,
ALTER COLUMN "restaurantSecondaryEmail" DROP NOT NULL,
ALTER COLUMN "contactNumber" DROP NOT NULL,
ALTER COLUMN "emergencyContactNumber" DROP NOT NULL,
ALTER COLUMN "restaurantLogo" DROP NOT NULL,
ALTER COLUMN "restaurantDescription" DROP NOT NULL;
