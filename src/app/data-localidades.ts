import type { FaqItem } from './data-faq';

export interface Localidad {
  /** Ruta de la landing, sin barra inicial duplicada. */
  slug: string;
  /** Provincia de PROJECTS por la que se filtran las obras. null = todas. */
  provincia: 'Mendoza' | 'San Juan' | null;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  /** Párrafos del cuerpo. Texto propio: no se repite entre landings. */
  cuerpo: { titulo: string; texto: string }[];
  /** Localidades servidas, para el listado y el areaServed del schema. */
  zonas: string[];
  faq: FaqItem[];
}

/**
 * Landings por localidad.
 *
 * Competir por "venta de electrobombas" a nivel nacional es carísimo;
 * "electrobombas Maipú Mendoza" es ganable y es lo que busca el cliente real.
 * Cada landing tiene texto propio —Google descarta las páginas por ciudad que
 * son la misma plantilla con el nombre cambiado— y muestra las obras que
 * efectivamente se hicieron en esa zona.
 */
export const LOCALIDADES: Localidad[] = [
  {
    slug: 'electrobombas-mendoza',
    provincia: 'Mendoza',
    seoTitle: 'Electrobombas en Mendoza: venta, reparación y alquiler',
    seoDescription:
      'Venta, reparación y alquiler de electrobombas en Mendoza. Taller propio en Maipú, equipos de extracción, bobinados y perforación de pozos. Presupuesto sin cargo.',
    h1: 'Electrobombas en Mendoza',
    intro:
      'Somos un taller mendocino con base en Maipú. Vendemos, reparamos y alquilamos electrobombas sumergibles y de superficie, y trabajamos a campo en toda la provincia con equipos propios de extracción, limpieza y filmación de pozos.',
    cuerpo: [
      {
        titulo: 'Taller propio en Maipú, no somos intermediarios',
        texto:
          'Trabajamos desde Maipú, sobre calle Jesús Nazareno. El equipo entra al taller, se diagnostica, se desarma y se repara acá: bobinado de estátores y rotores, impregnación al vacío, cambio de rodamientos y sellos, balanceo dinámico y ensayo en banco antes de devolvértelo. Eso significa que el plazo y la calidad dependen de nosotros, no de un tercero al que le derivamos el trabajo. Para el productor de Maipú, Luján, Guaymallén o Rivadavia, la diferencia es concreta: podés traer el equipo, verlo y hablar con quien lo va a reparar.',
      },
      {
        titulo: 'Vamos a la finca con equipos de extracción',
        texto:
          'Una bomba de pozo no se saca a mano. Contamos con equipos propios para extraer y colocar electrobombas en perforaciones profundas, además de servicio de pesca para recuperar bombas o cañerías que quedaron caídas dentro del pozo. También hacemos limpieza y desarrollo de perforaciones que perdieron caudal, filmación con cámara para ver el estado real del entubado, y reentubación cuando la perforación se dañó. Salimos a toda la provincia: Zona Este, Valle de Uco, San Rafael y General Alvear incluidos.',
      },
      {
        titulo: 'Qué necesitamos saber para asesorarte',
        texto:
          'Para recomendarte el equipo correcto necesitamos cuatro datos: profundidad del pozo, caudal que precisás, diámetro de la perforación y qué instalación va a alimentar. Con eso te armamos la electrobomba con las características adecuadas, en lugar de venderte el modelo más caro del catálogo. Trabajamos equipos monofásicos y trifásicos desde 0,2 HP para uso domiciliario hasta 300 HP para riego agrícola, industria y usos municipales. El diagnóstico y el presupuesto son sin cargo.',
      },
    ],
    zonas: [
      'Maipú', 'Luján de Cuyo', 'Guaymallén', 'Godoy Cruz', 'Las Heras',
      'Rivadavia', 'Junín', 'San Martín', 'Santa Rosa', 'La Paz',
      'Tunuyán', 'Tupungato', 'San Carlos', 'San Rafael', 'General Alvear', 'Lavalle',
    ],
    faq: [
      {
        pregunta: '¿Dónde queda el taller?',
        respuesta:
          'En Maipú, Mendoza: 1536 Jesús Nazareno (M5515). Atendemos de lunes a viernes de 8 a 17 y los sábados de 8 a 12.',
      },
      {
        pregunta: '¿Van al Valle de Uco y al Sur provincial?',
        respuesta:
          'Sí. Trabajamos en toda la provincia, incluidos Tunuyán, Tupungato, San Carlos, San Rafael y General Alvear. Para esas zonas coordinamos la salida con fecha, así aprovechamos el viaje.',
      },
      {
        pregunta: '¿Puedo llevar la bomba yo mismo al taller?',
        respuesta:
          'Sí, y suele ser lo más rápido si ya la tenés fuera del pozo. Si todavía está colocada, la extraemos nosotros con nuestros equipos.',
      },
    ],
  },
  {
    slug: 'electrobombas-san-juan',
    provincia: 'San Juan',
    seoTitle: 'Electrobombas en San Juan: venta, reparación y servicio de pozos',
    seoDescription:
      'Servicio de electrobombas en San Juan: venta, reparación, extracción, limpieza y filmación de pozos. Trabajamos en fincas, parques solares e industria. Presupuesto sin cargo.',
    h1: 'Electrobombas y pozos de agua en San Juan',
    intro:
      'Trabajamos en San Juan de forma habitual, con obras ejecutadas en el sector agrícola, en energía solar y en industria. Cubrimos el ciclo completo: extracción, reparación en taller, colocación y puesta en marcha.',
    cuerpo: [
      {
        titulo: 'Obras ejecutadas en la provincia',
        texto:
          'San Juan no es una zona a la que "también llegamos": es donde hicimos varias de nuestras intervenciones más exigentes. Un servicio integral en un parque solar, que incluyó filmación, pesca de una electrobomba caída, limpieza, colocación de cañería y montaje de un equipo nuevo con cables y tablero. Limpieza, extracción y rehabilitación en una finca de pistachos. Pesca, extracción, colocación y filmación en una finca del sector olivícola. Y siete intervenciones de extracción, colocación y limpieza en distintos pozos de la provincia. Todas están documentadas con fotos en la sección de Proyectos.',
      },
      {
        titulo: 'Producción agrícola: el pozo no puede parar',
        texto:
          'En finca, un pozo detenido en plena temporada de riego es una pérdida que se mide en días. Por eso trabajamos con alquiler de electrobombas: mientras tu equipo está en el taller, colocamos uno de reemplazo para que la instalación siga funcionando. Si la perforación perdió caudal, antes de cambiar la bomba conviene descartar que el problema sea el pozo: la filmación con cámara muestra el estado real del entubado y de los filtros, y muchas veces una limpieza o un desarrollo recuperan el caudal sin tocar el equipo.',
      },
      {
        titulo: 'Cómo trabajamos a distancia',
        texto:
          'Al estar basados en Mendoza, coordinamos las salidas a San Juan con fecha acordada y llevamos todo lo necesario en el mismo viaje: equipo de extracción, cañería, cables y tablero si hace falta. El diagnóstico en obra y el presupuesto son sin cargo. Cuando el equipo requiere taller, lo trasladamos nosotros, lo reparamos con garantía escrita y lo devolvemos colocado y en funcionamiento.',
      },
    ],
    zonas: [
      'Capital', 'Rawson', 'Rivadavia', 'Santa Lucía', 'Chimbas', 'Pocito',
      'Caucete', 'San Martín', 'Angaco', 'Albardón', 'Ullum', 'Zonda',
      'Sarmiento', '25 de Mayo', '9 de Julio', 'Jáchal', 'Valle Fértil',
    ],
    faq: [
      {
        pregunta: '¿Cobran el viaje a San Juan?',
        respuesta:
          'El diagnóstico y el presupuesto son sin cargo. Si el trabajo se concreta, el traslado va incluido en el presupuesto; te lo informamos por adelantado, sin sorpresas.',
      },
      {
        pregunta: '¿Cuánto tardan en llegar?',
        respuesta:
          'Coordinamos la salida con fecha acordada. Contanos la urgencia por WhatsApp y te confirmamos la disponibilidad más cercana.',
      },
      {
        pregunta: '¿Trabajan con parques solares e industria?',
        respuesta:
          'Sí. Ejecutamos un servicio integral en un parque solar de San Juan que incluyó filmación, pesca, limpieza, cañería y colocación de equipo nuevo con tablero. También trabajamos en el sector petrolero y comercial.',
      },
    ],
  },
  {
    slug: 'perforacion-pozos-maipu',
    provincia: 'Mendoza',
    seoTitle: 'Perforación y mantenimiento de pozos de agua en Maipú, Mendoza',
    seoDescription:
      'Perforación, limpieza, filmación y rehabilitación de pozos de agua en Maipú y alrededores. Taller propio en la zona. Más de 20 años de experiencia. Presupuesto sin cargo.',
    h1: 'Perforación de pozos de agua en Maipú',
    intro:
      'Estamos en Maipú. Perforamos pozos nuevos, recuperamos perforaciones que perdieron caudal y hacemos el mantenimiento del pozo y del equipo de bombeo en toda la zona.',
    cuerpo: [
      {
        titulo: 'Antes de perforar: el estudio',
        texto:
          'Una perforación mal ubicada es dinero perdido. Antes de decidir dónde y a qué profundidad, hacemos el estudio geológico e hidrogeológico del terreno: determina la profundidad a la que está el acuífero, qué caudal se puede esperar y con qué diámetro y entubado conviene ejecutar la obra. Con esa información se dimensiona la perforación y recién después el equipo de bombeo. Trabajamos tanto pozos domiciliarios como perforaciones agrícolas e industriales de gran profundidad.',
      },
      {
        titulo: 'Pozos existentes: primero diagnosticar, después gastar',
        texto:
          'Cuando un pozo baja el caudal, el reflejo suele ser cambiar la bomba. Muchas veces el problema no es el equipo sino la perforación: filtros obturados, incrustaciones, entubado dañado o arena. La filmación con cámara muestra el estado real por dentro antes de invertir. Según lo que aparezca, el trabajo puede ser una limpieza, un desarrollo para recuperar caudal, una reentubación, o la rehabilitación de una perforación que quedó en abandono. Es bastante más barato que perforar de nuevo.',
      },
      {
        titulo: 'Todo el ciclo con el mismo equipo de trabajo',
        texto:
          'Hacemos la perforación, el estudio previo, la extracción y colocación de la electrobomba, la reparación en taller cuando el equipo lo necesita, y el mantenimiento programado del pozo. Que sea el mismo equipo el que perfora y el que después mantiene evita el ida y vuelta entre proveedores cuando algo falla. En Maipú tenemos obras ejecutadas: entre ellas una extracción y colocación en Barrancas, documentada con fotos en la sección de Proyectos.',
      },
    ],
    zonas: [
      'Maipú', 'Barrancas', 'Coquimbito', 'Cruz de Piedra', 'Fray Luis Beltrán',
      'General Gutiérrez', 'Luzuriaga', 'Rodeo del Medio', 'Russell', 'San Roque',
      'Luján de Cuyo', 'Guaymallén', 'Godoy Cruz',
    ],
    faq: [
      {
        pregunta: '¿Cuánto sale perforar un pozo?',
        respuesta:
          'Depende de la profundidad, del diámetro y del terreno, así que no hay un precio de lista honesto. Hacemos el estudio y te pasamos un presupuesto cerrado sin cargo antes de empezar.',
      },
      {
        pregunta: 'Mi pozo bajó el caudal, ¿hay que perforar de nuevo?',
        respuesta:
          'Casi nunca es lo primero. Conviene filmar el pozo para ver el estado del entubado y los filtros: en la mayoría de los casos una limpieza, un desarrollo o una reentubación recuperan el caudal a una fracción del costo de una perforación nueva.',
      },
      {
        pregunta: '¿Hacen pozos para casas particulares?',
        respuesta:
          'Sí, desde pozos domiciliarios hasta perforaciones industriales de gran profundidad. También colocamos el equipo de bombeo adecuado para cada caso.',
      },
    ],
  },
];

export function findLocalidad(slug: string): Localidad | undefined {
  return LOCALIDADES.find((l) => l.slug === slug);
}
