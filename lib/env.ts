/**
 * Environment variable helpers for server-side configuration
 */

export interface KalshiConfig {
  apiKeyId: string;
  privateKeyPem: string;
  apiBaseUrl: string;
}

/**
 * Get Kalshi configuration from environment variables
 * Throws error if required variables are missing
 */
export function getKalshiConfig(): KalshiConfig {
  const apiKeyId = process.env.KALSHI_API_KEY_ID;
  const privateKeyPem = process.env.KALSHI_PRIVATE_KEY_PEM;
  const apiBaseUrl = process.env.KALSHI_API_BASE_URL || 'https://api.elections.kalshi.com/trade-api/v2';

  if (!apiKeyId || !privateKeyPem) {
    throw new Error(
      'Missing Kalshi credentials. Please set KALSHI_API_KEY_ID and KALSHI_PRIVATE_KEY_PEM environment variables.'
    );
  }

  return {
    apiKeyId,
    privateKeyPem,
    apiBaseUrl,
  };
}

/**
 * Check if Kalshi is configured without throwing
 */
export function isKalshiConfigured(): boolean {
  return !!(process.env.KALSHI_API_KEY_ID && process.env.KALSHI_PRIVATE_KEY_PEM);
}
