import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { CandlestickData, Time } from 'lightweight-charts';

import { DEFAULT_INTERVAL, DEFAULT_SYMBOL, DEFAULT_WS_URL } from '../consts';
import { Interval, TTicker, TWsChannelMessage, TWsSubscribedMessage } from '../types';
import { lineToCandlestick } from '../utils';

interface WebSocketContextType {
  interval: Interval;
  setInterval: (interval: Interval) => void;
  setSymbol: (symbol: string) => void;
  socket: WebSocket | null;
  streamingCandlestick: CandlestickData<Time> | undefined;
  symbol: string;
  tickers: TTicker[] | undefined;
  ticker: TTicker | undefined;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
  children: ReactNode; // Children prop to wrap around your components
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [symbol, setSymbol] = useState(DEFAULT_SYMBOL);
  const [interval, setInterval] = useState<Interval>(DEFAULT_INTERVAL);
  const socket = useMemo(() => new WebSocket(DEFAULT_WS_URL), []);
  const [streamingCandlestick, setStreamingCandlestick] = useState<CandlestickData<Time>>();
  const [tickers, setTickers] = useState<TTicker[]>();

  const linesChannelName: `${string}@kline_${string}` = `${symbol}@kline_${interval}`;
  const tickersChannelName = 'tickers';

  const ticker = useMemo(() => {
    return tickers?.find((t) => t.symbol === symbol);
  }, [symbol, tickers]);

  useEffect(() => {
    const handleOpen = () => {
      console.log('WebSocket connection established.');
      const subscriptionId = Date.now();
      const linesSubscriptionMessage = {
        method: 'SUBSCRIBE',
        params: [linesChannelName],
        id: subscriptionId,
      };
      socket.send(JSON.stringify(linesSubscriptionMessage));

      const tickerSubscriptionMessage = {
        method: 'SUBSCRIBE',
        params: ['tickers'],
        id: subscriptionId,
      };
      socket.send(JSON.stringify(tickerSubscriptionMessage));
    };

    const handleError = (error: Event) => {
      console.error('WebSocket error:', error);
    };

    const handleClose = () => {
      console.log('WebSocket connection closed.');
    };

    const handleMessage = async (event: MessageEvent) => {
      try {
        const arrayBuffer = await event.data.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const text = new TextDecoder().decode(uint8Array);
        const parsedData: TWsSubscribedMessage | TWsChannelMessage = JSON.parse(text);

        if (!('channel' in parsedData)) return;

        if (parsedData.channel === linesChannelName) {
          const newestCandlestick = lineToCandlestick(parsedData.data);
          setStreamingCandlestick(newestCandlestick);
        }
        if (parsedData.channel === tickersChannelName) {
          setTickers(parsedData.data);
        }
      } catch (err) {
        console.error('Error processing WebSocket message:', err);
        socket?.close();
      }
    };

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('error', handleError);
    socket.addEventListener('close', handleClose);
    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('error', handleError);
      socket.removeEventListener('close', handleClose);
      socket.removeEventListener('message', handleMessage);
    };
  }, [linesChannelName, socket, symbol]);

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        streamingCandlestick,
        tickers,
        ticker,
        symbol,
        interval,
        setInterval,
        setSymbol,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
