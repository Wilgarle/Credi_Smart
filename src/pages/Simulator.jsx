import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CreditCard from '../components/CreditCard';
import { creditsData } from '../data/creditsData';

/**
 * Página del Simulador de Créditos
 * Permite buscar y filtrar créditos en tiempo real
 */
function Simulator() {
  // ==================== ESTADOS ====================
  
  /**
   * @state {string} searchTerm - Término de búsqueda ingresado por el usuario
   * @initialValue '' - String vacío, se actualiza con cada tecla
   */
  const [searchTerm, setSearchTerm] = useState('');
  
  /**
   * @state {string} activeRange - Rango de monto seleccionado ('all', '0-5000000', etc.)
   * @initialValue 'all' - Muestra todos los créditos por defecto
   */
  const [activeRange, setActiveRange] = useState('all');
  
  /**
   * @state {Array} filteredCredits - Lista de créditos filtrados según criterios
   * @initialValue creditsData - Array completo de créditos al inicio
   */
  const [filteredCredits, setFilteredCredits] = useState(creditsData);
  
  // Obtener parámetros de la URL (ej: ?producto=vehiculo)
  const [searchParams] = useSearchParams();
  const preSelectedProduct = searchParams.get('producto');

  // Aplicar filtros cada vez que cambien los criterios
  useEffect(() => {
    let results = [...creditsData];

    // Filtro por producto preseleccionado desde URL
    if (preSelectedProduct) {
      results = results.filter(credit => credit.id === preSelectedProduct);
    }

    // Filtro por búsqueda de texto
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(credit => 
        credit.name.toLowerCase().includes(searchLower)
      );
    }

    // Filtro por rango de monto
    if (activeRange !== 'all') {
      const [min, max] = activeRange.split('-').map(Number);
      results = results.filter(credit => {
        // Verificar si el crédito tiene alguna superposición con el rango seleccionado
        return (credit.min >= min && credit.min <= max) || 
               (credit.max >= min && credit.max <= max) ||
               (credit.min <= min && credit.max >= max);
      });
    }

    setFilteredCredits(results);
  }, [searchTerm, activeRange, preSelectedProduct]);

  // Manejador del cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Manejador del cambio de filtro de rango
  const handleRangeChange = (range) => {
    setActiveRange(range);
  };

  // Limpiar todos los filtros
  const clearFilters = () => {
    setSearchTerm('');
    setActiveRange('all');
  };

  // Definición de los rangos de filtro
  const ranges = [
    { label: 'Todos', value: 'all' },
    { label: 'Hasta $5M', value: '0-5000000' },
    { label: '$5M – $20M', value: '5000000-20000000' },
    { label: '$20M – $50M', value: '20000000-50000000' },
    { label: 'Más de $50M', value: '50000000-999999999' }
  ];

  return (
    <main className="container">
      <section className="section">
        <header className="section__header">
          <h1 className="section__title">Simulador</h1>
        </header>

        {/* Formulario de Filtros */}
        <form className="filters" onSubmit={(e) => e.preventDefault()} aria-label="Filtros">
          <label className="input input--full">
            <span>Buscar por nombre</span>
            <input
              id="search"
              type="search"
              placeholder="Ej: vivienda, vehículo…"
              aria-label="Buscar crédito"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </label>
          
          <div className="chips" role="group" aria-label="Rango de monto">
            {ranges.map((range) => (
              <button
                key={range.value}
                type="button"
                className="chip ripple"
                data-range={range.value}
                aria-pressed={activeRange === range.value}
                onClick={() => handleRangeChange(range.value)}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Botón para limpiar filtros - solo visible si hay filtros activos */}
          {(searchTerm || activeRange !== 'all') && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={clearFilters}
              style={{ marginTop: '8px' }}
            >
              Limpiar filtros
            </button>
          )}
        </form>

        {/* Resultados */}
        <div className="grid" id="results">
          {filteredCredits.length > 0 ? (
            filteredCredits.map((credit) => (
              <CreditCard key={credit.id} credit={credit} />
            ))
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
              <p className="muted">
                No se encontraron créditos que coincidan con tu búsqueda.
              </p>
              <button className="btn btn-outline" onClick={clearFilters} style={{ marginTop: '16px' }}>
                Ver todos los créditos
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Simulator;
