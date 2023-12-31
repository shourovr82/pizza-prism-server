/*
  Warnings:

  - You are about to drop the `superAdmins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "superAdmins" DROP CONSTRAINT "superAdmins_userId_fkey";

-- DropTable
DROP TABLE "superAdmins";
