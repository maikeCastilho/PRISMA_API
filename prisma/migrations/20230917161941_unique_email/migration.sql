/*
  Warnings:

  - A unique constraint covering the columns `[email_user]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_email_user_key` ON `User`(`email_user`);
