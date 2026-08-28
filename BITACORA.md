# Bitácora — Arenas Electrobombas

> **Para Claude en una sesión nueva:** leé este archivo entero antes de tocar
> nada. Reemplaza a tener que reconstruir el contexto. Al terminar tu sesión,
> **actualizalo**: mové lo hecho a "Historial", ajustá los pendientes y sumá
> todo lo que aprendiste que no sea obvio leyendo el código.
>
> Este archivo vive en el repo y en GitHub, **nunca en producción**: Vercel
> sirve sólo `dist/`, y ningún `.md` de la raíz entra ahí (verificado:
> `/README.md` devuelve 404 en el sitio).

**Última actualización:** 23/08/2026 · commit `cb87f3b` · **producción al día**

---

## 1. Qué es esto

Sitio institucional de **Arenas Electrobombas** — venta, reparación y alquiler
de electrobombas, y perforación de pozos de agua en Mendoza y San Juan. Taller
propio en Maipú, +20 años.

| | |
|---|---|
| Producción | https://www.arenaselectrobombas.com.ar (**con `www`**) |
| Repo | https://github.com/tomasferro-dev/electrobombas |
| Rama | `main` (y `seo/fase-0`, idénticas) |
| Hosting | Vercel, proyecto `electrobombas` |
| Stack | Vite 5 + React 18 + React Router 6 + Tailwind 3 + **vite-react-ssg 0.9.0** |
| Local | `D:\Escritorio\DEV\ARENAS\arenas-electrobombas\electrobombas` |

**El build no produce una SPA:** genera 34 HTML, uno por ruta, con su título,
description, canonical y JSON-LD ya escritos. Google no depende de ejecutar JS.

---

## 2. Estado actual

Todo lo planificado hasta acá está **hecho, verificado y desplegado**. Árbol de
git limpio, nada sin pushear, producción sirviendo el último build.

### De dónde salimos

El sitio servía **717 bytes con un `<div>` vacío** para cualquier URL. Verificado
en vivo antes de tocar nada: `canonical 0`, `og:image 0`, `ld+json 0`.

| Métrica | Antes | Ahora |
|---|---|---|
| HTML para un crawler sin JS | 717 B | 83 KB (14,8 KB en la red) |
| Páginas con canonical | 0 | 33 |
| Datos estructurados | ninguno | LocalBusiness, Service, FAQPage, BreadcrumbList |
| Imágenes en la home (mobile) | 3546 KB | 84 KB |
| JavaScript | 1006 KB | 615 KB (155 KB gzip) |
| URL inexistente | 200 + copia de la home | **404 real** |
| Palabras en `/venta` | 380 | 1178 |
| `dist/` | 247 MB | 63 MB |
| `.git` | 689 MB | 100 MB |

### Verificación al día de hoy

```
node scripts/audit-seo.mjs --base https://www.arenaselectrobombas.com.ar   → 34 páginas, 0 problemas
node scripts/verify-routing.mjs --base https://www.arenaselectrobombas.com.ar → 16/16
node scripts/screenshots.mjs --base https://www.arenaselectrobombas.com.ar  → 33 capturas, 0 rotas
npx tsc -b && npx eslint .                                                  → limpio
```

---

## 3. Pendientes

### 3.1 De Tomás — nadie más puede hacerlas

| # | Tarea | Por qué importa | Estado |
|---|---|---|---|
| T1 | **Google Search Console**: verificar la propiedad `www`, mandar el sitemap (`/sitemap.xml`), pedir reindexación | Lo más urgente. Los canonical recién existen; Google tiene que reprocesar el sitio entero | Pendiente |
| T2 | **Testimonios reales**: pedir a 4–6 clientes recientes nombre, localidad y qué se hizo | Es la mayor fuga de conversión que queda. No se puede inventar | Pendiente |
| T3 | **Google Business Profile**: crear y verificar con la dirección de Maipú | La verificación tarda semanas — conviene arrancarla ya. Para "electrobombas cerca mío" el Map Pack se lleva la mayoría de los clics | Pendiente |
| T4 | **`VITE_GA4_ID`** en Vercel (Settings → Environment Variables), formato `G-XXXXXXXXXX`, y **redesplegar** | Sin esa variable la analítica está inerte: no se carga ningún script ni se mide nada | Pendiente |
| T5 | **Reactivar Deployment Protection** en Vercel si querés | La desactivó él para que yo pudiera verificar el preview. Quedó desactivada | Pendiente |
| T6 | **Decidir el nombre comercial**: ¿"Arenas Electrobombas" o "Arenas Perforaciones"? ¿Son dos razones sociales? | Google usa la consistencia de nombre como señal de entidad local. Ver P3 | Pendiente |
| T7 | **Mirar el sitio** en celular y compu | Ver §6: la cobertura visual mejoró mucho pero el ojo humano sigue encontrando cosas | Continuo |

