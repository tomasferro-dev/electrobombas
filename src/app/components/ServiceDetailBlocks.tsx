import { CheckCircle2 } from 'lucide-react';
import { SERVICES } from '../data';

interface ServiceDetailBlocksProps {
  /** Slug del servicio en SERVICES cuyo contenido se quiere mostrar. */
  slug: string;
  /** Cada bloque se puede apagar cuando la página ya cubre ese contenido. */
  showDescription?: boolean;
  showDetails?: boolean;
  showFeatures?: boolean;
}

/**
 * Descripción larga, "¿Qué incluye?" y "Características principales" de un
 * servicio.
 *
 * Vive acá porque /venta y /reparacion absorbieron el contenido que antes
 * sólo existía en /servicios/:slug, y ese contenido tiene que seguir saliendo
 * de SERVICES en data.ts — no duplicado a mano en cada landing.
 */
export default function ServiceDetailBlocks({
  slug,
  showDescription = true,
  showDetails = true,
  showFeatures = true,
}: ServiceDetailBlocksProps) {
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return null;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {showDescription && (
        <p className="text-gray-600 leading-relaxed text-base sm:text-lg max-w-4xl">
          {service.fullDescription}
        </p>
      )}

      {showDetails && (
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">¿Qué incluye?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service.details.map((detail) => (
            <div key={detail} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{detail}</span>
            </div>
          ))}
        </div>
      </div>
      )}

      {showFeatures && (
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Características principales
        </h2>
        <ul className="space-y-3">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-700 flex-shrink-0" />
              <span className="text-gray-700">{f}</span>
            </li>
          ))}
        </ul>
      </div>
      )}
    </section>
  );
}
