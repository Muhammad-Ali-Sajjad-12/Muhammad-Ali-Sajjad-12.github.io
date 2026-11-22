// Scroll reveal fallback for browsers without CSS scroll-driven animations (e.g. Firefox and Safari today).
// Chrome and Edge animate .reveal blocks in pure CSS (see layout.css), so this script does nothing there.
(function () {
  const supportsScrollAnimations = window.CSS && CSS.supports('animation-timeline: view()');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Without IntersectionObserver we can't tell when things come into view, so leave everything visible.
  if (supportsScrollAnimations || reducedMotion || !('IntersectionObserver' in window)) return;

  // Blocks that fade up, plus the two lines that draw themselves (steps line, timeline line).
  const targets = document.querySelectorAll('.reveal, .track-line, .tline');
  if (targets.length === 0) return;

  // This class switches on the "hidden until revealed" styles. It's only added here, so if this
  // script never runs, nothing is ever hidden.
  document.documentElement.classList.add('js-reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      // Each block only needs to appear once.
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  targets.forEach((target) => observer.observe(target));
})();
