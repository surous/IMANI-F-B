// app/api/auth/authenticator/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { hashPassword } from '@/lib/utils';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json() as any;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const authenticator = await prisma.user.findUnique({
      where: { email },
    });

    if (!authenticator) {
      // Create new authenticator
      const hashedPassword = await hashPassword(password);
      const newAuthenticator = await prisma.user.create({
        data: {
          email,
          username: email.split('@')[0],
          password: hashedPassword,
          role: 'AUTHENTICATOR',
        },
      });

      const token = jwt.sign({ userId: newAuthenticator.id, role: newAuthenticator.role }, JWT_SECRET, { expiresIn: '7d' });
      return NextResponse.json({ token, user: newAuthenticator });
    }

    // Password check (MVP: skip)
    const token = jwt.sign({ userId: authenticator.id, role: authenticator.role }, JWT_SECRET, { expiresIn: '7d' });
    return NextResponse.json({ token, user: authenticator });
  } catch (error) {
    console.error('Authenticator login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}