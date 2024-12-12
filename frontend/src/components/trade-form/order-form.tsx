import { useState } from 'react';

import { useWebSocket } from '@/hooks/useSocketCtx';

import { capitalize } from '@/utils';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';

type OrderFormProps = {
  position: 'long' | 'short';
};
// TODO: use form component instead of custom form
export const OrderForm = ({ position }: OrderFormProps) => {
  const { ticker } = useWebSocket();
  const [, setOrderType] = useState<string | undefined>();
  const [leverage, setLeverage] = useState<number>(1);
  console.log(leverage);
  return (
    <Card>
      <div className="flex flex-row">
        <div className="pr-3 mb-3">
          <Label>Order Type</Label>
          <Select onValueChange={setOrderType} defaultValue="market">
            <SelectTrigger className="w-[180px] mt-1 mb-1">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="market">MARKET</SelectItem>
              <SelectItem value="limit">LIMIT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Open Price</Label>
          <div className="mt-1">{ticker?.markPrice} USDC</div>
        </div>
      </div>
      <Label htmlFor="size">Size</Label>
      <Input id="size" placeholder="0." className="mt-1 mb-1" />
      <div className="text-zinc-500">Up to 1,458.173 (placeholder)</div>
      <div className="flex flex-row justify-between mt-3 mb-2">
        <Label>Leverage</Label>
        <div className="mt-1">{leverage} X</div>
      </div>
      {/* we're not using a range slider, so just grab the first item */}
      <Slider onValueChange={(v) => setLeverage(v[0])} max={128} min={1} />
      <div className="flex flex-row justify-between mt-7 mb-2">
        <Label>Liquidation Price</Label>
        <div>{estimateLiquidationPrice(ticker?.markPrice, leverage)}</div>
      </div>
      <div className="flex flex-row justify-between mt-2 mb-2">
        <Label>Slippage</Label>
        <div>1.20 USDC (0.3%)</div>
      </div>
      <div className="flex flex-row justify-between mt-2 mb-5">
        <Label>Fee</Label>
        <div>2.00 USDC (0.05%)</div>
      </div>
      <div className="mb-4">
        <Label>Advanced</Label>
      </div>
      <Button>Buy / {capitalize(position)}</Button>
    </Card>
  );
};

const estimateLiquidationPrice = (marketPrice: string | undefined, leverage: number) => {
  const mockMaintenanceMarginPercentage = 0.01;
  return ((Number(marketPrice ?? 0) * (1 - mockMaintenanceMarginPercentage)) / leverage).toFixed(2);
};
