import { useEffect, useState } from 'react';

/**
 * Acceso único a las fotos de obra de src/assets/proyectos.
 *
 * Este glob estaba copiado en cuatro archivos (Gallery, ProjectsCarousel,
 * ProyectosPage y ProyectoDetallePage), cada uno con su propia versión del
 * filtro de banners. Al pasar las fotos a WebP hubo que tocar los cuatro;
 * la próxima vez alcanza con tocar este.
 *
 * El glob es lazy a propósito: import.meta.glob sin `eager` devuelve
 * funciones que cargan cada imagen bajo demanda, así el bundle inicial no
 * arrastra las 150 fotos.
 */
const projectImagesGlob = import.meta.glob('../../assets/proyectos/**/*.webp', {
  import: 'default',
}) as Record<string, () => Promise<string>>;

/** Los banners viven mezclados con las fotos pero se importan aparte. */
function isBanner(path: string): boolean {
  return path.includes('/BANNER/') || path.includes('/banner/');
}

/**
 * foo-w400.webp es una variante para el srcset, no una foto más.
 * Sin este filtro cada obra mostraría la misma foto tres veces.
 */
function isVariant(path: string): boolean {
  return /-w\d+\.webp$/.test(path);
}

function entriesFor(imageFolder: string) {
  return Object.entries(projectImagesGlob).filter(
    ([path]) => !isBanner(path) && !isVariant(path) && path.includes(imageFolder),
  );
}

/** Cuántas fotos tiene una carpeta. Sincrónico: sólo mira las claves. */
export function countProjectImages(imageFolder: string): number {
  return entriesFor(imageFolder).length;
}

/** Carga las fotos de una carpeta. */
export async function loadProjectImages(imageFolder: string): Promise<string[]> {
  return Promise.all(entriesFor(imageFolder).map(([, load]) => load()));
}

/** Carga las fotos de una carpeta al montar el componente. */
export function useProjectImages(imageFolder: string): string[] {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    loadProjectImages(imageFolder).then((imgs) => {
      // Evita el setState sobre un componente ya desmontado cuando el
      // usuario navega antes de que resuelvan las importaciones.
      if (!cancelled) setImages(imgs);
    });
    return () => {
      cancelled = true;
    };
  }, [imageFolder]);

  return images;
}

/** Carga sólo la primera foto de una carpeta: la portada de las tarjetas. */
export function useFirstProjectImage(imageFolder: string): string | null {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const entry = entriesFor(imageFolder)[0];
    if (entry) entry[1]().then((img) => !cancelled && setSrc(img));
    return () => {
      cancelled = true;
    };
  }, [imageFolder]);

  return src;
}
