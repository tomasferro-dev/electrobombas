import perfo2 from "../assets/perfo2.jpg";
import agua from "../assets/agua.jpg";
import agua1 from "../assets/agua1.jpg";
import filmacion1 from "../assets/filmacion1.jpg";
import pesca5 from "../assets/pesca5.jpg";
import pesca6 from "../assets/pesca6.jpg";
import pesca7 from "../assets/pesca7.jpg";
import estudio2 from "../assets/estudio2.jpg";
import estudiogeologico from "../assets/estudio-geologico.jpg";
import mant from "../assets/mant-rehab3.jpg";
import watermotBanner from "../assets/bombas/watermot-banner.jpg";
import reparacion1 from "../assets/reparacion1.jpg";
import limpieza1 from "../assets/limpieza1.jpg";
import bobinados2 from "../assets/bobinados2.jpg";
// import caneria from "../assets/caneria.jpg";
import extrac1 from "../assets/extrac1.jpg";
// import limpieza from '../assets/IMG_0097 2.jpg';

export interface Service {
  id: string;
  slug: string;
  slug2: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  details: string[];
  image: string;
  images: string[];
  imageDetail: string;
  icon: string;
  gradient: string;
}

export interface Project {
  id: string;
  title: string;
  provincia?: 'San Juan' | 'Mendoza';
  descripcion: string;
  servicios: string[];
  imageFolder: string;
  cliente?: string;
}

