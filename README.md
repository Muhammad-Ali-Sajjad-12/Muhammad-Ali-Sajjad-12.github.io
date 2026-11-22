# Muhammad Ali Sajjad: portfolio

My personal portfolio site: <https://muhammad-ali-sajjad-12.github.io/>

Two pages, **Home** and **About**, each in a light and a dark theme. Plain HTML, CSS and JavaScript, with no frameworks and no build step. It's hosted on GitHub Pages straight from the root of the `main` branch.

## Run it locally

```sh
python -m http.server 5500
```

Then open <http://localhost:5500>. Open it through a server rather than by double-clicking the file: the logo is loaded from `images/favicon.svg`, and copying the email needs `localhost` or `https`.

## What's where

```
index.html        Home page
about.html        About page
404.html          "Page not found" (uses /root paths, because GitHub Pages serves it at any URL depth)
css/
  tokens.css      colours and fonts for light and dark
  base.css        reset, text, buttons, pills, chips, shared animations, reduced motion
  layout.css      navbar, theme switch, menu sheet, headline, sections, contact block, footer
  home.css        hero, tools strip, projects, full-stack layers, steps
  about.css       about hero, photo, timeline, beyond code, now cards
js/
  theme.js        theme switch (saves your choice, circle reveal)
  nav.js          phone menu (Esc, focus trap, scroll lock)
  hero.js         rotating word, typing terminal, parallax, spotlight
  contact.js      "Copy email address" button
  reveal.js       scroll-reveal fallback for browsers without scroll-driven animations
images/
  favicon.svg     the Rubik's cube logo (the navbar reuses it with <use>)
  apple-touch-icon.png, og-image.png, profile.webp, profile.jpg
```

## How the theme works

A tiny script at the top of each page's `<head>` sets `<html data-theme="light|dark">` before any CSS loads. It uses your saved choice (`localStorage.theme`), or your device's setting if you haven't chosen yet. Every colour in the CSS is a variable from `tokens.css`, and the dark values apply under `[data-theme="dark"]`.

## Common updates

- **Laila's Collection goes live:** in `index.html`, find the comment `Swap this for a real link`. Replace the `<span class="btn ghost" aria-disabled="true">Domain coming soon</span>` with a link like the Al Mahdi "Visit the site" button. You can also turn the preview `<div class="shot">` into an `<a>` like the first project's.
- **New profile photo:** export an 800×1000 crop as `images/profile.webp` and `images/profile.jpg` (keep each under 150 KB). The original `images/profile.png` is kept out of git on purpose.
- **Real screenshots instead of the drawn previews:** replace the `<div class="ma">` or `<div class="lc">` inside a `.viewport` with an `<img>` of a tall full-page screenshot. The hover scroll still works because it moves whatever is inside `.inner`.
- **"What I'm doing now":** edit the three `.now-card` blocks near the end of `about.html`.

## Accessibility and motion

- Skip link, landmarks, real buttons and links, visible keyboard focus, and labels on icon-only buttons.
- With *reduce motion* turned on in the device settings, all animation stops and everything shows in its finished state.
