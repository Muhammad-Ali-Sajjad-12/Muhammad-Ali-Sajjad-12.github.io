// Mobile menu: opens and closes the menu sheet on phones.
// While open it keeps keyboard focus inside, and stops the page behind from scrolling.
(function () {
  const menuButton = document.querySelector('.menu-btn[aria-controls="menu"]');
  const sheet = document.getElementById('menu');
  if (!menuButton || !sheet) return;

  const closeButton = sheet.querySelector('.menu-close');
  const phoneQuery = window.matchMedia('(max-width: 760px)');

  function isOpen() {
    return !sheet.hidden;
  }

  function getFocusableItems() {
    return Array.from(sheet.querySelectorAll('a[href], button:not([disabled])'));
  }

  function openMenu() {
    sheet.hidden = false;
    menuButton.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('menu-open');
    document.addEventListener('keydown', onKeydown);
    closeButton.focus();
  }

  // returnFocus is false when a link was tapped: the visitor is going somewhere,
  // so focus shouldn't jump back to the menu button.
  function closeMenu(returnFocus) {
    sheet.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('menu-open');
    document.removeEventListener('keydown', onKeydown);
    if (returnFocus) menuButton.focus();
  }

  // Esc closes the menu; Tab and Shift+Tab loop around inside it instead of escaping to the page.
  function onKeydown(event) {
    if (event.key === 'Escape') {
      closeMenu(true);
      return;
    }
    if (event.key !== 'Tab') return;

    const items = getFocusableItems();
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  // One listener for the whole sheet: a tap on the backdrop (outside the panel) or on any link closes it.
  function onSheetClick(event) {
    if (event.target === sheet) {
      closeMenu(true);
    } else if (event.target.closest('a')) {
      closeMenu(false);
    }
  }

  // The menu only exists on phones, so close it if the screen gets wider (e.g. a tablet is rotated).
  function onScreenResize(event) {
    if (!event.matches && isOpen()) closeMenu(false);
  }

  menuButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', () => closeMenu(true));
  sheet.addEventListener('click', onSheetClick);
  phoneQuery.addEventListener('change', onScreenResize);
})();
