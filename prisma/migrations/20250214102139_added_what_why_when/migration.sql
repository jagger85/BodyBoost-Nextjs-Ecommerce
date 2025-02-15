/*
  Warnings:

  - Added the required column `what` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `when` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `why` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "what" TEXT NOT NULL,
ADD COLUMN     "when" TEXT NOT NULL,
ADD COLUMN     "why" TEXT NOT NULL;
