import { Chart } from '@/components/chart/chart';
import { EmojiWidget } from '@/components/emoji-widget';
import { Header } from '@/components/header/header';
import { TradeForm } from '@/components/trade-form/trade-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const TradePage = () => {
  return (
    <div className="h-full w-full bg-black pt-5 pl-12 pr-12">
      <Header />
      <Tabs defaultValue="price">
        <TabsList>
          <TabsTrigger value="price">PRICE</TabsTrigger>
          <TabsTrigger value="funding">FUNDING</TabsTrigger>
        </TabsList>
        <TabsContent value="price">
          <div className="flex flex-row">
            <Chart />
            <TradeForm />
          </div>
        </TabsContent>
        <TabsContent value="funding">COMING SOON</TabsContent>
      </Tabs>
      <EmojiWidget />
    </div>
  );
};
