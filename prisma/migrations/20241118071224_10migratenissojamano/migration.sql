/*
  Warnings:

  - You are about to alter the column `Licoes` on the `personal` table. The data in that column could be lost. The data in that column will be cast from `MediumInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `personal` MODIFY `Licoes` INTEGER NOT NULL DEFAULT 0;
