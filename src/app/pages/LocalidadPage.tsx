import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import SEO from '../components/SEO';
import Faq from '../components/Faq';
import Breadcrumb from '../components/Breadcrumb';
import NotFoundPage from './NotFoundPage';
import { findLocalidad } from '../data-localidades';
import { faqJsonLd } from '../data-faq';
import { PROJECTS, SERVICES, CONTACT, whatsappLink, serviceHref } from '../data';
import { useFirstProjectImage } from '../lib/projectImages';
import type { Project } from '../data';

function ObraCard({ project }: { project: Project }) {
  const cover = useFirstProjectImage(project.imageFolder);

  return (
    <Link
      to={`/proyectos/${project.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
    >
      <div className="h-40 bg-gray-100 overflow-hidden">
        {cover && (
          <img
            src={cover}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-sm leading-snug group-hover:text-red-700 transition-colors">
          {project.title}
        </h3>
        {project.provincia && (
          <p className="flex items-center gap-1 text-xs text-gray-500 mt-2">
            <MapPin className="w-3 h-3" />
            {project.provincia}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function LocalidadPage() {
  // El slug sale de la URL y no de una prop: asi la ruta puede declararse
  // con `lazy`, que es lo que vite-react-ssg necesita para juntar los assets
  // de cada pagina en el build.
  const { pathname } = useLocation();
  const loc = findLocalidad(pathname.replace(/^\//, ''));
  if (!loc) return <NotFoundPage />;

  const obras = loc.provincia
    ? PROJECTS.filter((p) => p.provincia === loc.provincia).slice(0, 6)
    : PROJECTS.slice(0, 6);

  const waUrl = whatsappLink(
    `Hola! Los contacto desde ${loc.zonas[0]}. Quisiera consultarles por un pozo / una electrobomba.`,
  );

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Arenas Electrobombas',
    description: loc.seoDescription,
    url: `https://www.arenaselectrobombas.com.ar/${loc.slug}`,
    telephone: '+5402614707318',
    email: CONTACT.email,
    image: 'https://www.arenaselectrobombas.com.ar/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1536 Jesús Nazareno',
      addressLocality: 'Maipú',
      addressRegion: 'Mendoza',
      postalCode: 'M5515',
      addressCountry: 'AR',
    },
    areaServed: loc.zonas.map((z) => ({ '@type': 'City', name: z })),
  };

  return (
    <>
      <SEO
        title={loc.seoTitle}
        description={loc.seoDescription}
        canonical={`/${loc.slug}`}
        brandSuffix={false}
        jsonLd={[localBusinessJsonLd, faqJsonLd(loc.faq)]}
      />
      <Breadcrumb label={loc.h1} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10 sm:py-16 px-4">
        <div className="container mx-auto sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-red-700/30 border border-red-500/30 text-red-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            <MapPin className="w-3.5 h-3.5" />
            {loc.provincia ?? 'Argentina'} · Más de 20 años
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-tight">
            {loc.h1}
          </h1>
          <p className="text-gray-300 text-sm sm:text-lg leading-relaxed">{loc.intro}</p>

          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3.5 rounded-lg font-medium transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Consultar por WhatsApp
            </a>
            <a
              href={CONTACT.phones[0].href}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white text-white px-6 py-3.5 rounded-lg font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              {CONTACT.phones[0].number}
            </a>
          </div>
        </div>
      </div>

      {/* ── CUERPO ───────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-3xl space-y-10">
        {loc.cuerpo.map((bloque) => (
          <section key={bloque.titulo}>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              {bloque.titulo}
            </h2>
            <p className="text-gray-600 leading-relaxed">{bloque.texto}</p>
          </section>
        ))}
      </div>

      {/* ── OBRAS EN LA ZONA ─────────────────────────────────── */}
      {obras.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-200 py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              Obras que hicimos en {loc.provincia ?? 'la zona'}
            </h2>
            <p className="text-gray-600 text-sm mb-8">
              Trabajos reales, con fotos de cada intervención.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {obras.map((p) => (
                <ObraCard key={p.id} project={p} />
              ))}
            </div>
            <Link
              to="/proyectos"
              className="inline-flex items-center gap-2 text-red-700 font-medium mt-8 hover:gap-3 transition-all"
            >
              Ver todas las obras
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* ── SERVICIOS ────────────────────────────────────────── */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
          Servicios disponibles en la zona
        </h2>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to={serviceHref(s)}
              className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-700 hover:border-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
            >
              {s.title}
            </Link>
          ))}
        </div>
      </section>

      {/* ── ZONAS ────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-t border-gray-200 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Localidades donde trabajamos
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">{loc.zonas.join(' · ')}</p>
        </div>
      </section>

      <Faq items={loc.faq} subtitle={`Consultas frecuentes de clientes de ${loc.provincia ?? 'la zona'}.`} />
    </>
  );
}
