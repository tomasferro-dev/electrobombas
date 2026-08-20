import { useState } from 'react';
import { ShoppingCart, Phone, Filter, Zap, Droplet, CheckCircle2, AlertCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { CONTACT, whatsappLink } from '../data';
import { ELECTROBOMBAS_VENTA, type Electrobomba } from '../data-electrobombas';
import SEO from '../components/SEO';
import ServiceDetailBlocks from '../components/ServiceDetailBlocks';
import VentaProductos from '../components/ProductCard';
import ProjectsCarousel from '../layouts/ProjectsCarousel';

const USO_OPTIONS = ['Todos', 'Doméstico', 'Agrícola', 'Industrial', 'Municipal', 'Minería'];

function ElectrobombaCard({ bomba }: { bomba: Electrobomba }) {
  const waMsg = encodeURIComponent(
    `Hola! Estoy interesado en la electrobomba ${bomba.marca} ${bomba.modelo} (${bomba.potenciaHP} HP). ¿Está disponible?`
  );
  const waUrl = whatsappLink(waMsg);

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden ${bomba.destacada ? 'ring-2 ring-red-700' : ''}`}>

      {bomba.destacada && (
        <div className="bg-red-700 text-white text-xs font-bold px-3 py-1 text-center tracking-wider">
          DESTACADO
        </div>
      )}

      {/* Imagen */}
      <div className="h-44 sm:h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
        {bomba.imagen ? (
          <img src={bomba.imagen} alt={`${bomba.marca} ${bomba.modelo}`} className="h-full w-full object-contain p-4" />
        ) : (
          <div className="text-center text-gray-400">
            <Droplet className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <span className="text-xs">Sin imagen</span>
          </div>
        )}
        <div className={`absolute top-3 right-3 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${bomba.disponible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
          {bomba.disponible
            ? <><CheckCircle2 className="w-3 h-3" /> Disponible</>
            : <><AlertCircle className="w-3 h-3" /> Consultar</>
          }
        </div>
        <div className="absolute top-3 left-3 bg-gray-900/80 text-white text-xs font-bold px-2 py-1 rounded-full">
          {bomba.diametro}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <p className="text-xs text-red-700 font-bold tracking-wider uppercase mb-0.5">{bomba.marca}</p>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{bomba.modelo}</h3>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-grow">{bomba.descripcion}</p>

        {/* Specs — fila horizontal en mobile, grid en desktop */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 sm:pb-0 sm:grid sm:grid-cols-3 sm:gap-2">
          <div className="bg-gray-50 rounded-lg p-2.5 text-center flex-shrink-0 min-w-[90px] sm:min-w-0">
            <div className="flex items-center justify-center gap-1 text-red-700 mb-1">
              <Zap className="w-3 h-3" />
              <span className="text-xs font-medium">Potencia</span>
            </div>
            <div className="text-sm font-bold text-gray-900 whitespace-nowrap">{bomba.potenciaHP} HP</div>
            <div className="text-xs text-gray-500">{bomba.potenciaKW} kW</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5 text-center flex-shrink-0 min-w-[90px] sm:min-w-0">
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
              <Droplet className="w-3 h-3" />
              <span className="text-xs font-medium">Caudal</span>
            </div>
            <div className="text-sm font-bold text-gray-900 whitespace-nowrap">{bomba.caudal}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5 text-center flex-shrink-0 min-w-[90px] sm:min-w-0">
            <div className="text-xs text-gray-500 mb-1">Alt. máx.</div>
            <div className="text-sm font-bold text-gray-900 whitespace-nowrap">{bomba.alturaMax}</div>
          </div>
        </div>

        {/* Usos */}
        <div className="flex flex-wrap gap-1 mb-3">
          {bomba.uso.map((u) => (
            <span key={u} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
              {u}
            </span>
          ))}
        </div>

        <p className="text-xs text-gray-500 mb-3">⚡ {bomba.voltaje}</p>

        {/* Precio + CTA */}
        <div className="border-t border-gray-100 pt-3 mt-auto">
          <div className="text-base font-bold text-gray-900 mb-2.5">
            {bomba.precio ?? <span className="text-red-700">Consultar precio</span>}
          </div>
          {/* En mobile: botones apilados para mayor área de toque */}
          <div className="flex flex-col xs:flex-row gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              <FaWhatsapp className="w-4 h-4" />
              Consultar
            </a>
            <a
              href={`tel:${CONTACT.phones[0].href.replace('tel:', '')}`}
              className="flex items-center justify-center gap-2 border border-gray-300 hover:border-red-700 hover:text-red-700 text-gray-600 px-4 py-3 rounded-lg text-sm transition-colors xs:px-3"
            >
              <Phone className="w-4 h-4" />
              <span className="xs:hidden">Llamar</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VentaElectrobombasPage() {
  const [filtroUso, setFiltroUso] = useState('Todos');

  const filtradas = filtroUso === 'Todos'
    ? ELECTROBOMBAS_VENTA
    : ELECTROBOMBAS_VENTA.filter((b) => b.uso.includes(filtroUso));

  return (
    <>
      <SEO
        title="Venta de Electrobombas en Mendoza y San Juan"
        description="Comprá electrobombas sumergibles y de superficie en Mendoza y San Juan. Stock permanente, asesoramiento técnico y entrega inmediata. Equipos para uso doméstico, agrícola e industrial."
        canonical="/venta"
      />
      <Breadcrumb label="Venta de Electrobombas" />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10 sm:py-16 px-4">
        <div className="container mx-auto sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-red-700/30 border border-red-500/30 text-red-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Venta · Mendoza y San Juan
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-5 leading-tight">
            Venta de Electrobombas Sumergibles
          </h1>
          <p className="text-gray-300 text-sm sm:text-lg leading-relaxed">
            Comercializamos electrobombas sumergibles de las principales marcas del mercado.
            Asesoramiento técnico incluido para que elijas el equipo correcto para tu pozo.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* ── BANNER INFO ─────────────────────────────────────── */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 sm:p-5 mb-6 sm:mb-8">
          <div className="flex items-start gap-3 mb-3 sm:mb-0 sm:flex-row sm:items-center sm:gap-4">
            <div className="bg-blue-100 rounded-lg p-2 flex-shrink-0">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-blue-900 text-sm sm:text-base">¿No encontrás la bomba que necesitás?</p>
              <p className="text-blue-700 text-xs sm:text-sm mt-0.5">
                Consultanos por WhatsApp o teléfono. Podemos conseguir cualquier modelo o recomendarte la alternativa correcta.
              </p>
            </div>
          </div>
          <a
            href={whatsappLink('Hola! Busco una electrobomba específica.')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 sm:mt-4 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto sm:inline-flex"
          >
            <FaWhatsapp className="w-4 h-4" />
            Consultar por WhatsApp
          </a>
        </div>

        {/* ── FILTRO HORIZONTAL SCROLLEABLE ───────────────────── */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="text-xs text-gray-500 font-medium">Filtrar por uso</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {USO_OPTIONS.map((uso) => (
              <button
                key={uso}
                onClick={() => setFiltroUso(uso)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filtroUso === uso
                    ? 'bg-red-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {uso}
              </button>
            ))}
          </div>
        </div>

        {/* ── GRID DE PRODUCTOS ────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtradas.map((bomba) => (
            <ElectrobombaCard key={bomba.id} bomba={bomba} />
          ))}
        </div>

        {filtradas.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">
            No hay electrobombas en esta categoría por el momento.
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-8">
          El stock y los precios pueden variar. Todos los precios están sujetos a confirmación.
          Consultá disponibilidad antes de tu compra.
        </p>
      </div>

      {/* ── MARCAS QUE TRABAJAMOS ────────────────────────────── */}
      {/* Catálogo con fotos que vivía en /servicios/venta antes del 301. */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <VentaProductos variant="venta" />
        </div>
      </div>

      {/* ── DETALLE DEL SERVICIO ─────────────────────────────── */}
      <ServiceDetailBlocks slug="venta" />

      {/* ── OBRAS RELACIONADAS ───────────────────────────────── */}
      <ProjectsCarousel slug="venta" />

      {/* ── CTA REPARACIÓN ───────────────────────────────────── */}
      <div className="py-10 sm:py-12 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
            ¿Tenés una bomba que necesita reparación?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-5 sm:mb-6 max-w-lg mx-auto">
            No siempre es necesario comprar una nueva. Revisamos tu equipo sin costo.
          </p>
          <Link
            to="/reparacion"
            className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-colors text-sm sm:text-base"
          >
            Ver servicio de reparación
          </Link>
        </div>
      </div>
    </>
  );
}
