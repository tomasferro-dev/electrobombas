import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import SEO from '../components/SEO';
import { CONTACT, whatsappLink } from '../data';

const SUGERENCIAS = [
  { to: '/venta', label: 'Venta de electrobombas' },
  { to: '/reparacion', label: 'Reparación de electrobombas' },
  { to: '/servicios', label: 'Todos nuestros servicios' },
  { to: '/proyectos', label: 'Obras realizadas' },
  { to: '/contacto', label: 'Contacto' },
];

/**
 * 404 real. No redirige: una redirección a la home convierte cualquier URL
 * inexistente en un duplicado de la portada y Google lo marca como soft 404.
 * El noindex saca la página del índice sin cortar el flujo de links.
 */
export default function NotFoundPage() {
  const waUrl = whatsappLink('Hola! Entré a un link del sitio que no funciona y quería consultarles.');

  return (
    <>
      <SEO
        title="Página no encontrada"
        description="La página que buscás no existe o cambió de dirección. Encontrá acá nuestros servicios de venta y reparación de electrobombas en Mendoza y San Juan."
        noindex
      />

      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="container mx-auto sm:px-6 lg:px-8 max-w-3xl text-center">
          <div className="inline-flex items-center justify-center bg-white/10 rounded-2xl p-4 mb-6">
            <SearchX className="w-9 h-9 text-red-400" />
          </div>
          <p className="font-mono text-sm tracking-[0.2em] text-red-400 mb-3">ERROR 404</p>
          <h1 className="text-3xl sm:text-5xl font-semibold mb-4 leading-tight">
            Esta página no existe
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Puede que el link esté mal escrito o que la página haya cambiado de dirección.
            Lo que buscabas probablemente esté acá abajo.
          </p>
        </div>
      </div>

      <section className="py-14 px-4">
        <div className="container mx-auto sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">¿Qué estabas buscando?</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SUGERENCIAS.map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  className="block bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-5 py-4 text-gray-800 font-medium transition-colors"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-medium transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Consultar por WhatsApp
            </a>
            <a
              href={CONTACT.phones[0].href}
              className="inline-flex items-center justify-center gap-2 border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white px-6 py-4 rounded-lg font-medium transition-colors"
            >
              Llamar al {CONTACT.phones[0].number}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
