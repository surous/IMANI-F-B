// lib/cardano.ts
import { Lucid, Blockfrost } from 'lucid-cardano';
import { prisma } from './prisma';

let lucidInstance: Lucid | null = null;

async function getLucid() {
  if (!lucidInstance) {
    const projectId = process.env.BLOCKFROST_PROJECT_ID_PREPROD;
    const seed = process.env.BACKEND_WALLET_SEED;

    if (!projectId || !seed) {
      throw new Error('BLOCKFROST_PROJECT_ID_PREPROD and BACKEND_WALLET_SEED must be set in .env');
    }

    lucidInstance = await Lucid.new(
      new Blockfrost('https://cardano-preprod.blockfrost.io/api/v0', projectId),
      'Preprod'
    );

    lucidInstance.selectWalletFromSeed(seed);
  }
  return lucidInstance;
}

export async function submitAttestationMetadata(attestationId: number, metadata: any) {
  const lucid = await getLucid();

  const tx = await lucid
    .newTx()
    .attachMetadata(674, {
      imani_attestation: attestationId.toString(),
      ...metadata,
    })
    .complete();

  const signedTx = await tx.sign().complete();
  const txHash = await signedTx.submit();

  await lucid.awaitTx(txHash); // Wait for confirmation

  console.log(`Metadata submitted: https://preprod.cardanoscan.io/transaction/${txHash}`);

  return txHash;
}

// Fixed: Proper minting with policy script (MVP: single-use policy)
export async function mintGreenReputationToken(userId: number, score: number, walletAddress: string) {
  const lucid = await getLucid();

  // Create a simple one-time minting policy (valid for 10 minutes)
  const policyScript = lucid.utils.nativeScriptFromJson({
    type: "all",
    scripts: [
      { type: "before", slot: lucid.utils.unixTimeToSlot(Date.now() + 600000) }, // 10 minutes
    ],
  });

  const policyId = lucid.utils.mintingPolicyToId(policyScript);

  const assetName = Buffer.from(`Vuna${score}`).toString('hex');
  const unit = policyId + assetName;

  const tx = await lucid
    .newTx()
    .mintAssets({ [unit]: BigInt(1) })
    .validTo(Date.now() + 500000) // Buffer for the "before" constraint
    .attachMintingPolicy(policyScript)
    .payToAddress(walletAddress, { [unit]: BigInt(1) })
    .complete();

  const signedTx = await tx.sign().complete();
  const txHash = await signedTx.submit();

  await lucid.awaitTx(txHash);

  console.log(`Green Reputation Token minted: https://preprod.cardanoscan.io/transaction/${txHash}`);

  await prisma.reputationScore.upsert({
    where: { userId },
    update: { 
      score,
      tokenAsset: unit, 
      mintTxHash: txHash 
    },
    create: { 
      userId, 
      score, 
      tokenAsset: unit, 
      mintTxHash: txHash 
    },
  });

  return { tokenAsset: unit, mintTxHash: txHash };
}