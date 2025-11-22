/**
 * Kalshi API client with RSA-PSS signature authentication
 * Based on Kalshi Trading API v2 documentation
 */

import { createSign } from 'crypto';
import { getKalshiConfig } from './env';

/**
 * Kalshi position from API
 */
export interface KalshiApiPosition {
  position_id?: string;
  ticker: string;
  market_ticker: string;
  market_title?: string;
  yes_position?: number;
  no_position?: number;
  total_cost?: number;
  realized_pnl?: number;
  position_value?: number;
  settlement_value?: number;
  fees_paid?: number;
  resting_order_count?: number;
}

/**
 * Kalshi portfolio response
 */
export interface KalshiPortfolioResponse {
  positions?: KalshiApiPosition[];
  cursor?: string;
}

/**
 * UI-friendly position format
 */
export interface UiKalshiPosition {
  id: string;
  marketTitle: string;
  ticker: string;
  side: 'Yes' | 'No' | 'Both';
  entryPrice: number;
  currentPrice: number;
  exposure: number;
  unrealizedPnl: number;
  category: string;
}

/**
 * Sign a request using RSA-PSS with SHA256
 */
function signRequest(
  method: string,
  path: string,
  timestampMs: number,
  privateKeyPem: string
): string {
  // Message format: timestamp + method + path (no query string)
  const message = `${timestampMs}${method.toUpperCase()}${path}`;

  const sign = createSign('RSA-SHA256');
  sign.update(message);
  sign.end();

  const signature = sign.sign(
    {
      key: privateKeyPem,
      padding: 1, // RSA_PKCS1_PSS_PADDING
      saltLength: 32,
    },
    'base64'
  );

  return signature;
}

/**
 * Make an authenticated request to Kalshi API
 */
export async function kalshiFetch<T>(
  method: string,
  path: string,
  queryParams?: Record<string, string | number>
): Promise<T> {
  const config = getKalshiConfig();
  const timestampMs = Date.now();

  // Build URL with query params
  let url = `${config.apiBaseUrl}${path}`;
  if (queryParams) {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Sign request (signature uses path without query string)
  const signature = signRequest(method, path, timestampMs, config.privateKeyPem);

  // Make authenticated request
  const response = await fetch(url, {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      'KALSHI-ACCESS-KEY': config.apiKeyId,
      'KALSHI-ACCESS-TIMESTAMP': String(timestampMs),
      'KALSHI-ACCESS-SIGNATURE': signature,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Kalshi API error (${response.status}): ${errorBody}`
    );
  }

  return response.json();
}

/**
 * Fetch user positions from Kalshi
 */
export async function getKalshiPositions(): Promise<UiKalshiPosition[]> {
  try {
    const response = await kalshiFetch<KalshiPortfolioResponse>(
      'GET',
      '/portfolio/positions'
    );

    if (!response.positions || response.positions.length === 0) {
      return [];
    }

    // Transform API positions to UI format
    return response.positions
      .filter((pos) => {
        // Filter out closed positions
        const hasYes = (pos.yes_position || 0) > 0;
        const hasNo = (pos.no_position || 0) > 0;
        return hasYes || hasNo;
      })
      .map((pos) => {
        const hasYes = (pos.yes_position || 0) > 0;
        const hasNo = (pos.no_position || 0) > 0;
        const yesSize = pos.yes_position || 0;
        const noSize = pos.no_position || 0;

        // Determine side
        let side: 'Yes' | 'No' | 'Both' = 'Yes';
        if (hasYes && hasNo) {
          side = 'Both';
        } else if (hasNo) {
          side = 'No';
        }

        // Calculate metrics
        const totalCost = pos.total_cost || 0;
        const positionValue = pos.position_value || 0;
        const unrealizedPnl = positionValue - totalCost;
        const exposure = Math.abs(totalCost);

        // Estimate current price (simplified)
        const totalContracts = yesSize + noSize;
        const avgPrice = totalContracts > 0 ? Math.abs(totalCost / totalContracts) : 0.5;
        const currentPrice = positionValue > 0 ? positionValue / totalContracts : avgPrice;

        // Extract category from ticker (simplified)
        const category = extractCategory(pos.ticker);

        return {
          id: pos.position_id || pos.ticker,
          marketTitle: pos.market_title || pos.ticker,
          ticker: pos.ticker,
          side,
          entryPrice: avgPrice,
          currentPrice: Math.min(Math.max(currentPrice, 0), 1),
          exposure,
          unrealizedPnl,
          category,
        };
      });
  } catch (error) {
    console.error('Error fetching Kalshi positions:', error);
    throw error;
  }
}

/**
 * Extract category from ticker (simplified heuristic)
 */
function extractCategory(ticker: string): string {
  const upperTicker = ticker.toUpperCase();

  if (upperTicker.includes('PRES') || upperTicker.includes('ELECT') || upperTicker.includes('SENATE')) {
    return 'Politics';
  }
  if (upperTicker.includes('FED') || upperTicker.includes('RATE') || upperTicker.includes('GDP')) {
    return 'Economics';
  }
  if (upperTicker.includes('BTC') || upperTicker.includes('ETH') || upperTicker.includes('CRYPTO')) {
    return 'Crypto';
  }
  if (upperTicker.includes('SP') || upperTicker.includes('SPX') || upperTicker.includes('NASDAQ')) {
    return 'Finance';
  }

  return 'Other';
}
