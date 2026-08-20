import { Award, Cog, Shield, Users } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import ArenasImg from '../../assets/arenas-perfo.webp';
import ArenasImg from '../../assets/porqueelegirnos.webp';

const reasons = [
  {
    icon: Award,
    title: 'Más de 20 Años Reparando Electrobombas',
    description:
      'Somos referentes en la reparación y venta de electrobombas sumergibles en Mendoza y San Juan, con décadas de experiencia en proyectos rurales, industriales y residenciales.',
    color: 'bg-red-700',
  },
  {
    icon: Cog,
    title: 'Taller Propio de Alta Precisión',
    description:
      'Contamos con taller equipado para diagnóstico, bobinado, armado y prueba de electrobombas de cualquier marca y potencia, desde 0.5 HP hasta 200 HP.',
    color: 'bg-indigo-700',
  },
  {
    icon: Shield,
    title: 'Garantía Escrita en Cada Trabajo',
    description:
      'Todos nuestros trabajos de reparación y las bombas que comercializamos cuentan con garantía escrita. Tu inversión está protegida.',
    color: 'bg-teal-700',
  },
  {
    icon: Users,
    title: 'Técnicos Especializados',
    description:
      'Nuestro equipo está formado por técnicos electromecánicos certificados con amplia experiencia en electrobombas sumergibles, de superficie y polifásicas.',
    color: 'bg-lime-700',
  },
];

const stats = [
  { value: '20+', label: 'Años de Experiencia' },
  { value: '300HP', label: 'Potencia Máxima' },
  { value: '100%', label: 'Trabajos Garantizados' },
  { value: '24/7', label: 'Disponibilidad' },
];

export default function WhyChooseUs() {
  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-gray-900">
            ¿Por Qué Elegir Arenas Electrobombas?
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Experiencia, tecnología y compromiso en reparación y venta de electrobombas.
          </p>

          <p className="text-base text-gray-600 max-w-3xl mx-auto mb-10">
            Brindamos servicios profesionales de{' '}
            <strong>reparación, bobinado y venta de electrobombas sumergibles en Mendoza, San Juan, San Luis y toda la región</strong>.
            Trabajamos con clientes{' '}
            <strong>rurales, residenciales e industriales</strong>, garantizando
            soluciones duraderas y eficientes para cada necesidad.
          </p>

          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">

          {/* Image */}
          <div className="order-2 lg:order-1 relative">
            <img
              src={ArenasImg}
              alt="Taller de reparación de electrobombas de Arenas Electrobombas en Maipú, Mendoza"
              loading="lazy"
              decoding="async"
              className="rounded-lg shadow-xl w-full h-[500px] object-cover object-[center_40%]"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-black/60 via-black/30 to-transparent" />
          </div>

          {/* Reasons */}
          <div className="order-1 lg:order-2 space-y-8">
            {reasons.map((reason) => (
              <div key={reason.title} className="flex gap-4">
                <div className={`${reason.color} rounded-lg p-4 flex items-center justify-center w-16 h-16 flex-shrink-0`}>
                  <reason.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-gray-900">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold text-red-700 mb-2">{s.value}</div>
              <div className="text-gray-600 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
