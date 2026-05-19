(function() {
  if (localStorage.getItem('weediesai_age_verified') === 'yes') return;

  var isBot = /bot|crawl|spider|slurp|googlebot|bingbot|yandex|baidu|duckduck/i.test(navigator.userAgent);
  if (isBot) return;

  var overlay = document.createElement('div');
  overlay.id = 'age-gate-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Age verification');

  overlay.innerHTML =
    '<div class="age-gate-box">' +
      '<img src="/cannabis-leaf-icon.png" alt="" class="age-gate-leaf">' +
      '<h2 class="age-gate-title">Welcome to WEEDIES AI</h2>' +
      '<p class="age-gate-question">Are you 21 years of age or older?</p>' +
      '<p class="age-gate-note">This site contains cannabis-related content intended for adults only.</p>' +
      '<div class="age-gate-buttons">' +
        '<button id="age-gate-yes" class="age-gate-btn age-gate-btn-yes">Yes, I\'m 21+</button>' +
        '<button id="age-gate-no" class="age-gate-btn age-gate-btn-no">No</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);
  document.body.classList.add('age-gate-active');

  document.getElementById('age-gate-yes').addEventListener('click', function() {
    localStorage.setItem('weediesai_age_verified', 'yes');
    overlay.classList.add('age-gate-closing');
    document.body.classList.remove('age-gate-active');
    setTimeout(function() { overlay.remove(); }, 300);
  });

  document.getElementById('age-gate-no').addEventListener('click', function() {
    document.body.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#020617;color:#e5e7eb;font-family:system-ui,sans-serif;text-align:center;padding:2rem;">' +
        '<div>' +
          '<h1 style="font-size:1.5rem;margin-bottom:1rem;color:#ffffff;">You must be 21 or older</h1>' +
          '<p style="font-size:0.95rem;max-width:400px;margin:0 auto 1.5rem;line-height:1.6;">This website contains cannabis-related content and is only available to adults aged 21 and older.</p>' +
          '<a href="https://www.google.com" style="color:#a5f3fc;font-size:0.9rem;">Leave this site</a>' +
        '</div>' +
      '</div>';
  });
})();
