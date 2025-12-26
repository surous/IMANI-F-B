// app/api/auth/farmer/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { hashPassword } from '@/lib/utils';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  try {
    const { email, password, walletAddress } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const farmer = await prisma.user.findUnique({
      where: { email },
    });

    if (!farmer) {
      // Create new farmer
      const hashedPassword = await hashPassword(password);
      const newFarmer = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          walletAddress,
          role: 'FARMER',
        },
      });

      const token = jwt.sign({ userId: newFarmer.id, role: newFarmer.role }, JWT_SECRET, { expiresIn: '7d' });
      return NextResponse.json({ token, user: newFarmer });
    }

    // Check password (you'll need to implement password comparison)
    // For MVP, we'll skip password check and just return token
    const token = jwt.sign({ userId: farmer.id, role: farmer.role }, JWT_SECRET, { expiresIn: '7d' });
    return NextResponse.json({ token, user: farmer });
  } catch (error) {
    console.error('Farmer login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}