# Goldyverse Trade Zone 🎯

A beautiful, mobile-first and desktop-responsive dashboard for tracking all your trades and gambles:
- Prediction markets (Polymarket, Kalshi)
- Pick slips (Underdog, PrizePicks)
- Crypto & memecoins

## Features

✅ **Dashboard** - Total PnL, ROI, 30-day performance chart, positions snapshot
✅ **Positions** - Track all open prediction market positions
✅ **Trade Advisor** - Follow top traders, view trending markets & signals
✅ **Menu & Tools** - Connect platforms, upload pick screenshots
✅ **Crypto/Assets** - Track memecoin & crypto holdings

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Recharts**
- **Lucide Icons**

## Responsive Design

- Mobile-first with persistent bottom nav
- Desktop-optimized with top nav and multi-column layouts
- Works beautifully on all screen sizes

## Local Development

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

## Deploy to Vercel

This project is optimized for Vercel deployment.

### Option 1: GitHub → Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

Vercel auto-detects Next.js and deploys instantly.

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

## Project Structure

```
goldyverse_trade_zone/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard
│   ├── positions/         # Positions page
│   ├── advisor/           # Trade advisor
│   ├── menu/              # Menu & tools
│   └── assets/            # Crypto/assets
├── components/            # Reusable components
├── lib/                   # Mock data & utilities
└── public/                # Static assets
```

## Current Status

**UI-Only Prototype** with:
- ✅ Mock data for all features
- ✅ Client-side charts
- ✅ Fully responsive design
- ❌ No backend/APIs yet
- ❌ No authentication yet

Perfect for design demos, user testing, and frontend development.

## Coming Soon

- Real API integrations (Polymarket, Kalshi)
- Screenshot OCR for pick slips
- Crypto wallet connections
- Live price feeds
- User authentication

## License

MIT
