import { PRODUCTOS_VENTA, type ProductoVenta } from '../data-productos';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Zap, Droplet } from 'lucide-react';
import Img from '../components/Img';

// ─────────────────────────────────────────────────────────────

interface LightboxProps {
  images: string[];
  startIdx: number;
  altBase: string;
  onClose: () => void;
}

function Lightbox({ images, startIdx, altBase, onClose }: LightboxProps) {
  const [idx, setIdx] = useState(startIdx);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && idx > 0) setIdx(idx - 1);
    if (e.key === 'ArrowRight' && idx < images.length - 1) setIdx(idx + 1);
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKey}
      tabIndex={0}
    >
      <button className="absolute top-4 right-4 text-white/70 hover:text-white z-10" onClick={onClose}>
        <X className="w-8 h-8" />
      </button>
      {idx > 0 && (
        <button
          className="absolute left-4 text-white/70 hover:text-white z-10 bg-black/30 rounded-full p-2"
          onClick={(e) => { e.stopPropagation(); setIdx(idx - 1); }}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}
      <img
        src={images[idx]}
        alt={`${altBase} ${idx + 1}`}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
      {idx < images.length - 1 && (
        <button
          className="absolute right-4 text-white/70 hover:text-white z-10 bg-black/30 rounded-full p-2"
          onClick={(e) => { e.stopPropagation(); setIdx(idx + 1); }}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
        {idx + 1} / {images.length}
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setIdx(i); }}
            className={`w-12 h-12 rounded overflow-hidden flex-shrink-0 transition-all ${
              i === idx ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-80'
            }`}
          >
            <Img src={src} alt="" className="w-full h-full object-cover" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
          </button>
        ))}
      </div>
    </div>
  );
}

interface ProductCardProps {
  producto: ProductoVenta;
}

function ProductCard({ producto }: ProductCardProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const Icon = producto.tipo === 'Electrobomba' ? Droplet : Zap;
  const hasImages = producto.imagenes.length > 0;

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex items-center gap-3">
          <div className="bg-red-700 rounded-lg p-2">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">{producto.tipo}</p>
            <h3 className="text-white font-semibold">{producto.marca} · {producto.modelo}</h3>
          </div>
        </div>

        {/* Imágenes */}
        {hasImages ? (
          <div className="p-4">
            {/* Imagen principal */}
            <div
              className="relative rounded-lg overflow-hidden mb-2 cursor-zoom-in group"
              onClick={() => setLightboxIdx(0)}
            >
              <Img
                src={producto.imagenes[0]}
                alt={`${producto.tipo} ${producto.marca}`}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-400"
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
              </div>
            </div>
            {/* Miniaturas */}
            {producto.imagenes.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {producto.imagenes.slice(1, 4).map((src, i) => (
                  <div
                    key={i}
                    className="relative rounded-md overflow-hidden cursor-zoom-in group aspect-square"
                    onClick={() => setLightboxIdx(i + 1)}
                  >
                    <Img src={src} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Placeholder cuando no hay imágenes */
          <div className="mx-4 mt-4 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 h-48 flex flex-col items-center justify-center text-gray-400">
            <Icon className="w-10 h-10 mb-2 text-gray-300" />
            <p className="text-sm">Sin imágenes todavía</p>
            <p className="text-xs mt-1 text-gray-300">Agregá rutas en <code>ProductCard.tsx</code></p>
          </div>
        )}

        {/* Descripción y specs */}
        <div className="p-6 space-y-5">
          <p className="text-gray-600 text-sm leading-relaxed">{producto.descripcion}</p>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Especificaciones</h4>
            <dl className="space-y-2">
              {producto.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between items-start gap-4 text-sm border-b border-gray-50 pb-2">
                  <dt className="text-gray-500 flex-shrink-0">{spec.label}</dt>
                  <dd className="text-gray-900 font-medium text-right">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {lightboxIdx !== null && hasImages && (
        <Lightbox
          images={producto.imagenes}
          startIdx={lightboxIdx}
          altBase={`${producto.tipo} ${producto.marca}`}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  );
}

// ─── Componente principal exportado ───────────────────────────
interface VentaProductosProps {
  variant?: "venta" | "alquiler";
}

export default function VentaProductos({ variant = "venta" }: VentaProductosProps) {
  const titulo =
    variant === "alquiler" ? "Productos Disponibles para Alquiler" : "Productos en Venta";
  const subtitulo =
    variant === "alquiler"
      ? "Ofrecemos en alquiler electrobombas y componentes hidráulicos de las mejores marcas. Consultanos por disponibilidad, modelos y condiciones del alquiler."
      : "Comercializamos electrobombas y sus componentes hidráulicos de las mejores marcas. Consultanos por disponibilidad y precios.";

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{titulo}</h2>
      <p className="text-gray-500 text-sm mb-8">{subtitulo}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {PRODUCTOS_VENTA.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
}
