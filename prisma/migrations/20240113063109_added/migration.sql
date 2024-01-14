/*
  Warnings:

  - You are about to drop the column `name` on the `food_items` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `delivery_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availableQuantity` to the `food_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodName` to the `food_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `payment_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `payment_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Made the column `phoneNumber` on table `profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('DEBIT', 'CREDIT', 'CASH');

-- CreateEnum
CREATE TYPE "ProfileGender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "delivery_info" ADD COLUMN     "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(0) NOT NULL;

-- AlterTable
ALTER TABLE "food_items" DROP COLUMN "name",
ADD COLUMN     "availableQuantity" INTEGER NOT NULL,
ADD COLUMN     "foodName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "payment_info" ADD COLUMN     "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(0) NOT NULL;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "currentAdress" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "gender" "ProfileGender" NOT NULL,
ADD COLUMN     "parmanentAddress" TEXT,
ADD COLUMN     "postalCode" TEXT,
ALTER COLUMN "phoneNumber" SET NOT NULL;

-- CreateTable
CREATE TABLE "restaurant_information" (
    "id" TEXT NOT NULL,
    "restaurantName" TEXT NOT NULL,
    "restaurantEmail" TEXT NOT NULL,
    "restaurantSecondaryEmail" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "emergencyContactNumber" TEXT NOT NULL,
    "restaurantLogo" TEXT NOT NULL,
    "restaurantFacebook" TEXT,
    "restaurantInstagram" TEXT,
    "restaurantDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "restaurant_information_pkey" PRIMARY KEY ("id")
);
