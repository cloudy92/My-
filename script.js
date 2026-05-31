// ===== NAVBAR: mobile toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== NAVBAR: highlight active section on scroll =====
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');

const observerOptions = { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 };

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

// ===== SCROLL-IN ANIMATIONS =====
const animateEls = document.querySelectorAll('.card, .about-avatar, .about-text, .contact-form');

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animateEls.forEach((el, i) => {
  el.style.cssText = `opacity:0; transform:translateY(24px); transition: opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s;`;
  fadeObserver.observe(el);
});

document.head.insertAdjacentHTML('beforeend', `<style>.visible{opacity:1!important;transform:translateY(0)!important;}</style>`);

// ===== CONTACT FORM VALIDATION =====
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');

function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.add('invalid');
  error.textContent = message;
  return false;
}

function clearError(inputId, errorId) {
  document.getElementById(inputId).classList.remove('invalid');
  document.getElementById(errorId).textContent = '';
}

// Real-time clearing of errors on input
['name', 'email', 'message'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    const errorId = id.charAt(0).toUpperCase() + id.slice(1) + 'Error';
    clearError(id, errorId);
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  let valid = true;

  // Reset all
  ['name', 'email', 'message'].forEach(id => {
    const errorId = id.charAt(0).toUpperCase() + id.slice(1) + 'Error';
    clearError(id, errorId);
  });

  if (!name) valid = showError('name', 'nameError', 'Vui lòng nhập họ và tên.');
  if (!email) {
    valid = showError('email', 'emailError', 'Vui lòng nhập email.') && valid;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    valid = showError('email', 'emailError', 'Email không hợp lệ.') && valid;
  }
  if (!message) valid = showError('message', 'messageError', 'Vui lòng nhập tin nhắn.') && valid;

  if (!valid) return;

  // Simulate sending
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Đang gửi...';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    form.classList.add('hidden');
    successMsg.classList.remove('hidden');

    // Reset after 5s
    setTimeout(() => {
      successMsg.classList.add('hidden');
      form.classList.remove('hidden');
      btn.textContent = 'Gửi tin nhắn';
      btn.disabled = false;
    }, 5000);
  }, 1200);
});
