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

// Tour tabs
document.querySelectorAll('.tour-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tour-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tour-pane').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('pane-' + tab.dataset.tab).classList.add('active');
  });
});

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
