import { TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

import { Card } from '../ui/card';
import { Tabs } from '../ui/tabs';
import { OrderForm } from './order-form';

export const TradeForm = () => {
  return (
    <Card className="w-52">
      <Tabs>
        <TabsList>
          <TabsTrigger value="long">LONG</TabsTrigger>
          <TabsTrigger value="SHORT">SHORT</TabsTrigger>
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
