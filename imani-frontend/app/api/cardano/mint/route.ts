// app/api/cardano/mint/route.ts
import { NextResponse } from 'next/server';
import { mintGreenReputationToken } from '../../../../lib/cardano';

export async function POST(request: Request) {
  const { farmerId, score } = await request.json();

  const result = await mintGreenReputationToken(farmerId, score);

  return NextResponse.json(result);
}