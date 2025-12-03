// Importaciones de React Router para navegación SPA
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes reutilizables globales
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Páginas principales de la aplicación
import Home from './pages/Home';
import Simulator from './pages/Simulator';
import RequestCredit from './pages/RequestCredit';

// Estilos globales
import './App.css';

/**
 * Componente principal de la aplicación CreditSmart
 * Configura el enrutamiento y la estructura general con:
 * - BrowserRouter: Habilita navegación SPA sin recarga de página
 * - Navbar: Barra de navegación persistente en todas las páginas
 * - Routes: Contenedor de rutas dinámicas
 * - Footer: Pie de página persistente
 */
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Página de inicio con hero y catálogo de productos */}
        <Route path="/" element={<Home />} />
        
        {/* Simulador con búsqueda y filtros dinámicos */}
        <Route path="/simulador" element={<Simulator />} />
        
        {/* Formulario de solicitud de crédito con validaciones */}
        <Route path="/solicitar" element={<RequestCredit />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
