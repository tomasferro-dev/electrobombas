# Arenas Perforaciones — React Router App

SPA migrada a aplicación con enrutado completo usando **React Router v6** + **Vite** + **Tailwind CSS**.

## 🗂️ Estructura de rutas

| URL | Página |
|-----|--------|
| `/` | → redirige a `/home` |
| `/home` | Landing completa: Hero + Servicios (preview) + Nosotros + Galería (preview) + Contacto |
| `/servicios` | Grid completo de todos los servicios |
| `/servicios/:slug` | Detalle individual de servicio |
| `/proyectos` | Galería completa de proyectos con filtro por categoría |
| `/proyectos/:id` | Detalle de proyecto con lightbox de imágenes |
| `/contacto` | Formulario + mapa + info de contacto completa |
| `/nosotros` | Empresa + estadísticas + historia |

**Slugs de servicios disponibles:**
`perforaciones`, `electrobombas`, `bobinados`, `filmaciones`, `limpieza`, `pescas`, `estudios-geologicos`, `mantenimiento`

## 🚀 Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## ☁️ Deploy en Vercel (un clic)

1. Subí el proyecto a GitHub
2. En [vercel.com](https://vercel.com), hacé clic en **"Add New Project"**
3. Importá tu repositorio
4. Vercel detecta Vite automáticamente — no hace falta configurar nada
5. Hacé clic en **Deploy**

El archivo `vercel.json` ya está configurado para manejar el enrutado del lado del cliente correctamente.

## 🖼️ Integrar tus assets (imágenes reales)

### Logo
En `src/app/components/Header.tsx`, descomentá:
```tsx
import logo from '../../assets/arenas_perforaciones_sin_fondo.png';
// y en el JSX:
<img src={logo} alt="Arenas Perforaciones" className="h-10 md:h-12 w-auto object-contain" />
```

### Hero
En `src/app/components/Hero.tsx`:
```tsx
import HeroImageDesktop from '../../../assets/hero-perforacion.jpg';
// y en el JSX reemplazá el div de placeholder por:
<img src={HeroImageDesktop} ... />
```

### Proyectos — imágenes dinámicas por carpeta
En `src/app/pages/proyectos/ProyectoDetallePage.tsx`, el array `images` está vacío por defecto.
Para cargar imágenes reales, usá `import.meta.glob` como en tu Gallery original:

```tsx
// Ejemplo para el proyecto 'limpieza'
const limpiezaImages = Object.values(
  import.meta.glob('../../../assets/limpieza/*.jpg', { eager: true, import: 'default' })
) as string[];
```

Luego asociá cada array al proyecto correspondiente en `data.ts` o directamente en el componente.

## 📝 Personalizar datos

Todos los datos del sitio están centralizados en:

```
src/app/data.ts
```

- **`SERVICES`**: array con todos los servicios (slug, título, descripción, features, icono, gradient)
- **`PROJECTS`**: array con todos los proyectos (id, título, descripción, ubicación, categoría)
- **`CONTACT`**: teléfonos, email, dirección, horarios, WhatsApp, LinkedIn

Modificá este archivo para actualizar todo el sitio.

## 📦 Dependencias principales

| Paquete | Versión | Uso |
|---------|---------|-----|
| `react` | ^18 | Framework |
| `react-router-dom` | ^6.26 | Enrutado |
| `lucide-react` | ^0.400 | Iconos |
| `react-icons` | ^5 | Icono WhatsApp |
| `tailwindcss` | ^3.4 | Estilos |
| `vite` | ^5 | Bundler |
