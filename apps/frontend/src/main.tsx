import './index.css';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
const theme = extendTheme({
  colors: {
    primary: {
      main: '#a28089',
      '50': '#faf7f9',
      '100': '#f5f0f3',
      '200': '#e8dce3',
      '300': '#dbcad2',
      '400': '#bfa3ae',
      '500': '#a28089',
      '600': '#946974',
      '700': '#7a4854',
      '800': '#612e39',
      '900': '#4a1b24',
      '950': '#300b11',
    },
  },
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
