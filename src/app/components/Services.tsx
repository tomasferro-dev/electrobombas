import { Link } from "react-router-dom";
import {
  Droplet,
  Wrench,
  Video,
  Sparkles,
  Settings,
  Zap,
  Mountain,
  Anchor,
  ArrowRight,
} from "lucide-react";
import { SERVICES } from "../data";

const ICON_MAP: Record<string, React.ElementType> = {
  Droplet,
  Wrench,
  Video,
  Sparkles,
  Settings,
  Zap,
  Mountain,
  Anchor,
};

const SERVICE_SHORT_NAMES: Record<string, string> = {
  perforaciones: "Perforaciones",
  electrobombas: "Electrobombas",
  bobinados: "Bobinados",
  filmaciones: "Filmaciones",
  limpieza: "Limpieza",
  pescas: "Pescas",
  "estudios-geologicos": "Est. Geológicos",
  mantenimiento: "Mantenimiento",
};

interface ServicesProps {
  preview?: boolean;
}

export default function Services({ preview = false }: ServicesProps) {
  const displayed = preview ? SERVICES.slice(0, 3) : SERVICES;

  return (
    <section id="servicios" className="py-20 bg-gray-50">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl mb-4 text-gray-900">Nuestros Servicios</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones integrales en perforación y mantenimiento de pozos de
            agua en Mendoza, San Juan y todo el Territorio Argentino
          </p>
        </div>

        {/* Quick nav — lista horizontal de servicios */}
        {/* {!preview && ( */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {SERVICES.map((service) => {
              const Icon = ICON_MAP[service.icon] ?? Droplet;
              return (
                <Link
                  key={service.id}
                  to={`/servicios/${service.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 
                    bg-white text-sm text-gray-600 hover:border-red-600 hover:text-red-700 
                    hover:bg-red-50 transition-all duration-200 shadow-sm"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {SERVICE_SHORT_NAMES[service.slug] ?? service.title}
                </Link>
              );
            })}
          </div>
        {/* )} */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayed.map((service) => {
            const Icon = ICON_MAP[service.icon] ?? Droplet;
            return (
              <Link
                key={service.id}
                to={`/servicios/${service.slug}`}
                id={`servicio-${service.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all 
                duration-300 flex flex-col"
              >
                {/* Image header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.images[0] || service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2.5 rounded-full">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl mb-3 text-gray-900 group-hover:text-red-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">
                    {service.shortDescription}
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {service.features.slice(0, 3).map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <svg
                          className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1 text-red-700 text-sm font-medium mt-auto">
                    Ver más{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Ver todos button - only in preview mode */}
        {preview && (
          <div className="text-center mt-12">
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 bg-red-700 text-white px-8 py-4 rounded-md hover:bg-red-800 transition-colors font-medium"
            >
              Ver todos los servicios
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}