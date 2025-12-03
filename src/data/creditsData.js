// Datos de los productos de crédito disponibles en CreditSmart
export const creditsData = [
  {
    id: 'libre',
    name: 'Crédito Libre Inversión',
    rate: 0.169,
    min: 1000000,
    max: 50000000,
    termMax: 60,
    icon: 'credit-libre.png',
    desc: 'Flexibilidad para usar el dinero en lo que necesites.'
  },
  {
    id: 'vehiculo',
    name: 'Crédito Vehículo',
    rate: 0.155,
    min: 5000000,
    max: 80000000,
    termMax: 60,
    icon: 'credit-vehiculo.png',
    desc: 'Adquiere tu carro con cuotas a tu medida.'
  },
  {
    id: 'vivienda',
    name: 'Crédito Vivienda',
    rate: 0.128,
    min: 40000000,
    max: 500000000,
    termMax: 240,
    icon: 'credit-vivienda.jpg',
    desc: 'Tu hogar, más cerca con tasas competitivas.'
  },
  {
    id: 'educativo',
    name: 'Crédito Educativo',
    rate: 0.142,
    min: 1000000,
    max: 30000000,
    termMax: 48,
    icon: 'credit-educativo.png',
    desc: 'Financia tus estudios con planes flexibles.'
  },
  {
    id: 'empresarial',
    name: 'Crédito Empresarial',
    rate: 0.180,
    min: 10000000,
    max: 300000000,
    termMax: 84,
    icon: 'credit-empresarial.png',
    desc: 'Impulsa tu negocio con capital oportuno.'
  },
  {
    id: 'consumo',
    name: 'Crédito de Consumo',
    rate: 0.224,
    min: 500000,
    max: 10000000,
    termMax: 24,
    icon: 'credit-consumo.png',
    desc: 'Compra lo que quieras, cuando quieras. Sin trámites extensos.'
  }
];

// Utilidad para formatear moneda en pesos colombianos
export const formatMoney = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(value);
};

// Utilidad para formatear tasa de interés
export const formatRate = (rate) => {
  return (rate * 100).toFixed(1) + '% anual';
};

// Función para calcular la cuota mensual del crédito
// Fórmula: Cuota = P * (i * (1 + i)^n) / ((1 + i)^n - 1)
// P = Monto del préstamo
// i = Tasa de interés mensual (tasa anual / 12)
// n = Número de cuotas (meses)
export const calculateMonthlyPayment = (amount, annualRate, months) => {
  if (!amount || !months || amount <= 0 || months <= 0) return 0;
  
  const monthlyRate = annualRate / 12;
  const payment = amount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                  (Math.pow(1 + monthlyRate, months) - 1);
  
  return Math.round(payment);
};
