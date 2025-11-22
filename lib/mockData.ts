export interface Position {
  id: string;
  market: string;
  side: 'Yes' | 'No' | 'Over' | 'Under';
  entryPrice: number;
  currentPrice: number;
  exposure: number;
  unrealizedPnl: number;
  category: string;
  platform: 'Polymarket' | 'Kalshi';
}

export interface PnLDataPoint {
  date: string;
  pnl: number;
}

export interface Trader {
  id: string;
  name: string;
  avatar: string;
  winRate: number;
  roi: number;
  trades: number;
  badge: 'Pro' | 'Elite' | 'Rising';
}

export interface TrendingMarket {
  id: string;
  title: string;
  currentPrice: number;
  change24h: number;
  volume: number;
  sparklineData: number[];
  category: string;
}

export interface Signal {
  id: string;
  market: string;
  type: 'bullish' | 'bearish';
  confidence: number;
  reason: string;
  timestamp: string;
}

export interface UploadedSlip {
  id: string;
  date: string;
  source: 'Underdog' | 'PrizePicks';
  status: string;
  picks: number;
  amount: number;
  potentialPayout: number;
}

export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  size: number;
  costBasis: number;
  currentValue: number;
  unrealizedPnl: number;
  change24h: number;
}

export const mockPositions: Position[] = [
  {
    id: '1',
    market: 'Will Bitcoin reach $100k by EOY 2025?',
    side: 'Yes',
    entryPrice: 0.62,
    currentPrice: 0.68,
    exposure: 5000,
    unrealizedPnl: 441,
    category: 'Crypto',
    platform: 'Polymarket',
  },
  {
    id: '2',
    market: 'Trump wins 2024 Election',
    side: 'No',
    entryPrice: 0.52,
    currentPrice: 0.48,
    exposure: 3000,
    unrealizedPnl: 250,
    category: 'Politics',
    platform: 'Polymarket',
  },
  {
    id: '3',
    market: 'S&P 500 above 6000 by Dec 2025',
    side: 'Yes',
    entryPrice: 0.71,
    currentPrice: 0.65,
    exposure: 4000,
    unrealizedPnl: -338,
    category: 'Finance',
    platform: 'Kalshi',
  },
  {
    id: '4',
    market: 'Fed rate cuts by Q2 2025',
    side: 'Over',
    entryPrice: 0.58,
    currentPrice: 0.72,
    exposure: 2500,
    unrealizedPnl: 603,
    category: 'Economics',
    platform: 'Kalshi',
  },
  {
    id: '5',
    market: 'AI GPT-5 release in 2025',
    side: 'Yes',
    entryPrice: 0.45,
    currentPrice: 0.39,
    exposure: 1500,
    unrealizedPnl: -205,
    category: 'Tech',
    platform: 'Polymarket',
  },
];

export const mockPnLHistory: PnLDataPoint[] = [
  { date: '2025-01-01', pnl: 0 },
  { date: '2025-01-05', pnl: 120 },
  { date: '2025-01-10', pnl: -80 },
  { date: '2025-01-15', pnl: 250 },
  { date: '2025-01-20', pnl: 180 },
  { date: '2025-01-25', pnl: 420 },
  { date: '2025-01-30', pnl: 580 },
  { date: '2025-02-04', pnl: 490 },
  { date: '2025-02-09', pnl: 650 },
  { date: '2025-02-14', pnl: 751 },
];

export const mockTraders: Trader[] = [
  {
    id: '1',
    name: 'CryptoWhale',
    avatar: '🐋',
    winRate: 72,
    roi: 145,
    trades: 234,
    badge: 'Elite',
  },
  {
    id: '2',
    name: 'PoliPredictor',
    avatar: '🎯',
    winRate: 68,
    roi: 98,
    trades: 189,
    badge: 'Pro',
  },
  {
    id: '3',
    name: 'MarketMaven',
    avatar: '📈',
    winRate: 64,
    roi: 87,
    trades: 156,
    badge: 'Pro',
  },
  {
    id: '4',
    name: 'DataDriven',
    avatar: '🤖',
    winRate: 71,
    roi: 112,
    trades: 201,
    badge: 'Elite',
  },
  {
    id: '5',
    name: 'TrendChaser',
    avatar: '🚀',
    winRate: 59,
    roi: 45,
    trades: 98,
    badge: 'Rising',
  },
];

