# 🎓 CreditSmart

**Estudiantes:** William Garcia Leonel y José David Osorio Gallego

---

## 📋 Descripción del Proyecto

**CreditSmart** es una aplicación web dinámica desarrollada con **React 18** que permite a los usuarios explorar, comparar, simular y solicitar diferentes tipos de créditos financieros de manera intuitiva y eficiente.

Es una transformación de una aplicación estática HTML/CSS/JS original a una **Single Page Application (SPA)** completamente interactiva con navegación fluida, formularios validados en tiempo real y cálculos financieros automáticos.

---

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** - Librería principal para construcción de interfaces
- **Vite** - Herramienta de construcción rápida (más moderna que Create React App)
- **React Router DOM v6** - Manejo de navegación entre páginas

### Lenguajes y Frameworks
- **JavaScript ES6+** - Con hooks, componentes funcionales y métodos de arrays
- **CSS3** - Estilos modernos con variables CSS y diseño responsive
- **HTML5** - Estructura semántica

### Características Técnicas
- ✅ Componentes funcionales con hooks (useState, useEffect, useLocation, useSearchParams)
- ✅ Estado reactivo y manejo avanzado de datos
- ✅ Formularios 100% controlados con validaciones progresivas
- ✅ Búsqueda y filtros dinámicos con lógica de superposición
- ✅ Cálculos financieros usando fórmula de amortización francesa
- ✅ Persistencia de tema en localStorage
- ✅ Diseño responsive (móvil, tablet, desktop)

---

## 🛠️ Instalación y Ejecución

### Requisitos
- **Node.js** versión 16 o superior
- **npm** (incluido con Node.js)

### Pasos para Ejecutar

**1. Clonar el repositorio**
```bash
git clone https://github.com/Wilgarle/Credi_Smart.git
cd Credi_Smart
```

**2. Instalar dependencias**
```bash
npm install
```

**3. Ejecutar en modo desarrollo**
```bash
npm run dev
```
La aplicación estará disponible en **http://localhost:5173**

**4. Construir para producción (opcional)**
```bash
npm run build
```

**5. Previsualizar build (opcional)**
```bash
npm run preview
```

---

## ✨ Características Principales

### 🏠 Página de Inicio
- Hero section con llamado a la acción
- Catálogo dinámico de 6 productos crediticios
- Diseño responsivo y transiciones suaves

### 🔍 Simulador de Créditos
- Búsqueda en tiempo real
- 5 filtros dinámicos por rango de monto
- Filtrado combinado (búsqueda + rango)
- Preselección desde URL con parámetros query
- Botón para limpiar filtros

### 📝 Formulario de Solicitud
- 11 campos 100% controlados por React
- Validaciones en 3 niveles (onBlur, onChange, onSubmit)
- Formateo automático de campos monetarios
- Cálculo automático de cuota mensual
- Sistema de feedback visual (errores solo en campos visitados)
- Modal de confirmación al enviar

### 🎨 Funcionalidades Adicionales
- Tema claro/oscuro intercambiable y persistente
- Navegación con enlaces activos resaltados
- Menú responsivo (hamburguesa en móvil)
- Componentes modulares y reutilizables

---

## 📁 Estructura del Proyecto

```
creditsmart-react/
├── public/
│   ├── img/                 # Imágenes de productos y capturas
│   │   ├── credit-*.png     # Imágenes de cada crédito
│   │   ├── hero_image.jpg
│   │   ├── logo.png
│   │   └── Screenshot_*.png # Capturas de pantalla
│
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Navbar.jsx       # Barra de navegación
│   │   ├── Footer.jsx       # Pie de página
│   │   └── CreditCard.jsx   # Tarjeta de crédito
│   │
│   ├── pages/               # Páginas principales
│   │   ├── Home.jsx
│   │   ├── Simulator.jsx
│   │   └── RequestCredit.jsx
│   │
│   ├── data/
│   │   └── creditsData.js   # Array de créditos + helpers
│   │
│   ├── App.jsx              # Componente raíz con routing
│   ├── App.css              # Estilos globales
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 📸 Capturas de Pantalla

### Página de Inicio
![Inicio](./public/img/Screenshot_1.png)

### Simulador de Créditos
![Simulador](./public/img/Screenshot_2.png)
![Simulador con Filtro](./public/img/Screenshot_2_1.png)

### Formulario de Solicitud
![Formulario](./public/img/Screenshot_3.png)
![Formulario con Validación](./public/img/Screenshot_3_1.png)
![Confirmación](./public/img/Screenshot_3_2.png)

---

## 🔗 Enlaces del Proyecto

**Repositorio GitHub:** [https://github.com/Wilgarle/Credi_Smart.git](https://github.com/Wilgarle/Credi_Smart.git)

**Demo en vivo:** Ejecutar `npm run dev` y abrir http://localhost:5173

---

## 📚 Documentación Completa

Para más detalles técnicos sobre la implementación, arquitectura, cumplimiento de la rúbrica y guías técnicas, consultar:

📖 **[DOCUMENTACION.md](./DOCUMENTACION.md)**

---

## 🎓 Conclusión

CreditSmart representa la transformación exitosa de una aplicación web estática a una **Single Page Application moderna** con React. El proyecto implementa todos los requisitos académicos incluyendo componentes reutilizables, manejo avanzado de estado, validaciones robustas, filtrados dinámicos y cálculos financieros integrados, consolidando habilidades esenciales en desarrollo frontend moderno.


