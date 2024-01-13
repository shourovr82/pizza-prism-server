/*
  Warnings:

  - You are about to drop the column `foodImages` on the `food_items` table. All the data in the column will be lost.
  - Added the required column `foodImage` to the `food_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "food_items" DROP COLUMN "foodImages",
ADD COLUMN     "foodImage" TEXT NOT NULL;
