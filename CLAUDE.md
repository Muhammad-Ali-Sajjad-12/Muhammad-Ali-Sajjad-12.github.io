# Portfolio website: Muhammad Ali Sajjad

## What we are building
A personal portfolio site for Muhammad Ali Sajjad, a full-stack developer and BS Artificial Intelligence student at FAST-NUCES. It will be linked from his LinkedIn, his socials and the footers of client sites he built.

Two pages: **Home** (`index.html`) and **About** (`about.html`), each in a light and a dark theme, fully responsive and animated.

The design is final. Build it as close to the design files as possible. Do not redesign, rename sections or rewrite copy unless asked.

## Source of truth: the `design/` folder
| File | What it is |
|---|---|
| `design/home.reference.html` | Home page design (desktop and responsive) |
| `design/about.reference.html` | About page design |
| `design/mobile.reference.html` | Phone layout of the home page, including the open menu |
| `design/design-styles.css` | All shared styles: colours, fonts, components, animations, phone breakpoint |

The reference files come from a design tool and use a small template format. Read them like this:
- The markup between `<x-dc>` and `</x-dc>` is the page.
- `{{name}}` is a value filled in by `renderVals()` in the `<script type="text/x-dc">` block at the bottom of the file.
- `<sc-for list="{{items}}" as="item">` repeats its content for each item. `<sc-if value="{{x}}">` shows its content only when `x` is true.
- `<helmet>` holds extra `<style>` rules for that page. Treat them as part of the design.
- `class Component extends DCLogic` holds the behaviour (timers, theme switch, typing terminal, parallax, copy email). Re-implement it in plain JavaScript.
- `.pf.light` / `.pf.dark` on the root element are the theme classes. In the real site, use `data-theme="light|dark"` on `<html>`.

Copy all text, links, colours, sizes, spacing and animation timings from these files.

## Stack and constraints
- Plain HTML, CSS and vanilla JavaScript. No frameworks, no build step, no npm packages.
- Fonts from Google Fonts: Schibsted Grotesk (400 to 900) and JetBrains Mono (400, 500).
- Hosted on GitHub Pages from this repo (`Muhammad-Ali-Sajjad-12.github.io`), served from the root of `main`. Use relative paths only.
- Must work in current Chrome, Edge, Firefox and Safari, on desktop and phone.

## Folder structure
```
index.html
about.html
404.html                 simple page in the site's style with a link home
README.md
css/
  tokens.css             colour and font variables for light and dark
  base.css               reset, text styles, buttons, pills, helpers
  layout.css             navbar, menu sheet, sections, contact block, footer
  home.css               hero, tools strip, projects, full-stack layers, steps
  about.css              about hero, timeline, beyond code, now cards
js/
  theme.js               theme switch
  nav.js                 mobile menu
  hero.js                rotating word, typing terminal, parallax, spotlight
  contact.js             copy email button
  reveal.js              scroll reveal fallback
images/
  favicon.svg            the Rubik's cube logo
  og-image.png           1200x630 link preview (create one in the site's style)
design/                  reference only, not deployed (listed in .gitignore)
```

## Pages and sections
**Home:** sticky glass navbar (Rubik's cube logo, links, theme switch, menu button on phones) → hero (status pill, headline with rotating word, intro, two buttons, three facts, stage with two floating site windows, deploy terminal and "Live and running" badge) → moving tools strip → Live projects (Al Mahdi Quran Academy, Laila's Collection) → "My full stack, layer by layer" → "How I work" (4 steps) → contact block → footer with the large "SAJJAD" name.

**About:** navbar → about hero (photo card with three floating labels, headline, intro, quick facts) → "My journey so far" timeline → "Beyond code" (ICIT 2027 card, Public speaking, Current affairs) → "What I'm doing now" → contact block → footer.

