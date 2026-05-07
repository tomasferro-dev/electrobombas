import { useState } from 'react';
import { Cog, CheckCircle2, Phone, Wrench, Zap, Settings, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Contact from '../components/Contact';
import Breadcrumb from '../components/Breadcrumb';
import { CONTACT } from '../data';
import SEO from '../components/SEO';

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

const INCLUYE_VISIBLE_MOBILE = 5;

export default function ReparacionElectrobombasPage() {
  const waMsg = encodeURIComponent('Hola! Necesito reparar una electrobomba. ¿Me pueden ayudar?');
  const waUrl = `https://wa.me/${CONTACT.whatsappNumber}?text=${waMsg}`;

  const [descExpanded, setDescExpanded] = useState(false);
  const [incluyeExpanded, setIncluyeExpanded] = useState(false);

  return (
    <>
      <SEO
        title="Reparación de Electrobombas en Mendoza y San Juan"
        description="Servicio técnico especializado en reparación de electrobombas sumergibles y de superficie. Diagnóstico, bobinado, repuestos y prueba en banco. Cobertura en Mendoza, San Juan y Argentina."
        canonical="/reparacion"
      />
      <Breadcrumb label="Reparación de Electrobombas" />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10 sm:py-16 px-4">
        <div className="container mx-auto sm:px-6 lg:px-8 max-w-4xl">

          <div className="inline-flex items-center gap-2 bg-red-700/30 border border-red-500/30 text-red-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            <Cog className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Servicio especializado · Mendoza y San Juan
          </div>

          {/* Título — reducido en mobile para evitar overflow */}
          <h1 className="text-xl sm:text-3xl lg:text-5xl font-semibold mb-3 sm:mb-5 leading-tight">
            Reparación de Electrobombas Sumergibles
            <span className="block text-gray-400 text-base sm:text-2xl lg:text-3xl font-normal mt-1">
              Mendoza y San Juan
            </span>
          </h1>

          {/* Descripción — colapsable en mobile */}
          <div className="mb-5 sm:mb-8">
            <p className={`text-gray-300 text-sm sm:text-lg leading-relaxed ${!descExpanded ? 'line-clamp-2 sm:line-clamp-none' : ''}`}>
              Servicio profesional de reparación, bobinado y mantenimiento de electrobombas sumergibles
              de toda marca y potencia. Más de 20 años de experiencia garantizan la calidad de cada
              trabajo. Atendemos particulares, productores agrícolas e industrias en toda la región cuyana.
            </p>
            <button
              onClick={() => setDescExpanded((v) => !v)}
              className="sm:hidden mt-1.5 text-red-300 text-xs font-medium flex items-center gap-1"
            >
              {descExpanded ? 'Ver menos' : 'Leer más'}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${descExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* CTAs — apilados en mobile, lado a lado en desktop */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3.5 sm:py-4 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              <FaWhatsapp className="w-5 h-5" />
              Consultar por WhatsApp
            </a>
            <a
              href={`tel:${CONTACT.phones[0].href.replace('tel:', '')}`}
              className="flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white px-6 py-3.5 sm:py-4 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              <Phone className="w-5 h-5" />
              Llamar ahora
            </a>
          </div>
        </div>
      </div>

      {/* ── DESCRIPCIÓN ESPECIALISTAS ─────────────────────────── */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6">
            Especialistas en Reparación de Electrobombas
          </h2>
          {/* En mobile mostramos solo el primer párrafo por defecto */}
          <p className="text-gray-600 text-sm sm:text-lg leading-relaxed mb-3 sm:mb-4">
            En <strong>Arenas Perforaciones</strong> contamos con un taller propio equipado para
            la <strong>reparación integral de electrobombas sumergibles</strong>. Nuestros técnicos
            electromecánicos diagnostican, desmontan, reparan y prueban cada equipo antes de la entrega.
          </p>
          <p className={`text-gray-600 text-sm sm:text-lg leading-relaxed mb-3 sm:mb-4 ${!descExpanded ? 'hidden sm:block' : ''}`}>
            Trabajamos con <strong>electrobombas monofásicas y trifásicas</strong> de toda marca:
            Grundfos, Pedrollo, Caprari, Franklin Electric, Lowara, Xylem, y más. Potencias desde
            0.5 HP hasta 200 HP. Bobinados completos o parciales, reemplazo de rodamientos y sellos,
            reparación de impulsores y diagnóstico eléctrico completo.
          </p>
          <p className={`text-gray-600 text-sm sm:text-lg leading-relaxed ${!descExpanded ? 'hidden sm:block' : ''}`}>
            Brindamos este servicio a toda la provincia de <strong>Mendoza, San Juan, San Luis
            y regiones aledañas</strong>. El presupuesto de reparación es siempre sin cargo y
            sin compromiso.
          </p>
          <button
            onClick={() => setDescExpanded((v) => !v)}
            className="sm:hidden mt-3 flex items-center gap-1.5 text-red-700 text-sm font-medium"
          >
            {descExpanded ? 'Ver menos' : 'Ver más información'}
            <ChevronDown className={`w-4 h-4 transition-transform ${descExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </section>

      {/* ── PROCESO ───────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 text-center mb-8 sm:mb-12">
            Nuestro Proceso de Reparación
          </h2>

          {/* Mobile: lista vertical compacta con línea conectora */}
          <div className="sm:hidden space-y-0">
            {PROCESO.map((p, i) => (
              <div key={p.paso} className="flex gap-4 relative">
                {/* Línea vertical */}
                {i < PROCESO.length - 1 && (
                  <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-200" />
                )}
                {/* Icono */}
                <div className="flex-shrink-0 w-10 h-10 bg-red-700 text-white rounded-xl flex items-center justify-center z-10">
                  <p.icon className="w-5 h-5" />
                </div>
                {/* Texto */}
                <div className="pb-6">
                  <div className="text-xs font-bold text-red-700 tracking-widest mb-0.5">PASO {p.paso}</div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{p.titulo}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{p.descripcion}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: grid de 4 columnas */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* ── QUÉ INCLUYE ───────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 text-center mb-6 sm:mb-10">
            ¿Qué Incluye el Servicio?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {INCLUYE.map((item, i) => {
              const hiddenOnMobile = !incluyeExpanded && i >= INCLUYE_VISIBLE_MOBILE;
              return (
                <div
                  key={item}
                  className={`flex items-start gap-3 bg-gray-50 rounded-lg p-3 sm:p-4 ${hiddenOnMobile ? 'hidden sm:flex' : 'flex'}`}
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-xs sm:text-sm">{item}</span>
                </div>
              );
            })}
          </div>

          {/* Botón expandir — solo en mobile */}
          <div className="sm:hidden mt-4 text-center">
            <button
              onClick={() => setIncluyeExpanded((v) => !v)}
              className="inline-flex items-center gap-2 text-red-700 text-sm font-medium border border-red-200 rounded-lg px-5 py-2.5 hover:bg-red-50 transition-colors"
            >
              {incluyeExpanded
                ? 'Ver menos'
                : `Ver los ${INCLUYE.length - INCLUYE_VISIBLE_MOBILE} ítems restantes`}
              <ChevronDown className={`w-4 h-4 transition-transform ${incluyeExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* ── BANNER CTA ────────────────────────────────────────── */}
      <div className="bg-red-700 py-8 sm:py-10 text-center px-4">
        <h2 className="text-lg sm:text-2xl lg:text-3xl text-white font-semibold mb-2">
          ¿Tu electrobomba no funciona o perdió presión?
        </h2>
        <p className="text-red-100 text-sm sm:text-lg max-w-xl mx-auto">
          Comunicarte con nosotros es el primer paso. Te respondemos rápido y sin compromiso.
        </p>
      </div>

      {/* ── FORMULARIO ────────────────────────────────────────── */}
      <Contact />

      {/* ── LINK A VENTA ──────────────────────────────────────── */}
      <div className="py-8 sm:py-12 bg-gray-50 text-center px-4">
        <p className="text-gray-600 text-sm sm:text-base mb-4">
          ¿Preferís comprar una electrobomba nueva en lugar de repararla?
        </p>
        <Link
          to="/servicios/venta"
          className="inline-flex items-center gap-2 border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
        >
          Ver Electrobombas en Venta
        </Link>
      </div>
    </>
  );
}
