import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Card } from '../ui/card';
import { Tabs } from '../ui/tabs';
import { OrderForm } from './order-form';

export const TradeForm = () => {
  return (
    <Card className="w-80 p-4">
      <Tabs defaultValue="long">
        <TabsList className="w-full">
          <TabsTrigger value="long" className="w-full">
            LONG
          </TabsTrigger>
          <TabsTrigger value="short" className="w-full">
            SHORT
          </TabsTrigger>
        </TabsList>
        <TabsContent value="long">
          <OrderForm position="long" />
        </TabsContent>
        <TabsContent value="short">
          <OrderForm position="short" />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
