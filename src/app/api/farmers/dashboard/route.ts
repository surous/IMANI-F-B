// app/api/farmers/dashboard/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'No token' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);

  if (!payload || payload.role !== 'FARMER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const farmer = await prisma.user.findUnique({
    where: { id: payload.userId },
    include: { reputation: true, attestations: { include: { practice: true } } },
  });

  return NextResponse.json({ farmer });
}