// ─────────────────────────────────────────────
// SERVICIOS
// ─────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    id: "1",
    slug: "venta",
    slug2: "venta",
    title: "Venta de Electrobombas",
    shortDescription:
      "Comercialización de electrobombas en Mendoza, San Juan y resto de Argentina para uso doméstico, agrícola e industrial, con asesoramiento técnico para elegir el equipo adecuado.",
    fullDescription:
      "Ofrecemos venta especializada de electrobombas sumergibles y de superficie de primeras marcas para múltiples aplicaciones. Asesoramos a cada cliente según caudal requerido, profundidad, tipo de uso y características del terreno. Trabajamos con equipos confiables y eficientes, garantizando durabilidad y rendimiento óptimo en instalaciones domiciliarias, agrícolas e industriales.",
    features: [
      "Electrobombas nuevas con garantía oficial",
      "Armamos la Electrobomba con las características adecuadas para tu proyecto",
      "Equipos para uso doméstico, agrícola e industrial",
      "Asesoramiento técnico personalizado",
      "Stock permanente",
      "Entrega inmediata o programada",
    ],
    details: [
      "Venta de bombas sumergibles y de superficie",
      "Selección según caudal, altura y potencia",
      "Equipos monofásicos y trifásicos",
      "Potencias desde 0.2 HP hasta 300 HP",
      "Opciones para pozos, cisternas y riego",
      "Accesorios y repuestos originales",
      "Cobertura en Mendoza, San Juan y resto de Argentina",
    ],
    image: watermotBanner,
    images: [watermotBanner],
    imageDetail: watermotBanner,
    icon: "Settings",
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    id: "12",
    slug: "alquiler",
    slug2: "alquiler",
    title: "Alquiler de Electrobombas",
    shortDescription:
      "Alquiler de electrobombas sumergibles y de superficie en Mendoza, San Juan y resto de Argentina. Solución temporal para garantizar la continuidad del servicio de agua mientras reparamos tu equipo o por proyectos puntuales.",
    fullDescription:
      "Ofrecemos un servicio de alquiler de electrobombas pensado para brindar continuidad operativa a productores agrícolas, industrias, municipios y hogares. Es la solución ideal cuando tu equipo se encuentra en reparación, para cubrir períodos de alta demanda o para proyectos con necesidades temporales de bombeo. Disponemos de electrobombas de diferentes potencias y características, todas en óptimas condiciones de funcionamiento y con asesoramiento técnico incluido. Consultanos por la disponibilidad y el modelo que mejor se adapte a tu proyecto a través de nuestro formulario de contacto o WhatsApp.",
    features: [
      "Equipos en óptimas condiciones de funcionamiento",
      "Solución inmediata ante rotura o mantenimiento del equipo propio",
      "Diferentes potencias y caudales disponibles",
      "Asesoramiento técnico incluido",
      "Contratos flexibles adaptados a cada proyecto",
      "Cobertura en Mendoza, San Juan y resto de Argentina",
    ],
    details: [
      "Electrobombas sumergibles y de superficie",
      "Equipos monofásicos y trifásicos",
      "Uso doméstico, agrícola, industrial y municipal",
      "Alquileres por días, semanas o meses",
      "Entrega y retiro coordinado",
      "Instalación y puesta en marcha opcional",
      "Asistencia técnica durante el período de alquiler",
      "Presupuesto a medida según el proyecto",
    ],
    image: watermotBanner,
    images: [watermotBanner],
    imageDetail: watermotBanner,
    icon: "Settings",
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    id: "2",
    slug: "reparacion",
    slug2: "reparacion",
    title: "Reparación de Electrobombas",
    shortDescription:
      "Servicio técnico especializado en reparación de electrobombas en Mendoza, San Juan y resto de Argentina, con diagnóstico preciso, repuestos de calidad y prueba en banco.",
    fullDescription:
      "Brindamos un servicio integral de reparación de electrobombas sumergibles y de superficie. Realizamos diagnóstico eléctrico y mecánico completo, desmontaje, bobinado, reemplazo de componentes y armado bajo estándares técnicos exigentes. Cada equipo es sometido a pruebas de funcionamiento para asegurar su rendimiento antes de la entrega.",
    features: [
      "Diagnóstico técnico completo",
      "Bobinados profesionales",
      "Reparación integral garantizada",
      "Repuestos de alta calidad",
      "Prueba en banco de funcionamiento",
      "Servicio para todas las marcas",
    ],
    details: [
      "Desarme y evaluación del equipo",
      "Bobinado de motores eléctricos",
      "Cambio de rodamientos y sellos mecánicos",
      "Reparación de motores monofásicos y trifásicos",
      "Prueba de aislación eléctrica",
      "Control de rendimiento y consumo",
      "Armado y ajuste final",
      "Informe técnico del trabajo realizado",
    ],
    image: reparacion1,
    images: [reparacion1],
    imageDetail: reparacion1,
    icon: "Settings",
    gradient: "from-yellow-500 to-orange-600",
  },

  {
    id: "3",
    slug: "bobinados",
    slug2: "",
    title: "Bobinados",
    shortDescription:
      "Bobinado profesional de motores eléctricos sumergibles y de superficie para cualquier aplicación industrial o agrícola.",
    fullDescription:
      "El bobinado es una tarea que requiere precisión y experiencia. Nuestro equipo de técnicos especializados realiza bobinados completos o parciales de motores eléctricos de todo tipo. Utilizamos materiales de primera calidad: conductores de cobre electrolítico, barnices de impregnación y aislantes que garantizan la durabilidad y eficiencia del motor reparado.",
    features: [
      "Cobre electrolítico de primera calidad",
      "Barnizado e impregnación al vacío",
      "Control de calidad por etapas",
      "Garantía de funcionamiento",
    ],
    details: [
      "Bobinado de estátores monofásicos y trifásicos",
      "Bobinado de rotores y armaduras",
      "Impregnación al vacío con barniz epóxico",
      "Balanceo dinámico de rotores",
      "Ensayo dieléctrico post-bobinado",
      "Documentación técnica del trabajo",
    ],
    images: [bobinados2],
    image: bobinados2,
    imageDetail: bobinados2,
    icon: "Zap",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    id: "4",
    slug: "extraccion",
    slug2: "",
    title: "Extracción y Colocación de Electrobombas",
    shortDescription:
      "Realizamos extracción e instalación de electrobombas en pozos de agua con herramientas especializadas y personal capacitado.",
    fullDescription:
      "Ofrecemos servicio profesional de extracción, reinstalación y colocación de electrobombas en pozos profundos y semi surgentes. Trabajamos con equipos adecuados para garantizar maniobras seguras, evitando daños en la instalación y optimizando el funcionamiento del sistema de bombeo.",
    features: [
      "Extracción segura de equipos instalados",
      "Instalación profesional en pozos",
      "Herramientas y equipos especializados",
      "Adaptación a distintas profundidades",
      "Maniobras rápidas y eficientes",
      "Personal técnico capacitado",
    ],
    details: [
      "Extracción de bombas sumergibles",
      "Colocación de electrobombas nuevas o reparadas",
      "Revisión de cañerías y cables",
      "Ajuste de profundidad de trabajo",
      "Verificación de funcionamiento",
      "Instalación de sistemas de sujeción",
      "Control eléctrico básico en sitio",
      "Cobertura en Mendoza y San Juan",
    ],
    images: [extrac1],
    image: extrac1,
    imageDetail: extrac1,
    icon: "Tool",
    gradient: "from-blue-500 to-purple-600",
  },

  {
    id: "5",
    slug: "filmaciones",
    slug2: "",
    title: "Filmaciones de Pozos",
    shortDescription:
      "Videofilmaciones hasta 500 metros para diagnóstico preciso del estado de la perforación, cañería y equipos instalados.",
    fullDescription:
      "Ofrecemos el servicio de videofilmación con cámara sumergible de alta definición hasta 500 metros de profundidad. Es la herramienta diagnóstica más efectiva para conocer el estado real de una perforación sin necesidad de intervención. Permite detectar filtraciones, obstrucciones, daños en filtros, depósitos de sedimentos y el estado general del entubado.",
    features: [
      "Cámara HD hasta 500 metros",
      "Diagnóstico preciso sin extracción",
      "Informe técnico con video incluido",
      "Detección de problemas ocultos",
    ],
    details: [
      "Cámara rotativa 360° con iluminación LED",
      "Grabación en alta definición",
      "Medición de profundidad en tiempo real",
      "Entrega de video y informe técnico",
      "Diagnóstico de filtros y cañerías",
      "Detección de acumulación de sedimentos",
    ],
    images: [filmacion1, filmacion1],
    image: "/assets/filmaciones.jpg",
    imageDetail: perfo2,
    icon: "Video",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    id: "6",
    slug: "limpieza",
    slug2: "",
    title: "Limpieza de Perforaciones",
    shortDescription:
      "Limpieza exhaustiva de pozos surgentes y perforaciones para reactivar caudal y mejorar la calidad del agua.",
    fullDescription:
      "Con el tiempo, los pozos acumulan sedimentos, incrustaciones calcáreas y biológicas que reducen significativamente el caudal y deterioran la calidad del agua. Nuestro servicio de limpieza y rehabilitación devuelve el pozo a su capacidad óptima mediante técnicas mecánicas, químicas y neumáticas, según el diagnóstico de cada caso.",
    features: [
      "Reactivación de caudal original",
      "Pozos surgentes y bombeados",
      "Técnicas mecánicas y químicas",
      "Mejora comprobada y documentada",
    ],
    details: [
      "Diagnóstico previo con filmación",
      "Limpieza mecánica por agitación",
      "Desarrollo con compresor de alta presión",
      "Tratamiento químico anti-incrustante",
      "Aforo comparativo antes y después",
      "Análisis bacteriológico opcional",
    ],
    images: [limpieza1],
    image: limpieza1,
    imageDetail: perfo2,
    icon: "Sparkles",
    gradient: "from-green-500 to-teal-600",
  },
  {
    id: "7",
    slug: "pescas",
    slug2: "",
    title: "Pesca de Electrobombas",
    shortDescription:
      "Recuperación de electrobombas, cañerías y elementos caídos al interior de la perforación mediante técnicas especializadas.",
    fullDescription:
      "La pesca de electrobombas es una operación delicada que requiere equipos especiales y experiencia probada. Cuando una bomba o cañería cae al interior del pozo, es posible recuperarla mediante herramientas de pesca diseñadas específicamente para cada situación. Evitamos la pérdida total del equipo y la necesidad de abandono del pozo.",
    features: [
      "Recuperación sin daño al pozo",
      "Herramientas de pesca específicas",
      "Alta tasa de recuperación",
      "Evita perder la perforación",
    ],
    details: [
      "Diagnóstico previo con filmación",
      "Selección de herramienta de pesca adecuada",
      "Pesca con garfios, magnetos y arpones",
      "Operación cuidadosa sin dañar cañería",
      "Recuperación de bombas, cañerías y cables",
      "Informe del procedimiento realizado",
    ],
    images: [pesca5, pesca6],
    image: pesca5,
    imageDetail: pesca7,
    icon: "Anchor",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "8",
    slug: "estudios-geologicos",
    slug2: "",
    title: "Estudios Geológicos",
    shortDescription:
      "Análisis del terreno y estudios hidrogeológicos para determinar la mejor ubicación y profundidad de perforación.",
    fullDescription:
      "Antes de perforar, es fundamental conocer el subsuelo. Realizamos estudios geológicos e hidrogeológicos completos que incluyen el análisis de la litología local, la identificación de acuíferos y la determinación del nivel freático. Esta información es clave para seleccionar la ubicación óptima del pozo y estimar la profundidad y caudal esperados.",
    features: [
      "Análisis litológico del terreno",
      "Estudio de napas freáticas",
      "Informe técnico detallado",
      "Recomendación de ubicación",
    ],
    details: [
      "Relevamiento geológico superficial",
      "Análisis de registros de pozos vecinos",
      "Determinación de nivel freático",
      "Selección de método de perforación",
      "Estimación de caudal esperado",
      "Informe técnico escrito con planos",
    ],
    images: [estudio2],
    image: estudiogeologico,
    imageDetail: estudiogeologico,
    icon: "Mountain",
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    id: "9",
    slug: "desarrollo",
    slug2: "",
    title: "Desarrollo de Perforaciones",
    shortDescription:
      "Optimización y desarrollo de pozos de agua para mejorar caudal, limpieza y rendimiento en sistemas existentes.",
    fullDescription:
      "El desarrollo de perforaciones consiste en la limpieza, estimulación y optimización del pozo para mejorar su rendimiento hidráulico. Aplicamos técnicas específicas para eliminar sedimentos, mejorar la filtración y aumentar el caudal disponible, asegurando un funcionamiento eficiente y prolongando la vida útil de la perforación.",
    features: [
      "Mejora del caudal del pozo",
      "Limpieza profunda de perforaciones",
      "Optimización del rendimiento hidráulico",
      "Eliminación de sedimentos y obstrucciones",
      "Mayor vida útil del pozo",
      "Intervenciones rápidas y efectivas",
    ],
    details: [
      "Desarrollo mediante aire comprimido",
      "Limpieza con bombeo intensivo",
      "Remoción de arenas y sedimentos",
      "Estimulación de acuíferos",
      "Pruebas de caudal posteriores",
      "Evaluación del rendimiento",
      "Ajustes para mejorar eficiencia",
      "Aplicación en pozos nuevos o existentes",
    ],
    image: perfo2,
    images: [perfo2, agua],
    imageDetail: agua1,
    icon: "Droplet",
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: "10",
    slug: "mantenimiento",
    slug2: "",
    title: "Mantenimiento y Rehabilitación de Pozos",
    shortDescription:
      "Servicios de mantenimiento preventivo y correctivo de pozos existentes para optimizar su funcionamiento y vida útil.",
    fullDescription:
      "El mantenimiento periódico es la mejor inversión para prolongar la vida útil de un pozo y garantizar agua de calidad. Ofrecemos planes de mantenimiento preventivo adaptados a cada instalación, incluyendo inspección del sistema, revisión de la bomba, control de caudal y análisis de agua. También realizamos trabajos de rehabilitación de pozos deteriorados.",
    features: [
      "Mantenimiento preventivo programado",
      "Revisión completa del sistema",
      "Optimización de caudal",
      "Planes personalizados",
    ],
    details: [
      "Inspección visual y filmación periódica",
      "Control y ajuste de bomba y motor",
      "Revisión de cañería y cables",
      "Medición de caudal y presión",
      "Análisis fisicoquímico del agua",
      "Informe de estado y recomendaciones",
    ],
    images: [mant],
    image: mant,
    imageDetail: mant,
    icon: "Wrench",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: "11",
    slug: "perforaciones",
    slug2: "",
    title: "Perforaciones de Pozos",
    shortDescription:
      "Realizamos perforaciones de pozos de agua en Mendoza y San Juan para uso doméstico, agrícola e industrial, con estudios geológicos previos para garantizar resultados óptimos.",
    fullDescription:
      "Nuestro servicio de perforación de pozos es el más completo de la región. Contamos con equipos de perforación de última generación capaces de alcanzar hasta 1000 metros de profundidad, operados por personal altamente calificado. Cada proyecto comienza con un estudio geológico e hidrogeológico del terreno para determinar la mejor ubicación, profundidad y método de perforación. Trabajamos en proyectos rurales, residenciales, industriales y municipales en toda la provincia de Mendoza y San Juan.",
    features: [
      "Hasta 1000 metros de profundidad",
      "Equipos de última generación",
      "Garantía de calidad escrita",
      "Estudio geológico previo incluido",
    ],
    details: [
      "Perforación con método rotativo y percusión",
      "Entubado con cañería certificada",
      "Cementación y sello sanitario",
      "Informe técnico y registro de perforación",
      "Aforo y prueba de bombeo",
      "Cobertura en Mendoza y San Juan",
    ],
    image: perfo2,
    images: [perfo2, agua],
    imageDetail: agua1,
    icon: "Droplet",
    gradient: "from-orange-500 to-red-600",
  },
];

