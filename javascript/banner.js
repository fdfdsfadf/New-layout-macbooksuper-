(function () {
  const overlay = document.getElementById('bannerOverlay');
  const closeBtn = document.getElementById('closeBtn');
  const dismissBtn = document.getElementById('dismissBtn');
  const openSite = document.getElementById('openSite');

  const KEY = 'honk_banner_dismissed_v1';

  // Show banner on load unless dismissed earlier
  if (!localStorage.getItem(KEY)) {
    requestAnimationFrame(() =>
      setTimeout(() => {
        overlay.classList.add('visible');
        overlay.setAttribute('aria-hidden', 'false');
      }, 250)
    );
  }

  function hide(remember) {
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden', 'true');
    if (remember) localStorage.setItem(KEY, '1');
  }

  closeBtn.addEventListener('click', () => hide(false));
  dismissBtn.addEventListener('click', () => hide(true));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hide(false);
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hide(false);
  });
  openSite.addEventListener('click', () => hide(true));

  // ---------------------------------------------------------
  //  SECRET DEVELOPER RESET: type "developer code"
  // ---------------------------------------------------------
  let buffer = "";

  document.addEventListener("keydown", (e) => {
    buffer += e.key.toLowerCase();

    // keep only the last 20 chars so buffer doesn't grow forever
    if (buffer.length > 20) buffer = buffer.slice(-20);

    // detect secret phrase
    if (buffer.includes("developercode")) {
      localStorage.removeItem(KEY); // reset dismissal
      overlay.classList.add("visible");
      overlay.setAttribute("aria-hidden", "false");
      alert("Developer mode: banner reset");
    }
  });
})();
