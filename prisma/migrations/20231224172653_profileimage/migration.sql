/*
  Warnings:

  - You are about to drop the column `photo` on the `propertyOwners` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "propertyOwners" DROP COLUMN "photo",
ADD COLUMN     "profileImage" TEXT;
