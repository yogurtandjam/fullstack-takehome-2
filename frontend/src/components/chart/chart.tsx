import { useEffect, useRef } from 'react';

import { getLines } from '@/services/api';

import { useChart } from '@/hooks/useChart';

import { DEFAULT_SYMBOL } from '../../consts';
import { useWebSocket } from '../../hooks/useSocket';
import { createCandlestickData } from '../../utils';

export const Chart = () => {
  const { streamingCandlestick } = useWebSocket(DEFAULT_SYMBOL);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const { chart, series } = useChart({ chartContainerRef });

  useEffect(() => {
    if (!streamingCandlestick || !series) return;
    series.update(streamingCandlestick);
  }, [streamingCandlestick, series]);

  useEffect(() => {
    getLines().then((d) => {
      if (!chart || !series) return;
      chart.timeScale().fitContent();
      series.setData(createCandlestickData(d));
    });
  }, [chart, series]);

  return <div className="flex-1" ref={chartContainerRef} />;
};
