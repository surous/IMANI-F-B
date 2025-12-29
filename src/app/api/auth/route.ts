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

    let user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { 
          walletAddress,
          email: `${walletAddress}@imani.temp`, // Required field in schema
          username: `Farmer_${walletAddress.slice(0, 6)}`,
          role: 'FARMER'
        },
      });
    }

    const token = jwt.sign({ walletAddress }, JWT_SECRET, { expiresIn: '7d' });

    return NextResponse.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}