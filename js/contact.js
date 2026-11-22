// Contact block: copies the email address to the clipboard and confirms it on the button.
(function () {
  const EMAIL = 'ali.sajjad.bu@gmail.com';
  const DEFAULT_LABEL = 'Copy email address';
  const SUCCESS_LABEL = 'Copied!';
  const FAILURE_LABEL = "Couldn't copy here. It's " + EMAIL;
  const RESET_AFTER_MS = 2200;

  const button = document.querySelector('.copy-btn');
  if (!button) return;
  let resetTimer = 0;

  // Shows a message on the button for about 2 seconds, then puts the normal label back.
  // The button has aria-live, so screen readers announce the change too.
  function showLabel(text) {
    button.textContent = text;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      button.textContent = DEFAULT_LABEL;
    }, RESET_AFTER_MS);
  }

  async function copyEmail() {
    try {
      // The Clipboard API only exists on secure pages (https or localhost), so it can be missing.
      await navigator.clipboard.writeText(EMAIL);
      showLabel(SUCCESS_LABEL);
    } catch (error) {
      showLabel(FAILURE_LABEL);
    }
  }

  button.addEventListener('click', copyEmail);
})();
