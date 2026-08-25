/* ==========================================================================
   Publications filter & Citation Tools
   - Live search (title / authors / journal)
   - Filter by Research Theme pills
   - Filter by Principal Investigator
   - Filter by year
   - One-click "Copy Citation" with tooltip feedback
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('pub-search');
    const yearFilter = document.getElementById('pub-year-filter');
    const piFilter = document.getElementById('pub-pi-filter');
    const list = document.getElementById('pub-list');
    const countEl = document.getElementById('pub-count');
    const emptyEl = document.getElementById('pub-empty');
    const themePills = document.querySelectorAll('.theme-pill');

    if (!list) return;

    const items = Array.from(list.querySelectorAll('.pub-item'));
    let activeTheme = 'all';

    function applyFilters() {
      const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
      const year = yearFilter ? yearFilter.value : 'all';
      const pi = piFilter ? piFilter.value : 'all';

      let visible = 0;
      items.forEach(function (item) {
        const itemYear = item.dataset.year || '';
        const itemTheme = (item.dataset.theme || 'all').toLowerCase();
        const itemPi = (item.dataset.pi || 'both').toLowerCase();
        const text = (item.dataset.search || '').toLowerCase();

        const matchesYear = year === 'all' || itemYear === year;
        const matchesTheme = activeTheme === 'all' || itemTheme.indexOf(activeTheme) !== -1;
        const matchesPi = pi === 'all' || itemPi.indexOf(pi) !== -1 || text.indexOf(pi) !== -1;
        const matchesQuery = !query || text.indexOf(query) !== -1;

        const show = matchesYear && matchesTheme && matchesPi && matchesQuery;
        item.style.display = show ? '' : 'none';
        if (show) visible++;
      });

      if (countEl) countEl.textContent = visible;
      if (emptyEl) emptyEl.style.display = visible === 0 ? 'block' : 'none';
    }

    // Theme pill click listener
    themePills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        themePills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        activeTheme = pill.dataset.theme || 'all';
        applyFilters();
      });
    });

    [searchInput, yearFilter, piFilter].forEach(function (el) {
      if (!el) return;
      el.addEventListener('input', applyFilters);
      el.addEventListener('change', applyFilters);
    });

    // Copy Citation tool
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-copy-citation');
      if (!btn) return;
      const pubItem = btn.closest('.pub-item');
      if (!pubItem) return;

      const titleEl = pubItem.querySelector('h4');
      const authorsEl = pubItem.querySelector('.pub-authors');
      const journalEl = pubItem.querySelector('.pub-journal');
      const year = pubItem.dataset.year || '';

      const title = titleEl ? titleEl.textContent.trim() : '';
      const authors = authorsEl ? authorsEl.textContent.trim() : '';
      const journal = journalEl ? journalEl.textContent.trim() : '';

      const citationText = authors + ' (' + year + '). ' + title + '. ' + journal + '.';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(citationText).then(function () {
          const originalText = btn.innerHTML;
          btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg> Copied!';
          btn.style.color = '#15803d';
          btn.style.borderColor = '#bbf7d0';
          setTimeout(function () {
            btn.innerHTML = originalText;
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 2000);
        });
      }
    });

    // Initial filter execution
    applyFilters();
  });
})();