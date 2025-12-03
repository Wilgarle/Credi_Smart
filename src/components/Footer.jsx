/**
 * Componente de pie de página global
 * 
 * Muestra información de copyright con el año actual dinámico
 * 
 * @component
 * @returns {JSX.Element} Pie de página con copyright
 * 
 * @example
 * <Footer />
 */
function Footer() {
  // Obtener año actual dinámicamente
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="container footer">
      <p>© {currentYear} CreditSmart · IUDigital Solutions</p>
    </footer>
  );
}

export default Footer;
