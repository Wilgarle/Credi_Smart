/**
 * Componente de pie de página global
 *
 * Muestra información de contacto, soporte legal, logo y redes sociales
 *
 * @component
 * @returns {JSX.Element} Pie de página completo
 *
 * @example
 * <Footer />
 */
function Footer() {
  // Obtener año actual dinámicamente
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo y Marca */}
          <div className="footer-brand">
            <img src="/img/logo.png" alt="CreditSmart" width="32" height="32" />
            <span>CreditSmart</span>
          </div>

          {/* Información de Contacto */}
          <div className="footer-contact">
            <h4>Contacto</h4>
            <p>📞 Teléfono: +57 300 123 4567</p>
            <p>✉️ Email: soporte@creditsmart.com</p>
          </div>

          {/* Soporte Legal */}
          <div className="footer-legal">
            <h4>Soporte Legal</h4>
            <a href="#terminos">Términos y Condiciones</a>
            <a href="#privacidad">Política de Privacidad</a>
            <a href="#seguridad">Seguridad de Datos</a>
          </div>

          {/* Redes Sociales */}
          <div className="footer-social">
            <h4>Síguenos</h4>
            <div className="social-links">
              <a href="https://facebook.com/creditsmart" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://twitter.com/creditsmart" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://instagram.com/creditsmart" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C8.396 0 7.996.014 6.79.067 5.584.12 4.775.302 4.084.605c-.713.309-1.317.905-1.626 1.618C2.15 2.925 1.968 3.734 1.915 4.94c-.053 1.206-.067 1.606-.067 5.227s.014 4.021.067 5.227c.053 1.206.235 2.015.528 2.706.309.713.905 1.317 1.618 1.626.691.293 1.5.475 2.706.528 1.206.053 1.606.067 5.227.067s4.021-.014 5.227-.067c1.206-.053 2.015-.235 2.706-.528.713-.309 1.317-.905 1.626-1.618.293-.691.475-1.5.528-2.706.053-1.206.067-1.606.067-5.227s-.014-4.021-.067-5.227c-.053-1.206-.235-2.015-.528-2.706C21.852.905 21.248.309 20.535 0c-.691-.293-1.5-.475-2.706-.528C15.623.014 15.223 0 12.017 0zm0 1.802c3.532 0 3.953.013 5.349.066 1.297.05 1.986.217 2.45.362.517.163.898.358 1.292.752.394.394.589.775.752 1.292.145.464.312 1.153.362 2.45.053 1.396.066 1.817.066 5.349s-.013 3.953-.066 5.349c-.05 1.297-.217 1.986-.362 2.45-.163.517-.358.898-.752 1.292-.394.394-.775.589-1.292.752-.464.145-1.153.312-2.45.362-1.396.053-1.817.066-5.349.066s-3.953-.013-5.349-.066c-1.297-.05-1.986-.217-2.45-.362-.517-.163-.898-.358-1.292-.752-.394-.394-.589-.775-.752-1.292-.145-.464-.312-1.153-.362-2.45-.053-1.396-.066-1.817-.066-5.349s.013-3.953.066-5.349c.05-1.297.217-1.986.362-2.45.163-.517.358-.898.752-1.292.394-.394.775-.589 1.292-.752.464-.145 1.153-.312 2.45-.362 1.396-.053 1.817-.066 5.349-.066zm0 3.534a6.483 6.483 0 100 12.966 6.483 6.483 0 000-12.966zm0 10.69a4.207 4.207 0 110-8.414 4.207 4.207 0 010 8.414zm6.406-11.845a1.517 1.517 0 11-3.034 0 1.517 1.517 0 013.034 0z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/creditsmart" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>© {currentYear} CreditSmart · IUDigital Solutions · Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
