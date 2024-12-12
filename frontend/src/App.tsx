import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import { DEFAULT_SYMBOL } from './consts';
import { WebSocketProvider } from './hooks/useSocketCtx';
import { TradePage } from './pages/trade';

const queryClient = new QueryClient();

function App() {
  const [symbol] = useState(DEFAULT_SYMBOL);
  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider symbol={symbol}>
        <TradePage symbol={symbol} />
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

export default App;
