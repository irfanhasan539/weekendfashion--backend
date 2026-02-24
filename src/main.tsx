import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Clear old cached data on load
if (typeof window !== 'undefined') {
  localStorage.removeItem('products');
  localStorage.removeItem('cachedProducts');
  sessionStorage.clear();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
