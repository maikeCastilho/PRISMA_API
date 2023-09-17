/*
  Warnings:

  - Added the required column `last_acess` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `register_date` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `last_acess` DATETIME(3) NOT NULL,
    ADD COLUMN `register_date` DATETIME(3) NOT NULL;
