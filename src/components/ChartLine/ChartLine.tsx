import React, { useEffect, useState } from 'react';

import { ReactECharts } from '../../Echarts/ReactECharts';

import { currencies } from '../../data/currencies';

type ChartLineProps = {
  currencyId: number
};

function ChartLine({ currencyId }: ChartLineProps) {
  const [data, setData] = useState<any[]>([]);
  const [id, setId] = useState(0);

  const currentCurrency = currencies.find((elem) => elem.id === id);

  const values = data.filter((elem) => elem.indicator === currentCurrency?.indicator);
  const [min, max] = values.reduce(([prevMin, prevMax], curr) =>
    [Math.min(prevMin, curr.value), Math.max(prevMax, curr.value)], [Infinity, -Infinity]);

  function getData(): void {
    fetch('https://65ccb746dd519126b83f5e00.mockapi.io/api/currencies')
      .then(response => response.json())
      .then(response => setData(response));
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setId(currencyId);
  }, [currencyId]);


  const option = {
    color: '#f38b00',
    title: {
      text: `${currentCurrency?.indicator}, ${currentCurrency?.symbol}/₽`.toUpperCase(),
      textStyle: {
        fontSize: 20,
        color: 'black',
      },
    },
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    lineStyle: {
      type: 'dashed',
    },
    xAxis: {
      type: 'category',
      data: values.map((elem) => elem.month),
      lineStyle: {
        type: 'dashed',
      },
      axisTick: {
        show: false,
      },
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        margin: 30,
      },
    },
    yAxis: {
      min: min,
      max: max,
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
      axisLabel: {
        show: true,
      },


    },
    series: [
      {
        name: currentCurrency?.indicator,
        tooltip: {
          valueFormatter: (value: string) => value + '₽',
        },
        data: values.map((elem) => [elem.month, elem.value]),
        type: 'line',
        showSymbol: false,
      },
    ],
  };
  return (
    <ReactECharts style={{ padding: '0', margin: '0' }} option={option} />
  );
}

export default ChartLine;