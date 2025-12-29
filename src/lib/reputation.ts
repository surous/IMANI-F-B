// src/lib/reputation.ts
import { prisma } from './prisma';
import { mintGreenReputationToken } from './cardano';

export async function updateReputationScore(userId: number) {
  const attestations = await prisma.attestation.findMany({
    where: { userId, status: 'VERIFIED' },
    include: { practice: true },
  });

  const score = attestations.reduce((sum, a) => sum + (a.practice?.points || 0), 0);

  const reputation = await prisma.reputationScore.upsert({
    where: { userId },
    update: { score },
    create: { userId, score },
  });

  // Mint token if score >= 50 and not minted yet
  if (score >= 50 && !reputation.tokenAsset) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.walletAddress) {
      const result = (await mintGreenReputationToken(userId, score, user.walletAddress)) as any;
      await prisma.reputationScore.update({
        where: { userId },
        data: { tokenAsset: result.asset, mintTxHash: result.txHash },
      });
    }
  }

  return reputation;
}