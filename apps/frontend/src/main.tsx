import './index.css';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

const theme = extendTheme({
  fonts: {
    heading: `'Dosis', sans-serif`,
    body: `'Quicksand', sans-serif`,
  },
  colors: {
    primary: {
      main: '#d0bdf4',
      '50': '#faf7f9',
      '100': '#494d5f',
      '200': '#8458b3',
      '300': '#d0bdf4',
      '400': '#e5eaf5',
      '500': '#a0d2eb',
      '600': '#f5fbfc',
      '700': '#d0bdf4',
      '800': '#e2d0f7',
      '900': '#b8c3db',
      '950': '#81b5d4',
    },
    navbar: {
      main: 'primary.800',
      100: '#e2d0f7',
      200: '#f6edfc',
    },
    cards: {
      main: '#e5eaf5',
      '50': '#ffffff',
      '100': '#fcfeff',
      '200': '#f7fafc',
      '300': '#f2f6fa',
      '400': '#ebf0f7',
      '500': '#e5eaf5',
      '600': '#b8c3db',
      '700': '#8190b8',
      '800': '#536394',
      '900': '#2e3d6e',
      '950': '#131e47',
    },
  },
  initialColorMode: 'light',
  useSystemColorMode: false,
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