// ─────────────────────────────────────────────
// PROYECTOS
// ─────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'barrancas-maipu',
    title: 'Extracción y Colocación – Barrancas, Maipú',
    provincia: 'Mendoza',
    descripcion:
      'Se realizó la extracción del equipo de bombeo existente para su revisión y diagnóstico, seguida de la colocación de una electrobomba en condiciones óptimas de funcionamiento. El trabajo incluyó la verificación del estado de la cañería de impulsión y el control eléctrico en sitio, garantizando el restablecimiento del servicio de agua.',
    servicios: ['Extracción de electrobomba', 'Colocación de electrobomba'],
    imageFolder: 'barrancas-maipu-extraccion y colocacion',
    cliente: '',
  },
  {
    id: 'bianchetti',
    title: 'Extracción y Colocación – Sector Agrícola, Mendoza',
    provincia: 'Mendoza',
    descripcion:
      'Intervención completa de pozo de agua en establecimiento agrícola que incluyó la extracción del equipo de bombeo para diagnóstico y reparación del motor y electrobomba, con posterior colocación del equipo revisado. Se verificó el correcto funcionamiento del sistema de bombeo al finalizar la tarea.',
    servicios: ['Extracción de electrobomba', 'Colocación de electrobomba'],
    imageFolder: 'bianchetti-extrac y coloc',
    cliente: 'Bianchetti',
  },
  {
    id: 'desarrollo-perforacion-nueva',
    title: 'Desarrollo de Perforación Nueva',
    provincia: undefined,
    descripcion:
      'Proyecto de desarrollo de perforación nueva destinado a abastecer un emprendimiento inmobiliario. Se realizó la perforación del pozo, el desarrollo hidráulico para optimizar el rendimiento del acuífero y la instalación del equipo de bombeo completo, con prueba de caudal y puesta en marcha final.',
    servicios: ['Desarrollo de perforación nueva'],
    imageFolder: 'desarrollo-perforacion-nueva',
    cliente: '',
  },
  {
    id: 'san-juan-7-intervenciones',
    title: 'Extracción, Colocación y Limpieza – San Juan (7 intervenciones)',
    provincia: 'San Juan',
    descripcion:
      'Proyecto de múltiples intervenciones sobre perforaciones existentes en San Juan. Se realizaron tareas de extracción de electrobombas para revisión, limpieza de perforaciones con reactivación de caudal y posterior colocación de los equipos. El plan de trabajo abarcó 7 intervenciones sobre distintos pozos, logrando la rehabilitación funcional de cada uno.',
    servicios: [
      'Extracción de electrobomba',
      'Colocación de electrobomba',
      'Limpieza de perforaciones',
      'Reactivación de perforaciones',
    ],
    imageFolder:
      'extra coloc limpieza de perfo - san juan - 7 intervecnion de perforaciones- varaias limpiezxas y reactivacion',
    cliente: '',
  },
  {
    id: 'pistachos-san-juan',
    title: 'Limpieza, Extracción y Rehabilitación – Sector Agrícola, San Juan',
    provincia: 'San Juan',
    descripcion:
      'Intervención integral sobre el sistema de abastecimiento de agua de un importante establecimiento agrícola en la provincia de San Juan. Se realizó limpieza profunda de perforaciones, extracción del equipo de bombeo, colocación de electrobomba nueva y rehabilitación de una perforación en estado de abandono, restableciéndola como fuente activa de suministro.',
    servicios: [
      'Limpieza de perforaciones',
      'Extracción de electrobomba',
      'Colocación de equipo nuevo',
      'Rehabilitación de perforación en abandono',
    ],
    imageFolder:
      'limpieza-extraccion-limp de perforacion-colocacion equipo nuevo-gran proyecto pistachos-media agua san juan-rehab de perfo en abandono',
    cliente: '',
  },
  {
    id: 'muni-lujan',
    title: 'Extracción y Colocación – Sector Municipal, Luján de Cuyo',
    provincia: 'Mendoza',
    descripcion:
      'Servicio de extracción y colocación de electrobomba para un organismo municipal de Luján de Cuyo. La intervención incluyó el retiro del equipo instalado, revisión técnica completa del motor y bomba, y reinstalación con verificación de funcionamiento, orientado a garantizar la continuidad del servicio de agua potable municipal.',
    servicios: ['Extracción de electrobomba', 'Colocación de electrobomba'],
    imageFolder: 'muni-lujan-extrac-coloc',
    cliente: 'Municipalidad de Luján de Cuyo',
  },
  {
    id: 'olivum',
    title: 'Extracción, Colocación y Alquiler de Bomba – Sector Olivícola, Mendoza',
    provincia: 'Mendoza',
    descripcion:
      'Intervención en el sistema de riego de un establecimiento dedicado a la producción olivícola en Mendoza. Se realizó la extracción del equipo de bombeo existente, provisión en alquiler de una electrobomba de reemplazo para garantizar la continuidad productiva durante la reparación, y posterior colocación del equipo revisado.',
    servicios: [
      'Extracción de electrobomba',
      'Colocación de electrobomba',
      'Alquiler de electrobomba',
    ],
    imageFolder: 'olivum-extraccion-colocacion-alquiler de bomba',
    cliente: 'Olivum',
  },
  {
    id: 'parque-solar-geneya',
    title: 'Servicio Integral – Sector Energía Solar, San Juan',
    provincia: 'San Juan',
    descripcion:
      'Intervención completa en el pozo de agua de un parque solar en San Juan. Ante la caída de la electrobomba al interior de la perforación, se realizó filmación diagnóstica, pesca del equipo caído, limpieza de la perforación, colocación de cañería nueva y colocación de electrobomba nueva con cables y tablero eléctrico. El proyecto aseguró el restablecimiento total del sistema hídrico del establecimiento.',
    servicios: [
      'Filmación de pozos',
      'Pesca de electrobomba',
      'Extracción de electrobomba',
      'Limpieza de perforaciones',
      'Colocación de cañería',
      'Colocación de electrobomba nueva',
    ],
    imageFolder:
      'parque-solar-sj-geneya-filmacion pesca electrob caida limpieza colocacion caneria colocacion eletrobonba nueva con cables y tablero',
    cliente: 'Parque Solar Geneya',
  },
  {
    id: 'finca-ranfer',
    title: 'Pesca, Extracción, Colocación y Filmación – Sector Olivícola, San Juan',
    provincia: 'San Juan',
    descripcion:
      'Servicio técnico integral en un establecimiento productor de aceite de oliva en San Juan. Se realizó filmación del pozo para diagnóstico del estado interior, pesca de la electrobomba caída, extracción del equipo recuperado y colocación de electrobomba en condiciones operativas. La intervención garantizó la continuidad del riego en el proceso de producción olivícola.',
    servicios: [
      'Pesca de electrobomba',
      'Extracción de electrobomba',
      'Colocación de electrobomba',
      'Filmación de pozos',
    ],
    imageFolder:
      'pesca-finca ranfer-san juan-aceite de oliva-exctracion colocacion filmacion',
    cliente: 'Finca Ranfer',
  },
  {
    id: 'petroleo-sudamericano',
    title: 'Extracción, Colocación y Venta de Equipo – Sector Petrolero, Barrancas',
    provincia: 'Mendoza',
    descripcion:
      'Intervención en el pozo de agua que abastece un yacimiento petrolero en Barrancas, Mendoza. Se realizó la extracción del equipo de bombeo con funcionamiento deficiente, venta e instalación de electrobomba nueva con todos sus componentes y puesta en marcha del sistema, garantizando el suministro continuo de agua al yacimiento.',
    servicios: [
      'Extracción de electrobomba',
      'Colocación de electrobomba',
      'Venta de equipo nuevo',
    ],
    imageFolder:
      'petroleo-sudamericano-ext coloc venta equipo nuevo - intervencion pozo de agua que abastece yacimiento barrancas',
    cliente: 'Petróleo Sudamericano',
  },
  {
    id: 'san-rafael-real-del-padre',
    title: 'Limpieza, Reentubación y Colocación – San Rafael, Real del Padre',
    provincia: 'Mendoza',
    descripcion:
      'Servicio integral de rehabilitación de perforación en Real del Padre, San Rafael. Se realizó limpieza del pozo para eliminación de sedimentos e incrustaciones, reentubación de la perforación para restablecer su integridad estructural, y colocación de electrobomba nueva para la puesta en marcha definitiva del sistema.',
    servicios: [
      'Limpieza de perforaciones',
      'Reentubación de perforación',
      'Colocación de electrobomba nueva',
    ],
    imageFolder:
      'san rafael - real del padre - limpieza - reentubacion de perforacion - colocacion de electrobomba nueva',
    cliente: '',
  },
  {
    id: 'santa-rosa',
    title: 'Extracción y Colocación – Santa Rosa',
    provincia: 'Mendoza',
    descripcion:
      'Intervención de extracción y colocación de electrobomba en Santa Rosa. Se realizó la extracción del equipo instalado para revisión y mantenimiento, con posterior reinstalación del equipo en condiciones óptimas de funcionamiento y verificación final del sistema de bombeo.',
    servicios: ['Extracción de electrobomba', 'Colocación de electrobomba'],
    imageFolder: 'santa rosa erxtrac coloc',
    cliente: '',
  },
  {
    id: 'supermercado-libertad',
    title: 'Extracción, Colocación y Mantenimiento – Sector Comercial, Mendoza',
    provincia: 'Mendoza',
    descripcion:
      'Servicio de extracción, colocación y mantenimiento del sistema de bombeo para un establecimiento comercial en Mendoza. La intervención incluyó la extracción del equipo existente, revisión técnica completa, reinstalación del equipo y un plan de mantenimiento preventivo para asegurar el suministro continuo de agua en las instalaciones.',
    servicios: [
      'Extracción de electrobomba',
      'Colocación de electrobomba',
      'Mantenimiento de pozos',
    ],
    imageFolder: 'supermercado-libertad-extraccion-colocacion-mantenimiento',
    cliente: 'Supermercado Libertad',
  },
];

// ─────────────────────────────────────────────
// CONTACTO
// ─────────────────────────────────────────────
export const CONTACT = {
  phones: [
    {
      label: "Administración",
      number: "0261-212-0438",
      href: "tel:2612120438",
    },
    { label: "Sergio", number: "0261-206-6881", href: "tel:2612066881" },
    {
      label: "Chino (WhatsApp)",
      number: "0261-470 7318",
      href: "tel:02614707318",
      whatsapp: "5492614707318",
    },
  ],
  email: "arenasbombas@hotmail.com",
  address: "1536 Jesús Nazareno, M5515 Maipú, Mendoza, Argentina",
  hours: {
    weekdays: "Lunes a Viernes: 8:00 - 17:00",
    saturday: "Sábado: 8:00 - 12:00",
  },
  linkedin: "https://linkedin.com/in/sergio-antonio-arenas-85ba7b96",
  whatsappNumber: "5492614707318",
  zones: ["Mendoza", "San Juan", "San Luis", "Buenos Aires", "Patagonia", "La Pampa", "Norte Argentino"],
  mapEmbedUrl: "https://maps.app.goo.gl/ibTBbgPVCskm1R5A",
};
