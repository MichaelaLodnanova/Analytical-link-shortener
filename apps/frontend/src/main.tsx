import './index.css';

import { ChakraProvider, extendBaseTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
