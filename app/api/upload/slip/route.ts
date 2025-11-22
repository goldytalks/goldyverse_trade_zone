/**
 * API route for uploading pick slip screenshots
 * POST /api/upload/slip
 *
 * This is a stub implementation that simulates file upload and OCR parsing
 * In production, this would:
 * 1. Save the uploaded image to cloud storage (S3, Cloudinary, etc.)
 * 2. Send to OCR service to extract picks
 * 3. Store in database
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const source = formData.get('source') as string || 'Unknown';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a PNG, JPEG, or WebP image.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock parsed data
    const mockSlipData = {
      id: `slip_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      source: source || detectSource(file.name),
      status: 'Parsed (mock)',
      picks: Math.floor(Math.random() * 5) + 2, // 2-6 picks
      amount: [10, 25, 50, 100][Math.floor(Math.random() * 4)],
      potentialPayout: 0,
      filename: file.name,
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
    };

    // Calculate potential payout (simplified odds calculation)
    mockSlipData.potentialPayout = mockSlipData.amount * (mockSlipData.picks * 2);

    return NextResponse.json({
      success: true,
      message: 'Slip uploaded successfully',
      slip: mockSlipData,
    });

  } catch (error) {
    console.error('Error uploading slip:', error);
    return NextResponse.json(
      {
        error: 'Failed to upload slip',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Detect source platform from filename
 */
function detectSource(filename: string): string {
  const lowerName = filename.toLowerCase();

  if (lowerName.includes('underdog') || lowerName.includes('ud')) {
    return 'Underdog';
  }
  if (lowerName.includes('prizepicks') || lowerName.includes('pp')) {
    return 'PrizePicks';
  }
  if (lowerName.includes('parlayplay')) {
    return 'ParlayPlay';
  }

  return 'Unknown';
}
