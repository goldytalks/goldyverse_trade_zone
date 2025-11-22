# Goldyverse Trade Zone 🎯

A beautiful, mobile-first and desktop-responsive dashboard for tracking all your trades and gambles:
- Prediction markets (Polymarket, Kalshi)
- Pick slips (Underdog, PrizePicks)
- Crypto & memecoins

## ✨ Features

### 📊 **Dashboard**
- Total PnL, realized/unrealized PnL, ROI tracking
- 30-day performance chart
- Positions snapshot
- Market movers section

### 📈 **Positions**
- **Real Kalshi Integration** - Fetch live positions via secure API
- Platform filtering (All, Polymarket, Kalshi)
- Entry/current price, exposure, and unrealized PnL
- Category badges (Politics, Economics, Crypto, Finance, Tech)
- Graceful fallback to mock data when not configured

### 🎯 **Trade Advisor**
- Top traders to follow with win rate & ROI
- Trending markets with sparkline charts
- Bullish/bearish market signals
- Tail trading feature (copy top traders)

### 🖼️ **Screenshot Upload**
- Upload pick slips from Underdog, PrizePicks, etc.
- Automatic source detection
- Mock OCR processing (ready for real implementation)
- View uploaded slips history

### 💰 **Crypto/Assets**
- Track memecoin & crypto holdings
- Current value, cost basis, and PnL
- 24-hour price change indicators
- (Using mock data - ready for wallet integration)

### ⚙️ **Menu & Tools**
- Platform connection management
- Kalshi API configuration
- Theme toggle
- Settings panel

## 🚀 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Recharts** (Charts & visualizations)
- **Lucide Icons**
- **Node.js Crypto** (RSA-PSS signature authentication)

## 📱 Responsive Design

- Mobile-first with persistent bottom nav
- Desktop-optimized with top nav and multi-column layouts
- Works beautifully on all screen sizes (phone, tablet, desktop)

## 🛠️ Local Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
```

## 🔐 Kalshi Integration Setup

The app now supports **real Kalshi API integration** with secure server-side authentication.

### Quick Setup

1. **Get Kalshi API Credentials**
   - Go to https://kalshi.com/profile/api-keys
   - Generate a new API key
   - Download your API Key ID and Private Key (PEM file)

2. **Configure Environment Variables**

Create a `.env.local` file:

```bash
KALSHI_API_KEY_ID=your_api_key_id_here
KALSHI_PRIVATE_KEY_PEM="-----BEGIN PRIVATE KEY-----
your_private_key_here
-----END PRIVATE KEY-----"
KALSHI_API_BASE_URL=https://api.elections.kalshi.com/trade-api/v2
```

3. **Restart the dev server** and navigate to `/positions`

Your real Kalshi positions will now be displayed!

📖 **Full setup guide**: See [KALSHI_INTEGRATION.md](./KALSHI_INTEGRATION.md)

## 📦 Project Structure

```
goldyverse_trade_zone/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard
│   ├── positions/         # Positions page (Kalshi + mock data)
│   ├── advisor/           # Trade advisor
│   ├── menu/              # Menu & tools
│   ├── assets/            # Crypto/assets
│   └── api/               # Server-side API routes
│       ├── kalshi/        # Kalshi integration
│       │   └── positions/ # Fetch Kalshi positions
│       └── upload/        # File upload handling
│           └── slip/      # Slip screenshot upload
├── components/            # Reusable components
├── lib/                   # Utilities & clients
│   ├── mockData.ts        # Mock data for UI
│   ├── env.ts             # Environment variable helpers
│   └── kalshiClient.ts    # Kalshi API client
└── public/                # Static assets
```

## 🌐 Deploy to Vercel

This project is optimized for Vercel deployment with automatic deployments from GitHub.

### Option 1: GitHub → Vercel (Recommended)

1. Push to GitHub (already done!)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. **Add environment variables** (Kalshi credentials)
6. Click "Deploy"

Vercel auto-detects Next.js and deploys instantly.

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Environment Variables for Vercel

In your Vercel project dashboard, add:
- `KALSHI_API_KEY_ID`
- `KALSHI_PRIVATE_KEY_PEM`
- `KALSHI_API_BASE_URL`

## 📊 Current Status

### ✅ Implemented
- ✅ Kalshi API integration with RSA authentication
- ✅ Server-side API routes (positions, upload)
- ✅ Screenshot upload with mock OCR
- ✅ Real-time position fetching with loading states
- ✅ Responsive design (mobile + desktop)
- ✅ Mock data fallback system
- ✅ Client-side charts and visualizations
- ✅ Error handling and retry mechanisms

### 🚧 Coming Soon
- Polymarket API integration
- Real OCR for pick screenshots (Tesseract/Cloud Vision)
- Crypto wallet connections (MetaMask, WalletConnect)
- Live price feeds (WebSockets)
- User authentication & database
- Historical performance tracking
- Notifications for position updates

## 🏗️ Architecture

### Backend (Server-Side)
- **API Routes** - Secure server-side endpoints
- **RSA-PSS Authentication** - Signs Kalshi API requests
- **Environment-based Configuration** - Secure credential management

### Frontend (Client-Side)
- **React Hooks** - State management with useState/useEffect
- **Client Components** - Interactive UI with 'use client'
- **Recharts** - Beautiful, responsive charts
- **Loading States** - Feedback during async operations

### Security
- ✅ Credentials never exposed to client
- ✅ Server-side API calls only
- ✅ Environment variable validation
- ✅ Input validation on file uploads

## 🐛 Troubleshooting

### Kalshi Positions Not Loading

1. Check `.env.local` exists and has correct credentials
2. Restart dev server after adding env variables
3. Check browser console for error messages
4. Verify API key is active on Kalshi's website

### File Upload Fails

1. Check file is an image (PNG, JPEG, WebP)
2. Ensure file size is under 10MB
3. Check browser console for errors

## 📝 License

MIT

---

**Live Demo**: https://goldyversetradezone-4me5apcyx-goldyverse.vercel.app

**GitHub**: https://github.com/goldytalks/goldyverse_trade_zone

Made with ❤️ for traders and degenerates
