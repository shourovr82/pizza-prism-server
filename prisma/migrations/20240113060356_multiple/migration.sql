/*
  Warnings:

  - You are about to drop the `Services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'DISPATCHED', 'DELIVERED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PLACED', 'PROCESSING', 'DELIVERED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_userId_fkey";

-- DropTable
DROP TABLE "Services";

-- DropTable
DROP TABLE "customers";

-- DropEnum
DROP TYPE "ServiceAvailabilityEnum";

-- DropEnum
DROP TYPE "ServiceType";

-- CreateTable
CREATE TABLE "profiles" (
    "profileId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "profileImage" TEXT,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "nutritional_info" (
    "nutritionalInfoId" SERIAL NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "carbohydrates" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "foodItemId" TEXT,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "nutritional_info_pkey" PRIMARY KEY ("nutritionalInfoId")
);

-- CreateTable
CREATE TABLE "food_reviews" (
    "reviewId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "foodItemId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "food_reviews_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "food_menus" (
    "foodMenuId" TEXT NOT NULL,
    "menuName" TEXT NOT NULL,
    "menuDescription" TEXT,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "food_menus_pkey" PRIMARY KEY ("foodMenuId")
);

-- CreateTable
CREATE TABLE "food_items" (
    "foodItemId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "prevPrice" INTEGER,
    "currentPrice" INTEGER,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "foodMenuId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "food_items_pkey" PRIMARY KEY ("foodItemId")
);

-- CreateTable
CREATE TABLE "food_orders" (
    "orderId" TEXT NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "orderNumber" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PLACED',
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "address" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "food_orders_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "order_items" (
    "orderItemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "foodItemId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("orderItemId")
);

-- CreateTable
CREATE TABLE "delivery_info" (
    "deliveryInfoId" TEXT NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "deliveryStatus" "DeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "orderId" TEXT,

    CONSTRAINT "delivery_info_pkey" PRIMARY KEY ("deliveryInfoId")
);

-- CreateTable
CREATE TABLE "payment_info" (
    "paymentInfoId" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "orderId" TEXT,

    CONSTRAINT "payment_info_pkey" PRIMARY KEY ("paymentInfoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "nutritional_info_foodItemId_key" ON "nutritional_info"("foodItemId");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_info_orderId_key" ON "delivery_info"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_info_orderId_key" ON "payment_info"("orderId");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutritional_info" ADD CONSTRAINT "nutritional_info_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "food_items"("foodItemId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_reviews" ADD CONSTRAINT "food_reviews_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "food_items"("foodItemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_reviews" ADD CONSTRAINT "food_reviews_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_items" ADD CONSTRAINT "food_items_foodMenuId_fkey" FOREIGN KEY ("foodMenuId") REFERENCES "food_menus"("foodMenuId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_orders" ADD CONSTRAINT "food_orders_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "food_orders"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "food_items"("foodItemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_info" ADD CONSTRAINT "delivery_info_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "food_orders"("orderId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_info" ADD CONSTRAINT "payment_info_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "food_orders"("orderId") ON DELETE SET NULL ON UPDATE CASCADE;
