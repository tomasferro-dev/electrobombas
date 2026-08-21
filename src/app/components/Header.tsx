import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronDown, Cog, ShoppingCart, Zap, Clock } from 'lucide-react';
import logo from '../../assets/logooo.webp';

interface HeaderProps {
  mode: 'home' | 'subpage';
}

const NAV_LINKS = [
  { label: 'Servicios', to: '/servicios' },
  { label: 'Proyectos', to: '/proyectos' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
];

const ELECTROBOMBAS_ITEMS = [

  {
    label: 'Venta',
    to: '/venta',
    icon: ShoppingCart,
    description: 'Catálogo de electrobombas',
  },
  {
    label: 'Alquiler',
    to: '/servicios/alquiler',
    icon: Clock,
    description: 'Alquiler de electrobombas',
  },
  {
    label: 'Reparación',
    to: '/reparacion',
    icon: Cog,
    description: 'Bobinado y reparación integral',
  },
];

export default function Header({ mode }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileElectroOpen, setIsMobileElectroOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    setIsMobileElectroOpen(false);
  }, [location.pathname]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isElectroActive = ELECTROBOMBAS_ITEMS.some((i) => location.pathname === i.to);

  const bgClass =
    mode === 'home'
      ? isScrolled
        ? 'bg-white shadow-md'
        : 'bg-white/95 backdrop-blur-sm'
      : 'bg-white shadow-md';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 md:h-20 ${bgClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">

          {/* Logo */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center">
            <img
              src={logo}
              alt="Arenas Electrobombas"
              width={512}
              height={200}
              fetchpriority="high"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-red-700 ${
                    isActive ? 'text-red-700 border-b-2 border-red-700 pb-0.5' : 'text-gray-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Dropdown Electrobombas */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-red-700 ${
                  isElectroActive ? 'text-red-700 border-b-2 border-red-700 pb-0.5' : 'text-gray-700'
                }`}
              >
                {/* <Zap className="w-3.5 h-3.5" /> */}
                Electrobombas
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown panel */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  {/* Link principal al servicio */}
                  {/* <Link
                    to="/servicios/electrobombas"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 border-b border-gray-100 transition-colors"
                  >
                    <Zap className="w-4 h-4 text-red-400" />
                    <span>Ver servicio completo</span>
                  </Link> */}

                  {/* Opciones */}
                  {ELECTROBOMBAS_ITEMS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-red-50 transition-colors group"
                    >
                      <div className="bg-red-100 group-hover:bg-red-200 rounded-lg p-1.5 flex-shrink-0 mt-0.5 transition-colors">
                        <item.icon className="w-4 h-4 text-red-700" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-red-700 transition-colors">
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contacto"
              className="bg-red-700 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-red-800 transition-colors"
            >
              Solicitar Presupuesto
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-red-700 bg-red-50'
                      : 'text-gray-700 hover:text-red-700 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
                <ChevronRight className="w-4 h-4 opacity-40" />
              </NavLink>
            ))}

            {/* Electrobombas accordion en mobile */}
            <div>
              <button
                onClick={() => setIsMobileElectroOpen(!isMobileElectroOpen)}
                className={`w-full flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors ${
                  isElectroActive
                    ? 'text-red-700 bg-red-50'
                    : 'text-gray-700 hover:text-red-700 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Electrobombas
                </span>
                <ChevronDown className={`w-4 h-4 opacity-40 transition-transform duration-200 ${isMobileElectroOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMobileElectroOpen && (
                <div className="bg-gray-50 border-t border-b border-gray-100">
                                    {ELECTROBOMBAS_ITEMS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex items-center gap-3 px-8 py-3 text-sm font-medium text-gray-700 hover:text-red-700 hover:bg-red-50 transition-colors"
                    >
                      <item.icon className="w-4 h-4 text-red-600" />
                      {item.label}
                      <ChevronRight className="w-3.5 h-3.5 opacity-40 ml-auto" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="px-4 py-3">
              <Link
                to="/contacto"
                className="block text-center bg-red-700 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-red-800 transition-colors"
              >
                Solicitar Presupuesto
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}