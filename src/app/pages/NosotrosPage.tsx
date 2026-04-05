import WhyChooseUs from '../components/WhyChooseUs';
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';

export default function NosotrosPage() {
  return (
    <>
      <Breadcrumb />

      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-14 px-4">
        <div className="container mx-auto sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-4">Nosotros</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Más de 20 años de experiencia en perforación de pozos de agua en Mendoza y San Juan
          </p>
        </div>
      </div>

      <WhyChooseUs />

      {/* History section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Nuestra Historia</h2>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4 text-lg">
            <p>
              Arenas Perforaciones nació en la provincia de Mendoza con la misión de brindar soluciones
              integrales de acceso al agua para familias, productores agropecuarios e industrias de toda
              la región cuyana.
            </p>
            <p>
              A lo largo de más de dos décadas, hemos ejecutado proyectos de toda envergadura: desde
              pozos domiciliarios hasta perforaciones industriales de gran profundidad para complejos
              agrícolas, municipalidades y clubes deportivos.
            </p>
            <p>
              Nuestro equipo de técnicos y geólogos trabaja con equipos de última generación,
              garantizando en cada trabajo la máxima calidad, seguridad y eficiencia. Cada proyecto
              incluye documentación técnica completa y garantía escrita.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-red-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl mb-4">¿Querés trabajar con nosotros?</h2>
          <p className="text-red-100 mb-8 max-w-xl mx-auto">
            Consulta sobre nuestros servicios y recibí un presupuesto personalizado sin cargo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 bg-white text-red-700 px-8 py-4 rounded-lg font-medium hover:bg-red-50 transition-colors"
            >
              Ver Servicios
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
