import { useEffect, useRef, useState } from 'react';

import { CandlestickData, ColorType, createChart, Time } from 'lightweight-charts';

import { DEFAULT_SYMBOL } from '../../consts';
import { useWebSocket } from '../../hooks/useSocket';
import { areEqualCandlesticks, createCandlestickData } from '../../utils';

const backgroundColor = 'white';
const textColor = 'black';
const areaTopColor = '#2962FF';
const areaBottomColor = 'rgba(41, 98, 255, 0.28)';

export const Chart = () => {
  const [data, setData] = useState<CandlestickData<Time>[]>([]);
  const { streamingCandlestick } = useWebSocket(DEFAULT_SYMBOL);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!streamingCandlestick) return;
    const latestDatum = data.at(-1);
    if (!latestDatum || latestDatum.time < streamingCandlestick.time) {
      setData([...data, streamingCandlestick]);
      return;
    }
    if (
      latestDatum &&
      latestDatum.time === streamingCandlestick.time &&
      !areEqualCandlesticks(latestDatum, streamingCandlestick)
    ) {
      const newData = data.slice(0, -1);
      newData.push(streamingCandlestick);
      setData(data.slice(0, -1).concat(streamingCandlestick));
      return;
    }
  }, [streamingCandlestick, data]);

  useEffect(() => {
    fetch('http://localhost:3001/lines')
      .then((res) => res.json())
      .then((d) => setData(createCandlestickData(d)));
  }, []);

  useEffect(() => {
    const refCurrent = chartContainerRef?.current;
    if (!data || !refCurrent) return;
    const handleResize = () => {
      chart.applyOptions({ width: refCurrent.clientWidth });
    };

    const chart = createChart(refCurrent, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef?.current?.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries({
      upColor: areaTopColor,
      downColor: areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener('resize', handleResize);
    console.log(data);
    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} />;
};
