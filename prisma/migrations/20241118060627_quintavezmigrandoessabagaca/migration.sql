/*
  Warnings:

  - Added the required column `email` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `aluno` ADD COLUMN `email` VARCHAR(100) NOT NULL;
