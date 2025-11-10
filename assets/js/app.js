
(function(){
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  if(stored){ html.setAttribute('data-theme', stored); }
  if(toggle){ toggle.addEventListener('click', ()=>{ const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; html.setAttribute('data-theme', next); localStorage.setItem('theme', next); }); }

  // Mobile menu
  const burger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  if(burger && menu){ burger.addEventListener('click', ()=>{ const open = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', String(open)); }); }

  // Data (catálogo)
  const products = [
    { id:'libre', name:'Crédito Libre Inversión', rate:0.169, min:1000000, max:50000000, termMax:60, icon:'credit-libre.png', desc:'Flexibilidad para usar el dinero en lo que necesites.' },
    { id:'vehiculo', name:'Crédito Vehículo', rate:0.155, min:5000000, max:80000000, termMax:60, icon:'credit-vehiculo.png', desc:'Adquiere tu carro con cuotas a tu medida.' },
    { id:'vivienda', name:'Crédito Vivienda', rate:0.128, min:40000000, max:500000000, termMax:240, icon:'credit-vivienda.jpg', desc:'Tu hogar, más cerca con tasas competitivas.' },
    { id:'educativo', name:'Crédito Educativo', rate:0.142, min:1000000, max:30000000, termMax:48, icon:'credit-educativo.png', desc:'Financia tus estudios con planes flexibles.' },
    { id:'empresarial', name:'Crédito Empresarial', rate:0.180, min:10000000, max:300000000, termMax:84, icon:'credit-empresarial.png', desc:'Impulsa tu negocio con capital oportuno.' }
  ];

  const fmtMoney = (v)=> new Intl.NumberFormat('es-CO', { style:'currency', currency:'COP', maximumFractionDigits:0}).format(v);
  const fmtRate  = (r)=> (r*100).toFixed(1)+'% anual';

  function cardTemplate(p){
    return `
<article class="card">
  <div class="card__media">
    <img src="assets/img/${p.icon}" alt="${p.name}" class="card__img" loading="lazy">
  </div>
  <div class="card__body">
    <h3 class="card__title">${p.name}</h3>
    <p class="card__desc">${p.desc}</p>
    <ul class="meta">
      <li><span class="tag">Tasa</span> ${fmtRate(p.rate)}</li>
      <li><span class="tag">Monto</span> ${fmtMoney(p.min)} – ${fmtMoney(p.max)}</li>
      <li><span class="tag">Plazo</span> hasta ${p.termMax} meses</li>
    </ul>
    <div class="card__actions">
      <a class="link-ghost" href="simulador.html?producto=${encodeURIComponent(p.id)}">Ver detalles</a>
      <a class="btn" href="solicitar.html?tipo=${encodeURIComponent(p.name)}">Solicitar</a>
    </div>
  </div>
</article>`;
  }

  // Render en Inicio
  const catalog = document.getElementById('catalog');
  if(catalog){ catalog.innerHTML = products.map(cardTemplate).join(''); }

  // Simulador
  const results = document.getElementById('results');
  const search = document.getElementById('search');
  const chips = document.querySelectorAll('.chip');
  const params = new URLSearchParams(location.search);
  const pre = params.get('producto');
  let activeRange = 'all';

  function renderSim(){
    let list = products.slice();
    if(pre){ list = list.filter(p=> p.id === pre); }
    const q = (search?.value || '').trim().toLowerCase();
    if(q){ list = list.filter(p=> p.name.toLowerCase().includes(q)); }
    if(activeRange !== 'all'){
      const [a,b] = activeRange.split('-').map(Number);
      list = list.filter(p=> p.min >= a && p.max <= b || (p.min <= b && p.max >= a));
    }
    results && (results.innerHTML = list.map(cardTemplate).join(''));
  }

  if(results){ renderSim(); }
  search && search.addEventListener('input', renderSim);
  chips.forEach(ch=> ch.addEventListener('click', ()=>{
    chips.forEach(c=> c.setAttribute('aria-pressed','false'));
    ch.setAttribute('aria-pressed','true');
    activeRange = ch.dataset.range;
    renderSim();
  }));

  // Solicitud (modal robusto)
  const form = document.getElementById('formSolicitud');
  const tipoSelect = document.getElementById('tipo');
  const montoInput = document.getElementById('monto');
  const ingresosInput = document.getElementById('ingresos');
  const btnLimpiar = document.getElementById('btnLimpiar');
  const modal = document.getElementById('modal');
  const modalDialog = modal ? modal.querySelector('.modal__dialog') : null;
  const modalClose = document.getElementById('modalClose');
  const modalHome = document.getElementById('modalHome');

  function formatMoneyInput(el){
    el.addEventListener('input', ()=>{
      const digits = el.value.replace(/[^\d]/g,'');
      if(!digits){ el.value=''; return; }
      const n = Number(digits);
      el.value = new Intl.NumberFormat('es-CO', { style:'currency', currency:'COP', maximumFractionDigits:0 }).format(n);
    });
  }

  const productsSelectData = products.map(p=> p.name);

  function openModal(){ if(modal){ modal.hidden = false; modalDialog && modalDialog.focus(); } }
  function closeModal(){ if(modal){ modal.hidden = true; } }

  if(tipoSelect){
    tipoSelect.innerHTML = productsSelectData.map(name=> `<option>${name}</option>`).join('');
    const pTipo = new URLSearchParams(location.search).get('tipo');
    if(pTipo){ tipoSelect.value = pTipo; }
  }
  montoInput && formatMoneyInput(montoInput);
  ingresosInput && formatMoneyInput(ingresosInput);

  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      openModal();
    });
    btnLimpiar && btnLimpiar.addEventListener('click', ()=>{ form.reset(); });
  }
  modalClose && modalClose.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && modal && !modal.hidden) closeModal(); });

})();
