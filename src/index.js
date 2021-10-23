import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import App from './components/App';

const Root = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
