import type { ImgHTMLAttributes } from 'react';
import { srcSetFor } from '../lib/responsiveImages';

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /**
   * Ancho de layout de la imagen, para que el navegador elija la variante.
   * Sin esto asume 100vw y baja la más grande siempre.
   */
  sizes?: string;
}

/**
 * <img> con srcset automático.
 *
 * Toma el srcset de las variantes que generó optimize-images.py. Si la
 * imagen no tiene variantes (por ejemplo los logos, que ya son chicos),
 * se comporta como un <img> común.
 *
 * Por defecto va con loading="lazy" y decoding="async": las excepciones
 * son las del LCP, que pasan loading="eager" explícito.
 */
export default function Img({
  src,
  alt,
  sizes = '100vw',
  loading = 'lazy',
  decoding = 'async',
  ...rest
}: ImgProps) {
  const srcSet = srcSetFor(src);

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      loading={loading}
      decoding={decoding}
      {...rest}
    />
  );
}
