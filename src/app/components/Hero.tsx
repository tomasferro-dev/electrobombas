import { Phone, FileText, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';
import HeroImage1 from '../../assets/pesca22.webp';
import HeroImage2 from '../../assets/hero1.webp';
import HeroImage3 from '../../assets/hero5.webp';
import HeroImage4 from '../../assets/limpieza1.webp';
import { useSlideshow } from '../lib/useSlideshow';
import Img from '../components/Img';

/** Índice del escalonado, que la clase .reveal lee como delay. */
const reveal = (i: number) => ({ '--reveal-i': i }) as CSSProperties;

const FEATURES = [
  'Electrobombas Certificadas',
  'Más de 20 años de Experiencia',
  'Cobertura en Todo el País',
];

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: 'smooth',
      });
    }
  };

  const images = [
    { src: HeroImage1, alt: 'Pesca y recuperación de una electrobomba en un pozo de agua' },
    { src: HeroImage2, alt: 'Equipo de perforación de pozos de agua en Mendoza' },
    { src: HeroImage3, alt: 'Colocación de electrobomba sumergible en perforación' },
    { src: HeroImage4, alt: 'Limpieza y desarrollo de una perforación de agua' },
  ];
  const { current, isMounted, imgProps } = useSlideshow(images.length);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {images.map((img, index) =>
          isMounted(index) ? (
            <Img
              key={index}
              src={img.src}
              alt={img.alt}
              {...imgProps(index)}
              className={`absolute right-0 top-0 h-full w-[75%] object-cover object-[80%_center] transition-opacity duration-1000 ${
                index === current ? 'opacity-100' : 'opacity-0'
              }`}
            sizes="75vw"
            />
          ) : null,
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            style={reveal(0)}
            className="reveal inline-flex items-center gap-2 bg-red-700/20 border border-red-700/30 text-red-300 text-sm
             px-4 py-1.5 rounded-full mb-4 mt-6"
          >
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            Base en Mendoza · Servicio en todo el país
          </div>

          {/* Título — H1 principal con keywords nacionales + locales */}
          <h1
            style={reveal(1)}
            className="reveal text-3xl sm:text-5xl lg:text-6xl text-white mt-2 mb-6 leading-tight"
          >
            La Mejor Opción en Electrobombas en{' '}
            <span className="text-red-400">Mendoza, San Juan</span>
            {' '}y <span className="text-red-400">Todo Argentina</span>
          </h1>

          {/* Subtítulo — keywords de servicios + cobertura */}
          <h2
            style={reveal(2)}
            className="reveal text-base sm:text-xl text-gray-300 mb-8 max-w-2xl"
          >
            Hacemos Reparación, Mantenimiento y Venta de Electrobombas, Bombas de Pozo de Agua, para uso{' '}
            <strong className="text-white">
              rural, residencial e industrial
            </strong>
            .
          </h2>

          {/* Botones */}
          <div style={reveal(3)} className="reveal flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href="tel:02614707318"
              className="inline-flex items-center justify-center gap-2 bg-red-700 text-white px-8 py-4 rounded-md hover:bg-red-800 text-lg font-medium
                transition-[transform,background-color] duration-200 hover:scale-105 active:scale-[0.97] motion-reduce:transform-none"
            >
              <Phone className="w-5 h-5" />
              Llamar Ahora
            </a>

            <Link
              to="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-white text-red-700 px-8 py-4 rounded-md hover:bg-gray-100 text-lg font-medium
                transition-[transform,background-color] duration-200 hover:scale-105 active:scale-[0.97] motion-reduce:transform-none"
            >
              <FileText className="w-5 h-5" />
              Solicitar Presupuesto
            </Link>
          </div>

          {/* Features — refuerzan autoridad y cobertura */}
          <div style={reveal(4)} className="reveal flex flex-wrap gap-6 mb-24">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm sm:text-base">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator — el centrado va en el contenedor y la animación
          en el botón: .reveal termina en transform:none y borraría el
          -translate-x-1/2 si compartieran elemento. */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => scrollToSection('servicios')}
          style={reveal(8)}
          className="reveal"
          aria-label="Ver servicios"
        >
          <ChevronDown className="w-10 h-10 text-white animate-bounce" />
        </button>
      </div>
    </section>
  );
}
