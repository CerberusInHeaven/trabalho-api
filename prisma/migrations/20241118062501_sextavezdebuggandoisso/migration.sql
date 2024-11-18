/*
  Warnings:

  - You are about to drop the column `NumTreinos` on the `aluno` table. All the data in the column will be lost.
  - You are about to drop the `profissional` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `treinos` DROP FOREIGN KEY `treinos_ProfissionalID_fkey`;

-- AlterTable
ALTER TABLE `aluno` DROP COLUMN `NumTreinos`,
    MODIFY `email` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `profissional`;

-- CreateTable
CREATE TABLE `Personal` (
    `idprof` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `especialidade` VARCHAR(50) NOT NULL,
    `dataNasc` VARCHAR(20) NOT NULL,
    `Licoes` MEDIUMINT NOT NULL,

    PRIMARY KEY (`idprof`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `treinos` ADD CONSTRAINT `treinos_ProfissionalID_fkey` FOREIGN KEY (`ProfissionalID`) REFERENCES `Personal`(`idprof`) ON DELETE RESTRICT ON UPDATE CASCADE;
