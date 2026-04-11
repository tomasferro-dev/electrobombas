// ─────────────────────────────────────────────
// AGREGÁ ESTO EN src/app/data.ts
// ─────────────────────────────────────────────
// Copiá y pegá esta sección al final de tu data.ts existente

// import test1 from '../assets/bombas/test3.webp'
// import test2 from '../assets/bombas/test2.webp'
// import test3 from '../assets/bombas/test4.webp'
// import test4 from '../assets/bombas/test5.webp'
// import test5 from '../assets/bombas/test6.webp'
// import test6 from '../assets/bombas/test7.webp'

export interface Electrobomba {
  id: string;
  marca: string;
  modelo: string;
  potenciaHP: number;
  potenciaKW: number;
  caudal: string;        // ej: "hasta 15 m³/h"
  alturaMax: string;     // ej: "hasta 80 metros"
  diametro: string;      // ej: '4"' | '6"'
  uso: string[];         // ej: ['Doméstico', 'Agrícola']
  voltaje: string;       // ej: '220V monofásico' | '380V trifásico'
  descripcion: string;
  precio: string | null; // null = "Consultar precio"
  disponible: boolean;
  imagen: string | null; // ruta al asset, null = placeholder
  destacada: boolean;
}

export const ELECTROBOMBAS_VENTA: Electrobomba[] = [
  {
    id: 'eb-001',
    marca: 'Grundfos',
    modelo: 'SP 5A-14',
    potenciaHP: 2,
    potenciaKW: 1.5,
    caudal: 'hasta 5 m³/h',
    alturaMax: 'hasta 120 metros',
    diametro: '4"',
    uso: ['Doméstico', 'Riego de jardín'],
    voltaje: '220V monofásico',
    descripcion:
      'Electrobomba sumergible de 4" ideal para pozos domiciliarios. Construida en acero inoxidable, silenciosa y de bajo consumo energético. Perfecta para hogares con demanda moderada de agua.',
    precio: null,
    disponible: true,
    imagen: '',
    destacada: true,
  },
  {
    id: 'eb-002',
    marca: 'Pedrollo',
    modelo: '4SR 2/16',
    potenciaHP: 1.5,
    potenciaKW: 1.1,
    caudal: 'hasta 3.6 m³/h',
    alturaMax: 'hasta 145 metros',
    diametro: '4"',
    uso: ['Doméstico', 'Riego'],
    voltaje: '220V monofásico',
    descripcion:
      'Bomba sumergible italiana de alta calidad para pozos de agua potable. Cuerpo en acero inoxidable AISI 304, motor hermético con refrigeración por el agua bombeada.',
    precio: null,
    disponible: true,
    imagen: '',
    destacada: false,
  },
  {
    id: 'eb-003',
    marca: 'Caprari',
    modelo: 'E4XP10/4',
    potenciaHP: 3,
    potenciaKW: 2.2,
    caudal: 'hasta 10 m³/h',
    alturaMax: 'hasta 100 metros',
    diametro: '4"',
    uso: ['Agrícola', 'Industrial', 'Municipal'],
    voltaje: '380V trifásico',
    descripcion:
      'Electrobomba trifásica de alto rendimiento para aplicaciones agrícolas e industriales. Idónea para riego de cultivos, llenado de cisternas y abastecimiento de establecimientos.',
    precio: null,
    disponible: true,
    imagen: '',
    destacada: true,
  },
  {
    id: 'eb-004',
    marca: 'Franklin Electric',
    modelo: '6" Sub Drive',
    potenciaHP: 7.5,
    potenciaKW: 5.5,
    caudal: 'hasta 25 m³/h',
    alturaMax: 'hasta 200 metros',
    diametro: '6"',
    uso: ['Agrícola', 'Industrial'],
    voltaje: '380V trifásico',
    descripcion:
      'Motor sumergible de 6" de alta eficiencia energética para pozos de gran profundidad. Compatible con variadores de frecuencia. Ideal para grandes extensiones agrícolas y pozos industriales.',
    precio: null,
    disponible: true,
    imagen: '',
    destacada: false,
  },
  {
    id: 'eb-005',
    marca: 'Lowara',
    modelo: '6GS25',
    potenciaHP: 10,
    potenciaKW: 7.5,
    caudal: 'hasta 40 m³/h',
    alturaMax: 'hasta 180 metros',
    diametro: '6"',
    uso: ['Industrial', 'Municipal', 'Minería'],
    voltaje: '380V trifásico',
    descripcion:
      'Bomba sumergible de 6" para pozos de alto caudal. Fabricada en acero inoxidable y hierro fundido. Soporta agua con contenido de arena de hasta 200 g/m³. Alta durabilidad en condiciones exigentes.',
    precio: null,
    disponible: false,
    imagen: '',
    destacada: false,
  },
  {
    id: 'eb-006',
    marca: 'Xylem / Goulds',
    modelo: '10GS50',
    potenciaHP: 50,
    potenciaKW: 37,
    caudal: 'hasta 120 m³/h',
    alturaMax: 'hasta 300 metros',
    diametro: '10"',
    uso: ['Industrial', 'Municipal', 'Minería', 'Agrícola intensivo'],
    voltaje: '380V trifásico / configurable',
    descripcion:
      'Electrobomba sumergible de gran potencia para proyectos de alta demanda. Compatible con tableros de control y variadores de velocidad. Consultá disponibilidad y condiciones de entrega.',
    precio: null,
    disponible: true,
    imagen: '',
    destacada: true,
  },
];
