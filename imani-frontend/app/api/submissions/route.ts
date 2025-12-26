import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { verifyToken } from '../../../lib/auth';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const payload = verifyToken(authHeader?.split(' ')[1] || '');

  if (!payload || (payload.role !== 'AUTHENTICATOR' && payload.role !== 'ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const submissions = await prisma.attestation.findMany({
      where: { status: 'PENDING' },
      include: {
        user: { select: { username: true, email: true } },
        practice: { select: { name: true, points: true } }
      },
      orderBy: { attestedAt: 'desc' }
    });

    return NextResponse.json(submissions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