## Behaviour to build
- **Theme:** on the first visit, follow the device setting (`prefers-color-scheme`). Save the visitor's choice in `localStorage` under `theme`. Set `data-theme` from a tiny inline script in `<head>`, before CSS loads, so there is no flash of the wrong theme. The switch knob slides, and the new theme spreads in a circle from the switch: use the View Transitions API when supported, otherwise the clip-path overlay from the design.
- **Rotating word:** "take bookings.", "sell suits.", "go live.", "people use.", changing every 2.4 s with the slide-up animation from the design.
- **Deploy terminal:** types the commands character by character (about 45 ms per character) and shows result lines with pauses, alternating between the two sites forever. Use the exact lines in `home.reference.html`.
- **Parallax and spotlight:** the hero windows and terminal shift slightly with the mouse, and a soft glow follows the cursor. Throttle with `requestAnimationFrame`. Turn both off on touch devices and with reduced motion.
- **Site previews:** they scroll on their own in the hero. In the Projects section they tilt in 3D and scroll when hovered. They are CSS-drawn previews of the client sites. Keep them; real screenshots may replace them later.
- **Tools strip:** an endless loop. Duplicate the list for the loop and hide the copy from screen readers. It pauses on hover.
- **Scroll reveals and drawing lines:** use CSS scroll-driven animations where supported (as in the design), with an `IntersectionObserver` fallback in `reveal.js` for other browsers. Content must always end up visible.
- **Mobile menu:** opens and closes with the menu button, closes with Esc, when a link is tapped or when the backdrop is tapped, keeps focus inside while open, and stops the page scrolling behind it.
- **Contact:** "Email me" opens Gmail compose in a new tab (`https://mail.google.com/mail/?view=cm&fs=1&to=ali.sajjad.bu@gmail.com`). "Copy email address" copies the address and shows "Copied!" for about 2 seconds. Long addresses wrap inside their boxes.
- **Logo:** the Rubik's cube SVG from the design, with the idle wobble and the spin on hover. Use the same cube as `images/favicon.svg`.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, stop all non-essential animation (marquee, floating, typing loop, parallax, orbs, cube). Show the final states.

## Content and links
- Email: ali.sajjad.bu@gmail.com
- LinkedIn: https://www.linkedin.com/in/alisajjadbusiness/
- GitHub: https://github.com/Muhammad-Ali-Sajjad-12
- Al Mahdi Quran Academy: https://almahdiquranacademy.com (live, so link it)
- Laila's Collection: lailascollection.com is **not live yet**. Show the "Domain coming soon" button, not a link.
- ICIT 2027 organizing committee: https://icit.nu.edu.pk/organizing-committee. The title is exactly "Student Co-Chair". Do not add "IEEE".
- All other copy is in the reference files. Use it word for word.

## Placeholders (keep them obvious and easy to swap)
- About photo: keep the drawn placeholder until `images/profile.jpg` is added. Then show it with `object-fit: cover` and proper `alt` text.
- `og-image.png`: create a simple 1200×630 image in the site's colours with his name and title.

## Meta and SEO (both pages)
Title, meta description, canonical URL, Open Graph and Twitter card tags (with `og-image.png`), `theme-color` for light and dark, favicon links, `lang="en"`.

## Quality bar
- Accessible: semantic landmarks, a skip link, real `<button>` and `<a>` elements, visible keyboard focus, `aria-label` on icon-only buttons, decorative SVGs `aria-hidden`, text contrast at least 4.5:1 in both themes.
- Responsive: check at 1440, 1024, 768, 390 and 360 px wide. No sideways scrolling and no text overflowing its box.
- Fast: no libraries, `font-display: swap`, lazy-loaded images, animations use `transform` and `opacity`.
- No console errors.

## Code style (the owner is learning from this code)
- JavaScript names in camelCase. One clear job per file and per function.
- Comments explain *why* on important steps, in plain language. No decorative banner comments made of dashes or equals signs.
- 2-space indentation. CSS grouped by section, in the same order as the page.

## How to work
1. Read this file and every file in `design/` before writing code. Then post a phase-by-phase plan and wait for approval.
2. Build in these phases: (1) structure, tokens and theme; (2) navbar, logo, favicon and mobile menu; (3) hero; (4) tools strip and projects; (5) full-stack layers and steps; (6) contact and footer; (7) About page; (8) scroll reveals, reduced motion, meta tags and 404 page; (9) final responsive and accessibility pass.
3. After each phase: serve the site locally (for example `python -m http.server 5500`), check it at desktop and phone widths in both themes (take screenshots if a browser tool is available), fix what doesn't match the design, then commit with a clear message.
4. After each phase, give a short plain-language summary of what was built and how it works, so the owner can learn from it.
5. Ask before pushing to GitHub, deleting files or adding anything not in this brief.

## Out of scope for now
Hackathons, research, a blog, a contact form with a backend, analytics.
