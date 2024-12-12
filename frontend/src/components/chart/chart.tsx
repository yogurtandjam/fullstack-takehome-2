import { useEffect, useRef } from 'react';

import { getLines } from '@/services/api';
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

import { useChart } from '@/hooks/useChart';

import { LongPositionIcon } from '@/assets/long-position';
import { XABCDPatternIcon } from '@/assets/xabcd-pattern';

import { FibretIcon } from '../../assets/fibret';
import { useWebSocket } from '../../hooks/useSocketCtx';
import { createCandlestickData } from '../../utils';

export const Chart = () => {
  const { streamingCandlestick } = useWebSocket();
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const { chart, series } = useChart({ chartContainerRef });

  useEffect(() => {
    if (!streamingCandlestick || !series) return;
    if (!series.data().length) return;
    series.update(streamingCandlestick);
  }, [streamingCandlestick, series]);

  useEffect(() => {
    getLines().then((d) => {
      if (!chart || !series) return;
      chart.timeScale().fitContent();
      series.setData(createCandlestickData(d));
    });
  }, [chart, series]);

  return (
    <div className="pl-5 pr-5 pb-5 pt-1 flex-1 bg-zinc-900 mr-5">
      <Toolbar />
      <div className="flex flex-row">
        <VerticalToolbar />
        <div className="flex-1" ref={chartContainerRef} />
      </div>
    </div>
  );
};

const toolbarIconStyle = 'flex justify-start pr-2 border-r border-zinc-100 ';
const Toolbar = () => {
  return (
    <div className="flex flex-row justify-between pt-2 pb-2 mb-1">
      <div className="flex flex-row [&>*]:pl-2 [&>*:first-child]:pl-0">
        <div className={toolbarIconStyle}>
          <PlusCircleIcon />
        </div>
        <div className={toolbarIconStyle}>1H</div>
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
