import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

// Replace with your actual logo import path
import logo from '../../assets/electro.png';

interface HeaderProps {
  mode: 'home' | 'subpage';
}

const NAV_LINKS = [
  { label: 'Servicios', to: '/servicios' },
  { label: 'Proyectos', to: '/proyectos' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
];

export default function Header({ mode }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // const scrollToSection = (id: string) => {
  //   if (location.pathname !== '/home') {
  //     navigate('/home');
  //     setTimeout(() => {
  //       const el = document.getElementById(id);
  //       if (el) {
  //         const offset = 80;
  //         window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
  //       }
  //     }, 300);
  //   } else {
  //     const el = document.getElementById(id);
  //     if (el) {
  //       const offset = 80;
  //       window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
  //     }
  //   }
  //   setIsMobileMenuOpen(false);
  // };

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
          <Link to="/home" className="flex items-center">
            {/* Use img tag with your logo */}
            <img src={logo} alt="Arenas Perforaciones" className="h-10 md:h-12 w-auto object-contain" />
            {/* <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-red-700 tracking-tight">ARENAS</span>
              <span className="text-xs text-gray-500 tracking-widest uppercase">Perforaciones</span>
            </div> */}
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
            <div className="px-4 py-3">
              <Link
                to="/contacto"
                className="block text-center bg-red-700 text-white px-6 py-3 rounded-md text-sm 
                font-medium hover:bg-red-800 transition-colors"
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
