import type { RouteRecord } from 'vite-react-ssg';

import RootLayout from './layouts/RootLayout';
import SubpageLayout from './layouts/SubpageLayout';
import { SERVICES, PROJECTS } from './data';
import { LOCALIDADES } from './data-localidades';

/**
 * Rutas como objetos, no como JSX.
 *
 * vite-react-ssg recorre este árbol en Node, en tiempo de build, para saber
 * qué HTML generar. Un árbol de <Routes> sólo existe durante el render, así
 * que no le sirve.
 *
 * Las páginas se cargan con `lazy` —el de React Router, no React.lazy—
 * porque es la forma en que el generador puede resolver el módulo y juntar
 * los assets (CSS incluido) de cada página. Con React.lazy el build falla al
 * intentar leer el componente.
 *
 * `entry` apunta al archivo fuente: sirve para que el HTML generado ya traiga
 * el CSS de esa página y no haya un salto de estilos antes de la hidratación.
 *
 * Los slugs que se prerenderizan salen de data.ts vía getStaticPaths: al
 * agregar un servicio o un proyecto, su HTML se genera solo.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    entry: 'src/app/layouts/RootLayout.tsx',
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import('./pages/HomePage')).default }),
        entry: 'src/app/pages/HomePage.tsx',
      },
    ],
  },
  {
    path: '/',
    element: <SubpageLayout />,
    entry: 'src/app/layouts/SubpageLayout.tsx',
    children: [
      {
        path: 'servicios',
        lazy: async () => ({ Component: (await import('./pages/ServiciosPage')).default }),
        entry: 'src/app/pages/ServiciosPage.tsx',
      },
      {
        path: 'proyectos',
        lazy: async () => ({ Component: (await import('./pages/ProyectosPage')).default }),
        entry: 'src/app/pages/ProyectosPage.tsx',
      },
      {
        path: 'contacto',
        lazy: async () => ({ Component: (await import('./pages/ContactoPage')).default }),
        entry: 'src/app/pages/ContactoPage.tsx',
      },
      {
        path: 'nosotros',
        lazy: async () => ({ Component: (await import('./pages/NosotrosPage')).default }),
        entry: 'src/app/pages/NosotrosPage.tsx',
      },

      {
        path: 'servicios/:slug',
        lazy: async () => ({
          Component: (await import('./pages/servicios/ServicioDetallePage')).default,
        }),
        entry: 'src/app/pages/servicios/ServicioDetallePage.tsx',
        // Venta y Reparación se excluyen: tienen landing propia y
        // /servicios/venta redirige con 301, así que no debe generarse HTML.
        getStaticPaths: () =>
          SERVICES.filter((s) => !s.href).map((s) => `/servicios/${s.slug}`),
      },
      {
        path: 'proyectos/:id',
        lazy: async () => ({
          Component: (await import('./pages/proyectos/ProyectoDetallePage')).default,
        }),
        entry: 'src/app/pages/proyectos/ProyectoDetallePage.tsx',
        getStaticPaths: () => PROJECTS.map((p) => `/proyectos/${p.id}`),
      },

      {
        path: 'reparacion',
        lazy: async () => ({
          Component: (await import('./pages/ReparacionElectrobombasPage')).default,
        }),
        entry: 'src/app/pages/ReparacionElectrobombasPage.tsx',
      },
      {
        path: 'venta',
        lazy: async () => ({
          Component: (await import('./pages/VentaElectrobombasPage')).default,
        }),
        entry: 'src/app/pages/VentaElectrobombasPage.tsx',
      },

      // Landings por localidad, una ruta explícita por slug: una ruta /:slug
      // se tragaría cualquier URL inexistente y le robaría el 404.
      ...LOCALIDADES.map((l) => ({
        path: l.slug,
        lazy: async () => ({ Component: (await import('./pages/LocalidadPage')).default }),
        entry: 'src/app/pages/LocalidadPage.tsx',
      })),

      // 404 real: sin redirect y con noindex. Redirigir a la home convertía
      // cualquier URL inexistente en un duplicado de la portada, y Google lo
      // penaliza como soft 404.
      {
        path: '*',
        lazy: async () => ({ Component: (await import('./pages/NotFoundPage')).default }),
        entry: 'src/app/pages/NotFoundPage.tsx',
        // Genera dist/404.html. Vercel lo devuelve con status 404 real para
        // cualquier ruta inexistente, que es mejor que el noindex: antes,
        // el rewrite de SPA servía la home con 200 en su lugar.
        getStaticPaths: () => ['/404'],
      },
    ],
  },
];
