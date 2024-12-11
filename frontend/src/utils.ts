import { CandlestickData, Time } from 'lightweight-charts';

import { TLine } from './types';

// Object.keys() with key types preserved - NOT SAFE for mutable variables, only readonly/consts that are never modified
// since typescript is structurally typed and objects can contain extra keys and still be valid objects of type T
export const objectKeys = <T extends object>(t: T) => Object.keys(t) as Array<keyof T>;

export const areEqualCandlesticks = (
  existingCandlestick: CandlestickData<Time>,
  latestCandlestick: CandlestickData<Time>
) => {
  return objectKeys(existingCandlestick).every((k) => {
    return existingCandlestick[k] === latestCandlestick[k];
  });
};

// [openTime, open, high, low, close, closeTime, v, quoteV, numTrades]
const openTimeIdx = 0;
const openValueIdx = 1;
const highValueIdx = 2;
const lowValueIdx = 3;
const closeValueIdx = 4;

export const lineToCandlestick = (line: TLine) => {
  return {
    // TODO: remove typecast
    time: parseFloat(String(line[openTimeIdx])) as Time,
    open: parseFloat(String(line[openValueIdx])),
    high: parseFloat(String(line[highValueIdx])),
    low: parseFloat(String(line[lowValueIdx])),
    close: parseFloat(String(line[closeValueIdx])),
  };
};
export const createCandlestickData = (lines: TLine[]): CandlestickData<Time>[] => {
  return lines.map(lineToCandlestick);
};
