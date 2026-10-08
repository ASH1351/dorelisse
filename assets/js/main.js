/**
 * DORÈLISSE PARIS — LUXURY BEAUTY & SKINCARE
 * Haute Horlogerie & Parfumerie Skincare Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --- 1. PRODUCT CATALOG DATA --- */
  const PRODUCTS = [
    {
      id: 'serum-sublime',
      name: "L'Élixir Sublime Serum",
      category: 'Intensive Radiance Concentrate',
      price: 145,
      image: 'assets/images/prod_serum.jpg',
      benefit: 'Bio-fermented 24K gold peptides and Kakadu vitamin C for visible luminous skin in 7 days.',
      details: 'A silky, weightless golden nectar that penetrates deep into cellular layers to ignite natural luminosity, eliminate oxidative dullness, and smooth micro-texture.',
      volume: '30 ml / 1.0 fl. oz.'
    },
    {
      id: 'creme-celeste',
      name: 'Crème Céleste Day Velvet',
      category: 'Silk Barrier Hydration',
      price: 125,
      image: 'assets/images/prod_daycream.jpg',
      benefit: 'Whipped botanical ceramides that seal in 72-hour moisture with an airy, cushion-soft finish.',
      details: 'Formulated with French alpine water, damask rose, and silk amino peptides. Shields skin against urban pollution while maintaining a dewy, non-greasy glow.',
      volume: '50 ml / 1.7 oz. net wt.'
    },
    {
      id: 'baume-nocturne',
      name: 'Baume Nocturne Recovery',
      category: 'Cellular Night Regeneration',
      price: 135,
      image: 'assets/images/prod_nightcream.jpg',
      benefit: 'Deep lipid repair and collagen awakening while you sleep for rested, firmer morning radiance.',
      details: 'Infused with cold-pressed Parisian botanicals and bakuchiol. Transforms fatigued, dry skin into plump, velvety radiance by dawn.',
      volume: '50 ml / 1.7 oz. net wt.'
    },
    {
      id: 'gelee-purifiante',
      name: 'Gelée Purifiante Cleanser',
      category: 'Micellar Botanical Melting Gel',
      price: 75,
      image: 'assets/images/prod_cleanser.jpg',
      benefit: 'Ultra-gentle melting gel that dissolves impurities without stripping delicate moisture.',
      details: 'pH 5.5 balanced gentle cleanser with organic chamomile and rosewater. Leaves skin supple, pure, and ready to receive golden actives.',
      volume: '150 ml / 5.1 fl. oz.'
    },
    {
      id: 'regard-precieux',
      name: 'Regard Précieux Eye Elixir',
      category: 'Micro-Circulation Lifting Nectar',
      price: 95,
      image: 'assets/images/prod_eyecare.jpg',
      benefit: 'Targeted cooling peptide formula that visibly brightens dark circles and softens fine lines.',
      details: 'Engineered specifically for the thin periorbital zone. Caffeine micro-crystals and gold bio-peptides relieve morning puffiness within minutes.',
      volume: '15 ml / 0.5 fl. oz.'
    },
    {
      id: 'brume-florale',
      name: 'Brume Florale Hydrating Veil',
      category: 'Precious Damask Rose Mist',
      price: 65,
      image: 'assets/images/prod_facemist.jpg',
      benefit: 'Instant dewy revitalization and antioxidant shield with pure distilled French blossoms.',
      details: 'Ultra-fine golden micro-droplet diffuser envelopes skin in a cloud of moisture. Ideal to prime, set, or refresh throughout your day.',
      volume: '100 ml / 3.4 fl. oz.'
    }
  ];

  /* --- 2. PRELOADER ANIMATION --- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const minPreloadTime = 2200;
    const startTime = Date.now();
    
    const dismissPreloader = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minPreloadTime - elapsed);
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 800);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      dismissPreloader();
    } else {
      window.addEventListener('load', dismissPreloader);
    }
  }

  /* --- 3. CUSTOM SOFT CURSOR GLOW (DESKTOP) --- */
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      // Smooth interpolation (lerp)
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
  }

  /* --- 4. FLOATING GOLDEN PARTICLES (HERO CANVAS) --- */
  const particlesCanvas = document.getElementById('heroParticlesCanvas');
  if (particlesCanvas) {
    const ctx = particlesCanvas.getContext('2d');
    let width = particlesCanvas.width = particlesCanvas.parentElement.offsetWidth;
    let height = particlesCanvas.height = particlesCanvas.parentElement.offsetHeight;

    window.addEventListener('resize', () => {
      if (!particlesCanvas.parentElement) return;
      width = particlesCanvas.width = particlesCanvas.parentElement.offsetWidth;
      height = particlesCanvas.height = particlesCanvas.parentElement.offsetHeight;
    });

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 22 : 45;
    const particles = [];

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.2 + 0.6;
        this.speedY = -(Math.random() * 0.45 + 0.15);
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.6 + 0.2;
        this.pulse = Math.random() * 0.02 + 0.01;
        this.pulseDir = 1;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.alpha += this.pulse * this.pulseDir;
        if (this.alpha > 0.8) this.pulseDir = -1;
        if (this.alpha < 0.15) this.pulseDir = 1;
        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
          this.y = height + 10;
        }
      }
      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 151, 63, ${this.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(243, 217, 160, 0.8)';
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let isVisible = true;
    const heroObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    heroObserver.observe(particlesCanvas);

    const renderParticles = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
          p.update();
          p.draw();
        });
      }
      requestAnimationFrame(renderParticles);
    };
    renderParticles();
  }

  /* --- 5. NAVBAR SCROLL EFFECT & MOBILE MENU --- */
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  if (hamburgerBtn && mobileNavOverlay) {
    const toggleMenu = () => {
      const isOpen = hamburgerBtn.classList.toggle('active');
      mobileNavOverlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    hamburgerBtn.addEventListener('click', toggleMenu);

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileNavOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- 6. BEFORE & AFTER DRAG COMPARISON SLIDER --- */
  const sliderContainer = document.getElementById('comparisonSlider');
  const beforeImage = document.getElementById('comparisonBefore');
  const sliderDivider = document.getElementById('sliderDivider');

  if (sliderContainer && beforeImage && sliderDivider) {
    let isDragging = false;

    const setSliderPosition = (clientX) => {
      const rect = sliderContainer.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      let percentage = (offsetX / rect.width) * 100;
      percentage = Math.max(4, Math.min(96, percentage));

      beforeImage.style.width = `${percentage}%`;
      sliderDivider.style.left = `${percentage}%`;
    };

    const startDrag = (e) => {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setSliderPosition(clientX);
    };

    const doDrag = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setSliderPosition(clientX);
    };

    const stopDrag = () => {
      isDragging = false;
    };

    sliderContainer.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', stopDrag);

    sliderContainer.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('touchmove', doDrag, { passive: true });
    window.addEventListener('touchend', stopDrag);
  }

  /* --- 7. ANIMATED STAT COUNTERS --- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const countUp = (el, target, duration = 1800) => {
    let start = 0;
    const startTime = performance.now();
    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = `${current}%`;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${target}%`;
      }
    };
    requestAnimationFrame(update);
  };

  const statsSection = document.getElementById('resultsSection');
  if (statsSection && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !statsCounted) {
        statsCounted = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10) || 100;
          countUp(stat, target);
        });
      }
    }, { threshold: 0.35 });
    statsObserver.observe(statsSection);
  }

  /* --- 8. 7-DAY GLOW JOURNEY PROGRESS TIMELINE --- */
  const journeySection = document.getElementById('journeySection');
  const journeyProgressLine = document.getElementById('journeyProgressLine');
  const journeyStepRows = document.querySelectorAll('.journey-step-row');

  if (journeySection && journeyProgressLine) {
    const updateTimelineProgress = () => {
      const rect = journeySection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll fraction inside timeline
      const totalDist = rect.height;
      const scrolled = viewportHeight * 0.65 - rect.top;
      let ratio = scrolled / totalDist;
      ratio = Math.max(0, Math.min(1, ratio));

      journeyProgressLine.style.height = `${ratio * 100}%`;

      // Activate steps as line reaches them
      journeyStepRows.forEach((row, idx) => {
        const rowRect = row.getBoundingClientRect();
        if (rowRect.top < viewportHeight * 0.7) {
          row.classList.add('active');
        } else {
          row.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', updateTimelineProgress, { passive: true });
    updateTimelineProgress();
  }

  /* --- 9. REVEAL-ON-SCROLL ANIMATIONS --- */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --- 10. SHOPPING BAG / CART STATE & DRAWER --- */
  let cart = [];
  try {
    const saved = localStorage.getItem('dorelisse_cart');
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = [];
  }

  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  const openCartBtns = document.querySelectorAll('.open-cart-btn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartBody = document.getElementById('cartBody');
  const cartBadge = document.getElementById('cartBadge');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const freeShippingFill = document.getElementById('freeShippingFill');
  const freeShippingText = document.getElementById('freeShippingText');

  const FREE_SHIPPING_THRESHOLD = 150;

  const saveCart = () => {
    try {
      localStorage.setItem('dorelisse_cart', JSON.stringify(cart));
    } catch (e) {}
  };

  const updateCartUI = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Badges
    if (cartBadge) {
      cartBadge.textContent = totalItems;
      cartBadge.classList.add('bump');
      setTimeout(() => cartBadge.classList.remove('bump'), 300);
    }

    // Subtotal
    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = `€${subtotal.toLocaleString()}`;
    }

    // Shipping progress
    if (freeShippingFill && freeShippingText) {
      const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
      if (remaining <= 0) {
        freeShippingFill.style.width = '100%';
        freeShippingText.innerHTML = '<strong>Félicitations!</strong> You have unlocked complimentary express shipping from Paris.';
      } else {
        const pct = Math.min(100, Math.max(10, (subtotal / FREE_SHIPPING_THRESHOLD) * 100));
        freeShippingFill.style.width = `${pct}%`;
        freeShippingText.innerHTML = `Add <strong>€${remaining.toFixed(0)}</strong> more to receive complimentary express delivery from Paris.`;
      }
    }

    // Cart Items Rendering
    if (cartBody) {
      if (cart.length === 0) {
        cartBody.innerHTML = `
          <div class="cart-empty-message">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="margin: 0 auto 1rem; color: var(--c-gold); display: block;">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <p style="font-family: var(--font-serif); font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--c-espresso);">Your shopping bag is empty</p>
            <p style="font-size: 0.85rem;">Discover our 7-Day glow rituals to begin your skin transformation.</p>
          </div>
        `;
      } else {
        cartBody.innerHTML = cart.map(item => `
          <div class="cart-item-card" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
              <h5 class="cart-item-name">${item.name}</h5>
              <div class="cart-item-price">€${item.price} each</div>
              <div class="cart-qty-controls">
                <button type="button" class="qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                <span class="qty-val">${item.quantity}</span>
                <button type="button" class="qty-btn" data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
                <button type="button" class="btn-remove" data-action="remove" data-id="${item.id}" style="font-size: 0.72rem; color: var(--c-espresso-light); text-decoration: underline; margin-left: 0.8rem; background: none; border: none; cursor: pointer;">Remove</button>
              </div>
            </div>
            <div style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--c-espresso); font-weight: 500;">
              €${item.price * item.quantity}
            </div>
          </div>
        `).join('');
      }
    }
  };

  const addToCart = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    saveCart();
    updateCartUI();
    showToast(`Added "${product.name}" to your bag.`);

    // Automatically open drawer
    if (cartDrawerOverlay) {
      cartDrawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  // Cart Qty Event Delegation
  if (cartBody) {
    cartBody.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;

      const action = btn.dataset.action;
      const id = btn.dataset.id;
      const item = cart.find(i => i.id === id);
      if (!item) return;

      if (action === 'increase') {
        item.quantity += 1;
      } else if (action === 'decrease') {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          cart = cart.filter(i => i.id !== id);
        }
      } else if (action === 'remove') {
        cart = cart.filter(i => i.id !== id);
      }

      saveCart();
      updateCartUI();
    });
  }

  // Cart Drawer open/close listeners
  openCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (cartDrawerOverlay) {
        cartDrawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeCartBtn && cartDrawerOverlay) {
    closeCartBtn.addEventListener('click', () => {
      cartDrawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });

    cartDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === cartDrawerOverlay) {
        cartDrawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Hook all "Add to Bag" buttons
  document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-add-to-cart');
      addToCart(id);
    });
  });

  // Checkout button simulation
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your shopping bag is empty.');
        return;
      }
      showToast('Merci! Redirecting to secure Parisian checkout...');
      setTimeout(() => {
        alert('✨ Dorèlisse Paris Checkout Simulation\n\nThank you for choosing chemical-free luxury skincare. Your bespoke Paris order with 10% gift privilege is prepared with signature silk ribbons and complimentary golden travel miniatures.');
      }, 700);
    });
  }

  /* --- 11. QUICK VIEW MODAL --- */
  const quickViewOverlay = document.getElementById('quickViewOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImage = document.getElementById('modalImage');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalBenefit = document.getElementById('modalBenefit');
  const modalDetails = document.getElementById('modalDetails');
  const modalVolume = document.getElementById('modalVolume');
  const modalPrice = document.getElementById('modalPrice');
  const modalAddBtn = document.getElementById('modalAddBtn');

  const openQuickView = (productId) => {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod || !quickViewOverlay) return;

    modalImage.src = prod.image;
    modalImage.alt = prod.name;
    modalCategory.textContent = prod.category;
    modalTitle.textContent = prod.name;
    modalBenefit.textContent = prod.benefit;
    modalDetails.textContent = prod.details;
    modalVolume.textContent = prod.volume;
    modalPrice.textContent = `€${prod.price}`;
    modalAddBtn.setAttribute('data-add-to-cart', prod.id);

    quickViewOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  document.querySelectorAll('[data-quick-view]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-quick-view');
      openQuickView(id);
    });
  });

  if (modalCloseBtn && quickViewOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      quickViewOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });

    quickViewOverlay.addEventListener('click', (e) => {
      if (e.target === quickViewOverlay) {
        quickViewOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  if (modalAddBtn) {
    modalAddBtn.addEventListener('click', () => {
      const id = modalAddBtn.getAttribute('data-add-to-cart');
      addToCart(id);
      quickViewOverlay.classList.remove('open');
    });
  }

  /* --- 12. TESTIMONIALS SLIDER --- */
  const track = document.getElementById('testimonialsTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const dotsContainer = document.getElementById('sliderDots');

  if (track && slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayTimer = null;

    // Create dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      });
    }

    const updateSlider = () => {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentSlide);
        });
      }
    };

    const goToSlide = (idx) => {
      currentSlide = (idx + totalSlides) % totalSlides;
      updateSlider();
    };

    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));

    // Auto Play
    const startAutoPlay = () => {
      stopAutoPlay();
      autoPlayTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 6000);
    };

    const stopAutoPlay = () => {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    };

    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    // Touch Swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      stopAutoPlay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 45) {
        if (diff > 0) goToSlide(currentSlide + 1);
        else goToSlide(currentSlide - 1);
      }
      startAutoPlay();
    });

    startAutoPlay();
  }

  /* --- 13. NEWSLETTER / SPECIAL OFFER FORM --- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        showToast(`Bienvenue! Your 10% privilege code GLOW10 has been sent to ${emailInput.value.trim()}`);
        emailInput.value = '';
      }
    });
  }

  /* --- 14. INGREDIENT INTERACTION MODAL / INFO TOAST --- */
  document.querySelectorAll('.ingredient-item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.querySelector('.ingredient-name')?.textContent || 'Natural Active';
      const detail = item.getAttribute('data-info') || 'Pure, chemical-free active botanical.';
      showToast(`✨ ${name}: ${detail}`);
    });
  });

  /* --- 15. WHATSAPP CONSEILLER INTERACTION --- */
  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const message = encodeURIComponent("Bonjour Dorèlisse Paris, I would like personal advice on finding the right 7-Day Glow skincare ritual for my skin type.");
      window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
    });
  }

  /* --- 16. TOAST NOTIFICATION UTILITY --- */
  const toastNotice = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastText');
  let toastTimeout = null;

  function showToast(message) {
    if (!toastNotice || !toastText) return;
    toastText.textContent = message;
    toastNotice.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3800);
  }

  // Initial cart UI sync
  updateCartUI();
});
