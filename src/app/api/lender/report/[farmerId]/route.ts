import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { verifyToken } from '../../../../../lib/auth';

/**
 * MOCK DATA FOR MVP DEMO
 * These hashes allow you to show a "Verified" status without 
 * waiting for real Cardano network confirmation.
 */
const MOCK_CARDANO_TX = "3947f821628850c95a0a38367skug86p5p36p36p36p36p36p36p36p36p36p36p36p36";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ farmerId: string }> }
) {
  // 1. Authentication Security
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  const payload = verifyToken(token || '');

  // Only Lenders or Admins can access credit reports
  if (!payload || (payload.role !== 'LENDER' && payload.role !== 'ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized: Lender access only' }, { status: 403 });
  }

  try {
    // 2. Next.js 15 Fix: Unwrap the params promise
    const { farmerId } = await params;
    const id = Number(farmerId);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid Farmer ID' }, { status: 400 });
    }

    // 3. Fetch Farmer & Verified Data from Database
    const farmer = await prisma.user.findUnique({
      where: { id },
      include: {
        attestations: {
          where: { status: 'VERIFIED' }, // Only count approved evidence
          include: { practice: true }
        }
      }
    });

    if (!farmer) {
      return NextResponse.json({ error: 'Farmer not found' }, { status: 404 });
    }

    // 4. Calculate the Reputation Score
    const totalPoints = farmer.attestations.reduce(
      (sum, a) => sum + (a.practice?.points || 0), 0
    );

    // 5. Build the Mock Blockchain Proof
    // If the farmer has any verified points, we "simulate" a Cardano mint
    const isMinted = totalPoints > 0;
    
    return NextResponse.json({
      success: true,
      report: {
        farmerName: farmer.username,
        farmerWallet: farmer.walletAddress || "No wallet linked",
        generatedAt: new Date().toISOString(),
        
        // Main Credit Metrics
        metrics: {
          score: totalPoints,
          riskLevel: totalPoints > 150 ? "LOW" : totalPoints > 50 ? "MEDIUM" : "HIGH",
          verifiedActivities: farmer.attestations.length
        },

        // The "Trust Layer" (Blockchain Badge Data)
        blockchain: {
          status: isMinted ? "VERIFIED_ON_CHAIN" : "PENDING_MINT",
          network: "Cardano Preprod",
          transactionHash: isMinted ? MOCK_CARDANO_TX : null,
          metadataLabel: 1997,
          explorerUrl: isMinted ? `https://preprod.cardanoscan.io/transaction/${MOCK_CARDANO_TX}` : null
        },

        // Detailed Audit Log for the Lender
        history: farmer.attestations.map(a => ({
          activity: a.practice?.name,
          points: a.practice?.points,
          date: a.createdAt,
          evidenceHash: a.evidenceHash || "sha256_mock_hash_..."
        }))
      }
    });

  } catch (error) {
    console.error('Lender Report Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}