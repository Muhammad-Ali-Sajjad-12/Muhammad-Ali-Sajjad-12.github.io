// Theme switch: flips between light and dark, remembers the visitor's choice,
// and spreads the new theme in a circle that starts at the switch.
(function () {
  const root = document.documentElement;
  const toggle = document.querySelector('.toggle');
  const themeColors = { light: '#F5F6FB', dark: '#0A0F22' };
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let isSwitching = false;

  // localStorage can throw in private windows or when storage is blocked, so guard every access.
  function getSavedTheme() {
    try {
      const saved = localStorage.getItem('theme');
      return saved === 'light' || saved === 'dark' ? saved : null;
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      // Nothing to do: the theme still changes, it just won't be remembered.
    }
  }

  function getCurrentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  // Sets the theme and the browser bar colour on phones.
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.setAttribute('content', themeColors[theme]);
    });
  }

  // The centre of the switch, so the circle starts exactly where the visitor clicked.
  function getSwitchCentre() {
    const box = toggle.getBoundingClientRect();
    return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
  }

  // Modern browsers: snapshot the old page, then reveal the new one through a growing circle.
  function switchWithViewTransition(nextTheme, centre) {
    root.classList.add('theme-switching');
    const transition = document.startViewTransition(() => applyTheme(nextTheme));

    transition.ready.then(() => {
      // The circle must reach the farthest corner of the screen to cover everything.
      const radius = Math.hypot(
        Math.max(centre.x, window.innerWidth - centre.x),
        Math.max(centre.y, window.innerHeight - centre.y)
      );
      root.animate(
        {
          clipPath: [
            `circle(0px at ${centre.x}px ${centre.y}px)`,
            `circle(${radius}px at ${centre.x}px ${centre.y}px)`
          ]
        },
        { duration: 800, easing: 'cubic-bezier(.6, 0, .3, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    });

    transition.finished.finally(() => {
      root.classList.remove('theme-switching');
      isSwitching = false;
    });
  }

  // Older browsers: cover the page with a circle of the new colour, swap underneath, then fade out.
  // Timings match the design: covered at 400 ms, overlay gone at 820 ms.
  function switchWithOverlay(nextTheme, centre) {
    const overlay = document.createElement('div');
    overlay.className = 'reveal-fx to-' + nextTheme;
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.setProperty('--fx-x', centre.x + 'px');
    overlay.style.setProperty('--fx-y', centre.y + 'px');
    document.body.appendChild(overlay);

    setTimeout(() => applyTheme(nextTheme), 400);
    setTimeout(() => {
      overlay.remove();
      isSwitching = false;
    }, 820);
  }

  function onToggleClick() {
    if (isSwitching) return;
    const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    saveTheme(nextTheme);

    if (reducedMotion.matches) {
      applyTheme(nextTheme);
      return;
    }

    isSwitching = true;
    const centre = getSwitchCentre();
    if (typeof document.startViewTransition === 'function') {
      switchWithViewTransition(nextTheme, centre);
    } else {
      switchWithOverlay(nextTheme, centre);
    }
  }

  // Until the visitor picks a theme themselves, follow the device setting, even if it changes later.
  function onDeviceThemeChange(event) {
    if (getSavedTheme()) return;
    applyTheme(event.matches ? 'dark' : 'light');
  }

  // If the visitor chose a theme before, make the browser bar match it.
  if (getSavedTheme()) applyTheme(getSavedTheme());

  darkQuery.addEventListener('change', onDeviceThemeChange);
  if (toggle) toggle.addEventListener('click', onToggleClick);
})();
