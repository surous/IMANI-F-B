import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const count = await prisma.user.count();
    return NextResponse.json({ 
      success: true, 
      message: 'Prisma is working', 
      count,
      db_url: 'hardcoded in lib/prisma.ts'
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false,
      error: error.message, 
      code: error.code,
      meta: error.meta,
      stack: error.stack
    }, { status: 500 });
  }
}
