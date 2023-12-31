-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `token_user` VARCHAR(191) NOT NULL,
    `name_user` VARCHAR(191) NOT NULL,
    `email_user` VARCHAR(191) NOT NULL,
    `password_user` VARCHAR(191) NOT NULL,
    `register_date` DATETIME(3) NOT NULL,
    `last_acess` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_token_user_key`(`token_user`),
    UNIQUE INDEX `User_email_user_key`(`email_user`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