**Datos que necesito de Tomás cuando estén:** URL del Google Business Profile
ya verificado, y URLs de Instagram/Facebook si existen → van al `sameAs` del
JSON-LD.

### 3.2 Mías — Claude, en la próxima sesión

Ordenadas por impacto. **Ninguna está empezada.**

| # | Tarea | Detalle | Esfuerzo |
|---|---|---|---|
| P1 | **Casos de obra** | Los 13 proyectos son una galería de fotos. Reformatearlos como problema → intervención → resultado, con el cliente cuando se pueda. Es el activo de confianza más grande sin explotar (Municipalidad de Luján, Supermercado Libertad, Parque Solar Geneya, Petróleo Sudamericano) | Medio |
| P2 | **Meta descriptions de proyectos** | `ProyectoDetallePage` las genera con `descripcion.slice(0,150) + '...'`, cortando a mitad de palabra. Son 13 frases a escribir a mano en un campo `metaDescription` nuevo en `data.ts` | Bajo |
| P3 | **Unificar la marca** | "Arenas Perforaciones" sigue en: el cuerpo de `/reparacion` ("En **Arenas Perforaciones** contamos con un taller propio"), el texto de "Nuestra Historia" en `/nosotros`, y el `name` de `package.json`. **Depende de T6** | Bajo |
| P4 | **`sameAs`, GBP** | Sumar `sameAs` al `LocalBusiness` de `HomePage.tsx` y `LocalidadPage.tsx`. **Depende de T3** | Bajo |
| P5 | **Email en dominio propio** | El contacto público es `arenasbombas@hotmail.com` teniendo dominio propio. Resta seriedad ante municipios e industria. Se cambia en `CONTACT.email` en `data.ts` una vez creada la casilla | Bajo |
| P6 | **Renombrar assets con espacios** | Hay archivos como `proyecto inmoviliario.webp`. Funciona, pero ya generó un falso positivo en las verificaciones. Renombrar y actualizar `image-widths.json` | Bajo |
| P7 | **Blog / contenido informacional** | 3–4 notas tipo "¿Cuánto sale perforar un pozo?", "¿Conviene reparar o comprar?". Captura intención informacional que hoy no se cubre | Alto |
| P8 | **`Review` / `AggregateRating`** | Sólo cuando existan reseñas verificables. **Nunca inventar ratings**: Google penaliza. **Depende de T2** | Bajo |
| P9 | **Más landings por localidad** | Hoy hay 3. Se pueden sumar San Rafael, Rivadavia, Tunuyán. El patrón está en `data-localidades.ts`; requiere texto propio por landing (Google descarta las plantillas con el nombre cambiado) | Medio |

---

## 4. Cómo trabajar en este repo

### Comandos

```bash
npm run dev                        # desarrollo
npm run build                      # tsc + SSG + limpieza de preloads
npm run preview                    # servir dist/

node scripts/audit-seo.mjs         # 34 páginas: title/canonical/description únicos, schemas, h1
node scripts/verify-routing.mjs    # 308, cleanUrls, trailingSlash, 404 real
node scripts/screenshots.mjs       # 11 páginas × 3 viewports, imágenes rotas, consola
python scripts/optimize-images.py --replace   # convierte a WebP + variantes + manifiesto
```

Los tres primeros aceptan `--base https://...` para correr **contra un deploy
real** en vez de `dist/`. Todos salen con código 1 si encuentran problemas.

### Reglas que no son obvias leyendo el código

