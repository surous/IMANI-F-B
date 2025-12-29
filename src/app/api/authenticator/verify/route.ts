import { NextResponse } from 'next/server';
// Change: Added an extra '../' to account for the new 'authenticator' folder level
import { prisma } from '../../../../lib/prisma'; 
import { verifyToken } from '../../../../lib/auth';
import crypto from 'crypto';

export async function POST(request: Request) {
  // 1. Auth Check
  const authHeader = request.headers.get('authorization');
  const payload = verifyToken(authHeader?.split(' ')[1] || '');

  if (!payload || (payload.role !== 'AUTHENTICATOR' && payload.role !== 'ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized: Verification requires elevated roles' }, { status: 401 });
  }

  try {
    const { attestationId } = await request.json() as any;

    // 2. Fetch Attestation Data
    const attestation = await prisma.attestation.findUnique({
      where: { id: Number(attestationId) },
    });

    if (!attestation || !attestation.imageUrl) {
      return NextResponse.json({ error: 'Attestation record or image URL not found' }, { status: 404 });
    }

    // 3. Download the current image from Cloudinary to check integrity
    const response = await fetch(attestation.imageUrl);
    if (!response.ok) throw new Error('Failed to fetch image from storage');
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Re-calculate Hash
    const currentFileHash = crypto.createHash('sha256').update(buffer).digest('hex');

    // 5. Compare and Update Status
    const isUntampered = currentFileHash === attestation.evidenceHash;
    
    const updatedAttestation = await prisma.attestation.update({
      where: { id: Number(attestationId) },
      data: {
        status: isUntampered ? 'VERIFIED' : 'REJECTED',
      },
    });

    // 6. Log the action (Creates audit trail)
    await prisma.authenticatorAction.create({
      data: {
        attestationId: attestation.id,
        userId: payload.userId,
        action: isUntampered ? 'VERIFIED' : 'REJECTED',
        notes: isUntampered ? 'Hash match successful.' : 'Hash mismatch: File tampered.',
      },
    });

    return NextResponse.json({
      success: true,
      isUntampered,
      currentHash: currentFileHash,
      originalHash: attestation.evidenceHash,
      newStatus: updatedAttestation.status
    });

  } catch (error) {
    console.error('Verification Backend Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}