// src/app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  try {
    const { walletAddress } = await request.json();

    if (!walletAddress || typeof walletAddress !== 'string') {
      return NextResponse.json({ error: 'Valid wallet address required' }, { status: 400 });
    }

    let farmer = await prisma.farmer.findUnique({
      where: { walletAddress },
    });

    if (!farmer) {
      farmer = await prisma.farmer.create({
        data: { walletAddress },
      });
    }

    const token = jwt.sign({ walletAddress }, JWT_SECRET, { expiresIn: '7d' });

    return NextResponse.json({
      success: true,
      token,
      farmer,
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}