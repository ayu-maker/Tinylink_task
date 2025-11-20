-- CreateTable
CREATE TABLE `Link` (
    `code` VARCHAR(8) NOT NULL,
    `url` TEXT NOT NULL,
    `clicks` INTEGER NOT NULL DEFAULT 0,
    `lastClicked` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Link_code_key`(`code`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
