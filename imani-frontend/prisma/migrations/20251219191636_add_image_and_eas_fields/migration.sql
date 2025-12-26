-- CreateEnum
CREATE TYPE "Role" AS ENUM ('FARMER', 'LENDER', 'AUTHENTICATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "AttestationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "username" TEXT NOT NULL,
    "walletAddress" TEXT,
    "role" "Role" NOT NULL,
    "region" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SustainablePractice" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "SustainablePractice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attestation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "practiceId" INTEGER NOT NULL,
    "evidenceHash" TEXT NOT NULL,
    "imageUrl" TEXT,
    "status" "AttestationStatus" NOT NULL DEFAULT 'PENDING',
    "onChainId" TEXT,
    "attestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attestation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthenticatorAction" (
    "id" SERIAL NOT NULL,
    "attestationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthenticatorAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReputationScore" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "tokenAsset" TEXT,
    "mintTxHash" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReputationScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "SustainablePractice_name_key" ON "SustainablePractice"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ReputationScore_userId_key" ON "ReputationScore"("userId");

-- AddForeignKey
ALTER TABLE "Attestation" ADD CONSTRAINT "Attestation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attestation" ADD CONSTRAINT "Attestation_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "SustainablePractice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthenticatorAction" ADD CONSTRAINT "AuthenticatorAction_attestationId_fkey" FOREIGN KEY ("attestationId") REFERENCES "Attestation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthenticatorAction" ADD CONSTRAINT "AuthenticatorAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReputationScore" ADD CONSTRAINT "ReputationScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
