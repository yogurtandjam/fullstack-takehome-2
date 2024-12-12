import { Interval } from './types';

/**
 * TODO: abstract these away
 */
export const DEFAULT_WS_URL =
  'wss://wsprod.vest.exchange/ws-api?version=1.0&xwebsocketserver=restserver0';
export const DEFAULT_SYMBOL = 'ETH-PERP'; // Replace with your desired symbol
export const DEFAULT_INTERVAL = Interval.OneMinute; // 1-minute interval

export const THEME_NEGATIVE = '#E03737';
export const THEME_POSITIVE = '#4BC2A3';
export const CHART_BG_COLOR = '#18181b';

const ONE_MINUTE_IN_SECONDS = 60;
const ONE_HOUR_IN_MINUTES = 60;
export const ONE_SECOND_IN_MS = 1000;
export const ONE_HOUR_IN_MS = ONE_SECOND_IN_MS * ONE_MINUTE_IN_SECONDS * ONE_HOUR_IN_MINUTES;
export const ONE_DAY_IN_MS = ONE_HOUR_IN_MS * 24;
export const THIRTY_DAYS_IN_MS = ONE_DAY_IN_MS * 30;

export const DEFAULT_EMOJIS = ['🚀', '😎', '😡', '😭', '💰', '📉'];
