import perfo2 from "../assets/perfo2.jpg";
import agua from "../assets/agua.jpg";
import agua1 from "../assets/agua1.jpg";
import filmacion1 from "../assets/filmacion1.jpg";
import pesca5 from "../assets/pesca5.jpg";
import pesca6 from "../assets/pesca6.jpg";
import pesca7 from "../assets/pesca7.jpg";
import estudio2 from "../assets/estudio2.jpg";
import lujan1 from "../assets/proyectos/muni-lujan/lujan1.jpg";
import lujan2 from "../assets/proyectos/muni-lujan/lujan2.jpg";
import estudiogeologico from "../assets/estudio-geologico.jpg";
import mant from "../assets/mant-rehab3.jpg";
import venta4 from "../assets/venta4.png";
import venta55 from "../assets/venta55.jpg";
import reparacion1 from "../assets/reparacion1.jpg";
import limpieza1 from "../assets/limpieza1.jpg";
import bobinados2 from "../assets/bobinados2.jpg";
// import caneria from "../assets/caneria.jpg";
import extrac1 from "../assets/extrac1.jpg";

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
  description: string;
  location: string;
  category: string;
  coverImage: string | any;
  images: (string | any)[];
  imageFolder?: string;
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
    image: venta4,
    images: [venta4],
    imageDetail: venta55,
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
    id: "limpieza-surgente",
    title: "Limpieza de Perforación de Pozo Surgente",
    description:
      "Limpieza exhaustiva de pozo surgente con reactivación completa del caudal original.",
    location: "Mendoza, Argentina",
    category: "Limpieza",
    coverImage: "../assets/proyectos/muni-lujan/lujan1.jpg",
    images: [perfo2],
    imageFolder: "limpieza",
  },
  {
    id: "perforacion-280m",
    title: 'Perforación 280 metros en 14" y 12"',
    description:
      'Perforación de 280 metros. 120 metros en 14" y 160 metros en 12". Proyecto de gran envergadura para uso agrícola intensivo.',
    location: "Mendoza, Argentina",
    category: "Perforación",
    coverImage: "/assets/perforacion/cover.jpg",
    images: [],
    imageFolder: "perforacion",
  },
  {
    id: "servicio-san-juan",
    title: "Servicio Completo en San Juan",
    description:
      "Servicio integral de perforación, instalación de equipo y puesta en marcha en San Juan.",
    location: "San Juan, Argentina",
    category: "Perforación",
    coverImage: "/assets/sj/cover.jpg",
    images: [],
    imageFolder: "sj",
  },
  {
    id: "municipalidad-lujan",
    title: "Servicio en Municipalidad de Luján de Cuyo",
    description:
      "Servicio especializado para la Municipalidad de Luján de Cuyo, Mendoza.",
    location: "Luján de Cuyo, Mendoza",
    category: "Municipal",
    coverImage: perfo2,
    images: [lujan1, lujan2],
    imageFolder: "muni-lujan",
  },
  {
    id: "finca-vila",
    title: "Renovación en Finca Vila",
    description:
      "Extracción, colocación y reparación de equipo y recuperación de perforación en Finca Vila.",
    location: "Finca Vila, Mendoza",
    category: "Mantenimiento",
    coverImage: "/assets/vila/cover.jpg",
    images: [],
    imageFolder: "vila",
  },
  {
    id: "secadero-reina-tupungato",
    title: "Perforación en Secadero Reina, Tupungato",
    description: "Perforación completa para secadero en Tupungato, Mendoza.",
    location: "Tupungato, Mendoza",
    category: "Perforación",
    coverImage: "/assets/srt/cover.jpg",
    images: [],
    imageFolder: "srt",
  },
  {
    id: "oreste-km49",
    title: 'Perforación 250 metros en 12" - Oreste Km 49',
    description: 'Perforación de 250 metros en 12". Oreste Km 49.',
    location: "Mendoza, Argentina",
    category: "Perforación",
    coverImage: "/assets/oreste/cover.jpg",
    images: [],
    imageFolder: "oreste",
  },
  {
    id: "independiente-rivadavia",
    title: "Perforación Club Independiente Rivadavia",
    description:
      'Perforación de 250 metros en 12" en terreno complicado para el Club Independiente Rivadavia.',
    location: "Mendoza, Argentina",
    category: "Institucional",
    coverImage: "/assets/independiente/cover.jpg",
    images: [],
    imageFolder: "independiente",
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
  zones: ["Mendoza", "San Juan"],
  mapEmbedUrl: "https://maps.app.goo.gl/ibTBbgPVCskm1RDg9",
};
