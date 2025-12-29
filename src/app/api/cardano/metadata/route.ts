// app/api/cardano/metadata/route.ts
import { NextResponse } from 'next/server';
import { submitAttestationMetadata } from '../../../../lib/cardano';

export async function POST(request: Request) {
  const { attestationId, metadata } = await request.json() as any;

  const txHash = await submitAttestationMetadata(attestationId, metadata);

  return NextResponse.json({ txHash });
}