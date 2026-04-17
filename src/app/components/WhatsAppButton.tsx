import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { ArrowUp } from 'lucide-react';
import { CONTACT } from '../data';

export default function WhatsAppButton() {
  const message = encodeURIComponent('Hola! Me gustaría consultar sobre sus servicios de perforación.');
  const url = `https://wa.me/${CONTACT.whatsappNumber}?text=${message}`;

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Scroll to top — visible only after scrolling down */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Volver al inicio"
          className="bg-white border border-gray-200 text-gray-600 hover:text-red-700 hover:border-red-700 w-11 h-11 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* WhatsApp button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7" />
      </a>
    </div>
  );
}
