import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Images, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS } from "../data";

const SERVICE_TO_CATEGORY: Record<string, string> = {
  perforaciones: "Perforación",
  electrobombas: "Mantenimiento",
  bobinados: "Mantenimiento",
  filmaciones: "Mantenimiento",
  limpieza: "Limpieza",
  pescas: "Mantenimiento",
  "estudios-geologicos": "Perforación",
  mantenimiento: "Mantenimiento",
};

const CATEGORY_COLORS: Record<string, string> = {
  Perforación: "bg-orange-100 text-orange-800",
  Limpieza: "bg-green-100 text-green-800",
  Mantenimiento: "bg-blue-100 text-blue-800",
  Municipal: "bg-purple-100 text-purple-800",
  Institucional: "bg-indigo-100 text-indigo-800",
};

const VISIBLE = 3;

interface ProjectsCarouselProps {
  slug: string;
}

export default function ProjectsCarousel({ slug }: ProjectsCarouselProps) {
  const category = SERVICE_TO_CATEGORY[slug];
  const related = category ? PROJECTS.filter((p) => p.category === category) : [];

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

  // Clases de animación según dirección
  const animClass = animating
    ? direction === "right"
      ? "-translate-x-8 opacity-0"
      : "translate-x-8 opacity-0"
    : "translate-x-0 opacity-100";

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Carousel */}
        <div className="relative">
          {/* Prev button */}
          <button
            onClick={() => navigate("left")}
            disabled={!canPrev || animating}
            aria-label="Anterior"
            className={`absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-200
              ${canPrev && !animating
                ? "bg-white text-gray-700 hover:bg-red-700 hover:text-white"
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ease-in-out ${animClass}`}
          >
            {visible.map((project) => (
              <Link
                key={project.id}
                to={`/proyectos/${project.id}`}
                className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-100"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Images className="w-12 h-12 text-white/20" />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <p className="text-white text-sm font-medium p-4">
                      Ver proyecto →
                    </p>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        CATEGORY_COLORS[project.category] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1.5 group-hover:text-red-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                    {project.description}
                  </p>
                  {project.location && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() => navigate("right")}
            disabled={!canNext || animating}
            aria-label="Siguiente"
            className={`absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-200
              ${canNext && !animating
                ? "bg-white text-gray-700 hover:bg-red-700 hover:text-white"
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {related.map((_, i) => {
            const isVisible = i >= startIndex && i < startIndex + VISIBLE;
            return (
              <span
                key={i}
                className={`rounded-full bg-gray-300 transition-all duration-300 ${
                  isVisible ? "w-3 h-3 bg-red-600" : "w-2 h-2"
                }`}
              />
            );
          })}
        </div>

        {/* Mobile link */}
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