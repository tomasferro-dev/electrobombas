import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './app/App';
import './styles/index.css';
import { initAnalytics } from './app/lib/analytics';

// No-op si no está definida VITE_GA4_ID.
initAnalytics();

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);
