/*
  Warnings:

  - You are about to drop the `treinos registrados` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `treinos registrados` DROP FOREIGN KEY `Treinos registrados_ProfissionalID_fkey`;

-- DropForeignKey
ALTER TABLE `treinos registrados` DROP FOREIGN KEY `Treinos registrados_alunoID_fkey`;

-- DropTable
DROP TABLE `treinos registrados`;

-- CreateTable
CREATE TABLE `treinos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alunoID` INTEGER NOT NULL,
    `ProfissionalID` INTEGER NOT NULL,
    `descricao` VARCHAR(300) NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `treinos` ADD CONSTRAINT `treinos_alunoID_fkey` FOREIGN KEY (`alunoID`) REFERENCES `Aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `treinos` ADD CONSTRAINT `treinos_ProfissionalID_fkey` FOREIGN KEY (`ProfissionalID`) REFERENCES `Profissional`(`idprof`) ON DELETE RESTRICT ON UPDATE CASCADE;
