function toggle(btn) {
  const item = btn.closest('.faq-item');
  item.classList.toggle('open');
}

const fadeUpElements = document.querySelectorAll('.fade-up');

const fadeUpObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeUpObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

fadeUpElements.forEach((element) => {
  fadeUpObserver.observe(element);
});

const TIEMPO = 120000; // 2 minutos

const popup   = document.getElementById('anuncio-1');
const btnCerrar = document.getElementById('equis');

// Mostrar después del tiempo definido
setTimeout(() => {
  if (!popup) return;

  popup.style.opacity = '1';
  popup.style.pointerEvents = 'auto';
}, TIEMPO);

// Cerrar al hacer clic en el botón
if (btnCerrar && popup) {
  btnCerrar.addEventListener('click', () => {
    popup.style.opacity = '0';
    popup.style.pointerEvents = 'none';
  });
}

const overlay = document.getElementById('backdrop-overlay');

if (overlay) {
    overlay.addEventListener('click', () => {
        document.querySelectorAll('.massive-popup').forEach(modal => {
            modal.classList.remove('is-visible');
        });
        overlay.classList.remove('is-visible');
        document.body.style.overflow = '';
        history.replaceState(null, '', location.pathname);
    });
}

// Open modal matching the card's href
document.querySelectorAll('.clickable-region').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').slice(1);
        const modal = document.getElementById(targetId);
        if (modal) {
            e.preventDefault();
            modal.classList.add('is-visible');
            if (overlay) overlay.classList.add('is-visible');
            document.body.style.overflow = 'hidden';
        }
    });
});

document.querySelectorAll('.popup-content').forEach(card => {
    card.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

const videoOverlay = document.getElementById('video-overlay');

document.querySelectorAll('a[href^="#video-"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.massive-popup').forEach(m => m.classList.remove('is-visible'));
        if (overlay) overlay.classList.remove('is-visible');

        const targetId = link.getAttribute('href').slice(1);
        const videoDiv = document.getElementById(targetId);
        if (videoDiv) videoDiv.classList.add('is-visible');
        if (videoOverlay) videoOverlay.classList.add('is-visible');
        document.body.style.overflow = 'hidden';
    });
});

if (videoOverlay) {
    videoOverlay.addEventListener('click', () => {
        document.querySelectorAll('div[id^="video-"]').forEach(v => v.classList.remove('is-visible'));
        videoOverlay.classList.remove('is-visible');
        document.body.style.overflow = '';
    });
}

if (location.hash) {
    history.replaceState(null, '', location.pathname);
}

document.querySelectorAll('.dropdown-heading').forEach(heading => {
    heading.addEventListener('click', () => {
        const text = heading.nextElementSibling;
        text.classList.toggle('open');
    });
});