1. **`SEO.tsx` importa `Head` de `vite-react-ssg`, no `Helmet`.** La librería
   trae su propia copia de react-helmet-async; con dos copias los contextos de
   React no coinciden y el render en Node falla.
2. **`SEO.tsx` lleva `defer={false}`.** Sin eso, Helmet aplica los cambios por
   `requestAnimationFrame` y no escribe nada cuando el rAF no corre. Ese bug
   dejó **todo el SEO del sitio en no-op** durante meses.
3. **Nada de SEO va en `index.html`.** Esa plantilla se aplica a las 34 páginas:
   cualquier `title`/`canonical` ahí queda **duplicado** en todas.
4. **Las rutas van en `routes.tsx` como objetos, con `lazy` de React Router.**
   `React.lazy` rompe el build: el recolector de assets no lo puede leer.
   Sumá siempre `entry: 'src/app/pages/X.tsx'`.
5. **Para el link de un servicio usá `serviceHref(service)`**, nunca
   `` `/servicios/${slug}` `` a mano: venta y reparación tienen landing propia.
6. **Al convertir imágenes, siempre a `RGBA` si tienen alfa.** Atarlo a la
   extensión aplastó la transparencia de los logos a negro.
7. **Los logos originales están en `brand/`**, fuera de `src/assets/` para que
   el script no los reprocese. Ver `brand/README.md`.
8. **Al agregar una ruta indexable, sumala a `public/sitemap.xml`.**
9. **El dominio canónico es `www`.** Si cambia, tocar `BASE_URL` en `SEO.tsx`,
   `sitemap.xml`, `robots.txt` y el JSON-LD de `HomePage.tsx`.

### Verificación visual — no es opcional

`scripts/screenshots.mjs` usa el Chrome instalado (no descarga navegador) y
captura desktop 1440, **tablet 820** y mobile 390. Detecta imágenes rotas y
errores de consola, pero **no juzga si algo se ve mal**: hay que abrir los PNG.

Dos bugs se escaparon por no mirar píxeles: los logos en negro y el header roto
en tablet. El viewport de tablet se agregó justamente por eso.

---

## 5. Historial de la sesión del 22–23/08/2026

22 commits, de `11cc5c7` a `cb87f3b`. Fases 0, 1 y 2 completas.

### Lo más importante que se encontró

**Toda la capa de SEO era un no-op.** No es que los canonical apuntaran mal:
**no existían**. `react-helmet-async` aplicaba los cambios vía
`requestAnimationFrame`; cuando el rAF no corría, no escribía nada. Las 30
páginas compartían el title y la description del `index.html`, y el JSON-LD de
`LocalBusiness` nunca llegó al DOM. Verificado en producción antes del arreglo:
`data-rh: 0`, `ld+json: 0`, `canonical: null`.

### Fase 0 — señales rotas

- Dominio canónico unificado en `www` (el apex respondía 307 y todos los
  canonical apuntaban ahí)
- 404 real con `noindex`; antes cualquier URL inexistente devolvía 200 con una
  copia de la home (soft 404 masivo)
- Canibalización resuelta: `/venta` y `/reparacion` como canónicas, 308 desde
  `/servicios/venta` y `/servicios/reparacion`. Eran páginas **huérfanas**: los
  links internos iban a las otras
- Logo, footer y breadcrumb a `/` en vez de `/home` (redirect en el link más
  repetido del sitio)
- `og:image` 1200×630 y Twitter Card
- GA4 + evento de clic de WhatsApp con `whatsappLink()` centralizando 9 usos

### Fase 1 — peso

- 247 archivos muertos borrados (362 MB): 202 `.HEIC` que ningún navegador
  muestra ni ningún glob levantaba, más 45 imágenes sin referencia
- Todo a WebP redimensionado con `scripts/optimize-images.py`: 251 → 34 MB
- Carga diferida en los tres carruseles (montaban 4, 3 y 6 imágenes de golpe);
  intervalo de 2–4 s a 6 s; `prefers-reduced-motion`
- `react-icons` fuera (se instalaba entera para un ícono); glob de fotos de obra
  centralizado en `lib/projectImages.ts` (estaba copiado en 4 archivos)
