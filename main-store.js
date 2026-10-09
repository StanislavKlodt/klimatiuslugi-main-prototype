'use strict';
document.querySelectorAll('[data-slider]').forEach(slider => {
  const slides = [...slider.querySelectorAll('[data-slide]')];
  const dots = [...slider.querySelectorAll('[data-dot]')];
  let current = 0;
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => { dot.setAttribute('aria-pressed', String(i === current)); });
  }
  slider.querySelector('[data-next]')?.addEventListener('click', () => show(current + 1));
  slider.querySelector('[data-prev]')?.addEventListener('click', () => show(current - 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
});
const request = document.querySelector('.request-dialog');
const form = document.querySelector('#request-form');
document.querySelectorAll('[data-request]').forEach(button => button.addEventListener('click', () => {
  form.reset();
  form.elements.service.value = button.dataset.request;
  document.querySelector('.form-result').hidden = true;
  document.querySelector('#phone-error').hidden = true;
  form.elements.phone.removeAttribute('aria-invalid');
  request.showModal();
}));
form?.addEventListener('submit', event => {
  event.preventDefault();
  const input = form.elements.phone;
  const value = input.value.trim();
  const digits = value.replace(/\D/g, '');
  const error = document.querySelector('#phone-error');
  const valid = /^[+\d\s()\-]+$/.test(value) && (digits.length === 10 || (digits.length === 11 && /^[78]/.test(digits)));
  error.hidden = valid;
  input.setAttribute('aria-invalid', String(!valid));
  if (!valid) {
    error.textContent = 'Укажите телефон из 10 цифр или 11 цифр с 7/8 в начале.';
    input.focus();
    document.querySelector('.form-result').hidden = true;
    return;
  }
  const result = document.querySelector('.form-result');
  result.textContent = 'Проверка формы пройдена. В готовом сайте заявка поступит менеджеру. Сейчас данные не отправлены.';
  result.hidden = false;
});
const photoDialog = document.querySelector('.photo-dialog');
const fullPhoto = document.querySelector('#full-photo');
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#photo-title').textContent = 'Фото работы';
  fullPhoto.src = button.dataset.photo;
  fullPhoto.alt = button.querySelector('img').alt;
  photoDialog.showModal();
}));
document.querySelector('[data-proof]')?.addEventListener('click', () => {
  document.querySelector('#photo-title').textContent = 'Отзывы — скриншот с сайта компании';
  fullPhoto.src = 'assets/store/avito-reviews-published.png';
  fullPhoto.alt = 'Исторический скриншот отзывов Авито, опубликованный на сайте Климат и услуги';
  photoDialog.showModal();
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
});
document.addEventListener('click', event => {
  const catalog = document.querySelector('.catalog');
  if (catalog?.open && !catalog.contains(event.target)) catalog.open = false;
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') document.querySelector('.catalog')?.removeAttribute('open');
});
