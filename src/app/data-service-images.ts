// ─────────────────────────────────────────────────────────────
// IMÁGENES POR SERVICIO
// Para agregar fotos a un servicio, agregá las rutas en el array
// correspondiente. Usá import estático o rutas desde /public.
//
// OPCIÓN A — import estático (recomendado si las fotos están en src/assets/):
//   import foto1 from '../assets/perfo1.webp';
//   export const SERVICE_IMAGES = { perforaciones: [foto1, foto2] }
//
// OPCIÓN B — rutas desde /public (más simple, sin imports):
//   perforaciones: ['/assets/perforaciones/foto1.webp', ...]
// ─────────────────────────────────────────────────────────────

// Descomentá y ajustá los imports de tus fotos reales:

// import perfo1 from '../assets/perfo1.webp';
// import perfo2 from '../assets/perfo2.webp';
// import bobinado1 from '../assets/bobinado1.webp';
// import filmacion1 from '../assets/filmacion1.webp';
import pesca1 from '../assets/pesca1.webp';
import pesca2 from '../assets/pesca2.webp';
import pesca3 from '../assets/pesca3.webp';
// import agua1 from '../assets/agua.webp';
// import bomba1 from '../assets/bomba1.webp';
// import mantenimiento1 from '../assets/mantenimiento1.webp';
// import estudio1 from '../assets/estudio1.webp';
// import estudio2 from '../assets/estudio2.webp';
import venta55 from "../assets/venta55.webp";


export const SERVICE_IMAGES: Record<string, string[]> = {
  // ── Perforaciones ──────────────────────────────────────────
  perforaciones: [
    // perfo1,
    // perfo2,
    // Agregá más fotos aquí
  ],

  // ── Electrobombas ──────────────────────────────────────────
  // (slug 'electrobombas' muestra los botones de reparación/venta,
  //  no la galería — este array se ignora en ServicioDetallePage)
  electrobombas: [venta55],

  // ── Bobinados ──────────────────────────────────────────────
  bobinados: [
    // bobinado1,
  ],

  // ── Filmaciones ────────────────────────────────────────────
  filmaciones: [
    // filmacion1,
  ],

  // ── Limpieza ───────────────────────────────────────────────
  limpieza: [
    // agua1,
  ],

  // ── Pesca de Electrobombas ─────────────────────────────────
  pescas: [
    pesca1,
    pesca2,
    pesca3,
  ],

  // ── Estudios Geológicos ────────────────────────────────────
  'estudios-geologicos': [
    // estudio1,
    // estudio2,
  ],

  // ── Mantenimiento ──────────────────────────────────────────
  mantenimiento: [
    // mantenimiento1,
  ],

  // ── Venta (manejado por ProductCard, no por galería) ───────
  venta: [venta55],
};
