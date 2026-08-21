// Augmentación del módulo react. Va en su propio archivo porque un
// `declare module 'react'` dentro de un .d.ts global (sin imports) no
// extiende el módulo: lo reemplaza, y rompe todos los hooks.
import 'react';

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    /**
     * React 18 no tipa ni reconoce `fetchPriority` en camelCase: lo descarta
     * con un warning en vez de emitirlo. En minúsculas sí lo pasa al DOM.
     */
    fetchpriority?: 'high' | 'low' | 'auto';
  }
}
