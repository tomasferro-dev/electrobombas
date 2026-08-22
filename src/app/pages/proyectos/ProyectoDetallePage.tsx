import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useCallback, memo } from 'react';
import { ArrowLeft, MapPin, ChevronLeft, ChevronRight, X } from 'lucide-react';
import WhatsAppIcon from '../../components/WhatsAppIcon';
import { PROJECTS, whatsappLink } from '../../data';
import Breadcrumb from '../../components/Breadcrumb';
import SEO from '../../components/SEO';
import NotFoundPage from '../NotFoundPage';

const SERVICE_COLORS: Record<string, string> = {
  'Extracción de electrobomba':   'bg-blue-100 text-blue-800',
  'Colocación de electrobomba':   'bg-sky-100 text-sky-800',
  'Colocación de electrobomba nueva': 'bg-sky-100 text-sky-800',
  'Colocación de equipo nuevo':   'bg-sky-100 text-sky-800',
  'Limpieza de perforaciones':    'bg-green-100 text-green-800',
  'Reactivación de perforaciones':'bg-teal-100 text-teal-800',
  'Filmación de pozos':           'bg-purple-100 text-purple-800',
  'Pesca de electrobomba':        'bg-amber-100 text-amber-800',
  'Desarrollo de perforación nueva': 'bg-orange-100 text-orange-800',
  'Rehabilitación de perforación en abandono': 'bg-red-100 text-red-800',
  'Reentubación de perforación':  'bg-rose-100 text-rose-800',
  'Alquiler de electrobomba':     'bg-indigo-100 text-indigo-800',
  'Venta de equipo nuevo':        'bg-yellow-100 text-yellow-800',
  'Mantenimiento de pozos':       'bg-cyan-100 text-cyan-800',
  'Colocación de cañería':        'bg-slate-100 text-slate-800',
};

export default function ProyectoDetallePage() {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find((p) => p.id === id);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);

  // Todos los hooks van ANTES del early return del 404: si no, al navegar
  // entre un proyecto valido y uno inexistente React ve una cantidad
  // distinta de hooks entre renders y rompe.
  const imageFolder = project?.imageFolder;
  useEffect(() => {
    if (imageFolder) loadProjectImages(imageFolder).then(setImages);
  }, [imageFolder]);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const prevImg = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : images.length - 1));
  }, [images.length]);

  const nextImg = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIdx((i) => (i !== null && i < images.length - 1 ? i + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : images.length - 1));
      if (e.key === 'ArrowRight') setLightboxIdx((i) => (i !== null && i < images.length - 1 ? i + 1 : 0));
      if (e.key === 'Escape')     closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIdx, images.length, closeLightbox]);

  // Id inexistente = 404 real. Redirigir a /proyectos generaba un soft 404.
  if (!project) return <NotFoundPage />;

  const waUrl = whatsappLink(`Hola! Vi el proyecto "${project.title}" y quisiera consultar.`);

  // Proyectos relacionados: mismo servicio principal
  const related = PROJECTS
    .filter((p) => p.id !== project.id && p.servicios.some((s) => project.servicios.includes(s)))
    .slice(0, 3);

  return (
    <>
      <SEO
        title={project.seoTitle ?? project.title}
        description={project.metaDescription ?? project.descripcion.slice(0, 155)}
        canonical={`/proyectos/${project.id}`}
        brandSuffix={false}
      />
      <Breadcrumb label={project.title} />

      {/* Header */}
      <div className="relative text-white py-14 px-4 overflow-hidden">
        {/* Imagen de fondo */}
        {images[0] && (
          <Img
            src={images[0]}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          />
        )}
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50" />

        <div className="relative container mx-auto sm:px-6 lg:px-8">
          <Link
            to="/proyectos"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Proyectos
          </Link>
          <div className="flex flex-wrap items-start gap-2 max-w-3xl">
            {project.servicios.slice(0, 3).map((s) => (
              <span key={s} className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                {s}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold mt-4 mb-3">{project.title}</h1>
          {project.provincia && (
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <MapPin className="w-4 h-4" />
              {project.provincia}, Argentina
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Galería + descripción */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Descripción del Proyecto</h2>
              <p className="text-gray-600 leading-relaxed">{project.descripcion}</p>
            </div>

            {/* Servicios */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Servicios Realizados</h2>
              <div className="flex flex-wrap gap-2">
                {project.servicios.map((s) => (
                  <span
                    key={s}
                    className={`text-sm font-medium px-3 py-1 rounded-full ${SERVICE_COLORS[s] ?? 'bg-gray-100 text-gray-700'}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Grid de fotos */}
            {images.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Fotos del Proyecto
                  <span className="text-sm text-gray-400 font-normal ml-2">({images.length} fotos)</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxIdx(i)}
                      className="aspect-square rounded-xl overflow-hidden group relative"
                    >
                      <Img
                        src={src}
                        alt={`${project.title} foto ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-medium">Ampliar</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-gray-100 h-48 flex items-center justify-center text-gray-400">
                <p className="text-center text-sm px-8">Fotos próximamente disponibles.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">¿Te interesa un proyecto similar?</h3>
              <p className="text-gray-600 text-sm mb-6">Contáctanos y analizamos tu caso sin costo.</p>
              <div className="space-y-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3.5 rounded-lg font-medium transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Consultar por WhatsApp
                </a>
                <Link
                  to="/contacto"
                  className="w-full flex items-center justify-center gap-2 border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white px-5 py-3.5 rounded-lg font-medium transition-colors"
                >
                  Formulario de Contacto
                </Link>
              </div>
            </div>

            {/* Datos del proyecto */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h4 className="font-semibold text-gray-900 mb-3">Datos del Proyecto</h4>
              <dl className="space-y-2 text-sm">
                {project.provincia && (
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-24 flex-shrink-0">Provincia</dt>
                    <dd className="text-gray-900 font-medium">{project.provincia}</dd>
                  </div>
                )}
                <div className="flex gap-2">
                  <dt className="text-gray-500 w-24 flex-shrink-0">Servicios</dt>
                  <dd className="text-gray-900 font-medium">{project.servicios.length}</dd>
                </div>
                {images.length > 0 && (
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-24 flex-shrink-0">Fotos</dt>
                    <dd className="text-gray-900 font-medium">{images.length}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>

        {/* Proyectos relacionados */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Proyectos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <RelatedProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && images.length > 0 && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-3 sm:left-6 text-white/70 hover:text-white bg-black/30 rounded-full p-2"
            onClick={prevImg}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img
            src={images[lightboxIdx]}
            alt={`${project.title} — foto ${lightboxIdx + 1} de ${images.length}`}
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-3 sm:right-6 text-white/70 hover:text-white bg-black/30 rounded-full p-2"
            onClick={nextImg}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightboxIdx + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}

// Sub-componente para tarjeta de proyecto relacionado
import type { Project } from '../../data';
import { useFirstProjectImage, loadProjectImages } from '../../lib/projectImages';
import Img from '../../components/Img';

const RelatedProjectCard = memo(function RelatedProjectCard({ project: p }: { project: Project }) {
  const cover = useFirstProjectImage(p.imageFolder);
  return (
    <Link
      to={`/proyectos/${p.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
    >
      <div className="aspect-video overflow-hidden">
        {cover ? (
          <Img
            src={cover}
            alt={p.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <span className="text-white/30 text-xs">Sin imagen</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm group-hover:text-red-700 transition-colors line-clamp-2">
          {p.title}
        </h3>
        {p.provincia && (
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <MapPin className="w-3 h-3" />
            {p.provincia}
          </div>
        )}
      </div>
    </Link>
  );
});
