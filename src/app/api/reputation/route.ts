// app/api/reputation/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { mintGreenReputationToken } from '../../../lib/cardano';
import jwt from 'jsonwebtoken';

function getWalletFromToken(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { walletAddress: string };
    return payload.walletAddress;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const walletAddress = getWalletFromToken(request.headers.get('authorization'));
  if (!walletAddress) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { walletAddress },
    include: { attestations: { include: { practice: true } }, reputation: true },
  });

  if (!user) return NextResponse.json({ error: 'Farmer not found' }, { status: 404 });

  const score = user.attestations.reduce((sum, a) => sum + a.practice.points, 0);

  return NextResponse.json({ score, reputation: user.reputation });
}

export async function POST(request: Request) {
  const walletAddress = getWalletFromToken(request.headers.get('authorization'));
  if (!walletAddress) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { walletAddress }, include: { reputation: true } });
  if (!user) return NextResponse.json({ error: 'Farmer not found' }, { status: 404 });

  const score = await prisma.attestation.findMany({
    where: { userId: user.id },
    include: { practice: true },
  }).then(att => att.reduce((sum, a) => sum + a.practice.points, 0));

  let reputation = user.reputation;

  if (score >= 50 && !reputation?.mintTxHash) {
    const result = await mintGreenReputationToken(user.id, score, walletAddress);
    reputation = result as any;
  }

  return NextResponse.json({ score, reputation });
}