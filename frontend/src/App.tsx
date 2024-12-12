import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import { DEFAULT_INTERVAL, DEFAULT_SYMBOL } from './consts';
import { WebSocketProvider } from './hooks/useSocketCtx';
import { TradePage } from './pages/trade';
import { Interval } from './types';

const queryClient = new QueryClient();

function App() {
  const [symbol] = useState(DEFAULT_SYMBOL);
  const [interval, setInterval] = useState<Interval>(DEFAULT_INTERVAL);
  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider symbol={symbol}>
        <TradePage symbol={symbol} setInterval={setInterval} />
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

export default App;
