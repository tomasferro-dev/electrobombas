import Contact from '../components/Contact';
import Breadcrumb from '../components/Breadcrumb';
import SEO from '../components/SEO';

export default function ContactoPage() {
  return (
    <>
      <SEO
        title="Contacto"
        description="Contactá a Arenas Electrobombas en Mendoza y San Juan. Teléfono, WhatsApp y formulario de contacto. Atención Lun–Vie 8–17hs y Sáb 8–12hs."
        canonical="/contacto"
      />
      <Breadcrumb />
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-4">
        <div className="container mx-auto sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-3">Contacto</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Estamos para ayudarte. Consultanos sin compromiso y recibí presupuesto sin cargo.
          </p>
        </div>
      </div>
      <Contact />
    </>
  );
}