- Código muerto: `slug2`, `isElectroActive` apuntando a una ruta inexistente,
  la rama `slug === "electrobombas"`, 22 imports comentados

### Fase 2 — SSG y contenido

- **Migración a `vite-react-ssg`**: 34 HTML, uno por ruta. No hizo falta Next.
  Se usó 0.9.0, la última que soporta Vite 5 (0.9.2 exige Vite ≥6.4)
- FAQ con `FAQPage` en home, `/venta` y `/reparacion`
- 3 landings por localidad con ~670 palabras propias cada una
- `BreadcrumbList` en las 31 subpáginas
- `srcset` responsive con variantes `-w400`/`-w800` y manifiesto de anchos reales

### Bugs que introduje y corregí

Vale registrarlos: son las trampas de este proyecto.

| Bug | Causa | Corrección |
|---|---|---|
| Meta duplicados en las 34 páginas | Dejé title/canonical en `index.html` además de los de Helmet | Se vaciaron de `index.html` |
| 544 preloads de imagen (3,5 MB en la home) | vite-react-ssg precarga todos los assets del `entry` | `scripts/strip-image-preloads.mjs` post-build |
| Logos con fondo negro | Al reprocesar para el srcset, `.webp` no estaba en la lista de extensiones con alfa | El script ahora mira si la imagen realmente tiene alfa |
| `fetchPriority` en camelCase | React 18 lo descarta con un warning | En minúsculas + augmentación de tipos |
| Doble encoding de WhatsApp | `encodeURIComponent()` pasado a `whatsappLink()`, que vuelve a encodear | Se quitó el encoding previo |
| Chunks 404 tras cada deploy | Los módulos llevan hash y Vercel sirve sólo el deploy vigente | `RouteError.tsx` recarga una vez |

### Bugs preexistentes que aparecieron

- **Claves de React duplicadas** en `PRODUCTOS_VENTA` (dos con `bomba-franklin`):
  rompían la hidratación (#418/#423)
- **Hooks después de un early return** en `ProyectoDetallePage`
- **`npm run lint` roto**: faltaba `eslint.config.js` desde ESLint 9
- **Header roto entre 768 y 1023 px**: el menú pegado al logo con 0 px de
  separación y el CTA en dos líneas. El punto de quiebre pasó a `lg`
- **Miga de pan desarmada en mobile** con títulos largos

### Reescritura del historial de git

Se corrió `git filter-repo` para purgar 413 blobs (198 HEIC, 180 JPG
originales). `.git`: 689 → 100 MB. **El árbol de archivos quedó idéntico**
(misma huella `0d52ac11…`).

- **Respaldo completo:** `D:/Escritorio/DEV/ARENAS/electrobombas-backup-aeb55bf.bundle`
  (674 MB, verificado). Se recupera con `git clone <ese bundle>`
- El `main` viejo estaba en `11cc5c7`
- Cualquier clone anterior del repo quedó roto y hay que re-clonarlo
- **Esto no era necesario para producción**: Vercel hace clone superficial. Sólo
  bajó el tiempo de clone y el espacio en GitHub

---

## 6. Advertencias

1. **Verificar visualmente antes de dar algo por bueno.** Los chequeos
   estructurales no miran píxeles. Dos bugs pasaron por ahí.
2. **El panel del navegador de Claude Code no compone en este entorno.** Los
   screenshots por esa vía fallan y las imágenes ni se decodifican. Usar
   `scripts/screenshots.mjs`, que maneja Chrome directo.
3. **Vercel bloquea el force-push desde Claude Code** (lo frena el sistema de
   permisos). Si hace falta, se lo pasás a Tomás para que lo corra.
4. **Los previews pueden tener Deployment Protection.** Si devuelven 302 hacia
   `vercel.com/sso-api`, hay que desactivarla en Settings → Deployment
   Protection. **No pedir el token de bypass**: es una credencial.
5. **Después de cada deploy, un `Ctrl+Shift+R`.** El `RouteError` recupera solo,
   pero la primera recarga saca de la versión vieja.
6. **Nunca inventar reseñas, ratings ni testimonios.** Google penaliza y el
   cliente no lo pidió.
