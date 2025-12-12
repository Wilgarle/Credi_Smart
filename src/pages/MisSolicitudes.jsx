import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { formatMoney } from '../data/creditsData';

/**
 * Página Mis Solicitudes
 * Lista las solicitudes de crédito guardadas con filtros por email y cédula
 */
function MisSolicitudes() {
  const [searchParams] = useSearchParams();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterEmail, setFilterEmail] = useState(searchParams.get('email') || '');
  const [filterCedula, setFilterCedula] = useState('');

  useEffect(() => {
    loadRequests();
  }, [filterEmail, filterCedula]);

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Solo cargar si hay filtros o query param
      if (!filterEmail && !filterCedula && !searchParams.get('email')) {
        setRequests([]);
        setLoading(false);
        return;
      }
      
      let q = collection(db, 'requests');
      
      // Aplicar filtros si existen
      if (filterEmail || filterCedula) {
        const conditions = [];
        if (filterEmail) {
          conditions.push(where('email', '==', filterEmail));
        }
        if (filterCedula) {
          conditions.push(where('cedula', '==', filterCedula));
        }
        q = query(q, ...conditions);
      } else if (searchParams.get('email')) {
        q = query(q, where('email', '==', searchParams.get('email')));
      }
      
      const querySnapshot = await getDocs(q);
      let requestsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Ordenar por fecha descendente
      requestsList.sort((a, b) => b.fechaSolicitud.toDate() - a.fechaSolicitud.toDate());
      
      // Si hay filtro de email desde query param, mostrar solo la más reciente
      if (searchParams.get('email')) {
        requestsList = requestsList.slice(0, 1); // Solo la más reciente
      }
      
      setRequests(requestsList);
    } catch (err) {
      console.error('Error loading requests:', err);
      setError('Error al cargar las solicitudes.');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilterEmail('');
    setFilterCedula('');
  };

  return (
    <main className="container">
      <section className="section">
        <header className="section__header">
          <h1 className="section__title">Mis Solicitudes</h1>
          <p className="muted">Consulta y filtra tus solicitudes de crédito</p>
        </header>

        {/* Filtros */}
        <div className="filters" style={{ marginBottom: '2rem' }}>
          <div className="form__grid" style={{ gridTemplateColumns: '1fr 1fr auto' }}>
            <label className="input">
              <span>Filtrar por Email</span>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={filterEmail}
                onChange={(e) => setFilterEmail(e.target.value)}
              />
            </label>
            <label className="input">
              <span>Filtrar por Cédula</span>
              <input
                type="text"
                placeholder="1234567890"
                value={filterCedula}
                onChange={(e) => setFilterCedula(e.target.value)}
              />
            </label>
            <div style={{ display: 'flex', alignItems: 'end', gap: '0.5rem' }}>
              <button className="btn btn-outline" onClick={clearFilters}>
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>

        {/* Lista de solicitudes */}
        {loading && <p className="loading">Cargando solicitudes...</p>}
        {error && <p className="error">{error}</p>}
        
        {!loading && !error && requests.length === 0 && (
          <p className="muted">No se encontraron solicitudes.</p>
        )}
        
        {!loading && !error && requests.length > 0 && (
          <div className="requests-list">
            {requests.map((request) => (
              <div key={request.id} className="request-card">
                <div className="request-info">
                  <h3 className="request-name">{request.nombre}</h3>
                  <p><strong>Email:</strong> {request.email}</p>
                  <p><strong>Cédula:</strong> {request.cedula}</p>
                  <p><strong>Teléfono:</strong> {request.telefono}</p>
                </div>
                <hr className="request-divider" />
                <div className="request-details">
                  <p><strong>Tipo de Crédito:</strong> {request.tipo}</p>
                  <p><strong>Monto:</strong> {formatMoney(request.monto)}</p>
                  <p><strong>Plazo:</strong> {request.plazo} meses</p>
                  <p><strong>Cuota Mensual:</strong> {formatMoney(request.cuotaMensual)}</p>
                  <p><strong>Fecha:</strong> {request.fechaSolicitud?.toDate().toLocaleDateString()}</p>
                </div>
                <hr className="request-divider" />
                <div className="request-extra">
                  <p><strong>Destino:</strong> {request.destino}</p>
                  <p><strong>Empresa:</strong> {request.empresa}</p>
                  <p><strong>Cargo:</strong> {request.cargo}</p>
                  <p><strong>Ingresos:</strong> {formatMoney(request.ingresos)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default MisSolicitudes;