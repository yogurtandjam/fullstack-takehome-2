import { createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

const firstDate = Math.floor((Date.now() - 1000 * 30) / 1000);
const lastDate = Math.floor(Date.now() / 1000);

// [openTime, open, high, low, close, closeTime, v, quoteV, numTrades]
const openTimeIdx = 0;
const openValueIdx = 1;
const highValueIdx = 2;
const lowValueIdx = 3;
const closeValueIdx = 4;
const closeTimeIdx = 5;
const volumeIdx = 6;
const quoteVolumeIdx = 7;
const numTradesIdx = 8;

const createCandlestickData = (lines) => {
  return lines.map((line) => {
    return {
      time: line[openTimeIdx],
      open: line[openValueIdx],
      high: line[highValueIdx],
      low: line[lowValueIdx],
      close: line[closeValueIdx],
    };
  });
};

export const Chart = (props) => {
  const {
    colors: {
      backgroundColor = "white",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
  } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/lines")
      .then((res) => res.json())
      .then((d) => setData(createCandlestickData(d)));
    // setData()
  });
  const chartContainerRef = useRef();

  useEffect(() => {
    if (!data) return;
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries({
      upColor: areaTopColor,
      downColor: areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};
console.log(
  "huh",
  Math.floor(new Date("2021-01-01T00:00:00Z").getTime() / 1000)
);
// const initialData = [
//   {
//     time: Math.floor(new Date("2021-01-01T00:00:00Z").getTime() / 1000),
//     open: 75.16,
//     high: 82.84,
//     low: 36.16,
//     close: 45.72,
//   },
//   {
//     time: Math.floor(new Date("2022-12-23").getTime() / 1000),
//     open: 45.12,
//     high: 53.9,
//     low: 45.12,
//     close: 48.09,
//   },
//   {
//     time: Math.floor(new Date("2022-12-24").getTime() / 1000),
//     open: 60.71,
//     high: 60.71,
//     low: 53.39,
//     close: 59.29,
//   },
//   {
//     time: Math.floor(new Date("2022-12-25").getTime() / 1000),
//     open: 68.26,
//     high: 68.26,
//     low: 59.04,
//     close: 60.5,
//   },
//   {
//     time: Math.floor(new Date("2022-12-26").getTime() / 1000),
//     open: 67.71,
//     high: 105.85,
//     low: 66.67,
//     close: 91.04,
//   },
//   {
//     time: Math.floor(new Date("2022-12-27").getTime() / 1000),
//     open: 91.04,
//     high: 121.4,
//     low: 82.7,
//     close: 111.4,
//   },
//   {
//     time: Math.floor(new Date("2022-12-28").getTime() / 1000),
//     open: 111.51,
//     high: 142.83,
//     low: 103.34,
//     close: 131.25,
//   },
//   {
//     time: Math.floor(new Date("2022-12-29").getTime() / 1000),
//     open: 131.33,
//     high: 151.17,
//     low: 77.68,
//     close: 96.43,
//   },
//   {
//     time: Math.floor(new Date("2022-12-30").getTime() / 1000),
//     open: 106.33,
//     high: 110.2,
//     low: 90.39,
//     close: 98.1,
//   },
//   {
//     time: Math.floor(new Date("2022-12-31").getTime() / 1000),
//     open: 109.87,
//     high: 114.69,
//     low: 85.66,
//     close: 111.26,
//   },
// ];
