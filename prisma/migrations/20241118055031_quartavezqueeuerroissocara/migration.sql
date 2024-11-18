/*
  Warnings:

  - Added the required column `Licoes` to the `Profissional` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profissional` ADD COLUMN `Licoes` MEDIUMINT NOT NULL;
