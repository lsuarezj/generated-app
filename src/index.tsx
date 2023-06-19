import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundaryRouter from './providers/ErrorBoundaryRouter';

import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundaryRouter>
      <App />
    </ErrorBoundaryRouter>
  </React.StrictMode>,
  document.getElementById('user-app-root')
);
