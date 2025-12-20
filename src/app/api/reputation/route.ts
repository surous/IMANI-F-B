// app/api/reputation/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { mintGreenReputationToken } from '../../../lib/cardano';

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

  const farmer = await prisma.farmer.findUnique({
    where: { walletAddress },
    include: { attestations: { include: { practice: true } }, reputation: true },
  });

  if (!farmer) return NextResponse.json({ error: 'Farmer not found' }, { status: 404 });

  const score = farmer.attestations.reduce((sum, a) => sum + a.practice.points, 0);

  return NextResponse.json({ score, reputation: farmer.reputation });
}

export async function POST(request: Request) {
  const walletAddress = getWalletFromToken(request.headers.get('authorization'));
  if (!walletAddress) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const farmer = await prisma.farmer.findUnique({ where: { walletAddress }, include: { reputation: true } });
  if (!farmer) return NextResponse.json({ error: 'Farmer not found' }, { status: 404 });

  const score = await prisma.attestation.findMany({
    where: { farmerId: farmer.id },
    include: { practice: true },
  }).then(att => att.reduce((sum, a) => sum + a.practice.points, 0));

  let reputation = farmer.reputation;

  if (score >= 50 && !reputation?.tokenTxHash) {
    const result = await mintGreenReputationToken(farmer.id, score);
    reputation = result;
  }

  return NextResponse.json({ score, reputation });
}