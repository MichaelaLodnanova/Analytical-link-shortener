import './index.css';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
const theme = extendTheme({
  colors: {
    primary: {
      main: '#D2ADAD',
      50: '#faf7f9',
      100: '#f5f0f3',
      200: '#e8dce3',
      300: '#dbcad2',
      400: '#bfa3ae',
      500: '#a28089',
      600: '#946974',
      700: '#7a4854',
      800: '#612e39',
      900: '#4a1b24',
      950: '#300b11',
    },
    secondary: {
      main: '#e8d1c5',
      20: '#fcfbfa',
      50: '#faf7f5',
      100: '#f5efeb',
      200: '#ede2dd',
      300: '#dec5c1',
      400: '#d2adad',
      500: '#bd8c8c',
      600: '#9c5f5f',
      700: '#7d3d3d',
      800: '#5e2323',
      900: '3d0f0f',
    },
    buttons: {
      main: '#51e2f5',
      50: '#f7feff',
      100: '#edfeff',
      200: '#d2fafc',
      300: '#b6f4fa',
      400: '#83ecf7',
      500: '#51e2f5',
      600: '#42c2db',
      700: '#2e97b8',
      800: '#1e7094',
      900: '#104b6e',
      950: '#072c47',
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
