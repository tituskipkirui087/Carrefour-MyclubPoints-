/* ============================================
   Carrefour Kenya – Homepage JavaScript
   ============================================ */

// ---- NProgress bar simulation on load ----
(function () {
  const bar = document.createElement('div');
  bar.id = 'nprogress';
  bar.innerHTML = '<div class="bar"><div class="peg"></div></div>';
  document.body.prepend(bar);
  let width = 0;
  const interval = setInterval(() => {
    width += Math.random() * 15;
    if (width >= 90) clearInterval(interval);
    bar.querySelector('.bar').style.width = Math.min(width, 90) + '%';
  }, 100);
  window.addEventListener('load', () => {
    clearInterval(interval);
    bar.querySelector('.bar').style.width = '100%';
    bar.querySelector('.bar').style.transition = 'width 0.2s ease';
    setTimeout(() => bar.remove(), 400);
  });
})();

// ---- Cart state ----
let cartCount = 0;

function updateCartUI() {
  const els = document.querySelectorAll('#cart-count, #cart-count-mobile');
  els.forEach(el => { if (el) el.textContent = cartCount; });
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = cartCount;
    badge.classList.toggle('hidden', cartCount === 0);
  }
}

function addToCart(btn) {
  cartCount++;
  updateCartUI();
  const orig = btn.textContent;
  btn.textContent = '✓ Added';
  btn.classList.add('added');
  setTimeout(() => {
    btn.textContent = orig;
    btn.classList.remove('added');
  }, 1500);
}

// ---- Delivery type toggle ----
function selectDelivery(type) {
  const scheduled = document.getElementById('btn-scheduled');
  const express = document.getElementById('btn-express');
  if (type === 'scheduled') {
    scheduled.style.backgroundColor = '#093b6c';
    scheduled.style.color = '#FFFFFF';
    scheduled.style.border = '2px solid transparent';
    express.style.backgroundColor = '#FFFFFF';
    express.style.color = '#285E9C';
    express.style.border = '2px solid #CF9E36';
  } else {
    express.style.backgroundColor = '#093b6c';
    express.style.color = '#FFFFFF';
    express.style.border = '2px solid transparent';
    scheduled.style.backgroundColor = '#FFFFFF';
    scheduled.style.color = '#285E9C';
    scheduled.style.border = '2px solid #CF9E36';
  }
}

// ---- Search placeholder hide on focus/type ----
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('search-input');
  const placeholder = document.getElementById('search-placeholder');
  if (!input || !placeholder) return;

  const toggle = () => {
    placeholder.style.display = input.value.length > 0 ? 'none' : 'flex';
  };
  input.addEventListener('input', toggle);
  input.addEventListener('focus', () => { placeholder.style.opacity = '0.6'; });
  input.addEventListener('blur', () => {
    placeholder.style.opacity = '1';
    toggle();
  });
});

// ---- Hero Banner Carousel ----
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('hero-track');
  if (!track) return;

  const slides = track.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  let index = 0;
  let autoTimer;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => {
      d.style.opacity = di === index ? '1' : '0.5';
      d.style.width = di === index ? '20px' : '8px';
    });
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(index + 1), 4000);
  }

  prevBtn && prevBtn.addEventListener('click', () => { goTo(index - 1); startAuto(); });
  nextBtn && nextBtn.addEventListener('click', () => { goTo(index + 1); startAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.idx));
      startAuto();
    });
  });

  // Touch / swipe support for hero
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) { goTo(diff > 0 ? index + 1 : index - 1); startAuto(); }
  }, { passive: true });

  goTo(0);
  startAuto();
});

