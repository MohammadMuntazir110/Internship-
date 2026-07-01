// ===== HERO CAROUSEL FUNCTIONALITY =====
let hCur = 0, hTimer = null;
const hSlides = document.querySelectorAll('.hero-slide');
const hDots = document.querySelectorAll('.hdot');

function goHero(n) {
  hSlides[hCur].classList.remove('active');
  hSlides[hCur].classList.add('leaving');
  hDots[hCur].classList.remove('active');
  const old = hCur;
  setTimeout(() => hSlides[old].classList.remove('leaving'), 700);
  hCur = ((n % hSlides.length) + hSlides.length) % hSlides.length;
  hSlides[hCur].classList.add('active');
  hDots[hCur].classList.add('active');
  clearInterval(hTimer);
  hTimer = setInterval(() => goHero(hCur + 1), 5500);
}

document.getElementById('hNext').onclick = () => goHero(hCur + 1);
document.getElementById('hPrev').onclick = () => goHero(hCur - 1);
hTimer = setInterval(() => goHero(hCur + 1), 5500);

// ===== PAYMENT METHOD SELECTOR WITH RIPPLE EFFECT =====
function selectPaymentMethod(el) {
  document.querySelectorAll('.demo-method').forEach(m => m.classList.remove('active'));
  el.classList.add('active');
  createRipple(el);
}

function createRipple(el) {
  const ripple = document.createElement('span');
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(255,255,255,0.6)';
  ripple.style.width = '20px';
  ripple.style.height = '20px';
  ripple.style.pointerEvents = 'none';
  ripple.style.animation = 'ripple 0.6s ease-out';
  el.style.position = 'relative';
  el.style.overflow = 'visible';
  ripple.style.left = '50%';
  ripple.style.top = '50%';
  ripple.style.transform = 'translate(-50%, -50%)';
  el.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

// ===== FINANCE PLATFORM TABS WITH SMOOTH TRANSITIONS =====
function switchFP(id, btn) {
  document.querySelectorAll('.fp-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.fp-tab').forEach(t => t.classList.remove('active'));
  
  const panel = document.getElementById('fp-' + id);
  panel.classList.add('active');
  btn.classList.add('active');
  
  // Animate cards in
  const cards = panel.querySelectorAll('.fp-card');
  cards.forEach((card, i) => {
    card.style.animation = 'none';
    setTimeout(() => {
      card.style.animation = `slideInUp 0.6s ease backwards`;
      card.style.animationDelay = `${i * 0.1}s`;
    }, 10);
  });
}

// ===== PRODUCT FINDER WITH SEARCH ANIMATION =====
function filterProducts(query) {
  console.log('Search: ' + query);
  if (query.length > 0) {
    showSearchAnimation(query);
  }
}

function showSearchAnimation(query) {
  // Add visual feedback
  const input = document.querySelector('.finder-search input');
  input.style.borderColor = 'var(--rp-blue)';
  setTimeout(() => {
    input.style.borderColor = 'var(--rp-border)';
  }, 500);
}

// ===== ANIMATED COUNTER WITH BETTER FORMATTING =====
function animateCounter(id, end, dur = 2000) {
  let start = Date.now();
  const timer = setInterval(() => {
    const elapsed = Date.now() - start;
    const prog = Math.min(elapsed / dur, 1);
    const current = Math.floor(prog * end);
    
    let display = current.toLocaleString();
    if (id == 'stat1') display = '₹' + display;
    if (id == 'stat2') display = Math.round(current / 100) + '%';
    if (id == 'stat3') display = current + ' Sec';
    
    document.getElementById(id).textContent = display;
    if (prog === 1) clearInterval(timer);
  }, 50);
}

// ===== NAVBAR SCROLL EFFECT WITH ENHANCED STYLING =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  const scrolled = window.scrollY > 20;
  
  if (scrolled && !nav.classList.contains('scrolled')) {
    nav.classList.add('scrolled');
  } else if (!scrolled && nav.classList.contains('scrolled')) {
    nav.classList.remove('scrolled');
  }
});

// ===== SMOOTH SCROLL REVEAL WITH INTERSECTION OBSERVER =====
document.addEventListener("DOMContentLoaded", () => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.05}s`;
    obs.observe(el);
  });

  // ===== STATS COUNTER ANIMATION WITH INTERSECTION =====
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const alreadyAnimated = document.getElementById('stat1').textContent !== '₹0';
        if (!alreadyAnimated) {
          animateCounter('stat1', 10000000);
          animateCounter('stat2', 9999);
          animateCounter('stat3', 2);
        }
        statsObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  
  const statsSection = document.querySelector('.stats-band');
  if (statsSection) statsObserver.observe(statsSection);

  // ===== CARD INTERACTION EFFECTS =====
  addCardInteractions();

  // ===== BUTTON RIPPLE EFFECT =====
  addButtonRipples();

  // ===== SCROLL PARALLAX EFFECT =====
  addParallaxEffect();
});

// ===== CARD INTERACTION EFFECTS =====
function addCardInteractions() {
  const cards = document.querySelectorAll('.fp-card, .sec-card, .gs-card, .testi-card, .nc-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)';
    });
  });
}

// ===== BUTTON RIPPLE EFFECT =====
function addButtonRipples() {
  const buttons = document.querySelectorAll('button, .btn-hero-blue, .btn-hero-outline, .finder-btn, .fp-tab, .btn-card-signup');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255,255,255,0.5)';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = '0';
      ripple.style.height = '0';
      ripple.style.pointerEvents = 'none';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      ripple.animate([
        { width: '0', height: '0', opacity: 1 },
        { width: '300px', height: '300px', opacity: 0 }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ===== SCROLL PARALLAX EFFECT =====
function addParallaxEffect() {
  window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.hs-image img, .hero-company');
    
    parallaxElements.forEach(el => {
      const scrollY = window.scrollY;
      const elementPosition = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight) {
        const offset = (scrollY - elementPosition + windowHeight) * 0.5;
        el.style.transform = `translateY(${offset * -0.1}px)`;
      }
    });
  });
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') goHero(hCur + 1);
  if (e.key === 'ArrowLeft') goHero(hCur - 1);
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
