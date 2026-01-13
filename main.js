(function() {
  const nav = document.querySelector('.main-nav');
  const toggle = document.getElementById('mobile-menu-toggle');

  if (toggle && nav) {
    // Create overlay element for menu
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    // Create close button for menu
    const closeBtn = document.createElement('button');
    closeBtn.className = 'menu-close-btn';
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.innerHTML = '&times;';
    nav.insertBefore(closeBtn, nav.firstChild);

    function openMenu() {
      nav.classList.add('open');
      overlay.classList.add('active');
      document.body.classList.add('menu-open');
    }

    function closeMenu() {
      nav.classList.remove('open');
      overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    }

    toggle.addEventListener('click', function() {
      if (nav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener('click', closeMenu);
    closeBtn.addEventListener('click', closeMenu);

    // Close menu when clicking on any menu item link
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });
  }

  // Dispensary links
  const dispBtn = document.getElementById('dispensary-search-btn');
  const dispLocationInput = document.getElementById('dispensary-location');
  const partnerLinksContainer = document.getElementById('dispensary-partner-links');

  if (dispBtn && dispLocationInput && partnerLinksContainer) {
    dispBtn.addEventListener('click', function() {
      const query = (dispLocationInput.value || '').trim();
      partnerLinksContainer.innerHTML = "";
      if (!query) {
        partnerLinksContainer.innerHTML = "<p class='section-note'>Enter a city or ZIP to see partner directory links.</p>";
        return;
      }
      const encoded = encodeURIComponent(query);
      const links = [
        {
          label: "Open Weedmaps for \"" + query + "\"",
          url: "https://weedmaps.com/dispensaries/in/" + encoded
        },
        {
          label: "Open Leafly for \"" + query + "\"",
          url: "https://www.leafly.com/dispensaries/search?latitude=&longitude=&q=" + encoded
        }
      ];
      links.forEach(function(l) {
        const a = document.createElement('a');
        a.href = l.url;
        a.target = "_blank";
        a.rel = "noopener sponsored";
        a.textContent = l.label;
        partnerLinksContainer.appendChild(a);
      });
    });
  }
})();
