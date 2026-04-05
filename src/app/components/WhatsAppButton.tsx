import { FaWhatsapp } from 'react-icons/fa';
import { CONTACT } from '../data';

export default function WhatsAppButton() {
  const message = encodeURIComponent('Hola! Me gustaría consultar sobre sus servicios de perforación.');
  const url = `https://wa.me/${CONTACT.whatsappNumber}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="w-7 h-7" />
    </a>
  );
}
