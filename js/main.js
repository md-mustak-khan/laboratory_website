/* ==========================================================================
   Laboratory of Food Science and Nutraceuticals (LFSN) main.js
   - Mobile nav toggle (with backdrop)
   - Sticky header scroll effect
   - Active nav link highlighting (based on current filename)
   - Dynamic footer year
   - Smooth scroll for in-page anchors
   - IntersectionObserver reveal animations
   - Dropdown keyboard/accessibility support
   - Metric counter animations
   - Molarity & Dilution Calculator (Protocols)
   - FAQ Accordion (Join Us)
   - Contact / Enquiry Form validation
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initThemeToggle();
    initMobileNav();
    initStickyHeader();
    initActiveLink();
    initBackgroundImages();
    initFooterYear();
    initSmoothScroll();
    initProtocolNavActiveState();
    initRevealAnimations();
    initCounters();
    initDropdowns();
    initProtocolCalculators();
    initFaqAccordion();
    initForms();
    initPublicationAbstracts();
    initResourceFilter();
    initAlumniFeatures();
    initFacilitiesFilter();
  }

  /* ---------- Background images from HTML ---------- */
  function initBackgroundImages() {
    document.querySelectorAll('[data-bg-url],[data-bg-urls]').forEach(function (element) {
      const multi = element.getAttribute('data-bg-urls');
      const single = element.getAttribute('data-bg-url');
      if (multi) {
        const urls = multi.split(',').map(function (value) {
          return value.trim();
        }).filter(Boolean);
        if (!urls.length) return;

        element.classList.add('hero-slider');
        const wrapper = document.createElement('div');
        wrapper.className = 'hero-slider-bg-wrapper';

        const currentBg = document.createElement('div');
        currentBg.className = 'hero-slider-bg hero-slider-bg-current';
        currentBg.style.backgroundImage = "url('" + urls[0] + "')";

        const nextBg = document.createElement('div');
        nextBg.className = 'hero-slider-bg hero-slider-bg-next';
        nextBg.style.backgroundImage = "url('" + urls[0] + "')";

        wrapper.appendChild(currentBg);
        wrapper.appendChild(nextBg);
        element.insertBefore(wrapper, element.firstChild);

        let currentIndex = 0;
        setInterval(function () {
          const nextIndex = (currentIndex + 1) % urls.length;
          nextBg.style.backgroundImage = "url('" + urls[nextIndex] + "')";
          nextBg.classList.add('visible');

          window.setTimeout(function () {
            currentBg.style.backgroundImage = nextBg.style.backgroundImage;
            nextBg.classList.remove('visible');
            currentIndex = nextIndex;
          }, 900);
        }, 6000);

        return;
      }
      if (!single) return;
      element.style.setProperty('--banner-bg-image', "url('" + single + "')");
    });
  }

  /* ---------- Mobile nav ---------- */
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.primary-nav');
    const backdrop = document.querySelector('.nav-backdrop');
    if (!toggle || !nav) return;

    function setNavState(isOpen) {
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      nav.classList.toggle('open', isOpen);
      if (backdrop) backdrop.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      const navClose = nav.querySelector('.nav-close');
      if (navClose) navClose.style.display = isOpen ? 'flex' : 'none';
    }

    function openNav() {
      setNavState(true);
    }
    function closeNav() {
      setNavState(false);
    }

    (function ensureNavClose() {
      function createClose() {
        if (nav.querySelector('.nav-header-bar')) return;
        const bar = document.createElement('div');
        bar.className = 'nav-header-bar';
        bar.innerHTML = '<div class="nav-header-title"><span>LFSN</span> Navigation</div>' +
          '<button type="button" class="nav-close" aria-label="Close navigation">&times;</button>';
        const closeBtn = bar.querySelector('.nav-close');
        if (closeBtn) closeBtn.addEventListener('click', closeNav);
        nav.insertBefore(bar, nav.firstChild);
      }
      function removeClose() {
        const existing = nav.querySelector('.nav-header-bar') || nav.querySelector('.nav-close');
        if (existing) existing.remove();
      }

      function update() {
        if (window.innerWidth < 960) createClose(); else removeClose();
      }
      update();
      window.addEventListener('resize', update);
    })();

    toggle.addEventListener('click', function () {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeNav() : openNav();
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeNav);
    }

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 960) closeNav();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 960) {
        closeNav();
      } else {
        setNavState(nav.classList.contains('open'));
      }
    });
  }

  /* ---------- Sticky header shadow ---------- */
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Active nav link ---------- */
  function initActiveLink() {
    const path = window.location.pathname;
    const file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    const links = document.querySelectorAll('.nav-list a');
    links.forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkFile = href.substring(href.lastIndexOf('/') + 1);
      if (linkFile === file) {
        link.classList.add('active');
        const parentItem = link.closest('.nav-item.has-dropdown');
        if (parentItem) {
          const trigger = parentItem.querySelector(':scope > .nav-link');
          if (trigger) trigger.classList.add('active');
        }
      }
    });
  }

  /* ---------- Footer year ---------- */
  function initFooterYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Smooth scroll for #anchors ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const href = anchor.getAttribute('href');
        if (href.length <= 1) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const headerOffset = 80;
        const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    });
  }

  /* ---------- Active protocol nav link ---------- */
  function initProtocolNavActiveState() {
    const sections = document.querySelectorAll('.protocol-content [id], .resource-group[id]');
    if (!sections.length) return;
    const navLinks = document.querySelectorAll('.protocol-nav a');
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        const id = entry.target.id;
        const link = document.querySelector('.protocol-nav a[href="#' + id + '"]');
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (other) { other.classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---------- Reveal animations ---------- */
  function initRevealAnimations() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px 100px 0px' });
    items.forEach(function (el) { observer.observe(el); });

    // Automatically make hash targets visible immediately
    if (window.location.hash) {
      try {
        const hashEl = document.querySelector(window.location.hash);
        if (hashEl) hashEl.classList.add('visible');
      } catch (e) {}
    }
  }

  /* ---------- Stats / Metric Counters ---------- */
  function initCounters() {
    const counterElements = document.querySelectorAll('[data-counter-target]');
    if (!counterElements.length) return;

    function animateNumber(el) {
      const target = parseInt(el.getAttribute('data-counter-target'), 10) || 0;
      const suffix = el.getAttribute('data-counter-suffix') || '';
      const duration = 1800;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const value = Math.floor(easeOutQuad * target);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(tick);
    }

    if (!('IntersectionObserver' in window)) {
      counterElements.forEach(animateNumber);
      return;
    }

    const obs = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    counterElements.forEach(function (n) { obs.observe(n); });
  }

  /* ---------- Dropdowns (Desktop hover + Mobile click + Keyboard) ---------- */
  function initDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-item.has-dropdown');
    dropdowns.forEach(function (item) {
      const trigger = item.querySelector(':scope > .nav-link');
      if (!trigger) return;

      trigger.addEventListener('click', function (e) {
        if (window.innerWidth < 960) {
          e.preventDefault();
          const isOpen = item.classList.contains('open');
          dropdowns.forEach(function (d) { d.classList.remove('open'); });
          if (!isOpen) item.classList.add('open');
        }
      });

      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          if (window.innerWidth >= 960) {
            e.preventDefault();
            const firstLink = item.querySelector('.dropdown a');
            if (firstLink) firstLink.focus();
          }
        }
        if (e.key === 'Escape') {
          item.classList.remove('open');
          trigger.focus();
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (window.innerWidth >= 960) return;
      if (!e.target.closest('.nav-item.has-dropdown')) {
        dropdowns.forEach(function (d) { d.classList.remove('open'); });
      }
    });
  }

  /* ---------- Molarity & Dilution Calculator (Protocols) ---------- */
  function initProtocolCalculators() {
    const molWeight = document.getElementById('calc-mw');
    const molConc = document.getElementById('calc-conc');
    const molVol = document.getElementById('calc-vol');
    const molResult = document.getElementById('calc-mass-result');

    function calculateMolarity() {
      if (!molWeight || !molConc || !molVol || !molResult) return;
      const mw = parseFloat(molWeight.value) || 0;
      const conc = parseFloat(molConc.value) || 0; // Molar
      const vol = parseFloat(molVol.value) || 0;   // mL
      if (mw > 0 && conc > 0 && vol > 0) {
        const grams = (mw * conc * vol) / 1000;
        molResult.textContent = grams >= 1 ? grams.toFixed(3) + ' g' : (grams * 1000).toFixed(2) + ' mg';
      } else {
        molResult.textContent = '0.00 g';
      }
    }

    if (molWeight && molConc && molVol) {
      [molWeight, molConc, molVol].forEach(function (input) {
        input.addEventListener('input', calculateMolarity);
      });
    }

    // Dilution calculator: C1 * V1 = C2 * V2
    const c1 = document.getElementById('calc-c1');
    const v1Result = document.getElementById('calc-v1-result');
    const c2 = document.getElementById('calc-c2');
    const v2 = document.getElementById('calc-v2');

    function calculateDilution() {
      if (!c1 || !v1Result || !c2 || !v2) return;
      const stockC1 = parseFloat(c1.value) || 0;
      const targetC2 = parseFloat(c2.value) || 0;
      const targetV2 = parseFloat(v2.value) || 0;

      if (stockC1 > 0 && targetC2 > 0 && targetV2 > 0 && targetC2 <= stockC1) {
        const reqV1 = (targetC2 * targetV2) / stockC1;
        v1Result.textContent = reqV1 >= 1 ? reqV1.toFixed(2) + ' mL' : (reqV1 * 1000).toFixed(1) + ' µL';
      } else if (targetC2 > stockC1) {
        v1Result.textContent = 'Error: Target C2 > Stock C1';
      } else {
        v1Result.textContent = '0.00 mL';
      }
    }

    if (c1 && c2 && v2) {
      [c1, c2, v2].forEach(function (input) {
        input.addEventListener('input', calculateDilution);
      });
    }
  }

  /* ---------- FAQ Accordion (Join Us) ---------- */
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
      const trigger = item.querySelector('.faq-trigger');
      if (!trigger) return;
      trigger.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(function (f) { f.classList.remove('open'); });
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  /* ---------- Form Submissions & Application Handling ---------- */
  function initForms() {
    const contactForm = document.getElementById('contact-form');
    const undergradAppForm = document.getElementById('undergrad-app-form');

    // Generic contact form handler
    if (contactForm) {
      const status = document.getElementById('contact-form-status');
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = (contactForm.querySelector('[name="name"]') || {}).value || '';
        const email = (contactForm.querySelector('[name="email"]') || {}).value || '';
        const msg = (contactForm.querySelector('[name="message"]') || {}).value || '';

        if (!name || !email || !msg) {
          if (status) {
            status.textContent = 'Please fill in all required fields.';
            status.style.color = '#ef4444';
          }
          return;
        }

        const mailtoUrl = 'mailto:dsikdar@cu.ac.bd?subject=' + encodeURIComponent('LFSN Website Contact Inquiry') +
          '&body=' + encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + msg);

        if (status) {
          status.textContent = 'Opening your email client to send your message to dsikdar@cu.ac.bd...';
          status.style.color = 'var(--lab2-accent-dark)';
        }

        window.location.href = mailtoUrl;
        contactForm.reset();
      });
    }

    // Undergraduate Laboratory Application Form
    if (undergradAppForm) {
      // Configuration: Deployed Google Apps Script Web App URL
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyquZcBTwNlyN-vsNM9J-AONaiPs4gj_c0Dw9QMbMJms9scGAAFlnk-kwKQguzIIFw/exec';

      const appStatus = document.getElementById('app-form-status');
      const submitBtn = document.getElementById('app-submit-btn');
      const successBox = document.getElementById('app-success-box');
      const confName = document.getElementById('conf-applicant-name');
      const confEmail = document.getElementById('conf-applicant-email');
      const submitAnotherBtn = document.getElementById('app-submit-another-btn');

      // Helper to convert File to Base64 object
      function fileToBase64(file) {
        return new Promise(function (resolve, reject) {
          if (!file) return resolve(null);
          const reader = new FileReader();
          reader.onload = function () {
            resolve({
              name: file.name,
              type: file.type,
              size: file.size,
              data: reader.result
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      undergradAppForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = (document.getElementById('app-email') || {}).value || '';
        const name = (document.getElementById('app-name') || {}).value || '';
        const roll = (document.getElementById('app-roll') || {}).value || '';
        const session = (document.getElementById('app-session') || {}).value || '';
        const address = (document.getElementById('app-address') || {}).value || '';
        const whatsapp = (document.getElementById('app-whatsapp') || {}).value || '';

        const marksheetsInput = document.getElementById('app-marksheets');
        const cvInput = document.getElementById('app-cv');
        const sopInput = document.getElementById('app-sop');

        const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

        function getFile(input) {
          return input && input.files && input.files[0] ? input.files[0] : null;
        }

        const marksheetsFile = getFile(marksheetsInput);
        const cvFile = getFile(cvInput);
        const sopFile = getFile(sopInput);

        if (!email || !name || !roll || !session || !address || !whatsapp) {
          showAppError('Please complete all required text fields.');
          return;
        }

        if (!marksheetsFile || !cvFile || !sopFile) {
          showAppError('Please attach all 3 required files (Marksheets, CV, and SOP).');
          return;
        }

        if (marksheetsFile.size > MAX_SIZE) {
          showAppError('Marksheets file exceeds 10 MB limit. Please compress and re-upload.');
          return;
        }
        if (cvFile.size > MAX_SIZE) {
          showAppError('CV file exceeds 10 MB limit. Please compress and re-upload.');
          return;
        }
        if (sopFile.size > MAX_SIZE) {
          showAppError('SOP file exceeds 10 MB limit. Please compress and re-upload.');
          return;
        }

        // Show loading state on button
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>Uploading Documents &amp; Submitting...</span>';
        }

        if (appStatus) {
          appStatus.style.display = 'none';
        }

        try {
          // Encode files to Base64
          const [marksheetsBase64, cvBase64, sopBase64] = await Promise.all([
            fileToBase64(marksheetsFile),
            fileToBase64(cvFile),
            fileToBase64(sopFile)
          ]);

          const payload = {
            email: email,
            name: name,
            roll_number: roll,
            academic_session: session,
            present_address: address,
            whatsapp_number: whatsapp,
            marksheets: marksheetsBase64,
            cv: cvBase64,
            sop: sopBase64
          };

          // If Google Apps Script Web App URL is provided, send to Google Cloud backend
          if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.startsWith('http')) {
            await fetch(GOOGLE_SCRIPT_URL, {
              method: 'POST',
              mode: 'no-cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
          }

          // Show confirmation screen
          if (confName) confName.textContent = name;
          if (confEmail) confEmail.textContent = email;

          undergradAppForm.style.display = 'none';
          if (successBox) {
            successBox.style.display = 'block';
          }

          // Smooth scroll to top of confirmation card
          const formCard = document.getElementById('app-form-card');
          if (formCard) {
            formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }

        } catch (err) {
          console.error('Submission error:', err);
          showAppError('An error occurred during submission. Please try again or contact the lab administrator.');
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Submit Application</span>';
          }
        }
      });

      function showAppError(msg) {
        if (appStatus) {
          appStatus.style.display = 'block';
          appStatus.style.background = '#fef2f2';
          appStatus.style.color = '#dc2626';
          appStatus.style.border = '1px solid #fca5a5';
          appStatus.textContent = msg;
        }
      }

      if (submitAnotherBtn) {
        submitAnotherBtn.addEventListener('click', function () {
          undergradAppForm.reset();
          undergradAppForm.style.display = 'block';
          if (successBox) successBox.style.display = 'none';
          if (appStatus) appStatus.style.display = 'none';
        });
      }
    }
  }

  /* ---------- Dark Theme Toggle ---------- */
  function initThemeToggle() {
    const savedTheme = localStorage.getItem('lfsn-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    const headerInner = document.querySelector('.header-inner');
    if (!headerInner) return;

    let toggleBtn = document.querySelector('.theme-toggle-btn');
    if (!toggleBtn) {
      toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'theme-toggle-btn';
      toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
      updateThemeIcon(toggleBtn);
      
      const navToggle = document.querySelector('.nav-toggle');
      if (navToggle) {
        headerInner.insertBefore(toggleBtn, navToggle);
      } else {
        headerInner.appendChild(toggleBtn);
      }
    }

    toggleBtn.addEventListener('click', function () {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('lfsn-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('lfsn-theme', 'dark');
      }
      updateThemeIcon(toggleBtn);
    });

    function updateThemeIcon(btn) {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.innerHTML = isDark
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
  }

  /* ---------- Publication Abstract Toggle ---------- */
  function initPublicationAbstracts() {
    document.querySelectorAll('.btn-abstract-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const pubItem = btn.closest('.pub-item, .featured-pub-card');
        if (!pubItem) return;
        const abstract = pubItem.querySelector('.pub-abstract');
        if (!abstract) return;

        const isShown = abstract.classList.contains('is-visible');
        if (isShown) {
          abstract.classList.remove('is-visible');
          btn.innerHTML = 'Show Abstract <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
          btn.setAttribute('aria-expanded', 'false');
        } else {
          abstract.classList.add('is-visible');
          btn.innerHTML = 'Hide Abstract <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---------- Resources Instant Search & Filtering ---------- */
  function initResourceFilter() {
    const searchInput = document.getElementById('resource-search') || document.getElementById('resource-search-box-input');
    if (!searchInput) return;

    const toolCards = document.querySelectorAll('.tool-card');
    const subheaders = document.querySelectorAll('.subcategory-header');

    searchInput.addEventListener('input', function () {
      const query = searchInput.value.toLowerCase().trim();

      toolCards.forEach(function (card) {
        const text = (card.textContent || '').toLowerCase();
        const matches = !query || text.includes(query);
        card.style.display = matches ? 'flex' : 'none';
      });

      // Hide or show subheaders based on remaining visible cards in their sections
      subheaders.forEach(function (header) {
        let sibling = header.nextElementSibling;
        let hasVisible = false;
        while (sibling && !sibling.classList.contains('subcategory-header')) {
          if (sibling.classList.contains('tool-card') && sibling.style.display !== 'none') {
            hasVisible = true;
            break;
          }
          if (sibling.classList.contains('tools-grid')) {
            const visibleInGrid = sibling.querySelectorAll('.tool-card:not([style*="display: none"])');
            if (visibleInGrid.length > 0) {
              hasVisible = true;
              break;
            }
          }
          sibling = sibling.nextElementSibling;
        }
        header.style.display = (!query || hasVisible) ? 'block' : 'none';
      });
    });
  }

  /* ---------- Alumni Filter & Search ---------- */
  function initAlumniFeatures() {
    const searchInput = document.getElementById('alumni-search');
    const filterBtns = document.querySelectorAll('.alumni-filter-btn');
    const cards = document.querySelectorAll('.alumni-card');
    const toggleTableBtn = document.getElementById('toggle-alumni-table-btn');
    const tableContainer = document.getElementById('alumni-table-container');
    const toggleLabel = document.getElementById('toggle-table-label');

    if (toggleTableBtn && tableContainer) {
      toggleTableBtn.addEventListener('click', function () {
        const isHidden = tableContainer.style.display === 'none' || !tableContainer.style.display;
        tableContainer.style.display = isHidden ? 'block' : 'none';
        toggleTableBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        if (toggleLabel) {
          toggleLabel.textContent = isHidden ? 'Hide Compact Alumni Directory Table' : 'View Compact Alumni Directory Table';
        }
      });
    }

    if (!cards.length) return;

    let activeFilter = 'all';
    let searchQuery = '';

    function filterAlumni() {
      cards.forEach(function (card) {
        const categories = (card.getAttribute('data-category') || '').toLowerCase();
        const textContent = card.textContent.toLowerCase();

        const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
        const matchesSearch = !searchQuery || textContent.includes(searchQuery);

        if (matchesFilter && matchesSearch) {
          card.style.display = 'grid';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        searchQuery = e.target.value.trim().toLowerCase();
        filterAlumni();
      });
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter') || 'all';
        filterAlumni();
      });
    });
  }

  /* ---------- Facilities & Equipment Filtering ---------- */
  function initFacilitiesFilter() {
    const filterBtns = document.querySelectorAll('.facility-filter-btn');
    const cards = document.querySelectorAll('.facility-item-card');
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        const filter = (btn.getAttribute('data-filter') || 'all').toLowerCase();

        cards.forEach(function (card) {
          const category = (card.getAttribute('data-category') || '').toLowerCase();
          if (filter === 'all' || category.includes(filter)) {
            card.style.display = 'flex';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });
      });
    });
  }

  /* ---------- Custom pointer (desktop only) ---------- */
  function initCustomCursor() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    try {
      document.body.classList.add('custom-cursor-enabled');
      const cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      cursor.style.pointerEvents = 'none';
      cursor.style.opacity = '0';

      const ring = document.createElement('div');
      ring.className = 'ring';
      const dot = document.createElement('div');
      dot.className = 'dot';

      cursor.appendChild(ring);
      cursor.appendChild(dot);
      document.body.appendChild(cursor);

      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let posX = mouseX;
      let posY = mouseY;

      function update() {
        posX += (mouseX - posX) * 0.18;
        posY += (mouseY - posY) * 0.18;
        cursor.style.left = posX + 'px';
        cursor.style.top = posY + 'px';
        requestAnimationFrame(update);
      }
      requestAnimationFrame(update);

      document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
      }, { passive: true });

      document.addEventListener('mouseleave', function () { cursor.classList.add('hidden'); });
      document.addEventListener('mouseenter', function () { cursor.classList.remove('hidden'); cursor.style.opacity = ''; });

      const interactiveSelector = 'a, button, input, textarea, select, .btn, .gallery-item, .faq-trigger';
      document.addEventListener('mouseover', function (e) {
        if (e.target.closest(interactiveSelector)) cursor.classList.add('interact');
      });
      document.addEventListener('mouseout', function (e) {
        if (e.target.closest(interactiveSelector)) cursor.classList.remove('interact');
      });
    } catch (err) {
      console.error('Custom cursor init failed', err);
    }
  }

  if (typeof initCustomCursor === 'function') initCustomCursor();
})();