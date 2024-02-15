import React, { useEffect, useState } from 'react';

import { mockData } from '../../data/data';
import { currencies } from '../../data/currencies';

import './MeanValueForCurrency.css';

type MeanValueForCurrencyProps = {
  currencyId: number
}

function MeanValueForCurrency({ currencyId }: MeanValueForCurrencyProps) {
  const [meanValue, setMeanValue] = useState(countMeanValue(currencyId));

  function countMeanValue(id: number): string {
    const currentCurrency = currencies.find((elem) => elem.id === id);
    const values = mockData.filter((elem) => elem.indicator === currentCurrency?.indicator);
    return (values.reduce((acc, elem) => acc + elem.value, 0) / values.length).toFixed(2).replace('.', ',');
  }

  useEffect(() => {
    setMeanValue(countMeanValue(currencyId));
  }, [currencyId]);

  return (
    <div className={'mean-value-container'}>
      <p style={{
        fontSize: 16,
        color: 'gray',
        margin: '0',
        paddingLeft: '0',
        paddingRight: '10px',
        marginBottom: '15px',
      }}>Среднее за период</p>
      <p style={{ fontSize: 16, color: 'gray', margin: '0', paddingLeft: '5px', paddingRight: '10px' }}><span
        style={{ fontSize: 48, color: '#f38b00' }}>{meanValue}</span> ₽</p>
    </div>
  );
}

export default MeanValueForCurrency;