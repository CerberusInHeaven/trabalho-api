-- CreateTable
CREATE TABLE `Aluno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `fone` VARCHAR(20) NOT NULL,
    `objetivo` VARCHAR(300) NULL,
    `idade` SMALLINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profissional` (
    `idprof` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `especialidade` VARCHAR(50) NOT NULL,
    `dataNasc` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`idprof`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Treinos registrados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alunoID` INTEGER NOT NULL,
    `ProfissionalID` INTEGER NOT NULL,
    `descricao` VARCHAR(300) NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Treinos registrados` ADD CONSTRAINT `Treinos registrados_alunoID_fkey` FOREIGN KEY (`alunoID`) REFERENCES `Aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Treinos registrados` ADD CONSTRAINT `Treinos registrados_ProfissionalID_fkey` FOREIGN KEY (`ProfissionalID`) REFERENCES `Profissional`(`idprof`) ON DELETE RESTRICT ON UPDATE CASCADE;
