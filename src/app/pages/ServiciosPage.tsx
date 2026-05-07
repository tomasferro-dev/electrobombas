
import { useState, useEffect } from 'react';
import Services from '../components/Services';
import Breadcrumb from '../components/Breadcrumb';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { CONTACT } from '../data';

// Imágenes del carrusel
import Bg1 from '../../assets/serv1.jpg';
import Bg2 from '../../assets/hero4.jpeg';
import Bg3 from '../../assets/agua1.jpg';

export default function ServiciosPage() {
  const waUrl = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    'Hola! Quisiera consultar sobre sus servicios.'
  )}`;

  // Carrusel
  const images = [Bg1, Bg2, Bg3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // más natural que 2s

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SEO
        title="Servicios de Electrobombas y Pozos de Agua"
        description="Venta, reparación, alquiler de electrobombas, perforación de pozos, bobinados, filmaciones, limpieza y más. Cobertura en Mendoza, San Juan y resto de Argentina."
        canonical="/servicios"
      />
      <Breadcrumb />

      {/* HERO con carrusel */}
      <div className="relative h-[450px] flex items-center justify-center text-white overflow-hidden">
        
        {/* Carrusel */}
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Servicios"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Overlay base (más liviano) */}
        <div className="absolute inset-0 bg-gray-900/40" />

        {/* Gradiente diagonal PRO */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/80 via-gray-900/40 to-transparent" />

        {/* Contenido */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-4">
            Nuestros Servicios
          </h1>

          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Soluciones integrales en perforación y mantenimiento de pozos de agua en Mendoza y San Juan
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            <FaWhatsapp className="w-5 h-5" />
            Consultar por WhatsApp
          </a>
        </div>
      </div>
      {/* Servicios */}
      <Services />

      {/* CTA bottom */}
      <section className="py-16 bg-red-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl mb-4">¿No encontrás lo que buscás?</h2>
          <p className="text-red-100 mb-8 max-w-xl mx-auto">
            Contáctanos y te asesoramos sin costo ni compromiso. Tenemos solución para cada proyecto.
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 bg-white text-red-700 px-8 py-4 rounded-lg font-medium hover:bg-red-50 transition-colors"
          >
            Ir a Contacto
          </Link>
        </div>
      </section>
    </>
  );
}
