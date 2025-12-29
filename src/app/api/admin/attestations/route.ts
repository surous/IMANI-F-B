// src/app/api/admin/attestations/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { updateReputationScore } from '@/lib/reputation';

export async function GET(request: Request) {
  const payload = verifyToken(request.headers.get('authorization')?.split(' ')[1] || '');

  if (!payload || payload.role !== 'AUTHENTICATOR') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  const attestations = await prisma.attestation.findMany({
    include: {
      user: { select: { username: true, email: true, walletAddress: true } },
      practice: true,
    },
    orderBy: { attestedAt: 'desc' },
  });

  return NextResponse.json({ success: true, attestations });
}

export async function PATCH(request: Request) {
  const payload = verifyToken(request.headers.get('authorization')?.split(' ')[1] || '');

  if (!payload || payload.role !== 'AUTHENTICATOR') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  const { id, status, notes } = await request.json();

  const updated = await prisma.attestation.update({
    where: { id },
    data: { status },
  });

  await prisma.authenticatorAction.create({
    data: {
      attestationId: id,
      userId: payload.userId,
      action: status === 'APPROVED' ? 'approved' : 'rejected',
      notes,
    },
  });

  // Update reputation if approved
  if (status === 'APPROVED') {
    await updateReputationScore(updated.userId);
  }

  return NextResponse.json({ success: true, updated });
}