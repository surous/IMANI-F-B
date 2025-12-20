/*
  Warnings:

  - You are about to drop the column `onChainId` on the `Attestation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attestation" DROP COLUMN "onChainId",
ADD COLUMN     "metadataTxHash" TEXT;
