const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('[data-nav]');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => nav && nav.classList.remove('open'));
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  reveals.forEach(r => io.observe(r));
} else reveals.forEach(r => r.classList.add('in'));

// Counters
function runCount(el) {
  const target = +el.dataset.count, suf = el.dataset.suffix || '';
  const t0 = performance.now(), dur = 1400;
  (function tick(t) {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suf;
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}
if ('IntersectionObserver' in window) {
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); }
  }), { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(c => co.observe(c));
}

// Hero load animation: Booked -> Dispatched -> In Transit -> Delivered
const live = document.getElementById('heroLive');
if (live) {
  const steps = [...live.querySelectorAll('.step')];
  const bars = [...live.querySelectorAll('.bar')];
  const badge = document.getElementById('lcBadge');
  const floats = [...live.querySelectorAll('.float')];
  const names = ['Booked', 'Dispatched', 'In Transit', 'Delivered'];
  let i = 0;
  function render() {
    steps.forEach((s, k) => s.classList.toggle('on', k <= i));
    bars.forEach((b, k) => b.classList.toggle('on', k < i));
    badge.textContent = names[i];
    floats.forEach(f => f.classList.toggle('show', +f.dataset.at <= i));
  }
  render();
  setInterval(() => {
    i = (i + 1) % 5;
    if (i === 4) { i = 0; floats.forEach(f => f.classList.remove('show')); }
    render();
  }, 2600);
}

// Tour: tabs, arrows, click-to-advance
(function(){
  const tabs=[...document.querySelectorAll('.tour-tab')], slides=[...document.querySelectorAll('.tour-slide')];
  if(!tabs.length) return;
  const caps=["Your whole operation at a glance, the moment you log in", "Book, filter and manage every load from one board", "See every truck on the map, live", "Invoice customers and pay carriers without leaving the TMS", "Onboard, pay and keep every carrier organized", "Run the reports your brokerage actually needs", "See every pickup and delivery on one shipment calendar"], cap=document.getElementById('tourCap');
  let cur=0;
  function go(i){
    cur=(i+tabs.length)%tabs.length;
    tabs.forEach((t,k)=>t.classList.toggle('active',k===cur));
    slides.forEach((s,k)=>s.classList.toggle('active',k===cur));
    if(cap) cap.textContent=caps[cur];
    const im=slides[cur].querySelector('img'); if(im) im.loading='eager';
  }
  tabs.forEach((t,k)=>t.addEventListener('click',()=>go(k)));
  const p=document.querySelector('.tour-arrow.prev'), n=document.querySelector('.tour-arrow.next');
  if(p) p.addEventListener('click',()=>go(cur-1));
  if(n) n.addEventListener('click',()=>go(cur+1));
  slides.forEach(s=>s.addEventListener('click',()=>go(cur+1)));
})();

// Tracking phone demo: speed / last ping flicker
const sp = document.getElementById('phSpeed'), pg = document.getElementById('phPing');
if (sp && pg) {
  let secs = 0;
  setInterval(() => {
    secs = (secs + 1) % 60;
    sp.textContent = (58 + Math.round(Math.random() * 8)) + ' mph';
    pg.textContent = secs < 5 ? 'just now' : secs + ' sec ago';
  }, 1000);
}

// Hero: real load status bar advancing through the app's 9 steps
(function(){
  const steps=[...document.querySelectorAll('#lsBar .ls-step')];
  if(!steps.length) return;
  const n=steps.length; let t=1;
  function paint(i){steps.forEach((s,k)=>{s.classList.toggle('done',k<=i);s.classList.toggle('active',k===i)})}
  paint(t);
  setInterval(()=>{ t=(t+1)%(n+2); paint(Math.min(t,n-1)); },1300);
})();
