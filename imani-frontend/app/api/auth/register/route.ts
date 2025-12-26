import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { hashPassword } from '../../../../lib/auth';

export async function POST(request: Request) {
  console.log('--- Register API Started ---');
  try {
    const body = await request.json();
    console.log('Register Body:', body);
    const { email, password, username, walletAddress, region, role = 'FARMER' } = body;

    // 1. Minimum requirements for the database
    // We only strictly need Email and Username to identify the account
    if (!email || !username) {
      return NextResponse.json(
        { error: 'Email and username are required' },
        { status: 400 }
      );
    }

    // 2. Farmer-specific requirement
    // Farmers MUST have a walletAddress to link to Cardano
    if (role === 'FARMER' && !walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required for farmers' },
        { status: 400 }
      );
    }

    // 3. Check for existing users (Duplicates)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          // Only check walletAddress if it was provided
          ...(walletAddress ? [{ walletAddress }] : []),
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email or wallet address already registered' },
        { status: 400 }
      );
    }

    // 4. Handle Password (Optional for Farmers)
    // Only hash if a password was actually provided
    const hashedPassword = password ? await hashPassword(password) : null;

    // 5. Create User in Database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        walletAddress: walletAddress || null,
        region: region || null, // Optional
        role,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        walletAddress: user.walletAddress,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}