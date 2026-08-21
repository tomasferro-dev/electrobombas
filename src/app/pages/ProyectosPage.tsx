import { useState, useEffect, useCallback } from 'react';
import { useSlideshow } from '../lib/useSlideshow';
import { countProjectImages, useProjectImages } from '../lib/projectImages';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Filter } from 'lucide-react';
import { PROJECTS, Project } from '../data';
import Breadcrumb from '../components/Breadcrumb';
import SEO from '../components/SEO';

// ── Banner carrusel ────────────────────────────────────────────
import Bg1 from '../../assets/proyectos/BANNER/banner11.webp';
import Bg2 from '../../assets/proyectos/BANNER/banner3.webp';
import Bg3 from '../../assets/proyectos/BANNER/banner4.webp';
import Bg5 from '../../assets/proyectos/BANNER/banner6.webp';
import Bg6 from '../../assets/proyectos/BANNER/banner7.webp';
import Bg7 from '../../assets/proyectos/BANNER/banner8.webp';
import Img from '../components/Img';

// ── Estado del lightbox por proyecto ──────────────────────────
type LightboxState = { images: string[]; idx: number; projectTitle: string };

// ── Colores por servicio ───────────────────────────────────────
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

function serviceColor(s: string) {
  return SERVICE_COLORS[s] ?? 'bg-gray-100 text-gray-700';
}