export const mockTrendingMarkets: TrendingMarket[] = [
  {
    id: '1',
    title: 'Bitcoin $100k EOY',
    currentPrice: 0.68,
    change24h: 8.5,
    volume: 2500000,
    sparklineData: [0.58, 0.60, 0.62, 0.65, 0.63, 0.66, 0.68],
    category: 'Crypto',
  },
  {
    id: '2',
    title: 'Fed Rate Cuts Q2',
    currentPrice: 0.72,
    change24h: 12.3,
    volume: 1800000,
    sparklineData: [0.62, 0.64, 0.66, 0.68, 0.70, 0.71, 0.72],
    category: 'Economics',
  },
  {
    id: '3',
    title: 'AI GPT-5 in 2025',
    currentPrice: 0.39,
    change24h: -13.2,
    volume: 980000,
    sparklineData: [0.50, 0.48, 0.45, 0.42, 0.40, 0.38, 0.39],
    category: 'Tech',
  },
  {
    id: '4',
    title: 'Recession by Q4 2025',
    currentPrice: 0.34,
    change24h: -5.6,
    volume: 750000,
    sparklineData: [0.38, 0.37, 0.36, 0.35, 0.34, 0.33, 0.34],
    category: 'Economics',
  },
];

export const mockSignals: Signal[] = [
  {
    id: '1',
    market: 'Bitcoin $100k EOY',
    type: 'bullish',
    confidence: 78,
    reason: 'Institutional buying + halving cycle',
    timestamp: '2h ago',
  },
  {
    id: '2',
    market: 'Fed Rate Cuts Q2',
    type: 'bullish',
    confidence: 82,
    reason: 'Inflation trending down, labor market softening',
    timestamp: '4h ago',
  },
  {
    id: '3',
    market: 'AI GPT-5 in 2025',
    type: 'bearish',
    confidence: 65,
    reason: 'No official announcements, development timeline slipping',
    timestamp: '6h ago',
  },
  {
    id: '4',
    market: 'S&P 500 above 6000',
    type: 'bearish',
    confidence: 71,
    reason: 'Valuation concerns, geopolitical risks',
    timestamp: '8h ago',
  },
];

export const mockUploadedSlips: UploadedSlip[] = [
  {
    id: '1',
    date: '2025-02-14',
    source: 'Underdog',
    status: 'Parsed (mock)',
    picks: 4,
    amount: 25,
    potentialPayout: 125,
  },
  {
    id: '2',
    date: '2025-02-13',
    source: 'PrizePicks',
    status: 'Parsed (mock)',
    picks: 6,
    amount: 50,
    potentialPayout: 300,
  },
  {
    id: '3',
    date: '2025-02-12',
    source: 'Underdog',
    status: 'Parsed (mock)',
    picks: 3,
    amount: 10,
    potentialPayout: 30,
  },
];

export const mockAssets: CryptoAsset[] = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    size: 0.5,
    costBasis: 45000,
    currentValue: 48500,
    unrealizedPnl: 1750,
    change24h: 2.3,
  },
  {
    id: '2',
    name: 'Pepe',
    symbol: 'PEPE',
    size: 1000000,
    costBasis: 850,
    currentValue: 1200,
    unrealizedPnl: 350,
    change24h: 15.7,
  },
  {
    id: '3',
    name: 'Dogwifhat',
    symbol: 'WIF',
    size: 500,
    costBasis: 1500,
    currentValue: 1100,
    unrealizedPnl: -400,
    change24h: -8.2,
  },
  {
    id: '4',
    name: 'Bonk',
    symbol: 'BONK',
    size: 5000000,
    costBasis: 2000,
    currentValue: 2850,
    unrealizedPnl: 850,
    change24h: 12.4,
  },
];

export const calculateMetrics = () => {
  const unrealizedPnl = mockPositions.reduce((sum, p) => sum + p.unrealizedPnl, 0);
  const realizedPnl = 2340; // Mock realized PnL
  const totalPnl = unrealizedPnl + realizedPnl;
  const totalExposure = mockPositions.reduce((sum, p) => sum + p.exposure, 0);
  const roi = ((totalPnl / totalExposure) * 100);

  return {
    totalPnl,
    realizedPnl,
    unrealizedPnl,
    roi,
  };
};
