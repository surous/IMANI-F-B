// src/lib/admin.middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export function adminMiddleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'No token' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role: string };
    if (payload.role !== 'AUTHENTICATOR') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
    return null; // Allow
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}