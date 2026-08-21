// Catálogo por marca que se muestra en /venta y en /servicios/alquiler.
// Vive acá y no dentro de ProductCard.tsx: un archivo que exporta datos y
// componentes a la vez rompe el fast refresh de Vite.

import watermot1 from "../assets/bombas/watermot/2.webp";
import watermot2 from "../assets/bombas/watermot/3.webp";
import watermot3 from "../assets/bombas/watermot/5.webp";
import shakti1 from "../assets/bombas/shakti/14.webp";
import hidraulica1 from "../assets/hidraulica/4.webp";

export interface ProductoVenta {
  id: string;
  tipo: 'Electrobomba' | 'Hidráulica';
  marca: string;
  modelo: string;
  descripcion: string;
  specs: { label: string; value: string }[];
  imagenes: string[]; // rutas a assets — poné los paths reales
}

export const PRODUCTOS_VENTA: ProductoVenta[] = [
  {
    id: 'bomba-watermot',
    tipo: 'Electrobomba',
    marca: 'WATERMOT',
    modelo: '',
    descripcion:
      'Electrobomba sumergible de alta eficiencia para pozos profundos. Diseñada para trabajo continuo en condiciones exigentes, con motor hermético de refrigeración por el agua bombeada. Compatible con variadores de frecuencia y tableros de control automático.',
    specs: [
      { label: 'Profundidad máxima', value: 'hasta 2000 metros' },
      { label: 'Diámetro', value: '4" · 6" · 8" · 12" · 14"' },
      { label: 'Voltaje', value: '220V / 380V monofásico y trifásico' },
      { label: 'Aplicación', value: 'Doméstico · Agrícola · Industrial' },
      { label: 'Material', value: 'Acero inoxidable AISI 304' },
    ],
    // Reemplazá con tus rutas reales: '../../../assets/bomba1.webp'
    imagenes: [watermot1,watermot2,watermot3,watermot1],
  },{
    id: 'bomba-shakti',
    tipo: 'Electrobomba',
    marca: 'SHAKTI',
    modelo: '',
    descripcion:
      'Las bombas sumergibles Shakti están diseñadas para ofrecer un alto rendimiento en la extracción de agua de pozos profundos, con materiales resistentes a la corrosión y una excelente eficiencia energética. Fabricadas en acero inoxidable 304 o 316, estas bombas garantizan una larga vida útil incluso en condiciones exigentes.',
    specs: [
      { label: 'Profundidad máxima', value: 'hasta 2000 metros' },
      { label: 'Diámetro', value: '4" · 6" · 8" · 12" · 14"' },
      { label: 'Voltaje', value: '220V / 380V monofásico y trifásico' },
      { label: 'Aplicación', value: 'Doméstico · Agrícola · Industrial' },
      { label: 'Material', value: 'Acero inoxidable AISI 304' },
    ],
    // Reemplazá con tus rutas reales: '../../../assets/bomba1.webp'
    imagenes: [shakti1],
  },
  {
    id: 'hidraulica-watermot',
    tipo: 'Hidráulica',
    marca: 'WATERMOT',
    modelo: '',
    descripcion:
      'Cuerpo hidráulico multiestátor que se acopla directamente al motor WATERMOT. Fabricado en acero inoxidable con impulsores de alta eficiencia. Disponible en un rango de potencias que cubre desde aplicaciones domiciliarias hasta industriales de gran escala.',
    specs: [
      { label: 'Potencia disponible', value: '0.2 HP a 300 HP' },
      { label: 'Caudal', value: 'hasta 500 m³/h según modelo' },
      { label: 'Etapas', value: 'de 1 a 32 etapas' },
      { label: 'Material impulsores', value: 'Acero inoxidable / Noryl' },
      { label: 'Conexión', value: 'Acoplamiento directo al motor' },
    ],
    // Reemplazá con tus rutas reales
    imagenes: [hidraulica1],
  },
];
