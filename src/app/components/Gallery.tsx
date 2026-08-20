import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { PROJECTS, Project } from '../data';

// ── Lazy glob: las imágenes se cargan solo cuando se necesitan ──
const allProjectImagesGlob = import.meta.glob(
  '../../assets/proyectos/**/*.webp',
  { import: 'default' }
) as Record<string, () => Promise<string>>;

function useFirstProjectImage(imageFolder: string): string | null {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    const entry = Object.entries(allProjectImagesGlob).find(([path]) => {
      if (path.includes('/BANNER/') || path.includes('/banner/')) return false;
      return path.includes(imageFolder);
    });
    if (entry) entry[1]().then(setSrc);
  }, [imageFolder]);
  return src;
}

const SERVICE_COLORS: Record<string, string> = {
  'Extracción de electrobomba':      'bg-blue-100 text-blue-800',
  'Colocación de electrobomba':      'bg-sky-100 text-sky-800',
  'Limpieza de perforaciones':       'bg-green-100 text-green-800',
  'Filmación de pozos':              'bg-purple-100 text-purple-800',
  'Pesca de electrobomba':           'bg-amber-100 text-amber-800',
  'Desarrollo de perforación nueva': 'bg-orange-100 text-orange-800',
};

interface GalleryProps {
  preview?: boolean;
}

// Sub-componente por tarjeta para poder usar el hook correctamente
function GalleryItem({ project }: { project: Project }) {
  const cover = useFirstProjectImage(project.imageFolder);
  const mainService = project.servicios[0];

  return (
    <Link
      to={`/proyectos/${project.id}`}
      className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white"
    >
      <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden">
        {cover && (
          <img
            src={cover}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 text-white">
            <p className="text-sm font-medium">Ver proyecto →</p>
          </div>
        </div>
        {mainService && (
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${SERVICE_COLORS[mainService] ?? 'bg-gray-100 text-gray-700'}`}>
              {mainService}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 leading-snug group-hover:text-red-700 transition-colors">
          {project.title}
        </h3>
        {project.provincia && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3" />
            {project.provincia}
          </div>
        )}
      </div>
    </Link>
  );
}

export default function Gallery({ preview = false }: GalleryProps) {
  const displayed = preview ? PROJECTS.slice(0, 4) : PROJECTS;

  return (
    <section id="galeria" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">Galería de Proyectos</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Conocé algunos de nuestros trabajos realizados en Mendoza y San Juan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayed.map((project) => (
            <GalleryItem key={project.id} project={project} />
          ))}
        </div>

        {preview && (
          <div className="text-center mt-12">
            <Link
              to="/proyectos"
              className="inline-flex items-center gap-2 bg-red-700 text-white px-8 py-4 rounded-md hover:bg-red-800 transition-colors font-medium"
            >
              Ver todos los proyectos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
