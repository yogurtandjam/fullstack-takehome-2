import { DEFAULT_SYMBOL } from '@/consts';
import { BellIcon } from 'lucide-react';

import { useWebSocket } from '@/hooks/useSocketCtx';

import { Combobox } from '../ui/combobox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MarketDetails } from './market-details';

const markets = [
  {
    value: DEFAULT_SYMBOL,
    label: 'ETH/USDC',
  },
  {
    value: 'BTC-PERP',
    label: 'BTC/USDC',
  },
];

export const Header = () => {
  const { symbol, setSymbol } = useWebSocket();
  return (
    <div className="border-b-zinc-800 border-b">
      <div className="flex flex-row mb-5">
        <Combobox options={markets} value={symbol} setValue={setSymbol} />
        <Select>
          <SelectTrigger className="w-[180px] bg-black text-zinc-100">
            <BellIcon className="mr-1" />
            <SelectValue placeholder="0xfC...E63d1" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <MarketDetails symbol={symbol} />
    </div>
  );
};
