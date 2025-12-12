import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { creditsData, formatMoney, calculateMonthlyPayment } from '../data/creditsData';

/**
 * Página de Solicitud de Crédito
 * Formulario controlado con validaciones en tiempo real y cálculo de cuota
 */
function RequestCredit() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preSelectedType = searchParams.get('tipo');

  // ==================== ESTADOS ====================
  
  /**
   * @state {Object} formData - Datos del formulario (11 campos)
   * @description Formulario 100% controlado con useState
   * @initialValues {
   *   nombre: '' - Nombre completo del solicitante
   *   cedula: '' - Número de cédula
   *   email: '' - Correo electrónico
   *   telefono: '' - Número de teléfono
   *   tipo: preSelectedType || creditsData[0]?.name - Tipo de crédito
   *   monto: '' - Monto solicitado (formateado como $1.000.000)
   *   plazo: '12' - Plazo en meses (default 12)
   *   destino: '' - Descripción del uso del crédito
   *   empresa: '' - Empresa donde trabaja
   *   cargo: '' - Cargo laboral
   *   ingresos: '' - Ingresos mensuales (formateado)
   * }
   */
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    email: '',
    telefono: '',
    tipo: preSelectedType || (creditsData[0]?.name || ''),
    monto: '',
    plazo: '12',
    destino: '',
    empresa: '',
    cargo: '',
    ingresos: ''
  });

  /**
   * @state {Object} errors - Mensajes de error por campo
   * @initialValue {} - Objeto vacío, se llena en validaciones
   * @example { nombre: 'El nombre es requerido', email: 'Email inválido' }
   */
  const [errors, setErrors] = useState({});
  
  /**
   * @state {Object} touched - Campos que el usuario ha visitado
   * @initialValue {} - Objeto vacío, se marca true al hacer blur
   * @purpose Validar solo campos que el usuario ya interactuó
   * @example { nombre: true, email: true, cedula: false }
   */
  const [touched, setTouched] = useState({});
  
  /**
   * @state {boolean} showModal - Visibilidad del modal de confirmación
   * @initialValue false - Oculto por defecto
   * @updates true al enviar formulario válido, false al cerrar
   */
  const [showModal, setShowModal] = useState(false);
  
  /**
   * @state {boolean} saving - Estado de guardado en Firestore
   * @initialValue false - No guardando por defecto
   */
  const [saving, setSaving] = useState(false);
  
  /**
   * @state {string} saveError - Error al guardar en Firestore
   * @initialValue null - Sin error por defecto
   */
  const [saveError, setSaveError] = useState(null);
  
  /**
   * @state {boolean} isSuccess - Estado de éxito al guardar
   * @initialValue false - No éxito por defecto
   */
  const [isSuccess, setIsSuccess] = useState(false);
  
  /**
   * @state {Object} createdRequest - Datos de la solicitud creada
   * @initialValue null - Sin solicitud por defecto
   */
  const [createdRequest, setCreatedRequest] = useState(null);
  
  /**
   * @state {number} monthlyPayment - Cuota mensual calculada
   * @initialValue 0 - Se calcula automáticamente con useEffect
   * @updates Cuando cambian: monto, plazo o tipo de crédito
   * @formula Amortización francesa: P * (i * (1 + i)^n) / ((1 + i)^n - 1)
   */
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Actualizar tipo si viene en la URL
  useEffect(() => {
    if (preSelectedType) {
      setFormData(prev => ({ ...prev, tipo: preSelectedType }));
    }
  }, [preSelectedType]);

  // Calcular cuota mensual cuando cambian monto, plazo o tipo de crédito
  useEffect(() => {
    const selectedCredit = creditsData.find(c => c.name === formData.tipo);
    if (selectedCredit && formData.monto) {
      const montoNumerico = parseMoneyString(formData.monto);
      const plazoNumerico = parseInt(formData.plazo);
      
      if (montoNumerico > 0 && plazoNumerico > 0) {
        const payment = calculateMonthlyPayment(
          montoNumerico,
          selectedCredit.rate,
          plazoNumerico
        );
        setMonthlyPayment(payment);
      }
    }
  }, [formData.monto, formData.plazo, formData.tipo]);

  // Función para parsear string de moneda a número
  const parseMoneyString = (moneyString) => {
    return parseInt(moneyString.replace(/[^\d]/g, '')) || 0;
  };

  // Función para formatear input de moneda
  const formatMoneyInput = (value) => {
    const digits = value.replace(/[^\d]/g, '');
    if (!digits) return '';
    return formatMoney(parseInt(digits));
  };

  // Validaciones
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'nombre':
        if (!value.trim()) {
          error = 'El nombre es requerido';
        } else if (value.trim().length < 3) {
          error = 'El nombre debe tener al menos 3 caracteres';
        }
        break;

      case 'cedula':
        const cedulaDigits = value.replace(/[^\d]/g, '');
        if (!cedulaDigits) {
          error = 'La cédula es requerida';
        } else if (cedulaDigits.length < 6 || cedulaDigits.length > 10) {
          error = 'La cédula debe tener entre 6 y 10 dígitos';
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = 'El email es requerido';
        } else if (!emailRegex.test(value)) {
          error = 'Email inválido';
        }
        break;

      case 'telefono':
        const telefonoDigits = value.replace(/[^\d]/g, '');
        if (!telefonoDigits) {
          error = 'El teléfono es requerido';
        } else if (telefonoDigits.length < 7 || telefonoDigits.length > 10) {
          error = 'El teléfono debe tener entre 7 y 10 dígitos';
        }
        break;

      case 'monto':
        const montoNumerico = parseMoneyString(value);
        const selectedCredit = creditsData.find(c => c.name === formData.tipo);
        if (!value) {
          error = 'El monto es requerido';
        } else if (selectedCredit) {
          if (montoNumerico < selectedCredit.min) {
            error = `El monto mínimo es ${formatMoney(selectedCredit.min)}`;
          } else if (montoNumerico > selectedCredit.max) {
            error = `El monto máximo es ${formatMoney(selectedCredit.max)}`;
          }
        }
        break;

      case 'destino':
        if (!value.trim()) {
          error = 'El destino del crédito es requerido';
        } else if (value.trim().length < 10) {
          error = 'Describe el uso del crédito (mínimo 10 caracteres)';
        }
        break;

      case 'empresa':
        if (!value.trim()) {
          error = 'El nombre de la empresa es requerido';
        }
        break;

      case 'cargo':
        if (!value.trim()) {
          error = 'El cargo es requerido';
        }
        break;

      case 'ingresos':
        const ingresosNumerico = parseMoneyString(value);
        if (!value) {
          error = 'Los ingresos son requeridos';
        } else if (ingresosNumerico < 1000000) {
          error = 'Los ingresos deben ser al menos $1,000,000';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Función para capitalizar primera letra de cada palabra (para nombre)
  const capitalizeWords = (str) => {
    return str.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  // Función para capitalizar primera letra (para otros campos)
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Manejador de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatear campos de texto
    if (name === 'nombre') {
      formattedValue = capitalizeWords(value);
    } else if (['destino', 'empresa', 'cargo'].includes(name)) {
      formattedValue = capitalizeFirst(value);
    }

    // Formatear campos de moneda
    if (name === 'monto' || name === 'ingresos') {
      formattedValue = formatMoneyInput(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Validar en tiempo real si el campo ha sido tocado
    if (touched[name]) {
      const error = validateField(name, formattedValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Manejador cuando el campo pierde el foco
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todos los campos
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    // Marcar todos los campos como tocados
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Si hay errores, no enviar
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Guardar en Firestore
    setSaving(true);
    setSaveError(null);
    try {
      const requestData = {
        ...formData,
        monto: parseMoneyString(formData.monto), // Guardar como número
        ingresos: parseMoneyString(formData.ingresos), // Guardar como número
        cuotaMensual: monthlyPayment,
        fechaSolicitud: new Date()
      };
      const docRef = await addDoc(collection(db, 'requests'), requestData);
      
      // Mostrar éxito con datos de la solicitud
      setCreatedRequest({ id: docRef.id, ...requestData });
      setIsSuccess(true);
    } catch (error) {
      console.error('Error saving request:', error);
      setSaveError('Error al guardar la solicitud. Inténtalo de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  // Limpiar formulario
  const handleClear = () => {
    setFormData({
      nombre: '',
      cedula: '',
      email: '',
      telefono: '',
      tipo: creditsData[0]?.name || '',
      monto: '',
      plazo: '12',
      destino: '',
      empresa: '',
      cargo: '',
      ingresos: ''
    });
    setErrors({});
    setTouched({});
    setMonthlyPayment(0);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Ir a mis solicitudes
  const handleGoToRequests = () => {
    navigate('/mis-solicitudes?email=' + createdRequest.email);
  };

  // Ir a inicio
  const handleGoHome = () => {
    navigate('/');
  };

  // Nueva solicitud (reiniciar)
  const handleNewRequest = () => {
    setIsSuccess(false);
    setCreatedRequest(null);
    handleClear();
  };

  return (
    <main className="container">
      <section className="section">
        <header className="section__header">
          <h1 className="section__title">Solicitud de crédito</h1>
        </header>

        {isSuccess && createdRequest ? (
          <div className="success-card">
            <div className="success-header">
              <div className="success-icon">✅</div>
              <h2>¡Solicitud enviada exitosamente!</h2>
              <p>Tu solicitud de crédito ha sido guardada. Revisa los detalles abajo.</p>
            </div>

            <div className="request-summary">
              <div className="summary-info">
                <h3>{createdRequest.nombre}</h3>
                <p><strong>Email:</strong> {createdRequest.email}</p>
                <p><strong>Cédula:</strong> {createdRequest.cedula}</p>
                <p><strong>Teléfono:</strong> {createdRequest.telefono}</p>
              </div>
              <hr className="request-divider" />
              <div className="summary-details">
                <p><strong>Tipo de Crédito:</strong> {createdRequest.tipo}</p>
                <p><strong>Monto:</strong> {formatMoney(createdRequest.monto)}</p>
                <p><strong>Plazo:</strong> {createdRequest.plazo} meses</p>
                <p><strong>Cuota Mensual:</strong> {formatMoney(createdRequest.cuotaMensual)}</p>
                <p><strong>Fecha:</strong> {createdRequest.fechaSolicitud.toLocaleDateString()}</p>
              </div>
            </div>

            <div className="success-actions">
              <button className="btn" onClick={handleGoToRequests}>
                Ver mis solicitudes
              </button>
              <button className="btn btn-outline" onClick={handleGoHome}>
                Ir a inicio
              </button>
              <button className="btn btn-ghost" onClick={handleNewRequest}>
                Nueva solicitud
              </button>
            </div>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit} noValidate>
          {/* Datos personales */}
          <fieldset>
            <legend>Datos personales</legend>
            <div className="form__grid">
              <label className="input">
                <span>Nombre completo *</span>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.nombre && errors.nombre && (
                  <span style={{ color: 'red', fontSize: '12px' }}>{errors.nombre}</span>
                )}
              </label>

              <label className="input">
                <span>Cédula *</span>
                <input
                  type="text"
                  name="cedula"
                  inputMode="numeric"
                  placeholder="Ej: 1234567890"
                  value={formData.cedula}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.cedula && errors.cedula && (
                  <span style={{ color: 'red', fontSize: '12px' }}>{errors.cedula}</span>
                )}
              </label>

              <label className="input">
                <span>Email *</span>
                <input
                  type="email"
                  name="email"
                  placeholder="tucorreo@dominio.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.email && errors.email && (
                  <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>
                )}
              </label>

              <label className="input">
                <span>Teléfono *</span>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Ej: 3001234567"
                  value={formData.telefono}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.telefono && errors.telefono && (
                  <span style={{ color: 'red', fontSize: '12px' }}>{errors.telefono}</span>
                )}
              </label>
            </div>
          </fieldset>

          {/* Datos del crédito */}
          <fieldset>
            <legend>Datos del crédito</legend>
            <div className="form__grid">
              <label className="input">
                <span>Tipo de crédito *</span>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                >
                  {creditsData.map((credit) => (
                    <option key={credit.id} value={credit.name}>
                      {credit.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="input">
                <span>Monto solicitado *</span>
                <input
                  type="text"
                  name="monto"
                  placeholder="$"
                  value={formData.monto}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.monto && errors.monto && (
                  <span style={{ color: 'red', fontSize: '12px' }}>{errors.monto}</span>
                )}
              </label>

              <label className="input">
                <span>Plazo (meses) *</span>
                <select
                  name="plazo"
                  value={formData.plazo}
                  onChange={handleChange}
                  required
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="36">36</option>
                  <option value="48">48</option>
                  <option value="60">60</option>
                </select>
              </label>

              {/* Mostrar cuota mensual calculada */}
              {monthlyPayment > 0 && (
                <div className="input">
                  <span>Cuota mensual estimada</span>
                  <div style={{ 
                    padding: '12px', 
                    background: 'var(--surface)', 
                    border: '1px solid var(--line)',
                    borderRadius: '14px',
                    fontWeight: '600',
                    color: 'var(--primary)'
                  }}>
                    {formatMoney(monthlyPayment)}
                  </div>
                </div>
              )}

              <label className="input input--full">
                <span>Destino del crédito *</span>
                <textarea
                  name="destino"
                  rows="3"
                  placeholder="Describe el uso del crédito..."
                  value={formData.destino}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.destino && errors.destino && (
                  <span style={{ color: 'red', fontSize: '12px' }}>{errors.destino}</span>
                )}
              </label>
            </div>
          </fieldset>

          {/* Datos laborales */}
          <fieldset>
            <legend>Datos laborales</legend>
            <div className="form__grid">
              <label className="input">
                <span>Empresa donde trabaja *</span>
                <input
                  type="text"
                  name="empresa"
                  placeholder="Nombre de la empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.empresa && errors.empresa && (
                  <span style={{ color: 'red', fontSize: '12px' }}>{errors.empresa}</span>
                )}
              </label>

              <label className="input">
                <span>Cargo *</span>
                <input
                  type="text"
                  name="cargo"
                  placeholder="Tu cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.cargo && errors.cargo && (
                  <span style={{ color: 'red', fontSize: '12px' }}>{errors.cargo}</span>
                )}
              </label>

              <label className="input">
                <span>Ingresos mensuales *</span>
                <input
                  type="text"
                  name="ingresos"
                  placeholder="$"
                  value={formData.ingresos}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.ingresos && errors.ingresos && (
                  <span style={{ color: 'red', fontSize: '12px' }}>{errors.ingresos}</span>
                )}
              </label>
            </div>
          </fieldset>

          {/* Acciones del formulario */}
          <div className="form__actions">
            <button className="btn" type="submit" disabled={saving}>
              {saving ? 'Guardando...' : 'Enviar solicitud'}
            </button>
            <button className="btn btn-outline" type="button" onClick={handleClear} disabled={saving}>
              Limpiar formulario
            </button>
            {saveError && <p className="error">{saveError}</p>}
          </div>
        </form>
        )}
      </section>
    </main>
  );
}

export default RequestCredit;
