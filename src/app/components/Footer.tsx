import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin } from "lucide-react";
import { CONTACT } from "../data";
// import Logo from '../../../assets/arenas_perforaciones_sin_fondo.png';
import logo from "../../assets/logo-blanco.png";


export default function Footer() {
  const services = [
    "Perforaciones",
    "Venta de Electrobombas",
    "Reparación de Electrobombas",
    "Bobinados",
    "Filmaciones",
    "Limpieza",
    "Pesca de Bombas",
  ];

  const routes: Record<string, string> = {
    "Venta de Electrobombas": "venta",
    "Reparación de Electrobombas": "reparacion",
    "Pesca de Bombas": "pescas"
  };
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex flex-col leading-tight">
                <img src={logo} alt="Arenas Perforaciones Logo" className="max-w-[80%] h-auto" />
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Más de 20 años brindando soluciones integrales en perforación y
              mantenimiento de pozos de agua en Mendoza y San Juan.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-base font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Inicio", to: "/home" },
                { label: "Servicios", to: "/servicios" },
                { label: "Proyectos", to: "/proyectos" },
                { label: "Nosotros", to: "/nosotros" },
                { label: "Contacto", to: "/contacto" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
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
              {services.map((s) => {
                const slug =
                  routes[s] ??
                  s
                    .toLowerCase()
                    .normalize("NFD") // elimina tildes
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/ /g, "-");

                return (
                  <li key={s}>
                    <Link
                      to={`/servicios/${slug}`}
                      className="hover:text-white transition-colors"
                    >
                      {s}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              {CONTACT.phones.map((p) => (
                <li key={p.label} className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                  <a
                    href={p.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {p.number}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                <span className="text-gray-400">
                  Maipú, Mendoza, Argentina
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Arenas Electrobombas. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            {CONTACT.linkedin && (
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
