/* ==========================================================================
   Gallery lightbox & Category Filter
   - Category filtering pills (All / Microscopy / Lab / Events)
   - Click a .gallery-item to open in full lightbox
   - Close: X button, backdrop click, Esc key
   - Navigate: prev / next buttons, arrow keys
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery-grid, .gallery-grid-enhanced');
    const lightbox = document.getElementById('lightbox');
    const filterPills = document.querySelectorAll('.gallery-pill');

    if (!lightbox) return;

    const mediaEl = lightbox.querySelector('.lightbox-media');
    const titleEl = lightbox.querySelector('.lightbox-title');
    const descEl = lightbox.querySelector('.lightbox-desc');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let allItems = Array.from(document.querySelectorAll('.gallery-item, .gallery-item-enhanced, .gallery-spotlight-card'));
    let gridItems = Array.from(document.querySelectorAll('.gallery-item, .gallery-item-enhanced'));
    let visibleItems = allItems;
    let currentIndex = 0;
    let lastFocused = null;

    // Category Filter Pills
    filterPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        filterPills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        const cat = pill.dataset.category || 'all';

        visibleItems = allItems.filter(function (item) {
          const itemCat = item.dataset.category || 'all';
          const match = cat === 'all' || itemCat === cat || itemCat.includes(cat);
          if (gridItems.includes(item)) {
            item.style.display = match ? '' : 'none';
          }
          return match;
        });
      });
    });

    function openLightbox(item) {
      let targetList = visibleItems.includes(item) ? visibleItems : allItems;
      const idx = targetList.indexOf(item);
      if (idx === -1) return;
      visibleItems = targetList;
      currentIndex = idx;
      render();
      lightbox.classList.add('open');
      lastFocused = document.activeElement;
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    function render() {
      const item = visibleItems[currentIndex];
      if (!item) return;
      const img = item.querySelector('img');
      const src = item.dataset.src || (img ? img.src : '');
      const alt = item.dataset.alt || (img ? img.alt : '');
      const title = item.dataset.title || (img ? img.alt : '');
      const desc = item.dataset.desc || '';

      if (mediaEl) {
        mediaEl.innerHTML = '';
        if (src) {
          const fullImg = document.createElement('img');
          fullImg.src = src;
          fullImg.alt = alt;
          mediaEl.appendChild(fullImg);
        }
      }
      if (titleEl) titleEl.textContent = title;
      if (descEl) descEl.textContent = desc;
    }

    function next() {
      if (!visibleItems.length) return;
      currentIndex = (currentIndex + 1) % visibleItems.length;
      render();
    }
    function prev() {
      if (!visibleItems.length) return;
      currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
      render();
    }

    // Bind clicks on gallery items
    allItems.forEach(function (item) {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', 'View image in gallery');
      item.addEventListener('click', function () { openLightbox(item); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(item);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
  });
})();