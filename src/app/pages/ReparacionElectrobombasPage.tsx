import { Cog, CheckCircle2, Phone, Wrench, Zap, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Contact from '../components/Contact';
import Breadcrumb from '../components/Breadcrumb';
import { CONTACT } from '../data';

const PROCESO = [
  {
    paso: '01',
    titulo: 'Diagnóstico completo',
    descripcion: 'Evaluamos eléctrica y mecánicamente tu electrobomba para identificar el problema con precisión.',
    icon: Settings,
  },
  {
    paso: '02',
    titulo: 'Presupuesto sin cargo',
    descripcion: 'Te informamos el costo exacto antes de comenzar cualquier trabajo. Sin sorpresas.',
    icon: Phone,
  },
  {
    paso: '03',
    titulo: 'Reparación especializada',
    descripcion: 'Bobinado, recambio de rodamientos, sellos, impulsor o lo que requiera tu equipo.',
    icon: Wrench,
  },
  {
    paso: '04',
    titulo: 'Prueba y garantía',
    descripcion: 'Ensayo en banco antes de la entrega. Garantía escrita sobre la reparación realizada.',
    icon: Zap,
  },
];

const INCLUYE = [
  'Diagnóstico eléctrico y mecánico completo',
  'Bobinado de estátores monofásicos y trifásicos',
  'Bobinado de rotores y armaduras',
  'Impregnación al vacío con barniz epóxico',
  'Sustitución de rodamientos y sellos mecánicos',
  'Balanceo dinámico de rotores',
  'Ensayo dieléctrico post-bobinado',
  'Prueba en banco antes de entrega',
  'Reparación de motores de 0.5 HP a 200 HP',
  'Documentación técnica del trabajo realizado',
  'Garantía escrita sobre la reparación',
  'Toda marca y modelo de electrobomba sumergible',
];

export default function ReparacionElectrobombasPage() {
  const waMsg = encodeURIComponent('Hola! Necesito reparar una electrobomba. ¿Me pueden ayudar?');
  const waUrl = `https://wa.me/${CONTACT.whatsappNumber}?text=${waMsg}`;

  return (
    <>
      <Breadcrumb label="Reparación de Electrobombas" />

      {/* Hero SEO */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="container mx-auto sm:px-6 lg:px-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-red-700/30 border border-red-500/30 text-red-300 text-sm px-4 py-1.5 rounded-full mb-6">
            <Cog className="w-4 h-4" />
            Servicio especializado · Mendoza y San Juan
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold mb-5 leading-tight">
            Reparación de Electrobombas Sumergibles en Mendoza y San Juan
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl">
            Servicio profesional de reparación, bobinado y mantenimiento de electrobombas sumergibles
            de toda marca y potencia. Más de 20 años de experiencia garantizan la calidad de cada
            trabajo. Atendemos particulares, productores agrícolas e industrias en toda la región cuyana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-medium transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
              Consultar por WhatsApp
            </a>
            <a
              href={`tel:${CONTACT.phones[0].href.replace('tel:', '')}`}
              className="inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg font-medium transition-colors"
            >
              <Phone className="w-5 h-5" />
              Llamar Ahora
            </a>
          </div>
        </div>
      </div>

      {/* Descripción SEO */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Especialistas en Reparación de Electrobombas
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              En <strong>Arenas Perforaciones</strong> contamos con un taller propio equipado para
              la <strong>reparación integral de electrobombas sumergibles</strong>. Nuestros técnicos
              electromecánicos especializados diagnostican, desmontan, reparan y prueban cada equipo
              antes de la entrega, garantizando que vuelve a funcionar como nuevo.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Trabajamos con <strong>electrobombas monofásicas y trifásicas</strong> de toda marca:
              Grundfos, Pedrollo, Caprari, Franklin Electric, Lowara, Xylem, y más. Potencias desde
              0.5 HP hasta 200 HP. Realizamos bobinados completos o parciales, reemplazo de
              rodamientos y sellos, reparación de impulsores y diagnóstico eléctrico completo.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Brindamos este servicio a toda la provincia de <strong>Mendoza, San Juan, San Luis
              y regiones aledañas</strong>. El presupuesto de reparación es siempre sin cargo y
              sin compromiso.
            </p>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">
            Nuestro Proceso de Reparación
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESO.map((p) => (
              <div key={p.paso} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-700 text-white rounded-2xl mb-4">
                  <p.icon className="w-8 h-8" />
                </div>
                <div className="text-xs font-bold text-red-700 tracking-widest mb-2">PASO {p.paso}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{p.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-10">
            ¿Qué Incluye el Servicio?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INCLUYE.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider con frase para el formulario */}
      <div className="bg-red-700 py-10 text-center px-4">
        <h2 className="text-2xl sm:text-3xl text-white font-semibold mb-2">
          ¿Tu electrobomba no funciona o perdió presión?
        </h2>
        <p className="text-red-100 text-lg max-w-xl mx-auto">
          Comunicarte con nosotros para reparar tu electrobomba es el primer paso.
          Te respondemos rápido y sin compromiso.
        </p>
      </div>

      {/* Formulario de contacto completo */}
      <Contact />

      {/* Link a venta */}
      <div className="py-12 bg-gray-50 text-center">
        <p className="text-gray-600 mb-4">
          ¿Preferís comprar una electrobomba nueva en lugar de repararla?
        </p>
        <Link
          to="/servicios/venta"
          className="inline-flex items-center gap-2 border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Ver Electrobombas en Venta
        </Link>
      </div>
    </>
  );
}
