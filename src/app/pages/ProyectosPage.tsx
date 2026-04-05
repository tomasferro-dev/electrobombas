import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Filter } from 'lucide-react';
import { PROJECTS } from '../data';
import Breadcrumb from '../components/Breadcrumb';

// 👇 IMPORTÁ TUS IMÁGENES (igual que en servicios)
import Bg1 from '../../assets/proy11.jpg';
import Bg2 from '../../assets/proy22.jpg';
import Bg3 from '../../assets/proy3.jpg';

const CATEGORIES = ['Todos', ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

// const CATEGORY_COLORS = {
//   Perforación: 'bg-orange-100 text-orange-800',
//   Limpieza: 'bg-green-100 text-green-800',
//   Mantenimiento: 'bg-blue-100 text-blue-800',
//   Municipal: 'bg-purple-100 text-purple-800',
//   Institucional: 'bg-indigo-100 text-indigo-800',
// };

const CATEGORY_COLORS: { [key: string]: string } = {
  'Perforación': 'bg-orange-100 text-orange-800',
  'Limpieza': 'bg-green-100 text-green-800',
  'Mantenimiento': 'bg-blue-100 text-blue-800',
  'Municipal': 'bg-purple-100 text-purple-800',
  'Institucional': 'bg-indigo-100 text-indigo-800',
};

export default function ProyectosPage() {

  const [activeCategory, setActiveCategory] = useState('Todos');

  // 👇 CARRUSEL
  const images = [Bg1, Bg2, Bg3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const filtered =
    activeCategory === 'Todos'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <>
    
      <Breadcrumb />

      {/* HERO con carrusel */}
      <div className="relative h-[450px] flex items-center justify-center text-white overflow-hidden">

        {/* Carrusel */}
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Proyectos"
            className={`absolute inset-0 w-full h-full object-cover object-[center_40%] transition-opacity duration-1000 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-900/40" />
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/80 via-gray-900/40 to-transparent" />

        {/* Contenido */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-4">
            Galería de Proyectos
          </h1>

          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Conocé nuestros trabajos realizados en Mendoza y San Juan a lo largo de más de 20 años
          </p>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Category filter */}
        <div className="flex items-center gap-3 mb-10 flex-wrap">
          <Filter className="w-4 h-4 text-gray-500" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-red-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((project) => (
            <Link
              key={project.id}
              to={`/proyectos/${project.id}`}
              className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden">

                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <Images className="w-12 h-12 text-white/20" />
                </div> */}
                <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white text-sm font-medium p-4">Ver proyecto →</p>
                </div>

                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    CATEGORY_COLORS[project.category] ?? 'bg-gray-100 text-gray-700'
                  }`}>
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

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No hay proyectos en esta categoría todavía.
          </div>
        )}
      </div>

      {/* CTA */}
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
    </>
  );
}