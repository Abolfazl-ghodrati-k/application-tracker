import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (import.meta.env.NODE_ENV !== 'production') {
  ReactDOM.createRoot(rootElement!).render(
    <App />
  );
} else {
  ReactDOM.createRoot(rootElement!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
