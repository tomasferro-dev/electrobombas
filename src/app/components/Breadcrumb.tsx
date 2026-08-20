import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const LABELS: Record<string, string> = {
  home: 'Inicio',
  servicios: 'Servicios',
  proyectos: 'Proyectos',
  contacto: 'Contacto',
  nosotros: 'Nosotros',
  electrobombas: 'Electrobombas',
  reparacion: 'Reparación',
  venta: 'Venta',
  // slugs de servicios
  perforaciones: 'Perforaciones',
  bobinados: 'Bobinados',
  filmaciones: 'Filmaciones',
  limpieza: 'Limpieza',
  pescas: 'Pesca de Electrobombas',
  'estudios-geologicos': 'Estudios Geológicos',
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

  return (
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
  );
}
