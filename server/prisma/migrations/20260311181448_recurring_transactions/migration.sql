/*
  Warnings:

  - Added the required column `userId` to the `RecurringTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recurringtransaction` ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `category` VARCHAR(191) NULL;
