// app/api/farmers/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

function getWalletFromToken(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { walletAddress: string };
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
    include: {
      attestations: { include: { practice: true } },
      reputation: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'Farmer not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}