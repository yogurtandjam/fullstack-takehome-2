export type TWsSubscribedMessage = {
  result: null;
  id: number;
};

export type TWsChannelMessage =
  | {
      channel: `${string}@kline_${string}`;
      data: TLine;
    }
  | {
      channel: 'tickers';
      data: TTicker[];
    };
export type TLine = (number | string)[];

export type TTicker = {
  symbol: string;
  oneHrFundingRate: string;
  cumFunding: string;
  imbalance: string;
  indexPrice: string;
  markPrice: string;
  priceChange: string;
  priceChangePercent: string;
};
