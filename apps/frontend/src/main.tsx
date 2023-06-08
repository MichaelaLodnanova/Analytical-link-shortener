import './index.css';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
const theme = extendTheme({
  colors: {
    primary: {
      main: '#D2ADAD',
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
  },
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
