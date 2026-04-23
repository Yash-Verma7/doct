/* ============================================
   MAIN.JS — Global Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initCounters();
  initTestimonialCarousel();
  initAccordion();
  initNewsletterForm();
});

/* ── Navbar ── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const navLinks = document.querySelector('.navbar__links');

  // Create mobile overlay
  let overlay = document.querySelector('.mobile-nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    document.body.appendChild(overlay);
  }

  function closeMobileMenu() {
    hamburger?.classList.remove('open');
    navLinks?.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openMobileMenu() {
    hamburger?.classList.add('open');
    navLinks?.classList.add('open');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close on overlay click
  overlay?.addEventListener('click', closeMobileMenu);

  // Close on any nav link or CTA click
  navLinks?.querySelectorAll('.navbar__link, .navbar__cta').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks?.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Set active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks?.querySelectorAll('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ── Counter Animation ── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = prefix + Math.floor(current) + suffix;
  }, 16);
}

/* ── Testimonial Carousel ── */
function initTestimonialCarousel() {
  const carousel = document.querySelector('.testimonial-carousel');
  if (!carousel) return;

  const cards = carousel.querySelectorAll('.testimonial-card');
  const dots = carousel.parentElement?.querySelectorAll('.carousel-dot');
  let currentIndex = 0;

  function showSlide(index) {
    cards.forEach((card, i) => {
      card.style.display = i === index ? 'block' : 'none';
      card.style.opacity = i === index ? '1' : '0';
    });
    dots?.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  if (cards.length > 1) {
    showSlide(0);
    setInterval(() => {
      currentIndex = (currentIndex + 1) % cards.length;
      showSlide(currentIndex);
    }, 5000);

    dots?.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        currentIndex = i;
        showSlide(i);
      });
    });
  }
}

/* ── Accordion ── */
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-body').style.maxHeight = '0';
      });

      // Open clicked if not already open
      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ── Newsletter Form ── */
function initNewsletterForm() {
  document.querySelectorAll('.footer__newsletter-form, .newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input?.value) {
        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = '✓ Subscribed!';
        btn.style.background = 'var(--success)';
        input.value = '';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 3000);
      }
    });
  });
}

/* ── Modal ── */
function openModal(id) {
  document.getElementById(id)?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});
