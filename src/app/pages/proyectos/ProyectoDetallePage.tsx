import { useParams, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, MapPin, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { PROJECTS, CONTACT } from '../../data';
import Breadcrumb from '../../components/Breadcrumb';

export default function ProyectoDetallePage() {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find((p) => p.id === id);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  if (!project) return <Navigate to="/proyectos" replace />;

  // Placeholder images — replace with actual import.meta.glob images in production
  // const images: string[] = []; // project.images would go here
  const images = project.images ?? [];

  const waMsg = encodeURIComponent(`Hola! Vi el proyecto "${project.title}" y quisiera consultar.`);
  const waUrl = `https://wa.me/${CONTACT.whatsappNumber}?text=${waMsg}`;

  // Related projects
  const related = PROJECTS.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 3);

  return (
    <>
      <Breadcrumb label={project.title} />

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-14 px-4">
        <div className="container mx-auto sm:px-6 lg:px-8">
          <Link
            to="/proyectos"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Proyectos
          </Link>
          <div className="flex flex-wrap items-start gap-4 max-w-3xl">
            <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
              {project.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold mt-4 mb-3">{project.title}</h1>
          {project.location && (
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <MapPin className="w-4 h-4" />
              {project.location}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Gallery + description */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Descripción del Proyecto</h2>
              <p className="text-gray-600 leading-relaxed">{project.description}</p>
            </div>

            {/* Image grid */}
            {images.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Fotos del Proyecto</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxIdx(i)}
                      className="aspect-square rounded-lg overflow-hidden group relative"
                    >
                      <img src={src} alt={`${project.title} foto ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      {/* <img src={src} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" /> */}
                      
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-gray-100 h-64 flex items-center justify-center text-gray-400">
                <p className="text-center text-sm px-8">
                  Las fotos de este proyecto se cargan desde la carpeta de assets.<br />
                  Integrá las imágenes reales usando <code className="bg-gray-200 px-1 rounded">import.meta.glob</code> en Gallery.tsx.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">¿Te interesa un proyecto similar?</h3>
              <p className="text-gray-600 text-sm mb-6">
                Contáctanos y analizamos tu caso sin costo.
              </p>
              <div className="space-y-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3.5 rounded-lg font-medium transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5" />
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

            {/* Project info */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h4 className="font-semibold text-gray-900 mb-3">Datos del Proyecto</h4>
              <dl className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="text-gray-500 w-24 flex-shrink-0">Categoría</dt>
                  <dd className="text-gray-900 font-medium">{project.category}</dd>
                </div>
                {project.location && (
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-24 flex-shrink-0">Ubicación</dt>
                    <dd className="text-gray-900 font-medium">{project.location}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Proyectos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/proyectos/${p.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <span className="text-white/30 text-xs">Sin imagen</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-red-700 transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    {p.location && (
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <MapPin className="w-3 h-3" />
                        {p.location}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && images.length > 0 && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            onClick={() => setLightboxIdx(null)}
          >
            <X className="w-8 h-8" />
          </button>
          {lightboxIdx > 0 && (
            <button
              className="absolute left-4 text-white/80 hover:text-white"
              onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx - 1); }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
          )}
          <img
            src={images[lightboxIdx]}
            alt=""
            className="max-w-full max-h-[85vh] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          {lightboxIdx < images.length - 1 && (
            <button
              className="absolute right-4 text-white/80 hover:text-white"
              onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx + 1); }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          )}
          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightboxIdx + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
