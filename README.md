# CreditSmart - Aplicación React

**Estudiante:** [Tu Nombre Completo]  
**Programa:** [Tu Programa Académico]  
**Curso:** Desarrollo de Aplicaciones Web con React JS

## 📋 Descripción del Proyecto

CreditSmart es una aplicación web interactiva desarrollada en React que permite a los usuarios explorar, comparar y solicitar diferentes tipos de créditos financieros. La aplicación transforma el diseño estático original en una experiencia dinámica y funcional utilizando las mejores prácticas de React.

## 🚀 Tecnologías Utilizadas

- **React 18** - Librería de JavaScript para construir interfaces de usuario
- **Vite** - Herramienta de construcción rápida para proyectos modernos
- **React Router DOM v6** - Navegación entre páginas
- **JavaScript ES6+** - Programación moderna con hooks y componentes funcionales
- **CSS3** - Estilos modernos con variables CSS y modo oscuro
- **HTML5** - Estructura semántica

## ✨ Características Principales

### 🏠 Página de Inicio (Home)
- Hero section con llamados a la acción
- Catálogo completo de productos crediticios
- Features destacadas de la plataforma
- Diseño responsive y animaciones sutiles

### 🔍 Simulador
- **Búsqueda en tiempo real** por nombre de crédito
- **Filtros dinámicos** por rango de monto:
  - Hasta $5M
  - $5M - $20M
  - $20M - $50M
  - Más de $50M
- **Renderizado dinámico** con `.map()` y `.filter()`
- Integración con parámetros de URL (`?producto=`)
- Botón para limpiar filtros activos

### 📝 Solicitud de Crédito
- **Formulario 100% controlado** con `useState`
- **Validaciones en tiempo real**:
  - Email con formato válido
  - Cédula de 6-10 dígitos
  - Teléfono de 7-10 dígitos
  - Montos dentro del rango permitido
- **Cálculo automático de cuota mensual**
  - Fórmula de amortización financiera
  - Actualización dinámica al cambiar monto/plazo
  - Formato de moneda colombiano (COP)
- **Formateo automático** de campos monetarios
- Modal de confirmación con navegación
- Función de limpiar formulario

### 🎨 Funcionalidades Adicionales
- **Tema claro/oscuro** con persistencia en localStorage
- **Navegación sticky** con resaltado de sección activa
- **Menú responsive** para dispositivos móviles
- **Componentes reutilizables** (Navbar, Footer, CreditCard)
- **Animaciones y transiciones** suaves

## 📁 Estructura del Proyecto

```
creditsmart-react/
├── public/
│   ├── img/                    # Imágenes de productos y hero
│   └── logo.svg                # Logo de la aplicación
├── src/
│   ├── components/             # Componentes reutilizables
│   │   ├── Navbar.jsx         # Barra de navegación con tema
│   │   ├── Footer.jsx         # Pie de página
│   │   └── CreditCard.jsx     # Tarjeta de producto crediticio
│   ├── pages/                  # Páginas principales
│   │   ├── Home.jsx           # Página de inicio
│   │   ├── Simulator.jsx      # Simulador con filtros
│   │   └── RequestCredit.jsx  # Formulario de solicitud
│   ├── data/
│   │   └── creditsData.js     # Datos de créditos y utilidades
│   ├── App.jsx                 # Componente principal con routing
│   ├── App.css                 # Estilos globales
│   ├── index.css               # Reset y fuentes
│   └── main.jsx                # Punto de entrada
├── package.json                # Dependencias del proyecto
├── vite.config.js              # Configuración de Vite
├── .gitignore                  # Archivos ignorados por Git
└── README.md                   # Este archivo
```

## 🛠️ Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos para ejecutar el proyecto

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DE_TU_REPOSITORIO]
   cd creditsmart-react
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   - La aplicación estará disponible en `http://localhost:5173`

5. **Construir para producción**
   ```bash
   npm run build
   ```

6. **Previsualizar build de producción**
   ```bash
   npm run preview
   ```

## 🎯 Hooks de React Utilizados

- **useState** - Manejo de estado en todos los componentes
- **useEffect** - Efectos secundarios (tema, filtros, cálculos)
- **useLocation** - Obtener ruta actual (React Router)
- **useSearchParams** - Leer parámetros de URL (React Router)
- **useNavigate** - Navegación programática (React Router)

## 📊 Métodos de Arrays Implementados

- **.map()** - Renderizar listas de créditos y opciones
- **.filter()** - Filtrar créditos por búsqueda y rango
- **.find()** - Encontrar crédito específico
- **.split()** - Parsear rangos de filtros

## 🎨 Aspectos Técnicos Destacados

### Componentes Funcionales
Todos los componentes están implementados como funciones con hooks, siguiendo las mejores prácticas de React moderno.

### Props y Desestructuración
```javascript
function CreditCard({ credit }) {
  const { id, name, desc, icon, rate, min, max, termMax } = credit;
  // ...
}
```

### Formularios Controlados
```javascript
const [formData, setFormData] = useState({...});
<input value={formData.nombre} onChange={handleChange} />
```

### Validaciones en Tiempo Real
```javascript
const validateField = (name, value) => {
  // Validación específica por campo
};
```

### Cálculo de Cuota Mensual
```javascript
// Fórmula: Cuota = P * (i * (1 + i)^n) / ((1 + i)^n - 1)
export const calculateMonthlyPayment = (amount, annualRate, months) => {
  const monthlyRate = annualRate / 12;
  const payment = amount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                  (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(payment);
};
```

## 📸 Capturas de Pantalla

### Página de Inicio
![Home](./screenshots/home.png)

### Simulador con Filtros
![Simulador](./screenshots/simulator.png)

### Formulario de Solicitud
![Solicitud](./screenshots/request.png)

### Modo Oscuro
![Dark Mode](./screenshots/dark-mode.png)

## 🔄 Commits Realizados

```
✅ Configuración inicial de React con Vite
✅ Instalación de React Router DOM
✅ Creación de archivo creditsData.js con datos
✅ Componente Navbar con tema claro/oscuro
✅ Componente CreditCard reutilizable con props
✅ Página Home con hero y catálogo
✅ Página Simulator con búsqueda en tiempo real
✅ Filtros dinámicos por rango de monto
✅ Página RequestCredit con formulario controlado
✅ Validaciones en tiempo real implementadas
✅ Cálculo de cuota mensual funcionando
✅ Estilos responsive y modo oscuro actualizados
✅ Migración de imágenes y assets
✅ Documentación README completa
```

## 🌐 Deploy (Opcional)

El proyecto puede ser desplegado en:
- **Vercel** - `npm run build` + `vercel deploy`
- **Netlify** - Conectar repositorio o drag & drop carpeta `dist/`
- **GitHub Pages** - Configurar con `gh-pages`

## 📚 Recursos Consultados

- [Documentación oficial de React](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [Vite Documentation](https://vitejs.dev)

## 👨‍💻 Autor

**[Tu Nombre]**  
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@dominio.com

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos para la asignatura de Desarrollo de Aplicaciones Web con React JS.

---

⭐ **Nota:** Este proyecto demuestra el dominio de conceptos fundamentales de React incluyendo componentes funcionales, hooks, manejo de estado, manipulación de arrays, validaciones y formularios controlados.
