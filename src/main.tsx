import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './app/routes';
import './styles/index.css';
import { initAnalytics } from './app/lib/analytics';

export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient }) => {
    // Sólo en el navegador: en el build el render corre en Node y no hay
    // document. Además es no-op si no está definida VITE_GA4_ID.
    if (isClient) initAnalytics();
  },
);
