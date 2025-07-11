// # src/app.tsx

import './styles/index.css'; // import css

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppProvider } from './AppContext';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
