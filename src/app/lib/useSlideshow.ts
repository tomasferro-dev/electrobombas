import { useEffect, useState } from 'react';

/**
 * Carrusel de fondo con carga diferida.
 *
 * Los tres carruseles del sitio montaban todas sus imágenes de entrada y
 * rotaban cada 2-4 s. Eso hacía que la imagen del LCP compitiera por ancho
 * de banda con otras tres o cinco que el usuario todavía no había visto.
 *
 * Acá sólo se monta la primera imagen; las demás aparecen recién cuando les
 * toca el turno. `prefers-reduced-motion` congela la rotación en la primera:
 * quien pidió menos movimiento no descarga el resto.
 */
export function useSlideshow(count: number, intervalMs = 6000) {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    if (count <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = setInterval(() => setCurrent((p) => (p + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [count, intervalMs]);

  useEffect(() => {
    setMounted((prev) => (prev.has(current) ? prev : new Set(prev).add(current)));
  }, [current]);

  return {
    current,
    /** Si el slide ya se mostró alguna vez y por lo tanto conviene renderizarlo. */
    isMounted: (index: number) => mounted.has(index),
    /**
     * Atributos de carga: el primer slide es el LCP, el resto va diferido.
     * fetchpriority va en minúsculas: React 18 no conoce el camelCase y lo
     * descarta con un warning en vez de emitir el atributo.
     */
    imgProps: (index: number) =>
      index === 0
        ? ({ loading: 'eager', fetchpriority: 'high', decoding: 'sync' } as const)
        : ({ loading: 'lazy', fetchpriority: 'low', decoding: 'async' } as const),
  };
}
