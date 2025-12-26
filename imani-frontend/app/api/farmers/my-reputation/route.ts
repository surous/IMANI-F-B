import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { verifyToken } from '../../../../lib/auth';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const payload = verifyToken(authHeader?.split(' ')[1] || '');

  // 1. Fetch the ID directly from the Token Payload
  if (!payload || !payload.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 2. Use the ID from the token (No URL ID needed!)
    const attestations = await prisma.attestation.findMany({
      where: { userId: payload.userId },
      include: { practice: true },
    });

    const totalPoints = attestations.reduce((sum, a) => sum + (a.practice?.points || 0), 0);

    return NextResponse.json({
      username: payload.username,
      myScore: totalPoints,
      history: attestations.map(a => ({
        practice: a.practice?.name,
        status: a.status
      }))
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}