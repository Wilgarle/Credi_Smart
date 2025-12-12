import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { formatMoney } from '../data/creditsData';

/**
 * Página Mis Solicitudes
 * Lista las solicitudes de crédito guardadas con filtros por email y cédula
 */
function MisSolicitudes() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterEmail, setFilterEmail] = useState('');
  const [filterCedula, setFilterCedula] = useState('');

  useEffect(() => {
    loadRequests();
  }, [filterEmail, filterCedula]);

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      
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
        q = query(q, ...conditions, orderBy('fechaSolicitud', 'desc'));
      } else {
        q = query(q, orderBy('fechaSolicitud', 'desc'));
      }
      
      const querySnapshot = await getDocs(q);
      const requestsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
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
                <div className="request-grid">
                  <div className="request-info">
                    <h3 className="request-name">{request.nombre}</h3>
                    <p><strong>Email:</strong> {request.email}</p>
                    <p><strong>Cédula:</strong> {request.cedula}</p>
                    <p><strong>Teléfono:</strong> {request.telefono}</p>
                  </div>
                  <div className="request-details">
                    <p><strong>Tipo de Crédito:</strong> {request.tipo}</p>
                    <p><strong>Monto:</strong> {formatMoney(request.monto)}</p>
                    <p><strong>Plazo:</strong> {request.plazo} meses</p>
                    <p><strong>Cuota Mensual:</strong> {formatMoney(request.cuotaMensual)}</p>
                    <p><strong>Fecha:</strong> {request.fechaSolicitud?.toDate().toLocaleDateString()}</p>
                  </div>
                </div>
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