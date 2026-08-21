import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '../data-faq';

interface FaqProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
}

/**
 * Acordeón de preguntas frecuentes.
 *
 * Las respuestas están siempre en el DOM, sólo colapsadas por altura: si se
 * montaran al abrir, el crawler no las vería y el schema FAQPage declararía
 * texto que no está en la página, que es exactamente lo que Google penaliza.
 */
export default function Faq({
  items,
  title = 'Preguntas frecuentes',
  subtitle,
}: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 sm:py-16 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2 text-center">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">{subtitle}</p>
        )}

        <dl className={subtitle ? 'space-y-3' : 'space-y-3 mt-8'}>
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.pregunta}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-respuesta-${i}`}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 text-sm sm:text-base">
                      {item.pregunta}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-red-700 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </dt>
                <dd
                  id={`faq-respuesta-${i}`}
                  className={`grid transition-all duration-200 ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
                      {item.respuesta}
                    </p>
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
