// app/api/auth/lender/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import jwt from 'jsonwebtoken';
import { hashPassword } from '../../../../lib/utils';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const lender = await prisma.user.findUnique({
      where: { email },
    });

    if (!lender) {
      // Create new lender
      const hashedPassword = await hashPassword(password);
      const newLender = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: 'LENDER',
        },
      });

      const token = jwt.sign({ userId: newLender.id, role: newLender.role }, JWT_SECRET, { expiresIn: '7d' });
      return NextResponse.json({ token, user: newLender });
    }

    // Password check (MVP: skip for simplicity)
    const token = jwt.sign({ userId: lender.id, role: lender.role }, JWT_SECRET, { expiresIn: '7d' });
    return NextResponse.json({ token, user: lender });
  } catch (error) {
    console.error('Lender login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}