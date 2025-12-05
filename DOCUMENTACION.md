# 📚 DOCUMENTACIÓN TÉCNICA - CreditSmart

**Estudiantes:** William Garcia Leonel y José David Osorio Gallego  
**Programa:** Desarrollo de Software  
**Curso:** Ingeniería Web I  
**Universidad:** IUDigital De Antioquia  
**Fecha:** Noviembre 2025

---

## 📋 Tabla de Contenidos

1. [Descripción Detallada del Proyecto](#descripción-detallada-del-proyecto)
2. [Características Principales](#características-principales)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Cumplimiento de la Rúbrica](#cumplimiento-de-la-rúbrica)
5. [Arquitectura y Diseño](#arquitectura-y-diseño)
6. [Guías Técnicas](#guías-técnicas)
7. [Conceptos Implementados](#conceptos-implementados)
8. [Aprendizajes y Reflexión](#aprendizajes-y-reflexión)

---

## 🎯 Descripción Detallada del Proyecto

### Propósito General

**CreditSmart** es una **Single Page Application (SPA)** desarrollada con **React 18** que revoluciona la forma en que los usuarios exploran, simulan y solicitan productos crediticios financieros. El proyecto es el resultado de la migración exitosa de una aplicación web estática (HTML/CSS/JavaScript) a una arquitectura moderna basada en componentes React con estado reactivo.

### Contexto Académico

Este proyecto representa la **Evaluación EA2** de la asignatura **Ingeniería Web I**, que requería:
- Transformar un diseño estático a una **SPA funcional**
- Implementar **componentes reutilizables**
- Usar **hooks de React** (useState, useEffect)
- Crear **formularios controlados** con validaciones
- Integrar **React Router** para navegación
- Demostrar **manipulación avanzada de arrays** en JavaScript
- Implementar **cálculos matemáticos** en tiempo real

---

## ✨ Características Principales

### 1. 🏠 Página de Inicio (Home)

#### Descripción
Página principal que presenta la aplicación con un hero section atractivo y un catálogo completo de productos crediticios.

#### Funcionalidades
- **Hero Section Dinámico**
  - Imagen de fondo responsiva
  - Títulos y descripciones con animación
  - Llamados a la acción (CTA) con enlaces directos al simulador
  
- **Catálogo de Créditos**
  - 6 productos diferentes renderizados dinámicamente desde `creditsData.js`
  - Componente `CreditCard` reutilizable
  - Grid responsive (1-3 columnas según pantalla)
  - Efectos hover con transiciones suaves

#### Productos Disponibles
1. **Crédito Vivienda** - Financia tu hogar (12.8% anual)
2. **Crédito Educativo** - Invierte en tu educación (14.2% anual)
3. **Crédito Vehículo** - Financia tu transporte (15.5% anual)
4. **Crédito Libre** - Úsalo en lo que necesites (16.9% anual)
5. **Crédito Empresarial** - Crece tu negocio (18.0% anual)
6. **Crédito Consumo** - Para tus compras (22.4% anual)

#### Código Relevante
```jsx
// src/pages/Home.jsx
function Home() {
  return (
    <div>
      <section className="hero">
        {/* Contenido del hero */}
      </section>
      <section className="section">
        <div className="grid">
          {creditsData.map((credit) => (
            <CreditCard key={credit.id} credit={credit} />
          ))}
        </div>
      </section>
    </div>
  );
}
```

---

### 2. 🔍 Simulador de Créditos

#### Descripción
Herramienta interactiva que permite filtrar y buscar productos crediticios con lógica avanzada de superposición de filtros.

#### Funcionalidades Principales

##### a) Búsqueda en Tiempo Real
- Búsqueda case-insensitive
- Actualiza resultados mientras escribes
- Busca por nombre exacto del crédito

**Código:**
```javascript
// Búsqueda
const searchResults = creditsData.filter(credit => 
  credit.name.toLowerCase().includes(searchTerm.toLowerCase())
);
```

##### b) Sistema de Filtros por Rango de Monto
Cinco opciones de rango:
- **Hasta $5M** → Créditos con mínimo ≤ $5M
- **$5M - $20M** → Créditos con rango en este intervalo
- **$20M - $50M** → Créditos con rango en este intervalo
- **Más de $50M** → Créditos con máximo ≥ $50M
- **Todos** → Sin filtro (por defecto)

**Lógica de Superposición:**
```javascript
// Cada crédito se incluye si:
// 1. Su mínimo cae en el rango, O
// 2. Su máximo cae en el rango, O
// 3. Su rango engloba completamente al filtro

const isInRange = (credit, min, max) => {
  return (credit.min >= min && credit.min <= max) ||
         (credit.max >= min && credit.max <= max) ||
         (credit.min <= min && credit.max >= max);
};
```

##### c) Filtrado Combinado
- Usa búsqueda Y rango simultáneamente
- Orden: Primero busca, luego filtra por rango
- Botón "Limpiar filtros" reinicia todo

##### d) Preselección desde URL
- Parámetro query: `?producto=vivienda`
- Preselecciona el producto automáticamente
- Útil para enlaces profundos desde el home

**Código:**
```javascript
const [searchParams] = useSearchParams();
const productoParam = searchParams.get('producto');

useEffect(() => {
  if (productoParam) {
    setSearchTerm(productoParam);
  }
}, [productoParam]);
```

##### e) Feedback Visual
- Mensaje "No hay créditos disponibles" si no hay resultados
- Contador dinámico de resultados
- Efecto visual en tarjetas seleccionadas

#### Pantalla de Simulador
```
┌─────────────────────────────────────┐
│  BUSCADOR                           │
│  [ Escriba el nombre del crédito ]  │
├─────────────────────────────────────┤
│  FILTROS POR MONTO                  │
│  ○ Todos  ○ Hasta $5M  ○ $5M-$20M   │
│  ○ $20M-$50M  ○ Más de $50M         │
├─────────────────────────────────────┤
│  RESULTADOS (3 coincidencias)       │
│  ┌──────────┬──────────┬──────────┐ │
│  │ Tarjeta1 │ Tarjeta2 │ Tarjeta3 │ │
│  └──────────┴──────────┴──────────┘ │
└─────────────────────────────────────┘
```

---

### 3. 📝 Formulario de Solicitud de Crédito

#### Descripción
Formulario complejo con validaciones progresivas, formateo automático de moneda y cálculo dinámico de cuota mensual.

#### 11 Campos Controlados

1. **Nombre Completo** (texto)
   - Obligatorio
   - Mínimo 5 caracteres
   - Solo letras y espacios

2. **Cédula/ID** (número)
   - Obligatorio
   - Formato: 12345678 (8-10 dígitos)
   - Validación de dígitos únicos

3. **Email** (email)
   - Obligatorio
   - Validación de formato
   - Expresión regular: `/^[^@]+@[^@]+\.[^@]+$/`

4. **Teléfono** (número)
   - Obligatorio
   - 10 dígitos (Colombia)
   - Formato: 3001234567

5. **Tipo de Crédito** (select)
   - Obligatorio
   - 6 opciones disponibles
   - Determina min/max monto

6. **Monto Solicitado** ($)
   - Obligatorio
   - Rango dinámico según producto
   - Formateo automático (ej: $10.000.000)
   - Validación: min ≤ monto ≤ max

7. **Plazo (Meses)** (número)
   - Obligatorio
   - 1 a termMax según producto
   - Ajusta automáticamente cuota

8. **Ingresos Mensuales** ($)
   - Obligatorio
   - Validación: ≥ (cuota × 3)
   - Garantiza capacidad de pago

9. **Ocupación** (texto)
   - Obligatorio
   - Mínimo 3 caracteres

10. **Dirección** (textarea)
    - Obligatorio
    - Mínimo 10 caracteres

11. **Aceptación de Términos** (checkbox)
    - Obligatorio (debe estar checked)

#### Sistema de Validación Progresiva

**3 Niveles de Validación:**

```javascript
// Nivel 1: onBlur (cuando pierden el foco)
const handleBlur = (e) => {
  const { name } = e.target;
  setTouched(prev => ({ ...prev, [name]: true }));
  validateField(name, formData[name]);
};

// Nivel 2: onChange (si ya fue visitado)
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  
  if (touched[name]) {
    validateField(name, value);
  }
};

// Nivel 3: onSubmit (validación final)
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Validar todos los campos
  const newErrors = {};
  Object.keys(formData).forEach(key => {
    validateField(key, formData[key], newErrors);
  });
  
  if (Object.keys(newErrors).length === 0) {
    // Enviar formulario
  }
};
```

#### Formateo de Moneda en Tiempo Real

```javascript
// Formateo automático mientras escribes
const formatMoneyInput = (value) => {
  // Remover caracteres no numéricos
  const numericValue = value.replace(/[^0-9]/g, '');
  
  // Si está vacío, devolver vacío
  if (numericValue === '') return '';
  
  // Separar con puntos cada 3 dígitos
  const formatted = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericValue);
  
  return formatted;
};

// Ejemplo: usuario escribe "10000000" → se ve "$10.000.000"
```

#### Cálculo Automático de Cuota

```javascript
// Se recalcula cuando cambian:
// - Monto solicitado
// - Tasa de interés (según producto)
// - Plazo en meses

useEffect(() => {
  const monto = parseFloat(formData.montoSolicitado.replace(/[^0-9]/g, '')) || 0;
  const producto = creditsData.find(c => c.name === formData.tipoCredito);
  const plazo = parseInt(formData.plazo) || 0;
  
  if (monto && producto && plazo) {
    const cuota = calculateMonthlyPayment(
      monto,
      producto.rate,
      plazo
    );
    setMonthlyPayment(cuota);
  }
}, [formData.montoSolicitado, formData.tipoCredito, formData.plazo]);
```

#### Validación Contextual

El monto mínimo y máximo cambian dinámicamente según el tipo de crédito:

```javascript
// Código de validación contextual
const validateMonto = (value) => {
  const credito = creditsData.find(c => c.name === formData.tipoCredito);
  const monto = parseFloat(value.replace(/[^0-9]/g, '')) || 0;
  
  if (!credito) {
    return 'Selecciona un tipo de crédito primero';
  }
  
  if (monto < credito.min) {
    return `Monto mínimo: $${credito.min.toLocaleString('es-CO')}`;
  }
  
  if (monto > credito.max) {
    return `Monto máximo: $${credito.max.toLocaleString('es-CO')}`;
  }
  
  return '';
};
```

#### Modal de Confirmación

Cuando el formulario se envía exitosamente, aparece un modal mostrando:
- ✅ Confirmación de envío
- 📋 Resumen de datos
- 🔔 Número de referencia
- ⏱️ Mensaje de "En procesamiento"

---

## 📁 Estructura del Proyecto

### Organización de Carpetas

```
creditsmart-react/
│
├── public/                          # Assets estáticos (servidos directamente)
│   ├── img/                         # Imágenes de productos
│   │   ├── credit-consumo.png       # 400x300px
│   │   ├── credit-educativo.png
│   │   ├── credit-empresarial.png
│   │   ├── credit-libre.png
│   │   ├── credit-vehiculo.png
│   │   ├── credit-vivienda.jpg
│   │   ├── hero_image.jpg           # 1200x400px
│   │   ├── logo.png                 # 28x28px (navbar)
│   │   ├── Screenshot_1.png         # Captura Home
│   │   ├── Screenshot_2.png         # Captura Simulador
│   │   ├── Screenshot_2_1.png       # Captura Simulador (filtro)
│   │   ├── Screenshot_3.png         # Captura Formulario
│   │   ├── Screenshot_3_1.png       # Captura Formulario (validación)
│   │   └── Screenshot_3_2.png       # Captura Formulario (modal)
│   └── logo.svg                     # Logo alternativo
│
├── src/                             # Código fuente
│   │
│   ├── components/                  # Componentes reutilizables
│   │   ├── Navbar.jsx               # Barra de navegación
│   │   │   ├── Navegación
│   │   │   ├── Logo + marca
│   │   │   ├── Tema claro/oscuro
│   │   │   ├── Menú hamburguesa
│   │   │   └── Enlaces activos (highlighting)
│   │   │
│   │   ├── Footer.jsx               # Pie de página
│   │   │   ├── Copyright dinámico
│   │   │   └── Año automático
│   │   │
│   │   └── CreditCard.jsx           # Tarjeta de crédito reutilizable
│   │       ├── Imagen del producto
│   │       ├── Nombre y descripción
│   │       ├── Información (tasa, monto, plazo)
│   │       ├── Botones de acción
│   │       └── Props: credit (objeto)
│   │
│   ├── pages/                       # Páginas/Vistas principales
│   │   ├── Home.jsx                 # Página de inicio
│   │   │   ├── Hero section
│   │   │   └── Catálogo de créditos
│   │   │
│   │   ├── Simulator.jsx            # Simulador de créditos
│   │   │   ├── Buscador
│   │   │   ├── Filtros por rango
│   │   │   ├── Resultados dinámicos
│   │   │   └── Lógica de superposición
│   │   │
│   │   └── RequestCredit.jsx        # Formulario de solicitud
│   │       ├── 11 campos controlados
│   │       ├── Validaciones progresivas
│   │       ├── Formateo de moneda
│   │       ├── Cálculo de cuota
│   │       └── Modal de confirmación
│   │
│   ├── data/                        # Datos y utilidades
│   │   └── creditsData.js           # Array de créditos + helpers
│   │       ├── export default creditsData[] (6 créditos)
│   │       ├── formatMoney()        # Formatea números a COP
│   │       ├── formatRate()         # Formatea porcentajes
│   │       ├── calculateMonthlyPayment()  # Cálculo de cuota
│   │       └── formatMoneyInput()   # Formateo en tiempo real
│   │
│   ├── App.jsx                      # Componente raíz
│   │   ├── Router setup (BrowserRouter)
│   │   ├── Routes (/, /simulador, /solicitar)
│   │   ├── Navbar y Footer envolventes
│   │   └── Estilos globales
│   │
│   ├── App.css                      # Estilos globales
│   │   ├── Variables CSS (colores, sombras)
│   │   ├── Tema claro/oscuro
│   │   ├── Componentes (card, btn, input)
│   │   ├── Layouts (grid, hero)
│   │   └── Media queries (responsive)
│   │
│   ├── index.css                    # Reset CSS y fuentes
│   │   ├── Importación de fuentes (Manrope)
│   │   ├── Reset de márgenes
│   │   └── Estilos base
│   │
│   └── main.jsx                     # Punto de entrada de React
│       └── Monta la app en #root
│
├── package.json                     # Configuración de npm
│   ├── name: "creditsmart-react"
│   ├── version: "0.0.0"
│   ├── type: "module"
│   ├── scripts:
│   │   ├── dev: "vite"
│   │   ├── build: "vite build"
│   │   └── preview: "vite preview"
│   └── dependencies:
│       ├── react: "^18.x"
│       ├── react-dom: "^18.x"
│       └── react-router-dom: "^6.x"
│
├── vite.config.js                   # Configuración de Vite
│   ├── React plugin
│   ├── Servidor dev (puerto 5173)
│   └── Optimizaciones de build
│
├── .gitignore                       # Archivos ignorados por Git
│   ├── node_modules/
│   ├── dist/
│   └── .env.local
│
├── README.md                        # Este archivo (resumen ejecutivo)
└── DOCUMENTACION.md                 # Documentación técnica completa
```

### Dependencias del Proyecto

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.24.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^5.3.1"
  }
}
```

---

### 1. ✅ Configuración y Estructura de React 

**Criterios cumplidos:**

- ✅ Proyecto creado con **Vite** (herramienta moderna)
- ✅ Estructura de carpetas organizada (`components/`, `pages/`, `data/`)
- ✅ **React Router** configurado con 3 rutas principales
- ✅ Componentes en archivos separados (PascalCase)
- ✅ `App.jsx` como componente raíz
- ✅ Navbar y Footer persistentes en todas las páginas
- ✅ Archivo `index.html` correcto
- ✅ Estilos importados correctamente

**Ejemplo de estructura de routing:**
```jsx
// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Simulator from './pages/Simulator';
import RequestCredit from './pages/RequestCredit';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulador" element={<Simulator />} />
        <Route path="/solicitar" element={<RequestCredit />} />
      </Routes>
      <Footer />
    </Router>
  );
}
```

---

### 2. ✅ Componentes y Props 

**Criterios cumplidos:**

- ✅ Componentes funcionales (no clases)
- ✅ Props claramente definidas
- ✅ Desestructuración de props
- ✅ Un componente por archivo
- ✅ `CreditCard.jsx` reutilizable

**Ejemplo de componente reutilizable:**
```jsx
// src/components/CreditCard.jsx
/**
 * Componente reutilizable para mostrar una tarjeta de crédito
 * @component
 * @param {Object} props.credit - Objeto con datos del crédito
 * @param {string} props.credit.id - ID único
 * @param {string} props.credit.name - Nombre del producto
 * @param {string} props.credit.desc - Descripción
 * @param {string} props.credit.icon - Nombre del archivo de imagen
 * @param {number} props.credit.rate - Tasa anual (decimal)
 * @param {number} props.credit.min - Monto mínimo
 * @param {number} props.credit.max - Monto máximo
 * @param {number} props.credit.termMax - Plazo máximo (meses)
 */
function CreditCard({ credit }) {
  const { id, name, desc, icon, rate, min, max, termMax } = credit;
  
  return (
    <article className="card">
      <div className="card__media">
        <img src={`/img/${icon}`} alt={name} />
      </div>
      <div className="card__body">
        <h3 className="card__title">{name}</h3>
        <p className="card__desc">{desc}</p>
        <ul className="meta">
          <li><span className="tag">Tasa</span> {formatRate(rate)}</li>
          <li><span className="tag">Monto</span> {formatMoney(min)} – {formatMoney(max)}</li>
          <li><span className="tag">Plazo</span> hasta {termMax} meses</li>
        </ul>
      </div>
    </article>
  );
}

export default CreditCard;
```

---

### 3. ✅ Manejo de Estado con useState 

**10 Estados Diferentes Implementados:**

```javascript
// En Navbar.jsx
const [theme, setTheme] = useState('light');           // Estado 1
const [menuOpen, setMenuOpen] = useState(false);        // Estado 2

// En Simulator.jsx
const [searchTerm, setSearchTerm] = useState('');       // Estado 3
const [activeRange, setActiveRange] = useState('all');  // Estado 4
const [filteredCredits, setFilteredCredits] = useState([]); // Estado 5

// En RequestCredit.jsx
const [formData, setFormData] = useState({...});        // Estado 6
const [errors, setErrors] = useState({});              // Estado 7
const [touched, setTouched] = useState({});             // Estado 8
const [monthlyPayment, setMonthlyPayment] = useState(0); // Estado 9
const [showModal, setShowModal] = useState(false);      // Estado 10
```

**Criterios cumplidos:**

- ✅ Estados inicializados correctamente
- ✅ Nombres descriptivos y significativos
- ✅ Actualización inmutable (nunca mutación directa)
- ✅ Actualización correcta con spread operator
- ✅ 10 estados distribuidos en diferentes componentes

---

### 4. ✅ Búsqueda y Filtros Dinámicos 

**Sistema completo de búsqueda y filtros:**

```javascript
// src/pages/Simulator.jsx

// Estado para búsqueda
const [searchTerm, setSearchTerm] = useState('');

// Estado para filtro de rango
const [activeRange, setActiveRange] = useState('all');

// Estado para resultados filtrados
const [filteredCredits, setFilteredCredits] = useState([]);

// useEffect que ejecuta filtrado cuando cambian dependencias
useEffect(() => {
  let results = [...creditsData];
  
  // PASO 1: Filtrar por búsqueda
  if (searchTerm.trim()) {
    results = results.filter(credit => 
      credit.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // PASO 2: Filtrar por rango
  if (activeRange !== 'all') {
    const ranges = {
      '0-5': [0, 5000000],
      '5-20': [5000000, 20000000],
      '20-50': [20000000, 50000000],
      '50+': [50000000, Infinity]
    };
    
    const [min, max] = ranges[activeRange];
    
    results = results.filter(credit => {
      return (credit.min >= min && credit.min <= max) ||
             (credit.max >= min && credit.max <= max) ||
             (credit.min <= min && credit.max >= max);
    });
  }
  
  // PASO 3: Actualizar resultados
  setFilteredCredits(results);
  
}, [searchTerm, activeRange]); // Dependencias
```

**Características implementadas:**

- ✅ **5 filtros dinámicos** por rango
- ✅ **Búsqueda case-insensitive** en tiempo real
- ✅ **Filtrado combinado** (búsqueda Y rango)
- ✅ **Superposición de rangos** (3 condiciones lógicas)
- ✅ **Preselección desde URL** (?producto=vivienda)
- ✅ **Botón "Limpiar filtros"**
- ✅ **Mensaje cuando no hay resultados**
- ✅ **Renderizado dinámico** de tarjetas

---

### 5. ✅ Formulario Controlado 

**11 Campos 100% Controlados:**

```javascript
// Estructura de formData
const [formData, setFormData] = useState({
  nombre: '',                    // Campo 1
  cedula: '',                    // Campo 2
  email: '',                     // Campo 3
  telefono: '',                  // Campo 4
  tipoCredito: '',               // Campo 5
  montoSolicitado: '',           // Campo 6
  plazo: '',                     // Campo 7
  ingresosMenuales: '',          // Campo 8
  ocupacion: '',                 // Campo 9
  direccion: '',                 // Campo 10
  aceptaTerminos: false          // Campo 11
});
```

**Validaciones Implementadas:**

```javascript
// 9 tipos de validaciones

const validateField = (name, value) => {
  const newErrors = { ...errors };
  
  switch(name) {
    case 'nombre':
      if (!value.trim()) {
        newErrors.nombre = 'El nombre es obligatorio';
      } else if (value.trim().length < 5) {
        newErrors.nombre = 'El nombre debe tener mínimo 5 caracteres';
      } else if (!/^[a-zA-Zá-ýÁ-Ý\s]+$/.test(value)) {
        newErrors.nombre = 'Solo se permiten letras y espacios';
      } else {
        delete newErrors.nombre;
      }
      break;
      
    case 'cedula':
      if (!value.trim()) {
        newErrors.cedula = 'La cédula es obligatoria';
      } else if (!/^\d{8,10}$/.test(value)) {
        newErrors.cedula = 'Cédula debe tener 8-10 dígitos';
      } else {
        delete newErrors.cedula;
      }
      break;
      
    case 'email':
      if (!value.trim()) {
        newErrors.email = 'El email es obligatorio';
      } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) {
        newErrors.email = 'Email inválido';
      } else {
        delete newErrors.email;
      }
      break;
      
    case 'montoSolicitado':
      const credito = creditsData.find(c => c.name === formData.tipoCredito);
      const monto = parseFloat(value.replace(/[^0-9]/g, '')) || 0;
      if (monto < credito.min) {
        newErrors.montoSolicitado = `Mínimo: $${credito.min.toLocaleString()}`;
      } else if (monto > credito.max) {
        newErrors.montoSolicitado = `Máximo: $${credito.max.toLocaleString()}`;
      } else {
        delete newErrors.montoSolicitado;
      }
      break;
      
    // Más validaciones...
  }
  
  setErrors(newErrors);
};
```

**Criterios cumplidos:**

- ✅ **11 campos controlados** (cada cambio actualiza estado)
- ✅ **3 niveles de validación** (onBlur, onChange, onSubmit)
- ✅ **Sistema de touched** (muestra errores solo en campos visitados)
- ✅ **9 tipos de validación diferentes**
- ✅ **Formateo automático de moneda**
- ✅ **Validación contextual** (min/max según producto)
- ✅ **Feedback visual** (estilos de error)
- ✅ **Prevención de envío** si hay errores

---

### 6. ✅ Manipulación de Arrays 

**13 Operaciones de Arrays:**

```javascript
// .map() - 5 usos
creditsData.map(credit => <CreditCard key={credit.id} credit={credit} />) // Home
filteredCredits.map(credit => <CreditCard key={credit.id} credit={credit} />) // Simulator
Object.keys(newErrors).map(key => ...) // Validación

// .filter() - 3 usos
searchResults = creditsData.filter(c => c.name.toLowerCase().includes(...)) // Búsqueda
results.filter(c => isInRange(c, min, max)) // Filtro por rango
Object.entries(formData).filter(([key]) => key !== 'aceptaTerminos') // Datos para modal

// .find() - 2 usos
creditsData.find(c => c.name === formData.tipoCredito) // Obtener producto
creditsData.find(c => c.id === productoParam) // Buscar por ID

// Otros métodos
.split('-').map(Number) // Convertir rango de string a números
.replace(/[^0-9]/g, '') // Limpiar caracteres no numéricos
.toLocaleString('es-CO') // Formatear número
```

**Criterios cumplidos:**

- ✅ **.map() x5** - Renderizado dinámico de listas
- ✅ **.filter() x3** - Búsqueda y filtrado
- ✅ **.find() x2** - Búsqueda de elementos
- ✅ **.split() y .map()** - Conversión de tipos
- ✅ Siempre con **key única** en listas
- ✅ **Funciones puras** (sin mutación)

---

### 7. ✅ Cálculo de Cuota Mensual 

**Fórmula de Amortización Francesa (Sistema Alemán):**

```javascript
/**
 * Calcula la cuota mensual usando la fórmula de amortización francesa
 * 
 * Fórmula: C = P × [i(1+i)^n] / [(1+i)^n - 1]
 * 
 * Donde:
 * C = Cuota mensual
 * P = Principal (monto)
 * i = Tasa de interés mensual
 * n = Número de cuotas
 * 
 * @param {number} amount - Monto en COP
 * @param {number} annualRate - Tasa anual (ej: 0.155 para 15.5%)
 * @param {number} months - Plazo en meses
 * @returns {number} Cuota mensual redondeada
 */
export const calculateMonthlyPayment = (amount, annualRate, months) => {
  // Validar entrada
  if (!amount || !months || amount <= 0 || months <= 0) {
    return 0;
  }
  
  // Convertir tasa anual a mensual
  const monthlyRate = annualRate / 12;
  
  // Aplicar fórmula
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  
  const payment = amount * (numerator / denominator);
  
  // Redondear a pesos enteros
  return Math.round(payment);
};
```

**Ejemplos Prácticos:**

| Producto | Monto | Tasa | Plazo | Cuota Mensual |
|----------|-------|------|-------|---------------|
| Vivienda | $100M | 12.8% | 120 | $1.164.825 |
| Educativo | $5M | 14.2% | 24 | $239.088 |
| Vehículo | $10M | 15.5% | 36 | $348.237 |
| Libre | $3M | 16.9% | 12 | $273.384 |
| Empresarial | $50M | 18.0% | 60 | $1.267.427 |
| Consumo | $2M | 22.4% | 12 | $186.733 |

**Actualización Automática:**

```javascript
// Se recalcula cada vez que cambian estas dependencias
useEffect(() => {
  const monto = parseFloat(formData.montoSolicitado.replace(/[^0-9]/g, '')) || 0;
  const producto = creditsData.find(c => c.name === formData.tipoCredito);
  const plazo = parseInt(formData.plazo) || 0;
  
  if (monto && producto && plazo) {
    const cuota = calculateMonthlyPayment(
      monto,
      producto.rate,
      plazo
    );
    setMonthlyPayment(cuota);
  }
}, [formData.montoSolicitado, formData.tipoCredito, formData.plazo]);
```

**Criterios cumplidos:**

- ✅ **Fórmula correcta** de amortización
- ✅ **Cálculo automático** al cambiar inputs
- ✅ **Redondeo adecuado** a pesos enteros
- ✅ **Validación** de entrada
- ✅ **Integración en formulario**
- ✅ **Conversión** de tasa anual a mensual

---

## 🏗️ Arquitectura y Diseño

### Patrón de Arquitectura

```
┌─────────────────────────────────────────────────────┐
│                    App.jsx                          │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐                  ┌──────────────┐ │
│  │    Navbar    │  Layout Envolvente│    Footer   │ │
│  └──────────────┘                  └──────────────┘ │
│         │                                     │     │
│  ┌──────┴────────┬──────────────┬─────────────┴──┐  │
│  │               │              │                │  │
│  ▼               ▼              ▼                ▼  │
│ Home         Simulator      RequestCredit     [Otros]
│  │               │              │                   │  
│  ├─CreditCard    ├─Search       ├─Inputs            │   
│  ├─CreditCard    ├─Filters      ├─Validation        │
│  └─CreditCard    ├─Results      ├─Calculate         │
│                  └─[6 tarjetas]  └─Modal            │
│                                                     │
└──────────────────────────────────────────────────--─┘ 
                        │
            ┌───────────┴───────────┐
            │                       │
            ▼                       ▼
       creditsData.js          localStorage
       (Array estático)        (Tema persistente)
```

### Flujo de Datos

```javascript
// Datos fluyen hacia abajo (parent → child)
// Eventos fluyen hacia arriba (child → parent)

App
├── Navbar
│   ├── Logo
│   ├── Links
│   └── ThemeToggle
│       └── setTheme (state en Navbar)
│           └── guardado en localStorage
│
├── Router
│   ├── Home
│   │   └── creditsData.map(credit => 
│   │       <CreditCard credit={credit} />)
│   │
│   ├── Simulator
│   │   ├── [searchTerm, setSearchTerm]
│   │   ├── [activeRange, setActiveRange]
│   │   ├── SearchInput
│   │   │   └── onChange → setSearchTerm
│   │   ├── RangeFilters
│   │   │   └── onClick → setActiveRange
│   │   └── filteredCredits.map(credit => 
│   │       <CreditCard credit={credit} />)
│   │
│   └── RequestCredit
│       ├── [formData, setFormData]
│       ├── [errors, setErrors]
│       ├── [touched, setTouched]
│       ├── [monthlyPayment, setMonthlyPayment]
│       ├── Input (nombre)
│       │   ├── onChange → handleChange
│       │   └── onBlur → handleBlur
│       ├── Input (cedula)
│       │   └── [similar]
│       ├── Select (tipoCredito)
│       │   └── onChange → setFormData + calculateCuota
│       ├── [... 8 campos más]
│       └── Submit → handleSubmit
│           └── showModal = true
│
└── Footer
```

---

## 📖 Guías Técnicas

### Guía 1: Cómo Agregar un Nuevo Tipo de Crédito

**Paso 1: Agregar a creditsData.js**
```javascript
{
  id: 'nuevo-credito',
  name: 'Crédito Nuevo',
  desc: 'Descripción del nuevo crédito',
  icon: 'credit-nuevo.png',
  rate: 0.175,          // 17.5% anual
  min: 1000000,         // $1M mínimo
  max: 200000000,       // $200M máximo
  termMax: 84           // 84 meses máximo
}
```

**Paso 2: Agregar imagen**
- Copiar imagen PNG a `public/img/credit-nuevo.png`
- Dimensión recomendada: 400x300px

**Paso 3: Probar**
- El producto aparecerá automáticamente en Home
- Será filtrable en Simulator
- Aparecerá en el select de RequestCredit

---

### Guía 2: Cómo Cambiar Colores de la Aplicación

**Archivo: src/App.css**

```css
:root{
  /* Tema Claro */
  --bg: #F9FBFA;              /* Fondo principal */
  --text: #0A1F1A;            /* Texto principal */
  --primary: #10B981;         /* Color primario (botones) */
  --teal: #14B8A6;            /* Color secundario */
  --aqua: #2DD4BF;            /* Acento */
}

html[data-theme="dark"]{
  /* Tema Oscuro */
  --bg: #0C1512;
  --text: #E7F6EF;
  --primary: #34D399;         /* Más claro en dark mode */
  --teal: #2DD4BF;
}
```

**Cambiar color primario:**
```css
/* De verde a azul */
--primary: #3B82F6;           /* Azul */
--teal: #06B6D4;              /* Cian */
--aqua: #0EA5E9;              /* Azul claro */
```

---

### Guía 3: Cómo Agregar Validación Personalizada

```javascript
// En RequestCredit.jsx

case 'apellido':
  if (!value.trim()) {
    newErrors.apellido = 'El apellido es obligatorio';
  } else if (value.trim().length < 3) {
    newErrors.apellido = 'Mínimo 3 caracteres';
  } else if (!/^[a-zA-Z\s-]+$/.test(value)) {
    newErrors.apellido = 'Solo letras, espacios y guiones';
  } else {
    delete newErrors.apellido;
  }
  break;
```

---

### Guía 4: Cómo Extender los Filtros del Simulador

```javascript
// Agregar nuevo rango en Simulator.jsx

const ranges = {
  '0-5': [0, 5000000],
  '5-20': [5000000, 20000000],
  '20-50': [20000000, 50000000],
  '50-100': [50000000, 100000000],  // NUEVO RANGO
  '100+': [100000000, Infinity]      // NUEVO RANGO
};
```

---

## 🛠️ Conceptos Implementados

### React Hooks Utilizados

#### 1. **useState** (10 usos)
```javascript
const [state, setState] = useState(initialValue);
```
Manejo de estado local en componentes funcionales.

#### 2. **useEffect** (4 usos)
```javascript
useEffect(() => {
  // Código cuando cambian las dependencias
}, [dependencias]);
```
Efectos secundarios (sincronización, cálculos automáticos).

#### 3. **useLocation** (1 uso)
```javascript
const location = useLocation();
// Detecta cambios de ruta
```
Usado en Navbar para resaltar link activo.

#### 4. **useSearchParams** (1 uso)
```javascript
const [params] = useSearchParams();
const producto = params.get('producto');
```
Lee parámetros de URL en Simulator.

#### 5. **useNavigate** (1 uso)
```javascript
const navigate = useNavigate();
navigate('/simulador?producto=vivienda');
```
Navegación programática.

### Métodos de Array

| Método | Usos | Ejemplo |
|--------|------|---------|
| **.map()** | 5 | `creditsData.map(c => <Card c={c} />)` |
| **.filter()** | 3 | `results.filter(c => c.rate < 0.20)` |
| **.find()** | 2 | `creditsData.find(c => c.id === 'vivienda')` |
| **.split()** | 1 | `'20-50'.split('-').map(Number)` |
| **.replace()** | 2 | `'$10.000.000'.replace(/[^0-9]/g, '')` |
| **.toLocaleString()** | 3 | `1000000.toLocaleString('es-CO')` |

### Patrones de Diseño

#### 1. Componentes Controlados (Controlled Components)
```javascript
// Input controlado por React state
<input 
  value={formData.nombre}
  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
/>
```

#### 2. Lifting State Up
```javascript
// Estado en App.jsx compartido con múltiples componentes
<BrowserRouter>
  <Navbar />
  <Routes>{/* ... */}</Routes>
</BrowserRouter>
```

#### 3. Composición sobre Herencia
```javascript
// CreditCard es pequeño y reutilizable
// Home y Simulator lo componen para diferentes propósitos
```

#### 4. Immutability
```javascript
// Nunca mutamos directamente
setFormData(prev => ({ ...prev, nombre: 'nuevo' }));
setErrors(prev => ({ ...prev, cedula: 'error' }));
```

---

## Aprendizajes 

### Habilidades Técnicas Desarrolladas

#### 1. **React Avanzado**
- Comprensión profunda de hooks
- Manejo de estado complejo
- Optimización de renderizados
- Componentes reutilizables

#### 2. **JavaScript Moderno**
- ES6+ (arrow functions, destructuring, spread operator)
- Métodos de array funcionales
- Expresiones regulares
- APIs como Intl.NumberFormat

#### 3. **Validación y Seguridad**
- Validaciones progresivas (3 niveles)
- Prevención de inyección
- Sanitización de entrada
- Feedback visual

#### 4. **Diseño Responsive**
- Mobile-first
- Media queries
- Grid y flexbox
- Proporciones adaptables

#### 5. **Arquitectura de Software**
- Separación de responsabilidades
- Componentes modulares
- Flujo de datos unidireccional
- Patrón SPA (Single Page Application)


### Reflexión Final

Este proyecto ha demostrado que es posible transformar una aplicación web estática en una **SPA moderna y profesional** usando React. Los principios aprendidos:

1. **Componentes pequeños y reutilizables** son más mantenibles
2. **Estado centralizado y flujo de datos claro** evita bugs
3. **Validaciones en múltiples niveles** mejoran UX
4. **Código limpio y comentado** facilita colaboración
5. **Testing mental durante desarrollo** previene errores

---

##  Soporte y Preguntas

Para dudas sobre implementación técnica, consultar:
- Documentación oficial: https://react.dev
- React Router: https://reactrouter.com
- Vite: https://vitejs.dev
- MDN Web Docs: https://developer.mozilla.org/es/

---

**Documento generado:** Diciembre 2025

