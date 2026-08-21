import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

/**
 * Sube el scroll y manda el page_view en cada navegación.
 *
 * Va dentro de los layouts, no en un componente raíz: con SSG las rutas son
 * objetos y no hay un <App> que envuelva al router.
 */
export default function RouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // setTimeout 0: deja que Helmet aplique el <title> nuevo antes de medir.
    const t = setTimeout(trackPageView, 0);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
