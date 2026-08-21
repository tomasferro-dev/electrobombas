import { Head } from 'vite-react-ssg';

const SITE_NAME = 'Arenas Electrobombas';
const BASE_URL = 'https://www.arenaselectrobombas.com.ar';

// Imagen por defecto para previews de WhatsApp, Facebook e Instagram.
// Vive en /public para que sea una URL absoluta estable, no un asset con hash.
const DEFAULT_OG_IMAGE = '/og-image.jpg';
const DEFAULT_OG_ALT = 'Equipo de Arenas Electrobombas trabajando en una perforación de pozo de agua';

interface SEOProps {
  title: string;
  description: string;
  /** Ruta canónica. Omitir sólo en páginas noindex (404): un canonical
   *  en una página excluida del índice es una señal contradictoria. */
  canonical?: string;
  jsonLd?: object | object[];
  /** Ruta a una imagen en /public. Por defecto, la imagen institucional. */
  ogImage?: string;
  ogImageAlt?: string;
  /** Excluye la página del índice de Google (404, filtros, duplicados). */
  noindex?: boolean;
  /** Permite apagar el sufijo de marca en titles que ya son largos. */
  brandSuffix?: boolean;
}

export default function SEO({
  title,
  description,
  canonical,
  jsonLd,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = DEFAULT_OG_ALT,
  noindex = false,
  brandSuffix = true,
}: SEOProps) {
  const fullTitle = brandSuffix ? `${title} | ${SITE_NAME}` : title;
  const url = canonical ? `${BASE_URL}${canonical}` : undefined;
  // Los scrapers sociales exigen URL absoluta: una ruta relativa no resuelve.
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;

  return (
    <Head defer={false}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {url && <link rel="canonical" href={url} />}
      {noindex && <meta name="robots" content="noindex, follow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_AR" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* JSON-LD estructurado */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Head>
  );
}
