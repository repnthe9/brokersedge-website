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

// Form now posts directly to Formspree (see index.html action attribute) --
// no JS interception needed. Formspree handles the actual page redirect
// after submission.
