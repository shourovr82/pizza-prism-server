/*
  Warnings:

  - The primary key for the `restaurant_information` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `restaurant_information` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "restaurant_information" DROP CONSTRAINT "restaurant_information_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL DEFAULT 1,
ADD CONSTRAINT "restaurant_information_pkey" PRIMARY KEY ("id");
