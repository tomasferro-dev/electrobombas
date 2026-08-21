import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Home } from 'lucide-react';

const BASE_URL = 'https://www.arenaselectrobombas.com.ar';

const LABELS: Record<string, string> = {
  servicios: 'Servicios',
  proyectos: 'Proyectos',
  contacto: 'Contacto',
  nosotros: 'Nosotros',
  reparacion: 'Reparación de Electrobombas',
  venta: 'Venta de Electrobombas',
  // slugs de servicios
  perforaciones: 'Perforaciones',
  alquiler: 'Alquiler de Electrobombas',
  bobinados: 'Bobinados',
  extraccion: 'Extracción',
  filmaciones: 'Filmaciones',
  limpieza: 'Limpieza',
  pescas: 'Pesca de Electrobombas',
  'estudios-geologicos': 'Estudios Geológicos',
  desarrollo: 'Desarrollo de Perforaciones',
  mantenimiento: 'Mantenimiento',
};

export default function Breadcrumb({ label }: { label?: string }) {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  const crumbs = segments.map((seg, i) => {
    const path = '/' + segments.slice(0, i + 1).join('/');
    const isLast = i === segments.length - 1;
    const displayLabel = label && isLast ? label : (LABELS[seg] ?? seg);
    return { path, label: displayLabel, isLast };
  });

  // Google reemplaza la URL cruda del resultado por esta ruta legible.
  // Se emite acá y no en SEO.tsx porque este componente ya conoce la
  // jerarquía real de cada página.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      ...crumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.label,
        item: `${BASE_URL}${crumb.path}`,
      })),
    ],
  };

  return (
    <>
      <Helmet defer={false}>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <nav
        className="flex items-center gap-1.5 text-sm text-gray-500 py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        aria-label="Breadcrumb"
      >
        <Link to="/" className="flex items-center gap-1 hover:text-red-700 transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>Inicio</span>
        </Link>
        {crumbs.map((crumb) => (
          <span key={crumb.path} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            {crumb.isLast ? (
              <span className="text-gray-900 font-medium">{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className="hover:text-red-700 transition-colors">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
