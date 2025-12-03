import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Componente de barra de navegación global
 * 
 * Características:
 * - Navegación entre páginas con React Router
 * - Resaltado de enlace activo según ruta actual
 * - Tema claro/oscuro con persistencia en localStorage
 * - Menú responsive tipo hamburguesa para móvil
 * - Cierre automático del menú al navegar
 * 
 * @component
 * @returns {JSX.Element} Barra de navegación con logo, enlaces y tema switcher
 * 
 * @example
 * <Navbar />
 */
function Navbar() {
  // ==================== ESTADOS ====================
  
  /**
   * @state {string} theme - Tema actual de la aplicación
   * @values 'light' | 'dark'
   * @initialValue 'light' - Tema claro por defecto
   * @persistence localStorage - Se guarda y recupera del almacenamiento local
   */
  const [theme, setTheme] = useState('light');
  
  /**
   * @state {boolean} menuOpen - Estado del menú móvil (hamburguesa)
   * @initialValue false - Menú cerrado por defecto
   * @updates true al hacer clic en hamburguesa, false al navegar o cerrar
   */
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Hook de React Router para obtener la ubicación actual
  const location = useLocation();

  // Cargar tema guardado en localStorage al montar el componente
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    }
  }, []);

  // Función para alternar entre tema claro y oscuro
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  // Función para alternar el menú móvil
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Determinar si un link está activo
  const isActive = (path) => {
    return location.pathname === path ? 'link active' : 'link';
  };

  return (
    <header className="topbar">
      <nav className="container nav" aria-label="Principal">
        <Link className="brand" to="/">
          <img src="/img/logo.png" alt="CreditSmart" width="40" height="40" />
          <span>CreditSmart</span>
        </Link>
        
        <button 
          className="hamburger" 
          aria-label="Abrir menú" 
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul className={`menu ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link className={isActive('/')} to="/">
              Inicio
            </Link>
          </li>
          <li>
            <Link className={isActive('/simulador')} to="/simulador">
              Simulador
            </Link>
          </li>
          <li>
            <Link className={isActive('/solicitar')} to="/solicitar">
              Solicitar
            </Link>
          </li>
          <li className="divider" aria-hidden="true"></li>
          <li>
            <button 
              className="btn-ghost" 
              id="themeToggle" 
              aria-label="Cambiar tema"
              onClick={toggleTheme}
            >
              🌓
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
