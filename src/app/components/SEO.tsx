import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Arenas Electrobombas';
const BASE_URL = 'https://arenaselectrobombas.com.ar';

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  jsonLd?: object | object[];
}

export default function SEO({ title, description, canonical, jsonLd }: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${BASE_URL}${canonical}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_AR" />
      <meta property="og:type" content="website" />

      {/* JSON-LD estructurado */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
