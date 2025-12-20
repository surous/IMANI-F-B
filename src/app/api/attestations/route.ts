// src/app/api/attestations/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { verifyToken } from '../../../lib/auth';
import crypto from 'crypto';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(request: Request) {
  // 1. Configure Cloudinary inside the handler to ensure .env is loaded
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  try {
    // 2. Authentication
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1] || '';
    const payload = verifyToken(token);

    if (!payload || payload.role !== 'FARMER') {
      return NextResponse.json({ error: 'Unauthorized: Only farmers can submit' }, { status: 401 });
    }

    // 3. Parse Multipart Form Data
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (e) {
      return NextResponse.json({ 
        error: 'Form parsing failed. Ensure boundary is correct.',
        receivedHeader: request.headers.get('content-type') 
      }, { status: 400 });
    }

    const practiceId = formData.get('practiceId');
    const imageFile = formData.get('evidence') as File | null;

    if (!practiceId || !imageFile || typeof imageFile === 'string') {
      return NextResponse.json({ error: 'Missing practiceId or evidence file' }, { status: 400 });
    }

    // 4. Process File to Buffer and Hash
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const evidenceHash = crypto.createHash('sha256').update(buffer).digest('hex');

    // 5. Upload to Cloudinary using a Promise
    // We remove extra params like 'public_id' to avoid signature mismatches
    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'imani/evidence',
          resource_type: 'auto'
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Error Log:", error);
            return reject(error);
          }
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const imageUrl = uploadResult.secure_url;

    // 6. Save to Database (Mapping to your Prisma Schema)
    const attestation = await prisma.attestation.create({
      data: {
        userId: payload.userId,
        practiceId: Number(practiceId),
        evidenceHash: evidenceHash,
        imageUrl: imageUrl, 
        status: 'PENDING',
        metadataTxHash: `mvp_local_${crypto.randomBytes(4).toString('hex')}`
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: attestation.id,
        imageUrl: imageUrl,
        fingerprint: evidenceHash,
        status: "Verified & Stored"
      },
    });

  } catch (error: any) {
    console.error('SERVER LOG ERROR:', error);
    return NextResponse.json({ 
      error: 'Upload Process Failed', 
      details: error.message || 'Unknown error' 
    }, { status: 500 });
  }
}