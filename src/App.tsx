import React from 'react';

import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

import CardWithChart from './components/CardWithChart/CardWithChart';

import './style.css';


function App() {

  return <Theme className='App' preset={presetGpnDefault}>
    <CardWithChart />
  </Theme>;
}

export default App;
