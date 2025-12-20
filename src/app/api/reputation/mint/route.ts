import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { verifyToken } from '../../../../lib/auth';

/**
 * MOCK BLOCKCHAIN CONSTANTS
 * For the MVP, we use a static transaction hash to simulate a successful 
 * minting event on the Cardano Preprod network.
 */
const MOCK_MINT_TX = "3947f821628850c95a0a38367skug86p5p36p36p36p36p36p36p36p36p36p36p36p36";

export async function POST(request: Request) {
  try {
    // 1. Auth & Token Verification
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const payload = verifyToken(token || '');

    if (!payload || !payload.userId) {
      return NextResponse.json({ error: 'Unauthorized: No valid session' }, { status: 401 });
    }

    const body = await request.json();
    const { targetWallet } = body;

    // 2. Fetch Farmer Details
    const farmer = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { username: true, walletAddress: true }
    });

    if (!farmer) {
      return NextResponse.json({ error: 'Farmer profile not found' }, { status: 404 });
    }

    // 3. Calculate score from VERIFIED attestations only
    const verifiedAttestations = await prisma.attestation.findMany({
      where: { 
        userId: payload.userId,
        status: 'VERIFIED' 
      },
      include: { practice: true }
    });

    const totalScore = verifiedAttestations.reduce((sum, a) => sum + (a.practice?.points || 0), 0);

    if (totalScore === 0) {
      return NextResponse.json({ error: 'No verified points found to mint.' }, { status: 400 });
    }

    // 4. DATABASE PERSISTENCE
    // We populate the 'tokenAsset' and 'mintTxHash' columns here.
    const mockAssetId = `ImaniReputation${payload.userId}`;

    const updatedUser = await prisma.user.update({
      where: { id: payload.userId },
      data: {
        walletAddress: targetWallet || farmer.walletAddress, 
        reputation: {
          upsert: {
            create: { 
              score: totalScore,
              tokenAsset: mockAssetId,
              mintTxHash: MOCK_MINT_TX
            },
            update: { 
              score: totalScore,
              tokenAsset: mockAssetId,
              mintTxHash: MOCK_MINT_TX
            }
          }
        }
      },
      include: { reputation: true } 
    });

    // 5. Prepare Cardano Metadata (CIP-25 Standard)
    const farmerName = farmer.username || "Imani_Farmer";
    const sanitizedName = farmerName.replace(/\s+/g, '_'); 

    const metadata = {
      "721": {
        "imani_reputation_policy": {
          [sanitizedName]: {
            "name": `Reputation: ${farmerName}`,
            "image": "ipfs://QmImani...",
            "reputation_score": totalScore,
            "farmer_wallet": targetWallet || farmer.walletAddress,
            "asset_id": mockAssetId,
            "mint_tx": MOCK_MINT_TX,
            "verified_uploads": verifiedAttestations.length,
            "minted_at": new Date().toISOString()
          }
        }
      }
    };

    // 6. Success Response
    return NextResponse.json({
      success: true,
      message: "Reputation score and blockchain proof stored successfully",
      data: {
        dbScore: updatedUser.reputation?.score,
        asset: updatedUser.reputation?.tokenAsset,
        txHash: updatedUser.reputation?.mintTxHash,
        mintingData: {
          score: totalScore,
          metadata: metadata,
          network: "Cardano Preprod"
        }
      }
    });

  } catch (error: any) {
    console.error('Minting Error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Wallet address already in use by another user' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}