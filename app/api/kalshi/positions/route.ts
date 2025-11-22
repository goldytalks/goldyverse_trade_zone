/**
 * API route for fetching Kalshi positions
 * GET /api/kalshi/positions
 */

import { NextResponse } from 'next/server';
import { getKalshiPositions, UiKalshiPosition } from '@/lib/kalshiClient';
import { isKalshiConfigured } from '@/lib/env';

export const dynamic = 'force-dynamic'; // Disable caching for real-time data

export async function GET() {
  try {
    // Check if Kalshi is configured
    if (!isKalshiConfigured()) {
      return NextResponse.json(
        {
          error: 'Kalshi not configured',
          message: 'Please set KALSHI_API_KEY_ID and KALSHI_PRIVATE_KEY_PEM environment variables',
          positions: [],
        },
        { status: 200 } // Return 200 with empty array for graceful fallback
      );
    }

    // Fetch positions from Kalshi
    const positions: UiKalshiPosition[] = await getKalshiPositions();

    return NextResponse.json({
      success: true,
      positions,
      count: positions.length,
      source: 'kalshi',
    });
  } catch (error) {
    console.error('Error in Kalshi positions API:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch positions',
        message: error instanceof Error ? error.message : 'Unknown error',
        positions: [],
      },
      { status: 500 }
    );
  }
}
