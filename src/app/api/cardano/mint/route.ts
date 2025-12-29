// app/api/cardano/mint/route.ts
import { NextResponse } from 'next/server';
import { mintGreenReputationToken } from '../../../../lib/cardano';

export async function POST(request: Request) {
  const { userId, score, walletAddress } = await request.json() as any;

  const result = await mintGreenReputationToken(userId, score, walletAddress);

  return NextResponse.json(result);
}