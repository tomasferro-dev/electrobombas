import { useState } from 'react';
import { ShoppingCart, Phone, Filter, Zap, Droplet, CheckCircle2, AlertCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { CONTACT } from '../data';
import { ELECTROBOMBAS_VENTA, type Electrobomba } from '../data-electrobombas';

// ─────────────────────────────────────────
// Para agregar electrobombas: editá el array
// ELECTROBOMBAS_VENTA en src/app/data-electrobombas.ts
// ─────────────────────────────────────────

const USO_OPTIONS = ['Todos', 'Doméstico', 'Agrícola', 'Industrial', 'Municipal', 'Minería'];

function ElectrobombaCard({ bomba }: { bomba: Electrobomba }) {
  const waMsg = encodeURIComponent(
    `Hola! Estoy interesado en la electrobomba ${bomba.marca} ${bomba.modelo} (${bomba.potenciaHP} HP). ¿Está disponible?`
  );
  const waUrl = `https://wa.me/${CONTACT.whatsappNumber}?text=${waMsg}`;

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden ${bomba.destacada ? 'ring-2 ring-red-700' : ''}`}>
      
      {/* Badge destacada */}
      {bomba.destacada && (
        <div className="bg-red-700 text-white text-xs font-bold px-3 py-1 text-center tracking-wider">
          DESTACADO
        </div>
      )}

      {/* Imagen o placeholder */}
      {/* <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
        {bomba.imagen ? (
          <img src={bomba.imagen} alt={`${bomba.marca} ${bomba.modelo}`} className="w-full h-full object-cover" /> */}
          <div className="h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
  {bomba.imagen ? (
    <img src={bomba.imagen} alt={`${bomba.marca} ${bomba.modelo}`} className="h-full w-full object-contain p-4" />
        ) : (
          <div className="text-center text-gray-400">
            <Droplet className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <span className="text-xs">Sin imagen</span>
          </div>
        )}

        {/* Badge disponibilidad */}
        <div className={`absolute top-3 right-3 flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${bomba.disponible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
          {bomba.disponible
            ? <><CheckCircle2 className="w-3 h-3" /> Disponible</>
            : <><AlertCircle className="w-3 h-3" /> Consultar</>
          }
        </div>

        {/* Diámetro badge */}
        <div className="absolute top-3 left-3 bg-gray-900/80 text-white text-xs font-bold px-2.5 py-1 rounded-full">
          {bomba.diametro}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <p className="text-xs text-red-700 font-bold tracking-wider uppercase mb-1">{bomba.marca}</p>
          <h3 className="text-lg font-semibold text-gray-900">{bomba.modelo}</h3>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{bomba.descripcion}</p>

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 rounded-lg p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-red-700 mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Potencia</span>
            </div>
            <div className="text-sm font-bold text-gray-900">{bomba.potenciaHP} HP</div>
            <div className="text-xs text-gray-500">{bomba.potenciaKW} kW</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
              <Droplet className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Caudal</span>
            </div>
            <div className="text-sm font-bold text-gray-900">{bomba.caudal}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5 text-center col-span-2">
            <div className="text-xs text-gray-500 mb-0.5">Altura máxima</div>
            <div className="text-sm font-bold text-gray-900">{bomba.alturaMax}</div>
          </div>
        </div>

        {/* Usos */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {bomba.uso.map((u) => (
            <span key={u} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
              {u}
            </span>
          ))}
        </div>

        {/* Voltaje */}
        <p className="text-xs text-gray-500 mb-4">⚡ {bomba.voltaje}</p>

        {/* Price + CTA */}
        <div className="border-t border-gray-100 pt-4 mt-auto">
          <div className="text-lg font-bold text-gray-900 mb-3">
            {bomba.precio ?? (
              <span className="text-red-700">Consultar precio</span>
            )}
          </div>
          <div className="flex gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <FaWhatsapp className="w-4 h-4" />
              Consultar
            </a>
            <a
              href={`tel:${CONTACT.phones[0].href.replace('tel:', '')}`}
              className="flex items-center justify-center gap-1 border border-gray-300 hover:border-red-700 hover:text-red-700 text-gray-600 px-3 py-2.5 rounded-lg text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
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
      <Breadcrumb label="Venta de Electrobombas" />

      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="container mx-auto sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-red-700/30 border border-red-500/30 text-red-300 text-sm px-4 py-1.5 rounded-full mb-6">
            <ShoppingCart className="w-4 h-4" />
            Venta · Mendoza y San Juan
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold mb-5">
            Venta de Electrobombas Sumergibles
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Comercializamos electrobombas sumergibles de las principales marcas del mercado para uso
            doméstico, agrícola e industrial. Asesoramiento técnico incluido para que elijas el
            equipo correcto para tu pozo.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="bg-blue-100 rounded-lg p-2.5 flex-shrink-0">
            <Phone className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <p className="font-medium text-blue-900">¿No encontrás la bomba que necesitás?</p>
            <p className="text-blue-700 text-sm">
              Consultanos por WhatsApp o teléfono. Podemos conseguir cualquier modelo o recomendarte
              la alternativa correcta para tu instalación.
            </p>
          </div>
          <a
            href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent('Hola! Busco una electrobomba específica.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <FaWhatsapp className="w-4 h-4" />
            Consultar
          </a>
        </div>

        {/* Filtro por uso */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <span className="text-sm text-gray-500">Filtrar por uso:</span>
          {USO_OPTIONS.map((uso) => (
            <button
              key={uso}
              onClick={() => setFiltroUso(uso)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filtroUso === uso
                  ? 'bg-red-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {uso}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtradas.map((bomba) => (
            <ElectrobombaCard key={bomba.id} bomba={bomba} />
          ))}
        </div>

        {filtradas.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No hay electrobombas en esta categoría por el momento.
          </div>
        )}

        {/* Note sobre actualización */}
        <p className="text-center text-xs text-gray-400 mt-8">
          El stock y los precios pueden variar. Todos los precios están sujetos a confirmación.
          Consultá disponibilidad antes de tu compra.
        </p>
      </div>

      {/* CTA reparación */}
      <div className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            ¿Tenés una bomba que necesita reparación?
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            No siempre es necesario comprar una nueva. Revisamos tu equipo sin costo y te decimos si conviene repararlo.
          </p>
          <Link
            to="/electrobombas/reparacion"
            className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg font-medium transition-colors"
          >
            Ver servicio de reparación
          </Link>
        </div>
      </div>
    </>
  );
}
