import { Interval } from '@/types';

import { Chart } from '@/components/chart/chart';
import { Header } from '@/components/header/header';
import { TradeForm } from '@/components/trade-form/trade-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TradePageProps = {
  symbol: string;
  setInterval: (interval: Interval) => void;
};
export const TradePage = ({ symbol, setInterval }: TradePageProps) => {
  return (
    <div className="h-full w-full bg-black pt-5 pl-12 pr-12">
      <Header symbol={symbol} />
      <Tabs defaultValue="price">
        <TabsList>
          <TabsTrigger value="price">PRICE</TabsTrigger>
          <TabsTrigger value="funding">FUNDING</TabsTrigger>
        </TabsList>
        <TabsContent value="price">
          <div className="flex flex-row">
            <Chart setInterval={setInterval} />
            <TradeForm />
          </div>
        </TabsContent>
        <TabsContent value="funding">COMING SOON</TabsContent>
      </Tabs>
    </div>
  );
};
