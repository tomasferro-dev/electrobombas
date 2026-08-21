# Arenas Electrobombas

Sitio de Arenas Electrobombas — venta, reparación y alquiler de electrobombas
y perforación de pozos de agua en Mendoza y San Juan.

**Stack:** Vite 5 + React 18 + React Router 6 + Tailwind 3 · **SSG con
vite-react-ssg** · Deploy en Vercel.

```bash
npm install
npm run dev        # desarrollo
npm run build      # build de producción: genera un HTML por ruta
npm run preview    # servir el build local
```

## Rutas

| URL | Página |
|-----|--------|
| `/` | Home: hero, servicios, por qué elegirnos, galería y contacto |
| `/servicios` | Grilla de los 12 servicios |
| `/servicios/:slug` | Detalle de un servicio |
| `/venta` | Venta de electrobombas: catálogo con specs y catálogo por marca |
| `/reparacion` | Reparación: proceso, qué incluye y formulario |
| `/proyectos` | Obras realizadas, con filtro por servicio y provincia |
| `/proyectos/:id` | Detalle de una obra con galería y lightbox |
| `/nosotros` | Empresa e historia |
| `/contacto` | Formulario, datos y mapa |
| `/electrobombas-mendoza` | Landing por localidad |
| `/electrobombas-san-juan` | Landing por localidad |
| `/perforacion-pozos-maipu` | Landing por localidad |
| cualquier otra | `404.html`, con status 404 real |

**Slugs de servicio:** `perforaciones`, `alquiler`, `bobinados`, `filmaciones`,
`limpieza`, `pescas`, `estudios-geologicos`, `desarrollo`, `mantenimiento`,
`extraccion`.

`venta` y `reparacion` también existen en `SERVICES`, pero tienen landing
propia: llevan el campo `href` y `/servicios/venta` y `/servicios/reparacion`
hacen **301** hacia `/venta` y `/reparacion` (ver `vercel.json`). Para armar el
link de un servicio usá siempre `serviceHref(service)`, nunca
`` `/servicios/${slug}` `` a mano.

## Generación estática (SSG)

El build **no** produce una SPA: emite un HTML por ruta, ya con su title,
description, canonical y JSON-LD horneados. Google y los scrapers de WhatsApp
ven el contenido sin ejecutar JavaScript.

Las rutas viven en `src/app/routes.tsx` como **objetos**, no como `<Routes>`:
vite-react-ssg necesita recorrer el árbol en Node durante el build, y un árbol
JSX sólo existe durante el render. Al agregar una ruta:

- Usá `lazy: async () => ({ Component: (await import('./pages/X')).default })`.
  **No** uses `React.lazy`: el recolector de assets del build no lo puede leer.
- Agregá `entry: 'src/app/pages/X.tsx'` para que el HTML traiga el CSS de esa
  página y no haya salto de estilos antes de la hidratación.
- Para rutas dinámicas, `getStaticPaths` decide qué se prerenderiza. Los de
  servicios y proyectos salen de `data.ts`, así que un servicio nuevo genera
  su HTML solo.
- Sumá la URL a `public/sitemap.xml`.

`vite.config.ts` usa `dirStyle: 'flat'` (`/venta` → `dist/venta.html`) y
`vercel.json` usa `cleanUrls: true`. Esa combinación además deja `404.html` en
la raíz del output, que es donde Vercel lo busca para responder un 404 real.

`components/RouteChange.tsx` (scroll al tope + page_view) va dentro de los
layouts porque con SSG no hay un `<App>` que envuelva al router.

## Dónde se editan los datos

Todo el contenido sale de `src/app/`:

| Archivo | Qué contiene |
|---------|--------------|
| `data.ts` | `SERVICES`, `PROJECTS`, `CONTACT`, `whatsappLink()`, `serviceHref()` |
| `data-electrobombas.ts` | `ELECTROBOMBAS_VENTA` — catálogo con specs de `/venta` |
| `data-faq.ts` | Preguntas frecuentes + `faqJsonLd()` |
| `data-localidades.ts` | Contenido de las landings por localidad |
| `data-service-images.ts` | `SERVICE_IMAGES` — galería por slug de servicio |
| `components/ProductCard.tsx` | `PRODUCTOS_VENTA` — catálogo por marca, con fotos |

### Agregar una obra

1. Poné las fotos en `src/assets/proyectos/<carpeta>/`.
2. Corré el optimizador (ver abajo).
3. Agregá la entrada a `PROJECTS` en `data.ts` con `imageFolder: "<carpeta>"`.
   Las fotos se levantan solas: no hay que importarlas una por una.
4. Sumá la URL a `public/sitemap.xml`.

## Imágenes

Todas las imágenes del sitio son **WebP**. Las fotos entran directo del
celular a 3000–4000 px y hasta 9 MB; sin convertir, el sitio servía 250 MB.

```bash
python scripts/optimize-images.py --dry-run    # ver el ahorro, sin tocar nada
python scripts/optimize-images.py --replace    # convertir y borrar los originales
```

El script redimensiona por familia (1600 px hero, 1200 px fotos de obra,
1000 px catálogo) y corrige la orientación EXIF, que WebP no arrastra.
Después de correrlo hay que apuntar los imports a `.webp`.

Los `import.meta.glob` de las fotos de obra viven **solo** en
`src/app/lib/projectImages.ts`. Si cambia el formato o la estructura de
carpetas, ese es el único archivo a tocar.

## SEO

- `components/SEO.tsx` emite title, description, canonical, Open Graph,
  Twitter Card y JSON-LD. **Va en todas las páginas.**
- Importa `Head` de `vite-react-ssg`, **no** `Helmet` de `react-helmet-async`.
  vite-react-ssg trae su propia copia de react-helmet-async; con dos copias
  los contextos de React no coinciden y el render en Node falla.
- Lleva `defer={false}`: sin eso, react-helmet-async aplica los cambios por
  `requestAnimationFrame` y no escribe nada cuando el rAF no corre (pestaña
  en segundo plano, renderizador headless). Con `defer` activado, el sitio
  entero quedaba con el title y el canonical del `index.html`.
- `Breadcrumb.tsx` emite `BreadcrumbList`; `data-faq.ts`, `FAQPage`.
- Los meta de `index.html` llevan `data-rh="true"` para que Helmet los
  reemplace en vez de duplicarlos. Son el fallback para WhatsApp y Facebook,
  que no ejecutan JavaScript.
- Al agregar una ruta indexable, sumala a `public/sitemap.xml`.

## Analítica

GA4 se carga sólo si existe la variable `VITE_GA4_ID` (formato `G-XXXXXXXXXX`).
Sin ella no se carga ningún script de terceros. Se define en Vercel
(Settings → Environment Variables) o en `.env.local` para desarrollo.
El prefijo `VITE_` es obligatorio y el valor se inyecta **en el build**: hay
que redesplegar después de cambiarla.

`lib/analytics.ts` manda un `page_view` por navegación y captura el clic de
cualquier link de WhatsApp con un único listener delegado.

## Deploy

`vercel.json` define `cleanUrls` y los 301 (`/home`, `/servicios/venta` y
`/servicios/reparacion`). Ya no hay rewrite de SPA: con SSG cada ruta tiene su
propio HTML, y las inexistentes caen en `404.html` con status 404.
El sitio canónico es **`https://www.arenaselectrobombas.com.ar`** (con `www`):
el dominio sin `www` redirige. Si cambia, hay que actualizar `BASE_URL` en
`SEO.tsx`, `public/sitemap.xml`, `public/robots.txt` y el JSON-LD de
`HomePage.tsx`.