// ---- Daily Offers Carousel (desktop prev/next) ----
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('offers-track');
  const prevBtn = document.getElementById('offers-prev');
  const nextBtn = document.getElementById('offers-next');
  if (!track) return;

  let scrollPos = 0;

  function getStep() {
    const card = track.querySelector('a');
    if (!card) return 320;
    return card.offsetWidth + 16; // card width + gap
  }

  function updatePrevBtn() {
    if (prevBtn) {
      prevBtn.style.opacity = scrollPos <= 0 ? '0.4' : '1';
      prevBtn.style.pointerEvents = scrollPos <= 0 ? 'none' : 'auto';
    }
  }

  nextBtn && nextBtn.addEventListener('click', () => {
    const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
    scrollPos = Math.min(scrollPos + getStep(), maxScroll);
    track.style.transform = `translateX(-${scrollPos}px)`;
    updatePrevBtn();
  });

  prevBtn && prevBtn.addEventListener('click', () => {
    scrollPos = Math.max(scrollPos - getStep(), 0);
    track.style.transform = `translateX(-${scrollPos}px)`;
    updatePrevBtn();
  });

  // Touch swipe for offers on mobile
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 30) {
      const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
      scrollPos = diff > 0
        ? Math.min(scrollPos + getStep(), maxScroll)
        : Math.max(scrollPos - getStep(), 0);
      track.style.transform = `translateX(-${scrollPos}px)`;
      updatePrevBtn();
    }
  }, { passive: true });

  updatePrevBtn();
});

// ---- Header scroll shadow enhancement ----
(function () {
  const header = document.getElementById('main-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 24px 0px rgba(0,0,0,0.12)';
    } else {
      header.style.boxShadow = '0 4px 24px 0px rgba(0,0,0,0.06)';
    }
  }, { passive: true });
})();

// ---- MyClub Points Popup (appears every 15 seconds) ----
(function () {
  const overlay   = document.getElementById('myclub-overlay');
  const closeBtn  = document.getElementById('myclub-close');
  const laterBtn  = document.getElementById('myclub-later');
  const redeemBtn = document.getElementById('myclub-redeem');
  const timerFill = document.getElementById('myclub-timer-fill');
  if (!overlay) return;

  let hideTimer;
  let nextShowTimer;

  function showPopup() {
    clearTimeout(nextShowTimer);
    overlay.style.removeProperty('display');
    overlay.style.display = 'flex';

    // Animate the popup card in
    const card = document.getElementById('myclub-popup');
    if (card) {
      card.style.animation = 'none';
      card.offsetHeight; // reflow
      card.style.animation = 'popupIn 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
    }

    // Reset countdown bar to full, then shrink over 15s
    if (timerFill) {
      timerFill.style.transition = 'none';
      timerFill.style.width = '100%';
      timerFill.offsetHeight; // reflow
      timerFill.style.transition = 'width 15s linear';
      timerFill.style.width = '0%';
    }

    // Auto-hide after 15 seconds if user doesn't interact
    hideTimer = setTimeout(() => {
      dismissPopup(false);
    }, 15000);
  }

  function dismissPopup(redirecting) {
    clearTimeout(hideTimer);
    const card = document.getElementById('myclub-popup');
    if (card) {
      card.style.animation = 'popupOut 0.25s ease-in forwards';
    }
    setTimeout(() => {
      overlay.style.display = 'none';
      if (!redirecting) {
        // Show again after 15 seconds
        nextShowTimer = setTimeout(showPopup, 15000);
      }
    }, 240);
  }

  // First appearance after 3 seconds
  setTimeout(showPopup, 3000);

  closeBtn  && closeBtn.addEventListener('click',  () => dismissPopup(false));
  laterBtn  && laterBtn.addEventListener('click',  () => dismissPopup(false));
  redeemBtn && redeemBtn.addEventListener('click', () => {
    dismissPopup(true);
    // Redirect to login/redeem page after animation
    setTimeout(() => { window.location.href = 'login.html'; }, 280);
  });

  // Dismiss on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) dismissPopup(false);
  });

  // Dismiss on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.style.display !== 'none') dismissPopup(false);
  });
})();

// ---- Search bar: animate placeholder words cycling ----
(function () {
  const terms = ['Milk', 'Rice', 'Bread', 'Fruits', 'Electronics', 'Snacks', 'Baby Food', 'Beverages'];
  const strongEl = document.querySelector('#search-placeholder strong');
  if (!strongEl) return;
  let i = 0;
  setInterval(() => {
    i = (i + 1) % terms.length;
    strongEl.style.opacity = '0';
    strongEl.style.transform = 'translateY(8px)';
    strongEl.style.transition = 'opacity 0.3s, transform 0.3s';
    setTimeout(() => {
      strongEl.textContent = terms[i];
      strongEl.style.opacity = '1';
      strongEl.style.transform = 'translateY(0)';
    }, 300);
  }, 3000);
})();
