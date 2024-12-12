import { BellIcon } from 'lucide-react';

import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MarketDetails } from './market-details';

type HeaderProps = {
  symbol: string;
};
export const Header = ({ symbol }: HeaderProps) => (
  <div className="border-b-zinc-800 border-b">
    <div className="flex flex-row mb-5">
      <Input className="flex-1" placeholder="Search" />
      <Select>
        <SelectTrigger className="w-[180px] bg-black text-zinc-100">
          <BellIcon className="mr-1" />
          <SelectValue placeholder="Connect Wallet..." />
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
