import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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

  // Manejador de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

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
  const handleSubmit = (e) => {
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

    // Si todo está bien, mostrar modal
    setShowModal(true);
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

  // Ir al inicio desde el modal
  const handleGoHome = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <main className="container">
      <section className="section">
        <header className="section__header">
          <h1 className="section__title">Solicitud de crédito</h1>
        </header>

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
            <button className="btn" type="submit">
              Enviar solicitud
            </button>
            <button className="btn btn-outline" type="button" onClick={handleClear}>
              Limpiar formulario
            </button>
          </div>
        </form>
      </section>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="modal" onClick={handleCloseModal}>
          <div 
            className="modal__dialog" 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="modalTitle"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="modalTitle">Solicitud enviada</h3>
            <p>
              Gracias por confiar en CreditSmart. En breve te contactaremos para continuar el proceso.
            </p>
            <div className="modal__actions">
              <button className="btn btn-outline" onClick={handleGoHome}>
                Ir al inicio
              </button>
              <button className="btn" onClick={handleCloseModal}>
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default RequestCredit;
