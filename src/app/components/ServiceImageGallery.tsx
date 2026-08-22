import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import Img from '../components/Img';

interface ServiceImageGalleryProps {
  images: string[];
  altBase: string; // e.g. "Perforaciones de pozos"
}

export default function ServiceImageGallery({ images, altBase }: ServiceImageGalleryProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const prev = () => setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : i));
  const next = () => setLightboxIdx((i) => (i !== null && i < images.length - 1 ? i + 1 : i));

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') setLightboxIdx(null);
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Imágenes que hablan por nosotros</h2>

        {/* Imagen principal grande */}
        <div
          className="relative rounded-xl overflow-hidden mb-3 cursor-zoom-in group"
          onClick={() => setLightboxIdx(0)}
        >
          <Img
            src={images[0]}
            alt={`${altBase} - foto principal`}
            className="w-full h-72 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(min-width:640px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
          </div>
        </div>

        {/* Grid de miniaturas */}
        {images.length > 1 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {images.slice(1).map((src, i) => (
              <div
                key={i}
                className="relative rounded-lg overflow-hidden cursor-zoom-in group aspect-square"
                onClick={() => setLightboxIdx(i + 1)}
              >
                <Img
                  src={src}
                  alt={`${altBase} - foto ${i + 2}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(min-width:640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-3 text-right">
          {images.length} {images.length === 1 ? 'foto' : 'fotos'} · Hacé click para ampliar
        </p>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setLightboxIdx(null)}
          onKeyDown={handleKey}
          tabIndex={0}
        >
          {/* Cerrar */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setLightboxIdx(null)}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Anterior */}
          {lightboxIdx > 0 && (
            <button
              className="absolute left-4 text-white/70 hover:text-white transition-colors z-10 bg-black/30 rounded-full p-2"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Imagen */}
          <img
            src={images[lightboxIdx]}
            alt={`${altBase} - foto ${lightboxIdx + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Siguiente */}
          {lightboxIdx < images.length - 1 && (
            <button
              className="absolute right-4 text-white/70 hover:text-white transition-colors z-10 bg-black/30 rounded-full p-2"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Contador */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIdx + 1} / {images.length}
          </div>

          {/* Tiras de miniaturas */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto py-2 px-1">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(i); }}
                className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden transition-all ${
                  i === lightboxIdx ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-80'
                }`}
              >
                <Img src={src} alt={`${altBase} — vista ${i + 1}`} className="w-full h-full object-cover" sizes="(min-width:640px) 50vw, 100vw" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
