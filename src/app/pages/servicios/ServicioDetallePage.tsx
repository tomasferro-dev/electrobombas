import ProjectsCarousel from "../../layouts/ProjectsCarousel";
import { useParams, Link, Navigate } from "react-router-dom";
import SEO from "../../components/SEO";
import {
  Droplet,
  Wrench,
  Video,
  Sparkles,
  Settings,
  Zap,
  Mountain,
  Anchor,
  ArrowLeft,
  Phone,
  CheckCircle2,
  Cog,
  ArrowRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { SERVICES, CONTACT } from "../../data";
import Breadcrumb from "../../components/Breadcrumb";
import ServiceImageGallery from "../../components/ServiceImageGallery";
import VentaProductos from "../../components/ProductCard";
import { SERVICE_IMAGES } from "../../data-service-images";

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

export default function ServicioDetallePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);
  //   const { slug, slug2 } = useParams();

  // const service = SERVICES.find(
  //   (s) => s.slug === slug && s.slug2 === slug2
  // );

  if (!service) return <Navigate to="/servicios" replace />;

  const Icon = ICON_MAP[service.icon] ?? Droplet;
  const waMsg = encodeURIComponent(
    `Hola! Me gustaría consultar sobre el servicio de ${service.title}.`,
  );
  const waUrl = `https://wa.me/${CONTACT.whatsappNumber}?text=${waMsg}`;

  const related = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      <SEO
        title={service.title}
        description={service.shortDescription}
        canonical={`/servicios/${service.slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.fullDescription,
          provider: {
            '@type': 'LocalBusiness',
            name: 'Arenas Electrobombas',
            url: 'https://arenaselectrobombas.com.ar',
          },
          areaServed: ['Mendoza', 'San Juan', 'Argentina'],
        }}
      />
      <Breadcrumb label={service.title} />

      {/* Hero banner */}
      <div className="relative text-white">
        <img
          src={service.imageDetail || service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 sm:mb-8 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Servicios
            </Link>

            {/* Icono + Título + Descripción */}
            <div className="max-w-3xl">
              {/* Fila icono + título: apilados en mobile, en fila desde sm */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-3 sm:mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5 sm:p-4 w-fit flex-shrink-0">
                  <Icon className="w-6 h-6 sm:w-9 sm:h-9 lg:w-12 lg:h-12 text-white" />
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
                  {service.title}
                </h1>
              </div>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="flex items-center justify-between mb-6 ">
                {/* <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Descripción del Servicio
                </h2> */}

                {slug === "reparacion" && (
                  <Link
                    to="/reparacion"
                    className="inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
                  >
                    <Cog className="w-5 h-5" />
                    Cómo Trabajamos
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {service.fullDescription}
              </p>
            </div>
            {service.slug === "electrobombas" && (
              <div className="border-t border-gray-100 pt-8">
                <div className="text-center mb-6">
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    ¿Estás Buscando Reparar o Comprar una Electrobomba?
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/electrobombas/reparacion"
                    className="inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
                  >
                    <Cog className="w-5 h-5" />
                    Reparación de Electrobombas
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/electrobombas/venta"
                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Venta de Electrobombas
                  </Link>
                </div>
              </div>
            )}
            {slug === "venta" || slug === "alquiler" ? (
              <VentaProductos variant={slug === "alquiler" ? "alquiler" : "venta"} />
            ) : (
              slug !== "electrobombas" && (
                <ServiceImageGallery
                  images={SERVICE_IMAGES[slug ?? ""] ?? []}
                  altBase={service.title}
                />
              )
            )}

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                ¿Qué incluye?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.details.map((detail) => (
                  <div
                    key={detail}
                    className="flex items-start gap-3 bg-gray-50 rounded-lg p-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Características Principales
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                ¿Necesitás este servicio?
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Contactanos ahora para un presupuesto sin costo ni compromiso.
              </p>
              <div className="space-y-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-medium transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Consultar por WhatsApp
                </a>
                <a
                  href={`tel:${CONTACT.phones[0].href.replace("tel:", "")}`}
                  className="w-full flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white px-6 py-4 rounded-lg font-medium transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Llamar Ahora
                </a>
                <Link
                  to="/contacto"
                  className="w-full flex items-center justify-center gap-2 border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white px-6 py-4 rounded-lg font-medium transition-colors"
                >
                  Formulario de Contacto
                </Link>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Atención Lun–Vie 8:00–17:00 · Sáb 8:00–12:00
                </p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
              <h4 className="font-semibold text-red-800 mb-2">
                Zonas de Cobertura
              </h4>
              <p className="text-red-700 text-sm">
                Mendoza, San Juan, San Luis, Noroeste, Noreste, Región Pampeana
                y Patagonia.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ← CARRUSEL DE PROYECTOS RELACIONADOS → */}
      <ProjectsCarousel slug={service.slug} />

      {/* Otros servicios */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Otros Servicios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((s) => {
              const RelIcon = ICON_MAP[s.icon] ?? Droplet;
              return (
                <Link
                  key={s.id}
                  to={`/servicios/${s.slug}`}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div
                    className={`inline-flex bg-gradient-to-br ${s.gradient} p-3 rounded-lg mb-4`}
                  >
                    <RelIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {s.shortDescription}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
