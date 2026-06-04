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

const TIEMPO = 60000; // 1 min en ms

const popup = document.getElementById('anuncio-1');
const btnCerrar = document.getElementById('equis');
let popupTimer = null;

function schedulePopup() {
  if (!popup) return;
  clearTimeout(popupTimer);

  popupTimer = setTimeout(() => {
    popup.classList.add('is-visible');
  }, TIEMPO);
}

// Mostrar después del tiempo definido
schedulePopup();

// Cerrar al hacer clic en el botón
if (btnCerrar && popup) {
  btnCerrar.addEventListener('click', () => {
    popup.classList.remove('is-visible');
    schedulePopup();
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
        document.querySelectorAll('div[id^="video-"]').forEach(v => {
            v.classList.remove('is-visible');
            const iframe = v.querySelector('iframe');
            if (iframe) iframe.src = iframe.src;
        });
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

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (videoOverlay && videoOverlay.classList.contains('is-visible')) {
            document.querySelectorAll('div[id^="video-"]').forEach(v => {
                v.classList.remove('is-visible');
                const iframe = v.querySelector('iframe');
                if (iframe) iframe.src = iframe.src;
            });
            videoOverlay.classList.remove('is-visible');
            document.body.style.overflow = '';
        }

        if (overlay && overlay.classList.contains('is-visible')) {
            document.querySelectorAll('.massive-popup').forEach(modal => {
                modal.classList.remove('is-visible');
            });
            overlay.classList.remove('is-visible');
            document.body.style.overflow = '';
            history.replaceState(null, '', location.pathname);
        }
    }
});
