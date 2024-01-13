/*
  Warnings:

  - Added the required column `menuImage` to the `food_menus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "food_menus" ADD COLUMN     "menuImage" TEXT NOT NULL;
