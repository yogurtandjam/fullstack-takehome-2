import { useEffect, useMemo, useState } from 'react';

import { CandlestickData, Time } from 'lightweight-charts';

import { DEFAULT_WS_URL, DEFAULT_INTERVAL } from '../consts';
import { TWsChannelMessage, TWsSubscribedMessage } from '../types';
import { lineToCandlestick } from '../utils';

export const useWebSocket = (symbol: string) => {
  const socket = useMemo(() => {
    return new WebSocket(DEFAULT_WS_URL);
  }, []);
  const [streamingCandlestick, setStreamingCandlestick] = useState<CandlestickData<Time>>();

  useEffect(() => {
    const handleOpen = () => {
      console.log('WebSocket connection established.');
      const subscriptionId = Date.now();
      const subscriptionMessage = {
        method: 'SUBSCRIBE',
        params: [`${symbol}@kline_${DEFAULT_INTERVAL}`],
        id: subscriptionId,
      };
      socket.send(JSON.stringify(subscriptionMessage));
      console.log('Sent subscription message:', subscriptionMessage);
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

        if (!('channel' in parsedData)) {
          console.log('inital response, figure this out later');
          return;
        }
        const newestCandlestick = lineToCandlestick(parsedData.data);
        setStreamingCandlestick(newestCandlestick);
      } catch (err) {
        console.error('Error processing WebSocket message:', err);
        socket?.close();
      }
    };

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('error', handleError);
    socket.addEventListener('close', handleClose);
    socket.addEventListener('message', handleMessage);
    // Cleanup on unmount
    return () => {
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('error', handleError);
      socket.removeEventListener('close', handleClose);
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket, symbol]);
  return { socket, streamingCandlestick }; // Return the latest data received
};

export default useWebSocket;
