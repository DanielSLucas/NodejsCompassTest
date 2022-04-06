/*
  Warnings:

  - A unique constraint covering the columns `[fullName]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "customers_fullName_key" ON "customers"("fullName");
