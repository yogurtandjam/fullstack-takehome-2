import { getTicker24Hrs, getTickerLatest } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

import { useWebSocket } from '@/hooks/useSocketCtx';

import { Label } from '../ui/label';

type MarketDetailsProps = {
  symbol: string;
};
export const MarketDetails = ({ symbol }: MarketDetailsProps) => {
  const { ticker } = useWebSocket();
  return (
    <div className="flex flex-row justify-between mb-2">
      <div className="flex items-center">{symbol}</div>
      <div>
        <div>
          <Label>Price</Label>
        </div>
        {ticker?.markPrice}
      </div>
      <div>
        <div>
          <Label>24H Change</Label>
        </div>
        <div
          className={
            parseFloat(ticker?.priceChangePercent ?? '0') > 0 ? 'text-positive' : 'text-negative'
          }
        >
          {parseFloat(ticker?.priceChangePercent ?? '0') > 0 ? '+' : '-'}
          {ticker?.priceChange ?? '-'} ({ticker?.priceChangePercent ?? '-'}%)
        </div>
      </div>
      <div>
        <div>
          <Label>1H Funding</Label>
        </div>
        <div
          className={
            parseFloat(ticker?.oneHrFundingRate ?? '0') > 0 ? 'text-positive' : 'text-negative'
          }
        >
          {ticker?.oneHrFundingRate ?? '-'}
        </div>
      </div>
      <div>
        <div>
          <Label>LONG OPEN INTEREST</Label>
        </div>
        <div className="text-positive">Placeholder</div>
      </div>
      <div>
        <div>
          <Label>SHORT OPEN INTEREST</Label>
        </div>
        <div className="text-positive">Placeholder</div>
      </div>
    </div>
  );
};
