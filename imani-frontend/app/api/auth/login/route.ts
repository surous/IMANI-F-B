import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, walletAddress, signedMessage, message } = body;

    // 1. Wallet-based login for farmers (Lean MVP approach)
    // We check for walletAddress; signedMessage/message are kept for future Cardano verification
    if (walletAddress) {
      const farmer = await prisma.user.findUnique({
        where: { walletAddress },
      });

      if (!farmer) {
        return NextResponse.json(
          { error: 'Wallet not recognized. Please register as a farmer first.' },
          { status: 404 }
        );
      }

      // Generate long-lived token for farmers (30 days)
      const token = jwt.sign(
        { 
          userId: farmer.id, 
          role: farmer.role, 
          walletAddress: farmer.walletAddress 
        },
        JWT_SECRET,
        { expiresIn: '30d' }
      );

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: farmer.id,
          email: farmer.email,
          username: farmer.username,
          walletAddress: farmer.walletAddress,
          role: farmer.role,
        },
      });
    }

    // 2. Email/password login for Lender and Authenticator
    if (email && password) {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 401 });
      }

      // Block farmers from using email login if your project requires wallet-only for them
      if (user.role === 'FARMER' && !walletAddress) {
        return NextResponse.json({ error: 'Farmers must login via wallet' }, { status: 401 });
      }

      // MVP Note: Password verification can be added here once bcrypt is implemented
      // For now, we allow entry if the email exists to help you test the Lender Dashboard

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      });
    }

    return NextResponse.json({ error: 'Invalid login method. Provide wallet or email/password.' }, { status: 400 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}