export interface FaqItem {
  pregunta: string;
  respuesta: string;
}

/**
 * Preguntas frecuentes.
 *
 * Doble función: bajan la objeción antes del clic a WhatsApp y habilitan el
 * schema FAQPage, que en el resultado de Google ocupa el triple de alto
 * vertical que un resultado común.
 *
 * Las respuestas tienen que ser verdaderas y consistentes con el resto del
 * sitio: Google penaliza el FAQPage cuando el texto del schema no coincide
 * con lo que se ve en la página.
 */

/** Se muestran en la home: cubren las dudas generales. */
export const FAQ_GENERAL: FaqItem[] = [
  {
    pregunta: '¿En qué zonas trabajan?',
    respuesta:
      'Trabajamos en toda la provincia de Mendoza y San Juan, con base en Maipú. También cubrimos San Luis, La Pampa, Buenos Aires y la Patagonia para trabajos programados. Consultanos por tu localidad y te confirmamos disponibilidad.',
  },
  {
    pregunta: '¿El presupuesto tiene costo?',
    respuesta:
      'No. El diagnóstico y el presupuesto son sin cargo y sin compromiso. Te informamos el costo exacto antes de empezar cualquier trabajo.',
  },
  {
    pregunta: '¿Van hasta el campo o la finca?',
    respuesta:
      'Sí. Contamos con equipos propios para trabajar a campo en perforaciones, extracción y colocación de electrobombas, limpieza y filmación de pozos. Coordinamos la visita según la ubicación.',
  },
  {
    pregunta: '¿Qué marcas de electrobombas reparan?',
    respuesta:
      'Reparamos toda marca y modelo de electrobomba sumergible y de superficie, de 0,5 HP a 200 HP, tanto monofásicas como trifásicas.',
  },
  {
    pregunta: '¿Cuánto hace que trabajan en el rubro?',
    respuesta:
      'Más de 20 años. Podés ver obras reales que ejecutamos en la sección de Proyectos: municipios, parques solares, fincas, supermercados y yacimientos.',
  },
  {
    pregunta: '¿Cómo los contacto?',
    respuesta:
      'Por WhatsApp al 0261-470 7318, por teléfono al 0261-212-0438 o desde el formulario de contacto del sitio. Atendemos de lunes a viernes de 8 a 17 y los sábados de 8 a 12.',
  },
];

/** Se muestran en /reparacion. */
export const FAQ_REPARACION: FaqItem[] = [
  {
    pregunta: '¿Cuánto tarda la reparación de una electrobomba?',
    respuesta:
      'Depende del daño y de la disponibilidad de repuestos. Después del diagnóstico te damos un plazo concreto junto con el presupuesto, antes de empezar el trabajo.',
  },
  {
    pregunta: '¿Me prestan un equipo mientras reparan el mío?',
    respuesta:
      'Sí. Tenemos servicio de alquiler de electrobombas justamente para eso: que no te quedes sin agua mientras reparamos tu equipo. Consultanos por disponibilidad y potencia.',
  },
  {
    pregunta: '¿La reparación tiene garantía?',
    respuesta:
      'Sí, entregamos garantía escrita sobre el trabajo realizado. Antes de la entrega, cada equipo pasa por ensayo en banco y prueba dieléctrica.',
  },
  {
    pregunta: '¿Conviene reparar o comprar una bomba nueva?',
    respuesta:
      'Depende del estado del equipo y de su antigüedad. Hacemos el diagnóstico sin cargo y te decimos con honestidad qué conviene: muchas veces la reparación cuesta una fracción de un equipo nuevo.',
  },
  {
    pregunta: '¿Qué incluye el bobinado?',
    respuesta:
      'Bobinado de estátores monofásicos y trifásicos, bobinado de rotores y armaduras, impregnación al vacío con barniz epóxico, balanceo dinámico y ensayo dieléctrico posterior.',
  },
  {
    pregunta: '¿Cómo saco la bomba del pozo?',
    respuesta:
      'La extraemos nosotros. Tenemos equipos de extracción propios, y también servicio de pesca para recuperar bombas o cañerías que quedaron caídas dentro de la perforación.',
  },
];

/** Se muestran en /venta. */
export const FAQ_VENTA: FaqItem[] = [
  {
    pregunta: '¿Cómo sé qué electrobomba necesito?',
    respuesta:
      'Te asesoramos sin cargo. Para recomendarte el equipo correcto necesitamos saber la profundidad del pozo, el caudal que requerís, el diámetro de la perforación y qué tipo de instalación alimenta.',
  },
  {
    pregunta: '¿Los equipos tienen garantía?',
    respuesta:
      'Sí, todas las electrobombas nuevas se entregan con garantía oficial de fábrica.',
  },
  {
    pregunta: '¿Hacen la instalación?',
    respuesta:
      'Sí. Además de la venta nos ocupamos de la colocación del equipo en la perforación, incluyendo cañería, cables y tablero de control cuando hace falta.',
  },
  {
    pregunta: '¿Tienen stock o hay que encargar?',
    respuesta:
      'Manejamos stock permanente de los modelos más pedidos. Si necesitás una configuración específica, la armamos con las características que requiera tu proyecto.',
  },
  {
    pregunta: '¿Puedo comprar si no encuentro el modelo en el catálogo?',
    respuesta:
      'Sí. El catálogo del sitio es una muestra. Consultanos por WhatsApp y conseguimos el modelo que necesitás o te recomendamos la alternativa equivalente.',
  },
  {
    pregunta: '¿Venden para uso doméstico o solo industrial?',
    respuesta:
      'Para los dos. Trabajamos equipos desde 0,2 HP para casas y cisternas hasta 300 HP para uso agrícola, industrial y municipal.',
  },
];

/** Schema FAQPage a partir de una lista de preguntas. */
export function faqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: item.respuesta },
    })),
  };
}
