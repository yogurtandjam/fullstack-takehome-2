import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import { WebSocketProvider } from './hooks/useSocketCtx';
import { TradePage } from './pages/trade';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <TradePage />
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

export default App;
