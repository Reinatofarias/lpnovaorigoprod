/**
 * Origo Company — Landing Page
 * Script principal com animações, contadores e interações.
 * 
 * Módulos:
 * 1. initNavbar()         → Navbar fixa com blur ao rolar
 * 2. initScrollAnimations() → Elementos aparecem ao entrar na viewport
 * 3. initCounters()       → Contadores animados na seção de resultados
 * 4. initMobileMenu()     → Menu hamburger no mobile
 * 5. initSmoothScroll()   → Scroll suave nos links âncora
 * 6. initActiveLink()     → Destaque do link ativo no navbar
 * 7. initParallaxCards()   → Efeito parallax nos floating cards do hero
 * 8. initGlowFollow()     → Glow que segue o mouse nos cards
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initCounters();
  initMobileMenu();
  initSmoothScroll();
  initActiveLink();
  initParallaxCards();
  initGlowFollow();
  initUTMTracking();
  initStickyCTA();
});


// ============================================
// 1. NAVBAR — Blur + fundo ao rolar
// ============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          navbar.classList.add('navbar--scrolled');
        } else {
          navbar.classList.remove('navbar--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // Verifica estado inicial (caso a página já esteja scrollada)
  onScroll();
}


// ============================================
// 2. SCROLL ANIMATIONS — Fade-in ao entrar na viewport
// ============================================
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  // Respeita preferência do usuário
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('animate-in'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}


// ============================================
// 3. CONTADORES ANIMADOS
// ============================================
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateAllCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.1 });

  // Observa a seção de resultados
  const resultsSection = document.getElementById('resultados');
  if (resultsSection) {
    observer.observe(resultsSection);
  }

  function animateAllCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count);
      if (isNaN(target)) return;
      animateCounter(counter, target);
    });
  }

  function animateCounter(element, target) {
    const duration = 2000; // 2 segundos
    const start = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = Math.round(easedProgress * target);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }
}


// ============================================
// 4. MENU MOBILE
// ============================================
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('navbar__menu--open');
    toggle.classList.toggle('navbar__toggle--active');
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    
    // Trava scroll do body quando menu está aberto
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fecha menu ao clicar em um link
  const links = menu.querySelectorAll('.navbar__link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('navbar__menu--open');
      toggle.classList.remove('navbar__toggle--active');
      toggle.setAttribute('aria-label', 'Abrir menu');
      document.body.style.overflow = '';
    });
  });

  // Fecha menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('navbar__menu--open') &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)) {
      menu.classList.remove('navbar__menu--open');
      toggle.classList.remove('navbar__toggle--active');
      toggle.setAttribute('aria-label', 'Abrir menu');
      document.body.style.overflow = '';
    }
  });
}


// ============================================
// 5. SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}


// ============================================
// 6. ACTIVE LINK — Destaque no navbar conforme scroll
// ============================================
function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle(
            'navbar__link--active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => observer.observe(section));
}


// ============================================
// 7. PARALLAX NOS FLOATING CARDS DO HERO
// ============================================
function initParallaxCards() {
  const heroVisual = document.querySelector('.hero__visual');
  if (!heroVisual) return;

  // Só no desktop
  if (window.innerWidth < 1024) return;

  const cards = heroVisual.querySelectorAll('.hero__floating-card');

  heroVisual.addEventListener('mousemove', (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    cards.forEach((card, i) => {
      const factor = (i + 1) * 8;
      const moveX = x * factor;
      const moveY = y * factor;
      card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  heroVisual.addEventListener('mouseleave', () => {
    cards.forEach(card => {
      card.style.transform = 'translate(0, 0)';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => {
        card.style.transition = '';
      }, 500);
    });
  });
}


// ============================================
// 8. GLOW QUE SEGUE O MOUSE NOS CARDS
// ============================================
function initGlowFollow() {
  const cards = document.querySelectorAll('.problem-card, .service-card');

  cards.forEach(card => {
    const glow = card.querySelector('.problem-card__glow');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (glow) {
        glow.style.left = `${x - glow.offsetWidth / 2}px`;
        glow.style.top = `${y - glow.offsetHeight / 2}px`;
      }

      // Glow de borda sutil que segue o mouse
      card.style.background = `
        radial-gradient(
          300px circle at ${x}px ${y}px,
          rgba(65, 42, 156, 0.12),
          transparent 60%
        ),
        rgba(18, 18, 34, 0.35)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
}


// ============================================
// 9. RASTREAMENTO UTM NO WHATSAPP
// ============================================
function initUTMTracking() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');

  if (utmSource || utmMedium || utmCampaign) {
    const trackingInfo = ` [Origem: ${utmSource || 'N/A'} | Meio: ${utmMedium || 'N/A'} | Campanha: ${utmCampaign || 'N/A'}]`;
    
    const waLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
    waLinks.forEach(link => {
      const originalHref = link.getAttribute('href');
      if (originalHref.includes('?text=')) {
        link.setAttribute('href', originalHref + encodeURIComponent(trackingInfo));
      } else {
        const defaultMessage = "Olá, vim pelo site e quero estruturar minha máquina de aquisição de clientes.";
        link.setAttribute('href', originalHref + '?text=' + encodeURIComponent(defaultMessage + trackingInfo));
      }
    });
  } else {
    const waLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
    waLinks.forEach(link => {
      const originalHref = link.getAttribute('href');
      if (!originalHref.includes('?text=')) {
        const defaultMessage = "Olá, vim pelo site e quero estruturar minha máquina de aquisição de clientes.";
        link.setAttribute('href', originalHref + '?text=' + encodeURIComponent(defaultMessage));
      }
    });
  }
}

// ============================================
// 10. STICKY CTA (Mobile)
// ============================================
function initStickyCTA() {
  const stickyCta = document.getElementById('stickyCta');
  const heroSection = document.getElementById('hero');
  
  if (!stickyCta || !heroSection) return;

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  }, { threshold: 0.1 });

  observer.observe(heroSection);
}
