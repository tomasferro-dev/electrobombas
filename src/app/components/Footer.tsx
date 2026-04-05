import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';
import { CONTACT } from '../data';
// import Logo from '../../../assets/arenas_perforaciones_sin_fondo.png';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-red-400 tracking-tight">ARENAS</span>
                <span className="text-xs text-gray-400 tracking-widest uppercase">Perforaciones</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Más de 20 años brindando soluciones integrales en perforación y mantenimiento de pozos de agua en Mendoza y San Juan.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-base font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Inicio', to: '/home' },
                { label: 'Servicios', to: '/servicios' },
                { label: 'Proyectos', to: '/proyectos' },
                { label: 'Nosotros', to: '/nosotros' },
                { label: 'Contacto', to: '/contacto' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                'Perforaciones',
                'Electrobombas',
                'Bobinados',
                'Filmaciones',
                'Limpieza',
                'Pesca de Bombas',
              ].map((s) => (
                <li key={s}>
                  <Link to={`/servicios/${s.toLowerCase().replace(/ /g, '-')}`} className="hover:text-white transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              {CONTACT.phones.map((p) => (
                <li key={p.label} className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                  <a href={p.href} className="text-gray-400 hover:text-white transition-colors">
                    {p.number}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                <a href={`mailto:${CONTACT.email}`} className="text-gray-400 hover:text-white transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                <span className="text-gray-400">Maipú, Mendoza</span>
              </li>
              <li className="flex items-start gap-2">
                <Linkedin className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Arenas Perforaciones. Todos los derechos reservados.</p>
          <p className="mt-1">Empresa del sector industrial · Mendoza, Argentina</p>
        </div>
      </div>
    </footer>
  );
}