// ──────────────────────────────────────────────────────────────
// Componente principal
// ──────────────────────────────────────────────────────────────
export default function ProyectosPage() {

  // Banner carrusel
  const bannerImages = [Bg6, Bg7, Bg1, Bg5, Bg2, Bg3];
  const {
    current: bannerCurrent,
    isMounted: bannerMounted,
    imgProps: bannerImgProps,
  } = useSlideshow(bannerImages.length);

  // Filtros
  const allServices = Array.from(new Set(PROJECTS.flatMap((p) => p.servicios))).sort();
  const [activeService,   setActiveService]   = useState<string | null>(null);
  const [activeProvincia, setActiveProvincia] = useState<'San Juan' | 'Mendoza' | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  // Proyectos filtrados
  const filteredProjects = PROJECTS.filter((p) => {
    if (activeService   && !p.servicios.includes(activeService))  return false;
    if (activeProvincia && p.provincia !== activeProvincia)        return false;
    return true;
  });

  // Lightbox por proyecto
  // onOpenLightbox recibe las imágenes ya cargadas desde ProjectCard
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const openLightbox = useCallback((images: string[], src: string, title: string) => {
    const idx = images.indexOf(src);
    if (idx !== -1) setLightbox({ images, idx, projectTitle: title });
  }, []);

  const closeLightbox = () => setLightbox(null);

  const prevImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setLightbox((lb) => lb && lb.idx > 0 ? { ...lb, idx: lb.idx - 1 } : lb);
  }, []);

  const nextImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setLightbox((lb) => lb && lb.idx < lb.images.length - 1 ? { ...lb, idx: lb.idx + 1 } : lb);
  }, []);

  // Teclado en lightbox
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  setLightbox((lb) => lb && lb.idx > 0 ? { ...lb, idx: lb.idx - 1 } : lb);
      if (e.key === 'ArrowRight') setLightbox((lb) => lb && lb.idx < lb.images.length - 1 ? { ...lb, idx: lb.idx + 1 } : lb);
      if (e.key === 'Escape')     closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  return (
    <>
      <SEO
        title="Proyectos de Electrobombas y Pozos de Agua"
        description="Conocé nuestros proyectos en Mendoza, San Juan y resto de Argentina: extracción, colocación, limpieza, filmación y rehabilitación de pozos de agua."
        canonical="/proyectos"
      />
      <Breadcrumb />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className="relative h-[450px] flex items-center justify-center text-white overflow-hidden">
        {bannerImages.map((img, i) =>
          bannerMounted(i) ? (
            <Img
              key={i}
              src={img}
              alt={i === 0 ? 'Obras de perforación y mantenimiento de pozos de agua' : ''}
              {...bannerImgProps(i)}
              className={`absolute inset-0 w-full h-full object-cover object-[center_40%] transition-opacity duration-1000 ${
                i === bannerCurrent ? 'opacity-100' : 'opacity-0'
              }`}
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            />
          ) : null,
        )}
        <div className="absolute inset-0 bg-gray-900/40" />
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/80 via-gray-900/40 to-transparent" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-4">Galería de Proyectos</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Conocé nuestros trabajos realizados en Mendoza y San Juan a lo largo de más de 20 años
          </p>
        </div>
      </div>

      {/* ── BARRA DE FILTROS ──────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 flex-wrap">

          {/* Botón abrir/cerrar */}
          <button
            onClick={() => setFilterOpen((v) => !v)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              filterOpen
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filtros
            <span className={`transition-transform duration-200 inline-block ${filterOpen ? 'rotate-180' : ''}`}>▾</span>
          </button>

          {/* Chips de filtros activos */}
          {activeProvincia && (
            <span className="inline-flex items-center gap-1.5 bg-gray-700 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              {activeProvincia}
              <button onClick={() => setActiveProvincia(null)} className="hover:text-gray-300 transition-colors leading-none">✕</button>
            </span>
          )}
          {activeService && (
            <span className="inline-flex items-center gap-1.5 bg-red-700 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              {activeService}
              <button onClick={() => setActiveService(null)} className="hover:text-red-200 transition-colors leading-none">✕</button>
            </span>
          )}
        </div>

        {/* Panel desplegable */}
        {filterOpen && (
          <div className="border-t border-gray-100 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-4">

              {/* Provincia */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Provincia</p>
                <div className="flex flex-wrap gap-2">
                  {(['San Juan', 'Mendoza'] as const).map((prov) => (
                    <button
                      key={prov}
                      onClick={() => { setActiveProvincia(activeProvincia === prov ? null : prov); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        activeProvincia === prov
                          ? 'bg-gray-800 text-white'
                          : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {prov}
                    </button>
                  ))}
                </div>
              </div>

              {/* Servicio */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Servicio</p>
                <div className="flex flex-wrap gap-2">
                  {allServices.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setActiveService(activeService === s ? null : s); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        activeService === s
                          ? 'bg-red-700 text-white'
                          : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Limpiar */}
              {(activeService || activeProvincia) && (
                <button
                  onClick={() => { setActiveService(null); setActiveProvincia(null); }}
                  className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
                >
                  Limpiar todos los filtros
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── CONTENIDO: LISTA ÚNICA ────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenLightbox={openLightbox}
                accentColor="red"
              />
            ))}
          </div>
        ) : (
          <p className="text-center py-20 text-gray-400">
            No hay proyectos para los filtros seleccionados.
          </p>
        )}
      </div>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-16 bg-red-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl mb-4">¿Querés ser nuestro próximo proyecto?</h2>
          <p className="text-red-100 mb-8 max-w-xl mx-auto">
            Contáctanos y te asesoramos sin cargo para encontrar la mejor solución.
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 bg-white text-red-700 px-8 py-4 rounded-lg font-medium hover:bg-red-50 transition-colors"
          >
            Solicitar Presupuesto
          </Link>
        </div>
      </section>

      {/* ── LIGHTBOX POR PROYECTO ─────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Cerrar */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Anterior */}
          {lightbox.idx > 0 && (
            <button
              className="absolute left-3 sm:left-6 text-white/70 hover:text-white transition-colors bg-black/30 rounded-full p-2"
              onClick={prevImage}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Imagen */}
          <img
            src={lightbox.images[lightbox.idx]}
            alt=""
            className="max-w-full max-h-[82vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Siguiente */}
          {lightbox.idx < lightbox.images.length - 1 && (
            <button
              className="absolute right-3 sm:right-6 text-white/70 hover:text-white transition-colors bg-black/30 rounded-full p-2"
              onClick={nextImage}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Info inferior */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center px-4 py-3">
            <p className="text-sm font-medium line-clamp-1">{lightbox.projectTitle}</p>
            <p className="text-xs text-white/50 mt-0.5">
              {lightbox.idx + 1} / {lightbox.images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// ──────────────────────────────────────────────────────────────
// Sub-componente: tarjeta de proyecto
// ──────────────────────────────────────────────────────────────
interface ProjectCardProps {
  project: Project;
  onOpenLightbox: (images: string[], src: string, title: string) => void;
  accentColor: 'blue' | 'red';
}

function ProjectCard({ project, onOpenLightbox, accentColor }: ProjectCardProps) {
  // Carga las imágenes del proyecto al montar la tarjeta
  const images = useProjectImages(project.imageFolder);
  // Cuenta de imágenes disponible de inmediato (solo lee las claves del glob)
  const imageCount = countProjectImages(project.imageFolder);

  const mainImg  = images[0];
  const restImgs = images.slice(1, 5);
  const [descExpanded, setDescExpanded] = useState(false);

  const linkColor = accentColor === 'blue' ? 'text-blue-700 hover:text-blue-900' : 'text-red-700 hover:text-red-900';
  const btnColor  = accentColor === 'blue' ? 'text-blue-600 hover:text-blue-800' : 'text-red-600 hover:text-red-800';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">

      {/* Área de imágenes */}
      {imageCount > 0 ? (
        <div className="relative">
          {/* Imagen principal */}
          <button
            className="block w-full aspect-video overflow-hidden group"
            onClick={() => mainImg && onOpenLightbox(images, mainImg, project.title)}
            disabled={!mainImg}
          >
            {mainImg ? (
              <Img
                src={mainImg}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              />
            ) : (
              // Skeleton mientras carga la imagen principal
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            )}
            {mainImg && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-3 py-1 rounded-full">
                  Ampliar
                </span>
              </div>
            )}
          </button>

          {/* Miniaturas */}
          {restImgs.length > 0 && (
            <div className={`grid gap-1 p-1 bg-gray-50 ${
              restImgs.length === 1 ? 'grid-cols-1' :
              restImgs.length === 2 ? 'grid-cols-2' :
              restImgs.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
            }`}>
              {restImgs.map((src, i) => (
                <button
                  key={i}
                  className="aspect-square overflow-hidden rounded group relative"
                  onClick={() => onOpenLightbox(images, src, project.title)}
                >
                  <Img
                    src={src}
                    alt={`${project.title} foto ${i + 2}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  />
                  {/* Badge de "más fotos" en la última miniatura */}
                  {i === restImgs.length - 1 && imageCount > 5 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
                      <span className="text-white text-sm font-semibold">+{imageCount - 5}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
          <p className="text-white/30 text-xs text-center px-4">Imágenes próximamente</p>
        </div>
      )}

      {/* Info del proyecto */}
      <div className="p-5">
        <h3 className={`font-semibold text-gray-900 text-base leading-snug mb-2 ${linkColor} transition-colors`}>
          <Link to={`/proyectos/${project.id}`}>{project.title}</Link>
        </h3>

        <p className={`text-gray-600 text-sm leading-relaxed ${descExpanded ? 'mb-1' : 'line-clamp-3 mb-0'}`}>
          {project.descripcion}
        </p>
        <button
          onClick={() => setDescExpanded((v) => !v)}
          className={`text-xs font-medium mb-3 ${btnColor} transition-colors`}
        >
          {descExpanded ? 'Ver menos ↑' : 'Ver más ↓'}
        </button>

        {/* Chips de servicios */}
        <div className="flex flex-wrap gap-1.5">
          {project.servicios.map((s) => (
            <span key={s} className={`text-xs font-medium px-2 py-0.5 rounded-full ${serviceColor(s)}`}>
              {s}
            </span>
          ))}
        </div>

        {/* Cantidad de fotos (disponible inmediatamente) */}
        {imageCount > 0 && (
          <p className="text-xs text-gray-400 mt-3">
            {imageCount} {imageCount === 1 ? 'foto' : 'fotos'} · {project.provincia}
          </p>
        )}
      </div>
    </div>
  );
}
