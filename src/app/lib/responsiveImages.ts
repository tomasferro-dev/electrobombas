import imageWidths from '../../assets/image-widths.json';

/**
 * Resuelve el `srcset` de cualquier imagen del sitio.
 *
 * scripts/optimize-images.py emite, junto a `foo.webp`, las variantes
 * `foo-w400.webp` y `foo-w800.webp`. Pero en el bundle cada archivo queda
 * con un hash distinto (`foo-Ab12Cd.webp`), así que desde una URL ya
 * resuelta no hay forma de derivar la de sus variantes.
 *
 * Este glob eager arma el puente: mapea la URL final de cada imagen
 * principal al srcset de sus variantes. Es eager a propósito —lo que entra
 * al bundle son las cadenas de URL, no las imágenes— y son unos pocos KB
 * a cambio de no bajar una foto de 1200 px a un celular de 400.
 */
const allWebp = import.meta.glob('../../assets/**/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const VARIANT_RE = /-w(\d+)\.webp$/;

/** Ancho real de cada imagen principal, del manifiesto que emite el script. */
const widths = imageWidths as Record<string, number>;

/** URL de la imagen principal → "url400 400w, url800 800w, urlFull 1200w" */
const srcSetByUrl = new Map<string, string>();

/** Anchos por path fuente, para poder ordenar el srcset. */
const variantsBySource = new Map<string, { width: number; url: string }[]>();

for (const [path, url] of Object.entries(allWebp)) {
  const match = path.match(VARIANT_RE);
  if (!match) continue;
  const source = path.replace(VARIANT_RE, '.webp');
  const list = variantsBySource.get(source) ?? [];
  list.push({ width: Number(match[1]), url });
  variantsBySource.set(source, list);
}

for (const [source, variants] of variantsBySource) {
  const fullUrl = allWebp[source];
  if (!fullUrl) continue;

  // Ancho real del archivo principal, del manifiesto. Declararlo a ojo hace
  // que el navegador elija mal: si cree que un archivo de 1121 px trae 1600,
  // lo descarta cuando necesita más de 1121 y baja uno peor.
  const key = source.replace('../../assets/', '');
  const fullWidth = widths[key];
  if (!fullWidth) continue;

  const entries = [...variants]
    .sort((a, b) => a.width - b.width)
    .filter((v) => v.width < fullWidth)
    .map((v) => `${v.url} ${v.width}w`);
  entries.push(`${fullUrl} ${fullWidth}w`);

  srcSetByUrl.set(fullUrl, entries.join(', '));
}

/** srcset de una imagen ya resuelta, o undefined si no tiene variantes. */
export function srcSetFor(src: string): string | undefined {
  return srcSetByUrl.get(src);
}
