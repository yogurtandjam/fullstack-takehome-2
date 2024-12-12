import { TLine } from '@/types';

const API_URL = 'http://localhost:3001';

//TODO - Create api.js file
export const getTickerLatest = async () => {
  return fetch(`${API_URL}/lines`);
};

export const getTicker24Hrs = async () => {
  return fetch(`${API_URL}/lines`);
};

export const getLines = async (): Promise<TLine[]> => {
  const lines = await fetch(`${API_URL}/lines`);
  const linesJson = await lines.json();
  return linesJson;
};
