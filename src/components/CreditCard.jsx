import { Link } from 'react-router-dom';
import { formatMoney, formatRate } from '../data/creditsData';

/**
 * Componente reutilizable para mostrar una tarjeta de producto crediticio
 * 
 * @component
 * @param {Object} props - Props del componente
 * @param {Object} props.credit - Objeto con información del crédito
 * @param {string} props.credit.id - ID único del crédito
 * @param {string} props.credit.name - Nombre del producto crediticio
 * @param {string} props.credit.desc - Descripción breve del crédito
 * @param {string} props.credit.icon - Nombre del archivo de imagen
 * @param {number} props.credit.rate - Tasa de interés anual (decimal)
 * @param {number} props.credit.min - Monto mínimo del crédito
 * @param {number} props.credit.max - Monto máximo del crédito
 * @param {number} props.credit.termMax - Plazo máximo en meses
 * 
 * @example
 * <CreditCard credit={{
 *   id: 'vehiculo',
 *   name: 'Crédito Vehículo',
 *   desc: 'Financia tu vehículo',
 *   icon: 'credit-vehiculo.png',
 *   rate: 0.155,
 *   min: 5000000,
 *   max: 80000000,
 *   termMax: 60
 * }} />
 */
function CreditCard({ credit }) {
  // Desestructuración de props para código más limpio y legible
  const { id, name, desc, icon, rate, min, max, termMax } = credit;

  return (
    <article className="card">
      <div className="card__media">
        <img 
          src={`/img/${icon}`} 
          alt={name} 
          className="card__img" 
          loading="lazy"
        />
      </div>
      <div className="card__body">
        <h3 className="card__title">{name}</h3>
        <p className="card__desc">{desc}</p>
        <ul className="meta">
          <li>
            <span className="tag">Tasa</span> {formatRate(rate)}
          </li>
          <li>
            <span className="tag">Monto</span> {formatMoney(min)} – {formatMoney(max)}
          </li>
          <li>
            <span className="tag">Plazo</span> hasta {termMax} meses
          </li>
        </ul>
        <div className="card__actions">
          <Link className="link-ghost" to={`/simulador?producto=${id}`}>
            Ver detalles
          </Link>
          <Link className="btn" to={`/solicitar?tipo=${encodeURIComponent(name)}`}>
            Solicitar
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CreditCard;
