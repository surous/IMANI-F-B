// src/app/api/farmers/me/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

function getUserIdFromToken(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number };
    return payload.userId;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function GET(request: Request) {
  const userId = getUserIdFromToken(request.headers.get('authorization'));

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      attestations: {
        include: { practice: true },
        orderBy: { attestedAt: 'desc' },
      },
      reputation: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: user });
}