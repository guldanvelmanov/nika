const header = document.querySelector('.site-header');

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0);
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

const accordionItems = [...document.querySelectorAll('.accordion details')];
accordionItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    accordionItems.forEach((other) => { if (other !== item) other.open = false; });
  });
});

const form = document.querySelector('#signup-form');
const formStatus = form?.querySelector('.form-status');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = '';
  if (!form.checkValidity()) {
    form.reportValidity();
    formStatus.textContent = 'Пожалуйста, заполните обязательные поля.';
    return;
  }
  if (!form.querySelector('input[name="subject"]:checked')) {
    formStatus.textContent = 'Выберите хотя бы один предмет.';
    form.querySelector('input[name="subject"]')?.focus();
    return;
  }
  formStatus.textContent = 'Спасибо! Заявка готова к отправке. Здесь можно подключить API.';
  form.reset();
});


// Explanation section responsive scaling (v38)
(() => {
  const BASE_WIDTH = 1120;
  const BASE_HEIGHT = 724;
  const TOP_PADDING = 73;
  const BOTTOM_SPACE = 30;

  function fitExplanationToViewport() {
    const section = document.querySelector('.explanation');
    if (!section) return;

    const available = Math.max(320, window.innerWidth - 20);
    const scale = Math.min(1, available / BASE_WIDTH);
    const sectionHeight = Math.ceil(TOP_PADDING + BASE_HEIGHT * scale + BOTTOM_SPACE);

    section.style.setProperty('--explanation-scale', String(scale));
    section.style.setProperty('--explanation-section-height', `${sectionHeight}px`);
  }

  fitExplanationToViewport();
  window.addEventListener('resize', fitExplanationToViewport, { passive: true });
})();


// Hero chat UI hook — ready for backend/API integration.
(() => {
  const form = document.getElementById('hero-chat-form');
  const input = document.getElementById('hero-chat-input');
  if (!form || !input) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Backend integration point:
    // POST the value from input.value, then append user/assistant bubbles to #hero-chat-messages.
  });
})();
