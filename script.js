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

document.querySelector('.lead-form')?.addEventListener('submit', event => {
  event.preventDefault();
  alert('Demo request captured. Connect this form to your CRM or email service next.');
});
