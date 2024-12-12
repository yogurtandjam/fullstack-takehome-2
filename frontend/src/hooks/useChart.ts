import { useLayoutEffect, useState } from 'react';

import { CHART_BG_COLOR, THEME_NEGATIVE, THEME_POSITIVE } from '@/consts';
import {
  CandlestickData,
  ColorType,
  createChart,
  IChartApi,
  ISeriesApi,
  Time,
  WhitespaceData,
} from 'lightweight-charts';

type UseChartProps = {
  chartContainerRef: React.MutableRefObject<HTMLDivElement | null>;
};
export const useChart = (props: UseChartProps) => {
  const { chartContainerRef } = props;
  const [chart, setChart] = useState<IChartApi>();
  const [series, setSeries] =
    useState<ISeriesApi<'Candlestick', Time, CandlestickData<Time> | WhitespaceData<Time>>>();
  useLayoutEffect(() => {
    const refCurrent = chartContainerRef?.current;
    if (!refCurrent) return;
    const handleResize = () => {
      chart.applyOptions({ width: refCurrent.clientWidth });
    };

    const chart = createChart(refCurrent, {
      layout: {
        background: { type: ColorType.Solid, color: CHART_BG_COLOR },
        // TODO: use a real theme color
        textColor: '#FFFEFE',
      },
      grid: {
        vertLines: {
          color: '#404040',
          style: 0,
          visible: true,
        },
        horzLines: {
          color: '#404040',
          style: 0,
          visible: true,
        },
      },
      timeScale: {
        timeVisible: true,
      },
      width: chartContainerRef?.current?.clientWidth,
      height: chartContainerRef?.current?.clientHeight,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries({
      upColor: THEME_POSITIVE,
      downColor: THEME_NEGATIVE,
    });
    window.addEventListener('resize', handleResize);
    setChart(chart);
    setSeries(newSeries);
    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [chartContainerRef]);
  return { chart, series };
};
