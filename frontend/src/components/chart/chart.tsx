import { useEffect, useRef } from 'react';

import { getLines, getReactions } from '@/services/api';
import {
  BrushIcon,
  CameraIcon,
  CandlestickChartIcon,
  CogIcon,
  CrosshairIcon,
  FunctionSquareIcon,
  HeartIcon,
  MagnetIcon,
  PencilOffIcon,
  PlusCircleIcon,
  RulerIcon,
  ScanIcon,
  ScanLineIcon,
  SearchCodeIcon,
  TypeIcon,
} from 'lucide-react';

import { Interval } from '@/types';

import { useChart } from '@/hooks/useChart';

import { LongPositionIcon } from '@/assets/long-position';
import { XABCDPatternIcon } from '@/assets/xabcd-pattern';

import { FibretIcon } from '../../assets/fibret';
import { useWebSocket } from '../../hooks/useSocketCtx';
import { createCandlestickData } from '../../utils';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';

type ToolbarProps = {
  interval: Interval;
  setInterval: (interval: Interval) => void;
};
export const Chart = () => {
  const { streamingCandlestick, symbol, interval, setInterval } = useWebSocket();
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const { chart, series } = useChart({ chartContainerRef });

  useEffect(() => {
    if (!streamingCandlestick || !series) return;
    if (!series.data().length) return;
    series.update(streamingCandlestick);
  }, [streamingCandlestick, series]);

  useEffect(() => {
    if (!symbol || !interval) return;
    getLines(symbol, interval).then((lines) => {
      if (!chart || !series) return;
      chart.timeScale().fitContent();
      series.setData(createCandlestickData(lines));
    });
  }, [chart, series, interval, symbol]);

  useEffect(() => {
    getReactions().then((reactions) => {
      if (!series) return;
      console.log('reactions', reactions);
      series.setMarkers(reactions);
    });
  }, [series]);

  return (
    <div className="pl-5 pr-5 pb-5 pt-1 flex-1 bg-zinc-900 mr-5">
      <Toolbar interval={interval} setInterval={setInterval} />
      <div className="flex flex-row">
        <VerticalToolbar />
        <div className="flex-1" ref={chartContainerRef} />
      </div>
    </div>
  );
};

const toolbarIconStyle = 'flex justify-start pr-2 border-r border-zinc-100 ';
const Toolbar = ({ interval, setInterval }: ToolbarProps) => {
  return (
    <div className="flex flex-row justify-between pt-2 pb-2 mb-1">
      <div className="flex flex-row [&>*]:pl-2 [&>*:first-child]:pl-0">
        <div className={toolbarIconStyle}>
          <PlusCircleIcon />
        </div>
        <div className={toolbarIconStyle}>
          <Select value={interval} onValueChange={setInterval}>
            <SelectTrigger className="border-none bg-transparent p-0 -mt-2">
              {interval}
            </SelectTrigger>
            <SelectContent>
              {Object.values(Interval).map((intervalType) => {
                return (
                  <SelectItem key={intervalType} value={intervalType}>
                    {intervalType}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className={toolbarIconStyle}>
          <CandlestickChartIcon />
        </div>
        <div className={toolbarIconStyle + ' border-none'}>
          <FunctionSquareIcon />
        </div>
      </div>
      <div className="flex flex-row pr-3">
        <div className="border-zinc-100 border-l pl-3 ">
          <CogIcon />
        </div>
        <div className="pl-3 ">
          <ScanIcon />
        </div>
        <div className="pl-3 ">
          <CameraIcon />
        </div>
      </div>
    </div>
  );
};

const VerticalToolbar = () => {
  return (
    <div className="[&>*]:mb-3 [&>*:last-child]:mb-0">
      <CrosshairIcon className="stroke-negative" />
      <ScanLineIcon />
      <FibretIcon />
      <BrushIcon />
      <TypeIcon />
      <XABCDPatternIcon />
      <LongPositionIcon />
      <HeartIcon />
      <RulerIcon />
      <SearchCodeIcon />
      <MagnetIcon />
      <PencilOffIcon />
    </div>
  );
};
