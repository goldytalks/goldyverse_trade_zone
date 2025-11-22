# Kalshi Integration Guide

## Overview

The Goldyverse Trade Zone now includes full Kalshi integration with secure server-side authentication. This allows you to fetch your real Kalshi positions directly into the app.

## Features

✅ **Secure RSA-PSS Authentication** - Uses your Kalshi API key and private key securely on the server
✅ **Real-time Position Fetching** - Loads your actual Kalshi positions via the official API
✅ **Graceful Fallback** - Shows mock data when Kalshi credentials aren't configured
✅ **Error Handling** - Clear error messages and retry functionality
✅ **Loading States** - Visual feedback during data fetching

## Setup Instructions

### 1. Get Your Kalshi API Credentials

1. Log in to your Kalshi account
2. Go to **Profile → API Keys** (https://kalshi.com/profile/api-keys)
3. Click **Generate New API Key**
4. Download your credentials:
   - API Key ID (string)
   - Private Key (PEM file)

⚠️ **IMPORTANT**: Save your private key securely. You won't be able to download it again.

### 2. Configure Environment Variables

#### For Local Development

Create a `.env.local` file in the root of your project:

```bash
# .env.local
KALSHI_API_KEY_ID=your_api_key_id_here
KALSHI_PRIVATE_KEY_PEM="-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...
[Your full private key here - multiple lines]
...
-----END PRIVATE KEY-----"
KALSHI_API_BASE_URL=https://api.elections.kalshi.com/trade-api/v2
```

**Note**: The private key must be enclosed in double quotes and include the full PEM format with BEGIN/END markers.

#### For Vercel Deployment

1. Go to your project in the Vercel dashboard
2. Navigate to **Settings → Environment Variables**
3. Add the following variables:
   - `KALSHI_API_KEY_ID` → Your API key ID
   - `KALSHI_PRIVATE_KEY_PEM` → Your full private key (with BEGIN/END markers)
   - `KALSHI_API_BASE_URL` → `https://api.elections.kalshi.com/trade-api/v2`

4. Deploy your project - environment variables will be available on the next deployment

### 3. Test the Integration

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to the Positions page** (`/positions`)

3. **Check for your Kalshi positions**:
   - If configured correctly: You'll see your real Kalshi positions with a "Kalshi (X)" badge on the filter
   - If not configured: You'll see a banner saying "Kalshi not configured" and mock data will be shown

### 4. Verify Everything Works

You should see:
- ✅ Loading indicator when fetching positions
- ✅ Your real Kalshi positions displayed
- ✅ Filter showing position count for Kalshi
- ✅ Real entry price, current price, exposure, and PnL
- ✅ Proper category tags (Politics, Economics, Crypto, etc.)

## Architecture

### Files Created

```
lib/
├── env.ts                              # Environment variable helpers
└── kalshiClient.ts                     # Kalshi API client with RSA signing

app/api/
└── kalshi/
    └── positions/
        └── route.ts                    # Server-side API route for positions
```

### How It Works

1. **Environment Variables** (`lib/env.ts`)
   - Safely loads Kalshi credentials from environment
   - Validates required variables
   - Provides fallback checks

2. **Kalshi Client** (`lib/kalshiClient.ts`)
   - Implements RSA-PSS signature authentication
   - Signs each request with `timestamp + method + path`
   - Handles API communication securely
   - Transforms API responses to UI-friendly format

3. **API Route** (`app/api/kalshi/positions/route.ts`)
   - Server-side only (never exposes credentials to client)
   - Fetches positions from Kalshi API
   - Returns simplified JSON for frontend
   - Handles errors gracefully

4. **Frontend** (`app/positions/page.tsx`)
   - Fetches from `/api/kalshi/positions` on load
   - Merges real Kalshi positions with mock Polymarket data
   - Shows loading/error states
   - Falls back to mock data if not configured

## API Reference

### GET `/api/kalshi/positions`

Fetches user's Kalshi positions.

**Response** (success):
```json
{
  "success": true,
  "positions": [
    {
      "id": "position_123",
      "marketTitle": "Will Bitcoin reach $100k by EOY?",
      "ticker": "BTC-100K-2025",
      "side": "Yes",
      "entryPrice": 0.62,
      "currentPrice": 0.68,
      "exposure": 5000,
      "unrealizedPnl": 441,
      "category": "Crypto"
    }
  ],
  "count": 1,
  "source": "kalshi"
}
```

**Response** (not configured):
```json
{
  "error": "Kalshi not configured",
  "message": "Please set KALSHI_API_KEY_ID and KALSHI_PRIVATE_KEY_PEM environment variables",
  "positions": []
}
```

## Security Best Practices

✅ **DO**:
- Store credentials in `.env.local` (ignored by git)
- Use Vercel environment variables for production
- Keep your private key secure and never commit it
- Use the provided `.env.example` as a template

❌ **DON'T**:
- Commit `.env.local` to git
- Share your private key publicly
- Store credentials in client-side code
- Hard-code API keys in your source files

## Troubleshooting

### "Kalshi not configured" banner shows

**Solution**: Verify your environment variables are set correctly in `.env.local`

### "Failed to fetch positions" error

**Possible causes**:
1. Invalid API credentials → Check your API key ID and private key
2. Network issues → Check your internet connection
3. Kalshi API is down → Check https://status.kalshi.com
4. Invalid PEM format → Ensure your private key includes BEGIN/END markers

### Positions show $0 values

**Cause**: You may not have any open positions on Kalshi

**Solution**: Make some trades on Kalshi first, then refresh the page

### Build fails with crypto errors

**Cause**: Missing Node.js crypto module

**Solution**: This shouldn't happen with Next.js 14, but ensure you're using Node 18+

## Next Steps

Once Kalshi integration is working:

1. **Add Polymarket Integration** - Similar pattern for Polymarket API
2. **Add Real-time Updates** - WebSocket support for live price feeds
3. **Add Position Management** - Place/close trades directly from the app
4. **Add Historical Data** - Track performance over time

## Support

- **Kalshi API Docs**: https://trading-api.readme.io/reference
- **GitHub Issues**: https://github.com/goldytalks/goldyverse_trade_zone/issues
- **Kalshi Support**: support@kalshi.com
