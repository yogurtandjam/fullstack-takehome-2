import { TLine, TReaction } from '@/types';

// TODO: convert to env var when deploying
const API_URL = 'http://localhost:3001';

export const getTickerLatest = async (symbols: string) => {
  console.log('ticker latest url = ', `${API_URL}/ticker/latest?symbols=${symbols}`);
  const tickerLatestData = fetch(`${API_URL}/ticker/latest?symbols=${symbols}`);
  const tickerLatestDataJson = (await tickerLatestData).json();
  return tickerLatestDataJson;
};

export const getTicker24Hrs = async (symbols: string) => {
  const ticker24HrData = fetch(`${API_URL}/ticker/24hr?symbols=${symbols}`);
  const ticker24HrDataJson = (await ticker24HrData).json();
  return ticker24HrDataJson;
};

export const getLines = async (): Promise<TLine[]> => {
  const lines = await fetch(`${API_URL}/lines`);
  const linesJson = await lines.json();
  return linesJson;
};

export const getReactions = async (): Promise<TReaction[]> => {
  const reactions = await fetch(`${API_URL}/getReactions`);
  const reactionsJson = await reactions.json();
  console.log(reactionsJson, 'json');
  return Object.keys(reactionsJson).reduce((acc, timestamp) => {
    const reactionsForTimestamp = reactionsJson[timestamp].map((rx: TReaction) => ({
      time: new Date(timestamp).getTime(),
      position: 'aboveBar',
      shape: 'circle',
      color: 'black',
      text: rx.emoji,
    }));
    return [...acc, ...reactionsForTimestamp];
  }, [] as TReaction[]);
};
