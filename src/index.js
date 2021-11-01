import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Amplify, { AuthModeStrategyType } from 'aws-amplify';
import { QueryClient, QueryClientProvider } from 'react-query';

import { App } from './components';
import { CartProvider } from './hooks/useCart';
import AWSConfig from './aws-exports';

Amplify.configure({
  ...AWSConfig,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
  },
});
const queryClient = new QueryClient();

const Root = () => {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Router>
          <CartProvider>
            <App />
          </CartProvider>
        </Router>
      </QueryClientProvider>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
