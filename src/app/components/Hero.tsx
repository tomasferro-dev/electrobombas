import { Phone, FileText, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import HeroImage1 from '../../assets/pesca22.jpg';
import HeroImage2 from '../../assets/hero1.jpg';
import HeroImage3 from '../../assets/hero5.jpg';
import HeroImage4 from '../../assets/limpieza1.jpg';

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

  const images = [HeroImage1, HeroImage2, HeroImage3, HeroImage4];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        transition: { duration: 0.6, ease: "easeOut" as const }
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Perforación de pozos de agua en Argentina"
            className={`absolute right-0 top-0 h-full w-[75%] object-cover object-[80%_center] transition-opacity duration-1000 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 bg-red-700/20 border border-red-700/30 text-red-300 text-sm
             px-4 py-1.5 rounded-full mb-4 mt-6"
          >
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            Base en Mendoza · Servicio en todo el país
          </motion.div>

          {/* Título — H1 principal con keywords nacionales + locales */}
          <motion.h1
            variants={item}
            className="text-3xl sm:text-5xl lg:text-6xl text-white mt-2 mb-6 leading-tight"
          >
            La Mejor Opción en Electrobombas en{' '}
            <span className="text-red-400">Mendoza, San Juan</span>
            {' '}y <span className="text-red-400">Todo Argentina</span>
          </motion.h1>

          {/* Subtítulo — keywords de servicios + cobertura */}
          <motion.h2
            variants={item}
            className="text-base sm:text-xl text-gray-300 mb-8 max-w-2xl"
          >
            Hacemos Reparación, Mantenimiento y Venta de Electrobombas, Bombas de Pozo de Agua, para uso{' '}
            <strong className="text-white">
              rural, residencial e industrial
            </strong>
            .
          </motion.h2>

          {/* Botones */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <motion.a
              href="tel:02614707318"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 bg-red-700 text-white px-8 py-4 rounded-md hover:bg-red-800 transition-colors text-lg font-medium"
            >
              <Phone className="w-5 h-5" />
              Llamar Ahora
            </motion.a>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-700 px-8 py-4 rounded-md hover:bg-gray-100 transition-colors text-lg font-medium"
              >
                <FileText className="w-5 h-5" />
                Solicitar Presupuesto
              </Link>
            </motion.div>
          </motion.div>

          {/* Features — refuerzan autoridad y cobertura */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-6 mb-24"
          >
            {[
              'Electrobombas Certificadas',
              'Más de 20 años de Experiencia',
              'Cobertura en Todo el País',
            ].map((f) => (
              <div key={f} className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm sm:text-base">{f}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection('servicios')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        aria-label="Ver servicios"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <ChevronDown className="w-10 h-10 text-white animate-bounce" />
      </motion.button>
    </section>
  );
}