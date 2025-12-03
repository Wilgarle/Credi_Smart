import { Link } from 'react-router-dom';
import CreditCard from '../components/CreditCard';
import { creditsData } from '../data/creditsData';

function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero container">
        <div className="hero__content">
          <h1 className="fadeUp">Créditos claros, Decisiones seguras.</h1>
          <p className="muted fadeUp" style={{ animationDelay: '.08s' }}>
            Compara productos, simula montos y solicita en minutos con una experiencia simple y elegante.
          </p>
          <div className="hero__cta fadeUp" style={{ animationDelay: '.16s' }}>
            <Link className="btn" to="/simulador">
              Explorar opciones
            </Link>
            <Link className="btn btn-outline" to="/solicitar">
              Solicitar ahora
            </Link>
          </div>
        </div>
        <div className="hero__art float">
          <picture>
            <source srcSet="/img/hero_image.jpg" type="image/jpeg" />
            <img 
              src="/img/hero_image.jpg" 
              alt="Pareja sonriente planeando su crédito" 
              loading="eager"
            />
          </picture>
        </div>
      </section>

      {/* Catálogo de Productos */}
      <section className="container section">
        <header className="section__header">
          <h2 className="section__title">Productos destacados</h2>
        </header>
        <div className="grid">
          {creditsData.map((credit) => (
            <CreditCard key={credit.id} credit={credit} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container features">
        <article className="feature fadeUp" style={{ animationDelay: '.05s' }}>
          <div className="feature__icon">🔒</div>
          <h3>Transparencia</h3>
          <p className="muted">
            Información clara sobre tasas, montos y plazos. Sin letras pequeñas.
          </p>
        </article>
        <article className="feature fadeUp" style={{ animationDelay: '.1s' }}>
          <div className="feature__icon">⚡</div>
          <h3>Rapidez</h3>
          <p className="muted">
            Encuentra y solicita lo que necesitas en pocos clics.
          </p>
        </article>
        <article className="feature fadeUp" style={{ animationDelay: '.15s' }}>
          <div className="feature__icon">💬</div>
          <h3>Acompañamiento</h3>
          <p className="muted">
            Te guiamos en cada paso para que tomes la mejor decisión.
          </p>
        </article>
      </section>
    </main>
  );
}

export default Home;
