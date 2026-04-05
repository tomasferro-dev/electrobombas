import perfo2 from '../assets/perfo2.jpg';
import agua from '../assets/agua.jpg';
import agua1 from '../assets/agua1.jpg';
import filmacion1 from '../assets/filmacion1.jpg';
import pesca5 from '../assets/pesca5.jpg';
import bobinado1 from '../assets/bobinado1.jpg';
import bomba1 from '../assets/bomba1.jpg';
import mantenimiento1 from '../assets/mantenimiento1.jpg';
import estudio2 from '../assets/estudio2.jpg';
import lujan1 from '../assets/proyectos/muni-lujan/lujan1.jpg';
import lujan2 from '../assets/proyectos/muni-lujan/lujan2.jpg';

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  details: string[];
  image: string; // path relativo a /assets/
  images: string[]; // múltiples imágenes
  imageDetail: string;
  icon: string;  // nombre del icono lucide
  gradient: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  coverImage: string | any;
  images:  (string | any)[];
  // Las imágenes adicionales se cargan dinámicamente por carpeta en Gallery
  imageFolder?: string;
}

// ─────────────────────────────────────────────
// SERVICIOS
// ─────────────────────────────────────────────
export const SERVICES: Service[] = [
  
  {
  id: '1',
  slug: 'electrobombas',
  title: 'Reparación y Venta de Electrobombas',
  shortDescription:
    'Venta, reparación y mantenimiento de electrobombas sumergibles en Mendoza y San Juan. Atendemos toda marca y potencia con garantía escrita y prueba en banco.',
  fullDescription:
    'Somos referentes en venta y reparación integral de electrobombas sumergibles en Mendoza, San Juan y todo el país. Comercializamos equipos de las principales marcas del mercado —Grundfos, Pedrollo, Siemens y más— para uso doméstico, agrícola e industrial. Nuestro taller cuenta con equipamiento técnico de alta precisión para el diagnóstico, desmontaje, bobinado, armado y prueba de electrobombas de cualquier marca y potencia. Realizamos bobinado profesional, sustitución de rodamientos, sellos mecánicos y todo tipo de componentes internos, garantizando el rendimiento óptimo del equipo.',
  features: [
    'Venta de electrobombas nuevas con garantía',
    'Bobinados profesionales de alta calidad',
    'Reparación completa garantizada',
    'Toda marca y potencia',
    'Prueba en banco antes de entrega',
    'Asesoramiento técnico sin cargo',
  ],
  details: [
    'Venta de electrobombas sumergibles y de superficie',
    'Equipos para uso doméstico, agrícola e industrial',
    'Diagnóstico eléctrico y mecánico completo',
    'Bobinado de estátores y rotores',
    'Sustitución de rodamientos y sellos',
    'Prueba de aislación y rendimiento',
    'Reparación de motores monofásicos y trifásicos',
    'Potencias desde 0.5 HP hasta 200 HP',
    'Despacho a todo el país',
  ],
  image: '/assets/reparacion-electrobombas.jpg',
  images: [bomba1],
  imageDetail: bomba1,
  icon: 'Settings',
  gradient: 'from-yellow-500 to-orange-600',
},
{
    id: '2',
    slug: 'perforaciones',
    title: 'Perforaciones de Pozos',
    shortDescription:
      'Realizamos perforaciones de pozos de agua en Mendoza y San Juan para uso doméstico, agrícola e industrial, con estudios geológicos previos para garantizar resultados óptimos.',
    fullDescription:
      'Nuestro servicio de perforación de pozos es el más completo de la región. Contamos con equipos de perforación de última generación capaces de alcanzar hasta 1000 metros de profundidad, operados por personal altamente calificado. Cada proyecto comienza con un estudio geológico e hidrogeológico del terreno para determinar la mejor ubicación, profundidad y método de perforación. Trabajamos en proyectos rurales, residenciales, industriales y municipales en toda la provincia de Mendoza y San Juan.',
    features: [
      'Hasta 1000 metros de profundidad',
      'Equipos de última generación',
      'Garantía de calidad escrita',
      'Estudio geológico previo incluido',
    ],
    details: [
      'Perforación con método rotativo y percusión',
      'Entubado con cañería certificada',
      'Cementación y sello sanitario',
      'Informe técnico y registro de perforación',
      'Aforo y prueba de bombeo',
      'Cobertura en Mendoza y San Juan',
    ],
    image: perfo2,
    images: [perfo2, agua],
    imageDetail: agua1,
    icon: 'Droplet',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    id: '3',
    slug: 'bobinados',
    title: 'Bobinados',
    shortDescription:
      'Bobinado profesional de motores eléctricos sumergibles y de superficie para cualquier aplicación industrial o agrícola.',
    fullDescription:
      'El bobinado es una tarea que requiere precisión y experiencia. Nuestro equipo de técnicos especializados realiza bobinados completos o parciales de motores eléctricos de todo tipo. Utilizamos materiales de primera calidad: conductores de cobre electrolítico, barnices de impregnación y aislantes que garantizan la durabilidad y eficiencia del motor reparado.',
    features: [
      'Cobre electrolítico de primera calidad',
      'Barnizado e impregnación al vacío',
      'Control de calidad por etapas',
      'Garantía de funcionamiento',
    ],
    details: [
      'Bobinado de estátores monofásicos y trifásicos',
      'Bobinado de rotores y armaduras',
      'Impregnación al vacío con barniz epóxico',
      'Balanceo dinámico de rotores',
      'Ensayo dieléctrico post-bobinado',
      'Documentación técnica del trabajo',
    ],
    images: [bobinado1],
    image: '/assets/reparacion-electrobombas.jpg',
    imageDetail: perfo2,
    icon: 'Zap',
    gradient: 'from-purple-500 to-indigo-600',
  },
  {
    id: '4',
    slug: 'filmaciones',
    title: 'Filmaciones de Pozos',
    shortDescription:
      'Videofilmaciones hasta 500 metros para diagnóstico preciso del estado de la perforación, cañería y equipos instalados.',
    fullDescription:
      'Ofrecemos el servicio de videofilmación con cámara sumergible de alta definición hasta 500 metros de profundidad. Es la herramienta diagnóstica más efectiva para conocer el estado real de una perforación sin necesidad de intervención. Permite detectar filtraciones, obstrucciones, daños en filtros, depósitos de sedimentos y el estado general del entubado.',
    features: [
      'Cámara HD hasta 500 metros',
      'Diagnóstico preciso sin extracción',
      'Informe técnico con video incluido',
      'Detección de problemas ocultos',
    ],
    details: [
      'Cámara rotativa 360° con iluminación LED',
      'Grabación en alta definición',
      'Medición de profundidad en tiempo real',
      'Entrega de video y informe técnico',
      'Diagnóstico de filtros y cañerías',
      'Detección de acumulación de sedimentos',
    ],
    images: [filmacion1, filmacion1],
    image: '/assets/filmaciones.jpg',
    imageDetail: perfo2,
    icon: 'Video',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: '5',
    slug: 'limpieza',
    title: 'Limpieza de Perforaciones',
    shortDescription:
      'Limpieza exhaustiva de pozos surgentes y perforaciones para reactivar caudal y mejorar la calidad del agua.',
    fullDescription:
      'Con el tiempo, los pozos acumulan sedimentos, incrustaciones calcáreas y biológicas que reducen significativamente el caudal y deterioran la calidad del agua. Nuestro servicio de limpieza y rehabilitación devuelve el pozo a su capacidad óptima mediante técnicas mecánicas, químicas y neumáticas, según el diagnóstico de cada caso.',
    features: [
      'Reactivación de caudal original',
      'Pozos surgentes y bombeados',
      'Técnicas mecánicas y químicas',
      'Mejora comprobada y documentada',
    ],
    details: [
      'Diagnóstico previo con filmación',
      'Limpieza mecánica por agitación',
      'Desarrollo con compresor de alta presión',
      'Tratamiento químico anti-incrustante',
      'Aforo comparativo antes y después',
      'Análisis bacteriológico opcional',
    ],
    images: [agua],
    image: '/assets/limpieza1.jpg',
    imageDetail: perfo2,
    icon: 'Sparkles',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    id: '6',
    slug: 'pescas',
    title: 'Pesca de Electrobombas',
    shortDescription:
      'Recuperación de electrobombas, cañerías y elementos caídos al interior de la perforación mediante técnicas especializadas.',
    fullDescription:
      'La pesca de electrobombas es una operación delicada que requiere equipos especiales y experiencia probada. Cuando una bomba o cañería cae al interior del pozo, es posible recuperarla mediante herramientas de pesca diseñadas específicamente para cada situación. Evitamos la pérdida total del equipo y la necesidad de abandono del pozo.',
    features: [
      'Recuperación sin daño al pozo',
      'Herramientas de pesca específicas',
      'Alta tasa de recuperación',
      'Evita perder la perforación',
    ],
    details: [
      'Diagnóstico previo con filmación',
      'Selección de herramienta de pesca adecuada',
      'Pesca con garfios, magnetos y arpones',
      'Operación cuidadosa sin dañar cañería',
      'Recuperación de bombas, cañerías y cables',
      'Informe del procedimiento realizado',
    ],
    images: [pesca5],
    image: '/assets/surgente.jpg',
    imageDetail: perfo2,
    icon: 'Anchor',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: '7',
    slug: 'estudios-geologicos',
    title: 'Estudios Geológicos',
    shortDescription:
      'Análisis del terreno y estudios hidrogeológicos para determinar la mejor ubicación y profundidad de perforación.',
    fullDescription:
      'Antes de perforar, es fundamental conocer el subsuelo. Realizamos estudios geológicos e hidrogeológicos completos que incluyen el análisis de la litología local, la identificación de acuíferos y la determinación del nivel freático. Esta información es clave para seleccionar la ubicación óptima del pozo y estimar la profundidad y caudal esperados.',
    features: [
      'Análisis litológico del terreno',
      'Estudio de napas freáticas',
      'Informe técnico detallado',
      'Recomendación de ubicación',
    ],
    details: [
      'Relevamiento geológico superficial',
      'Análisis de registros de pozos vecinos',
      'Determinación de nivel freático',
      'Selección de método de perforación',
      'Estimación de caudal esperado',
      'Informe técnico escrito con planos',
    ],
    images: [estudio2],
    image: '/assets/estudios-geologicos.jpg',
    imageDetail: perfo2,
    icon: 'Mountain',
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    id: '8',
    slug: 'mantenimiento',
    title: 'Mantenimiento y Rehabilitación',
    shortDescription:
      'Servicios de mantenimiento preventivo y correctivo de pozos existentes para optimizar su funcionamiento y vida útil.',
    fullDescription:
      'El mantenimiento periódico es la mejor inversión para prolongar la vida útil de un pozo y garantizar agua de calidad. Ofrecemos planes de mantenimiento preventivo adaptados a cada instalación, incluyendo inspección del sistema, revisión de la bomba, control de caudal y análisis de agua. También realizamos trabajos de rehabilitación de pozos deteriorados.',
    features: [
      'Mantenimiento preventivo programado',
      'Revisión completa del sistema',
      'Optimización de caudal',
      'Planes personalizados',
    ],
    details: [
      'Inspección visual y filmación periódica',
      'Control y ajuste de bomba y motor',
      'Revisión de cañería y cables',
      'Medición de caudal y presión',
      'Análisis fisicoquímico del agua',
      'Informe de estado y recomendaciones',
    ],
    images: [mantenimiento1],
    image: '/assets/mantenimiento.jpg',
    imageDetail: perfo2,
    icon: 'Wrench',
    gradient: 'from-blue-500 to-purple-600',
  },
];

