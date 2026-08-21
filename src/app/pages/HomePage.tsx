import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import SEO from '../components/SEO';
import Faq from '../components/Faq';
import { FAQ_GENERAL, faqJsonLd } from '../data-faq';

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Arenas Electrobombas',
  description:
    'Empresa especializada en venta, reparación y alquiler de electrobombas en Mendoza y San Juan. Perforación de pozos de agua, bobinados, filmaciones y más.',
  url: 'https://www.arenaselectrobombas.com.ar',
  image: 'https://www.arenaselectrobombas.com.ar/og-image.jpg',
  logo: 'https://www.arenaselectrobombas.com.ar/og-image.jpg',
  // sameAs: pendiente del Google Business Profile y de las redes.
  telephone: '+5402614707318',
  email: 'arenasbombas@hotmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1536 Jesús Nazareno',
    addressLocality: 'Maipú',
    addressRegion: 'Mendoza',
    postalCode: 'M5515',
    addressCountry: 'AR',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '12:00',
    },
  ],
  areaServed: ['Mendoza', 'San Juan', 'San Luis', 'Buenos Aires', 'Patagonia', 'La Pampa'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Electrobombas y Pozos de Agua',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Venta de electrobombas' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Reparación de electrobombas' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Alquiler de electrobombas' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Perforación de pozos de agua' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bobinados de motores eléctricos' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Filmaciones de pozos' } },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <SEO
        title="Venta y Reparación de Electrobombas en Mendoza y San Juan"
        description="Arenas Electrobombas: venta, reparación y alquiler de electrobombas en Mendoza y San Juan. Perforación de pozos, bobinados, filmaciones y extracción. +20 años de experiencia."
        canonical="/"
        jsonLd={[localBusinessJsonLd, faqJsonLd(FAQ_GENERAL)]}
      />
      <Hero />
      <Services preview />
      <WhyChooseUs />
      <Gallery preview />
      <Faq items={FAQ_GENERAL} />
      <Contact compact />
    </>
  );
}
