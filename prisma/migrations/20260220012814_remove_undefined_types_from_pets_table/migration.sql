/*
  Warnings:

  - Made the column `breed` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `age` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "breed" SET NOT NULL,
ALTER COLUMN "age" SET NOT NULL,
ALTER COLUMN "size" SET NOT NULL;