// ─────────────────────────────────────────────
// PROYECTOS
// ─────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'limpieza-surgente',
    title: 'Limpieza de Perforación de Pozo Surgente',
    description:
      'Limpieza exhaustiva de pozo surgente con reactivación completa del caudal original.',
    location: 'Mendoza, Argentina',
    category: 'Limpieza',
    coverImage: '../assets/proyectos/muni-lujan/lujan1.jpg',
    images: [perfo2],
    imageFolder: 'limpieza',
  },
  {
    id: 'perforacion-280m',
    title: 'Perforación 280 metros en 14" y 12"',
    description:
      'Perforación de 280 metros. 120 metros en 14" y 160 metros en 12". Proyecto de gran envergadura para uso agrícola intensivo.',
    location: 'Mendoza, Argentina',
    category: 'Perforación',
    coverImage: '/assets/perforacion/cover.jpg',
    images: [],
    imageFolder: 'perforacion',
  },
  {
    id: 'servicio-san-juan',
    title: 'Servicio Completo en San Juan',
    description:
      'Servicio integral de perforación, instalación de equipo y puesta en marcha en San Juan.',
    location: 'San Juan, Argentina',
    category: 'Perforación',
    coverImage: '/assets/sj/cover.jpg',
    images: [],
    imageFolder: 'sj',
  },
  {
    id: 'municipalidad-lujan',
    title: 'Servicio en Municipalidad de Luján de Cuyo',
    description:
      'Servicio especializado para la Municipalidad de Luján de Cuyo, Mendoza.',
    location: 'Luján de Cuyo, Mendoza',
    category: 'Municipal',
    coverImage: perfo2,
    images: [lujan1, lujan2],
    imageFolder: 'muni-lujan',
  },
  {
    id: 'finca-vila',
    title: 'Renovación en Finca Vila',
    description:
      'Extracción, colocación y reparación de equipo y recuperación de perforación en Finca Vila.',
    location: 'Finca Vila, Mendoza',
    category: 'Mantenimiento',
    coverImage: '/assets/vila/cover.jpg',
    images: [],
    imageFolder: 'vila',
  },
  {
    id: 'secadero-reina-tupungato',
    title: 'Perforación en Secadero Reina, Tupungato',
    description:
      'Perforación completa para secadero en Tupungato, Mendoza.',
    location: 'Tupungato, Mendoza',
    category: 'Perforación',
    coverImage: '/assets/srt/cover.jpg',
    images: [],
    imageFolder: 'srt',
  },
  {
    id: 'oreste-km49',
    title: 'Perforación 250 metros en 12" - Oreste Km 49',
    description:
      'Perforación de 250 metros en 12". Oreste Km 49.',
    location: 'Mendoza, Argentina',
    category: 'Perforación',
    coverImage: '/assets/oreste/cover.jpg',
    images: [],
    imageFolder: 'oreste',
  },
  {
    id: 'independiente-rivadavia',
    title: 'Perforación Club Independiente Rivadavia',
    description:
      'Perforación de 250 metros en 12" en terreno complicado para el Club Independiente Rivadavia.',
    location: 'Mendoza, Argentina',
    category: 'Institucional',
    coverImage: '/assets/independiente/cover.jpg',
    images: [],
    imageFolder: 'independiente',
  },
];

// ─────────────────────────────────────────────
// CONTACTO
// ─────────────────────────────────────────────
export const CONTACT = {
  phones: [
    { label: 'Administración', number: '0261-212-0438', href: 'tel:2612120438' },
    { label: 'Sergio', number: '0261-206-6881', href: 'tel:2612066881' },
    { label: 'Chino (WhatsApp)', number: '0261-470 7318', href: 'tel:02614707318', whatsapp: '5492614707318' },
  ],
  email: 'arenasbombas@hotmail.com',
  address: '1536 Jesús Nazareno, M5515 Maipú, Mendoza, Argentina',
  hours: {
    weekdays: 'Lunes a Viernes: 8:00 - 17:00',
    saturday: 'Sábado: 8:00 - 12:00',
  },
  linkedin: 'https://linkedin.com/in/sergio-antonio-arenas-85ba7b96',
  whatsappNumber: '5492614707318',
  zones: ['Mendoza', 'San Juan'],
  mapEmbedUrl: 'https://maps.app.goo.gl/ibTBbgPVCskm1RDg9',
};
