# Estructura del Proyecto CreditSmart React

## 📂 Organización de Carpetas

```
creditsmart-react/
│
├── public/                          # Archivos estáticos accesibles públicamente
│   ├── img/                        # Imágenes de productos y hero
│   │   ├── credit-consumo.png
│   │   ├── credit-educativo.png
│   │   ├── credit-empresarial.png
│   │   ├── credit-libre.png
│   │   ├── credit-vehiculo.png
│   │   ├── credit-vivienda.jpg
│   │   └── hero_image.jpg
│   └── logo.svg                    # Logo principal de la aplicación
│
├── src/                            # Código fuente de la aplicación
│   │
│   ├── components/                 # Componentes reutilizables
│   │   ├── Navbar.jsx             # Barra de navegación con routing activo
│   │   ├── Footer.jsx             # Pie de página
│   │   └── CreditCard.jsx         # Tarjeta de producto crediticio
│   │
│   ├── pages/                      # Páginas/Vistas principales
│   │   ├── Home.jsx               # Página de inicio (hero + catálogo)
│   │   ├── Simulator.jsx          # Simulador con filtros y búsqueda
│   │   └── RequestCredit.jsx      # Formulario de solicitud
│   │
│   ├── data/                       # Datos y funciones utilitarias
│   │   └── creditsData.js         # Array de créditos + helpers
│   │
│   ├── App.jsx                     # Componente raíz con routing
│   ├── App.css                     # Estilos globales de la aplicación
│   ├── index.css                   # Reset CSS y fuentes
│   └── main.jsx                    # Punto de entrada de React
│
├── package.json                    # Dependencias y scripts
├── vite.config.js                  # Configuración de Vite
├── .gitignore                      # Archivos ignorados por Git
└── README.md                       # Documentación del proyecto
```

## 🗂️ Descripción de Carpetas

### `/src/components/`
**Propósito:** Componentes React reutilizables que se usan en múltiples páginas.

- **Navbar.jsx**: Navegación global con tema claro/oscuro, enlaces activos, menú responsive
- **Footer.jsx**: Pie de página con año dinámico
- **CreditCard.jsx**: Tarjeta reutilizable que recibe props de crédito y renderiza su información

**Características:**
- Componentes funcionales puros
- Reciben datos mediante props
- Sin estado complejo (excepto Navbar)
- Exportación named/default clara

---

### `/src/pages/`
**Propósito:** Vistas completas que corresponden a rutas en React Router.

- **Home.jsx**: Página principal con hero section, catálogo completo y features
- **Simulator.jsx**: Página de simulador con búsqueda en tiempo real y filtros por monto
- **RequestCredit.jsx**: Página con formulario controlado, validaciones y cálculo de cuota

**Características:**
- Un componente = una página completa
- Usan hooks (useState, useEffect, useSearchParams, etc.)
- Manejan lógica de negocio
- Importan y componen componentes reutilizables

---

### `/src/data/`
**Propósito:** Datos estáticos y funciones utilitarias compartidas.

- **creditsData.js**: 
  - Array `creditsData` con 6 productos crediticios
  - `formatMoney()` - Formatea números a COP
  - `formatRate()` - Formatea tasas de interés
  - `calculateMonthlyPayment()` - Calcula cuota mensual

**Características:**
- Separación de datos y lógica de presentación
- Funciones puras reutilizables
- Exportaciones nombradas
- Fácil de mantener y testear

---

## 🛣️ Configuración de React Router

### Rutas Implementadas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `<Home />` | Página de inicio |
| `/simulador` | `<Simulator />` | Simulador con filtros |
| `/solicitar` | `<RequestCredit />` | Formulario de solicitud |

### Implementación en `App.jsx`

```jsx
<BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/simulador" element={<Simulator />} />
    <Route path="/solicitar" element={<RequestCredit />} />
  </Routes>
  <Footer />
</BrowserRouter>
```

**Características:**
- ✅ BrowserRouter para URL limpia sin `#`
- ✅ Navbar y Footer persistentes fuera de Routes
- ✅ Rutas declarativas con element prop
- ✅ Navegación con `<Link>` en lugar de `<a>`
- ✅ useLocation para detectar ruta activa
- ✅ useSearchParams para query strings
- ✅ useNavigate para navegación programática

---

## 📋 Convenciones de Nomenclatura

### Archivos de Componentes
- **PascalCase**: `Navbar.jsx`, `CreditCard.jsx`, `Home.jsx`
- **Extensión .jsx**: Para archivos que contienen JSX
- **Un componente por archivo**: Facilita mantenimiento

### Archivos de Datos/Utilidades
- **camelCase**: `creditsData.js`
- **Extensión .js**: Para archivos sin JSX
- **Nombres descriptivos**: Indica claramente el contenido

### Carpetas
- **Minúsculas**: `components/`, `pages/`, `data/`
- **Plural cuando contiene múltiples items**: `components/`, `pages/`
- **Singular para contexto específico**: `data/`

---

## ✅ Checklist de Buenas Prácticas Implementadas

### Estructura
- ✅ Separación clara entre componentes, páginas y datos
- ✅ Un componente por archivo
- ✅ Nomenclatura consistente y descriptiva
- ✅ Carpetas organizadas por función/tipo

### React Router
- ✅ BrowserRouter configurado correctamente
- ✅ Rutas definidas con Routes y Route
- ✅ Navegación con Link en lugar de <a>
- ✅ Hooks de routing utilizados apropiadamente
- ✅ Componentes Navbar/Footer persistentes

### Componentes
- ✅ Funcionales con hooks
- ✅ Props con desestructuración
- ✅ Exportación/importación consistente
- ✅ Separación de lógica y presentación

### Datos
- ✅ Separados en archivo dedicado
- ✅ Funciones utilitarias reutilizables
- ✅ Exportaciones nombradas claras

---

## 🎯 Cumplimiento de Criterios de Evaluación

### Configuración y Estructura de React (20 pts) ✅

✅ **Proyecto React correctamente configurado**
- Vite como herramienta de construcción
- package.json con dependencias correctas
- Scripts de desarrollo y producción

✅ **Estructura de carpetas organizada**
- `src/components/` para reutilizables
- `src/pages/` para vistas completas
- `src/data/` para datos y utilidades
- Separación clara de responsabilidades

✅ **Archivos bien nombrados**
- PascalCase para componentes
- camelCase para utilidades
- Nombres descriptivos y claros

✅ **React Router implementado correctamente**
- BrowserRouter configurado
- 3 rutas funcionales
- Navegación con Link
- Hooks de routing utilizados
- URL params manejados

---

Esta estructura garantiza:
- 📦 **Escalabilidad**: Fácil agregar nuevos componentes/páginas
- 🔍 **Mantenibilidad**: Código organizado y fácil de encontrar
- 🧩 **Reutilización**: Componentes modulares y independientes
- 📚 **Legibilidad**: Nomenclatura clara y consistente
- 🎨 **Separación de responsabilidades**: Cada archivo tiene un propósito claro
