import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS, Project } from "../data";
import { useFirstProjectImage } from '../lib/projectImages';

// Mapeo de slug de servicio → servicios del proyecto que matchean
const SERVICE_SLUG_MAP: Record<string, string[]> = {
  perforaciones:       ['Desarrollo de perforación nueva'],
  electrobombas:       ['Extracción de electrobomba', 'Colocación de electrobomba', 'Colocación de equipo nuevo', 'Colocación de electrobomba nueva', 'Alquiler de electrobomba'],
  bobinados:           [],
  filmaciones:         ['Filmación de pozos'],
  limpieza:            ['Limpieza de perforaciones'],
  pescas:              ['Pesca de electrobomba'],
  'estudios-geologicos': [],
  mantenimiento:       ['Mantenimiento de pozos', 'Reentubación de perforación', 'Rehabilitación de perforación en abandono'],
  venta:               ['Venta de equipo nuevo'],
  reparacion:          [],
  desarrollo:          ['Desarrollo de perforación nueva'],
};

const VISIBLE = 3;

interface ProjectsCarouselProps {
  slug: string;
}

// Sub-componente para usar el hook por tarjeta
function CarouselCard({ project }: { project: Project }) {
  const cover = useFirstProjectImage(project.imageFolder);

  return (
    <Link
      to={`/proyectos/${project.id}`}
      className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-100"
    >
      <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden">
        {cover && (
          <img
            src={cover}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
          <p className="text-white text-sm font-medium p-4">Ver proyecto →</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1.5 group-hover:text-red-700 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 text-xs line-clamp-2 mb-2">
          {project.descripcion}
        </p>
        {project.provincia && (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <MapPin className="w-3 h-3" />
            {project.provincia}
          </div>
        )}
      </div>
    </Link>
  );
}

export default function ProjectsCarousel({ slug }: ProjectsCarouselProps) {
  const matchingServices = SERVICE_SLUG_MAP[slug] ?? [];
  const related = matchingServices.length > 0
    ? PROJECTS.filter((p) => p.servicios.some((s) => matchingServices.includes(s)))
    : PROJECTS.slice(0, 6);

  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [animating, setAnimating] = useState(false);

  const canPrev = startIndex > 0;
  const canNext = startIndex + VISIBLE < related.length;

  const navigate = useCallback(
    (dir: "left" | "right") => {
      if (animating) return;
      if (dir === "left" && !canPrev) return;
      if (dir === "right" && !canNext) return;

      setDirection(dir);
      setAnimating(true);

      setTimeout(() => {
        setStartIndex((i) => (dir === "right" ? i + 1 : i - 1));
        setDirection(null);
        setAnimating(false);
      }, 300);
    },
    [animating, canPrev, canNext]
  );

  if (related.length === 0) return null;

  const visible = related.slice(startIndex, startIndex + VISIBLE);

  const animClass = animating
    ? direction === "right"
      ? "-translate-x-8 opacity-0"
      : "translate-x-8 opacity-0"
    : "translate-x-0 opacity-100";

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-red-700 text-sm font-medium uppercase tracking-widest mb-1">
              Trabajos realizados
            </p>
            <h2 className="text-2xl font-semibold text-gray-900">
              Proyectos relacionados
            </h2>
          </div>
          <Link
            to="/proyectos"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-red-700 font-medium hover:underline underline-offset-4"
          >
            Ver todos los proyectos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grilla de tarjetas */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ease-in-out ${animClass}`}
        >
          {visible.map((project) => (
            <CarouselCard key={project.id} project={project} />
          ))}
        </div>

        {/* Controles: flecha ← · puntos · flecha → */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("left")}
            disabled={!canPrev || animating}
            aria-label="Anterior"
            className={`w-9 h-9 rounded-full shadow-sm flex items-center justify-center transition-all duration-200
              ${canPrev && !animating
                ? "bg-white border border-gray-200 text-gray-700 hover:bg-red-700 hover:text-white hover:border-red-700"
                : "bg-gray-100 text-gray-300 cursor-not-allowed border border-transparent"
              }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {related.map((_, i) => {
              const isVisible = i >= startIndex && i < startIndex + VISIBLE;
              return (
                <span
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    isVisible ? "w-3 h-3 bg-red-600" : "w-2 h-2 bg-gray-300"
                  }`}
                />
              );
            })}
          </div>

          <button
            onClick={() => navigate("right")}
            disabled={!canNext || animating}
            aria-label="Siguiente"
            className={`w-9 h-9 rounded-full shadow-sm flex items-center justify-center transition-all duration-200
              ${canNext && !animating
                ? "bg-white border border-gray-200 text-gray-700 hover:bg-red-700 hover:text-white hover:border-red-700"
                : "bg-gray-100 text-gray-300 cursor-not-allowed border border-transparent"
              }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Link
            to="/proyectos"
            className="inline-flex items-center gap-1.5 text-sm text-red-700 font-medium hover:underline underline-offset-4"
          >
            Ver todos los proyectos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
