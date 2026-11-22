// Hero effects: rotating word, typing terminal, parallax and cursor spotlight.
// Each effect checks that its elements exist, so this file is safe on both pages
// (the About page only has the spotlight).
(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Parallax and the spotlight need a real mouse; on touch screens there is no cursor to follow.
  const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const WORD_INTERVAL_MS = 2400;
  const TYPING_TICK_MS = 45;

  // The two deploy runs the terminal alternates between, word for word from the design.
  const deployRuns = [
    [
      { text: 'git push origin main', kind: 'cmd' },
      { text: '✓ Code pushed to GitHub', kind: 'ok' },
      { text: 'railway up', kind: 'cmd' },
      { text: '✓ Build passed: Django + PostgreSQL', kind: 'ok' },
      { text: '✓ Deployed to Railway', kind: 'ok' },
      { text: '● almahdiquranacademy.com is live', kind: 'live' }
    ],
    [
      { text: 'git push origin main', kind: 'cmd' },
      { text: '✓ New designs pushed', kind: 'ok' },
      { text: 'railway up', kind: 'cmd' },
      { text: '✓ Build passed: Django + PostgreSQL', kind: 'ok' },
      { text: '✓ Deployed to Railway', kind: 'ok' },
      { text: "● Laila's Collection is live", kind: 'live' }
    ]
  ];

  // Rotating word: every 2.4 s the current word slides up and out, and the next slides up and in.
  function startRotatingWord() {
    const words = document.querySelectorAll('.rot .w');
    if (words.length < 2) return;
    let current = 0;

    setInterval(() => {
      const previous = current;
      current = (current + 1) % words.length;
      words.forEach((word, index) => {
        word.classList.toggle('on', index === current);
        word.classList.toggle('out', index === previous);
        // Screen readers should only hear the word that is showing.
        if (index === current) {
          word.removeAttribute('aria-hidden');
        } else {
          word.setAttribute('aria-hidden', 'true');
        }
      });
    }, WORD_INTERVAL_MS);
  }

  // Draws the terminal: every line up to lineIndex, with the current command cut to `chars` letters.
  function renderTerminal(body, lines, lineIndex, chars) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i <= lineIndex; i++) {
      const line = lines[i];
      const span = document.createElement('span');
      span.className = 'tl ' + line.kind;
      const isComplete = i < lineIndex || line.kind !== 'cmd';
      span.textContent = isComplete ? line.text : line.text.slice(0, chars);
      if (i === lineIndex) {
        const caret = document.createElement('span');
        caret.className = 'caret';
        span.appendChild(caret);
      }
      fragment.appendChild(span);
    }
    body.replaceChildren(fragment);
  }

  // Typing terminal. Every 45 ms "tick" does one thing: wait, type one letter, pause, or move on.
  // `hold` counts ticks to wait, so 13 means about 0.6 s. The numbers match the design.
  function startTerminal() {
    const body = document.querySelector('.term-body');
    if (!body) return;

    // Reduced motion: show the finished first run and stop there.
    if (reducedMotion) {
      renderTerminal(body, deployRuns[0], deployRuns[0].length - 1, 0);
      return;
    }

    const state = { run: 0, line: 0, chars: 0, hold: 10, paused: false };

    function tick() {
      const lines = deployRuns[state.run];
      const current = lines[state.line];
      const isLastLine = state.line === lines.length - 1;

      if (state.hold > 0) {
        state.hold -= 1;
        return;
      }
      if (current.kind === 'cmd' && state.chars < current.text.length) {
        state.chars += 1;
      } else if (!state.paused) {
        // Line finished: pause briefly (longest after the final "is live" line).
        state.paused = true;
        state.hold = isLastLine ? 70 : (current.kind === 'cmd' ? 9 : 13);
        return;
      } else if (isLastLine) {
        // Start the other site's deploy from a clean screen.
        state.run = (state.run + 1) % deployRuns.length;
        state.line = 0;
        state.chars = 0;
        state.paused = false;
        state.hold = 6;
      } else {
        state.line += 1;
        state.chars = 0;
        state.paused = false;
      }
      renderTerminal(body, deployRuns[state.run], state.line, state.chars);
    }

    renderTerminal(body, deployRuns[0], 0, 0);
    let timer = setInterval(tick, TYPING_TICK_MS);

    // No point typing in a background tab; pick up where it left off when the visitor returns.
    document.addEventListener('visibilitychange', () => {
      clearInterval(timer);
      if (!document.hidden) timer = setInterval(tick, TYPING_TICK_MS);
    });
  }

  // Parallax and spotlight: the glow follows the cursor, and the hero windows shift slightly
  // (each by a different amount, which creates the feeling of depth).
  function startPointerEffects() {
    if (reducedMotion || !hasMouse) return;

    const spot = document.querySelector('.spot');
    const layers = [
      { selector: '.par.pa', x: -18, y: -14 },
      { selector: '.par.pb', x: 24, y: 18 },
      { selector: '.par.pt', x: -32, y: -26 }
    ]
      .map((layer) => ({ ...layer, element: document.querySelector(layer.selector) }))
      .filter((layer) => layer.element);
    if (!spot && layers.length === 0) return;

    let pointer = null;
    let frame = 0;
    const roundToTenth = (value) => Math.round(value * 10) / 10;

    function update() {
      frame = 0;
      // -0.5 at the left/top edge, 0 in the middle, 0.5 at the right/bottom edge.
      const offsetX = pointer.x / window.innerWidth - 0.5;
      const offsetY = pointer.y / window.innerHeight - 0.5;

      if (spot) spot.style.transform = `translate(${pointer.x}px, ${pointer.y}px)`;
      layers.forEach((layer) => {
        layer.element.style.transform =
          `translate(${roundToTenth(offsetX * layer.x)}px, ${roundToTenth(offsetY * layer.y)}px)`;
      });
    }

    // mousemove can fire far more often than the screen refreshes, so only redraw once per frame.
    window.addEventListener('mousemove', (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    }, { passive: true });
  }

  startRotatingWord();
  startTerminal();
  startPointerEffects();
})();
