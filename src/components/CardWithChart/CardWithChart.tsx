import React, { useState } from 'react';

import { Card } from '@consta/uikit/Card';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';

import ChartLine from '../ChartLine/ChartLine';
import MeanValueForCurrency from '../MeanValueForCurrency/MeanValueForCurrency';

import { currencies } from '../../data/currencies';
import './CardWithChart.css';

function CardWithChart() {
  type Item = string
  const items: Item[] = ['$', '€', '¥'];
  const [currency, setCurrency] = useState<Item | null>(items[0]);

  return (
    <Card className={'card'}>
      <ChartLine currencyId={currencies.find((item) => item.symbol === currency)?.id || 0} />
      <div className={'container'}>
        <ChoiceGroup
          value={currency}
          onChange={({ value }) => setCurrency(value)}
          items={items}
          getItemLabel={(item) => item}
          view='primary'
          multiple={false}
          name='ChoiceGroupValute'
          size='xs'
          className={'choiceGroup'}></ChoiceGroup>
        <MeanValueForCurrency currencyId={currencies.find((item) => item.symbol === currency)?.id || 0} />
      </div>


    </Card>
  );
}

export default CardWithChart;