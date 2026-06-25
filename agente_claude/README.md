# Tafí Viejo English Academy — Landing Page

A modern, responsive, production-ready landing page for an English language institute in Tafí Viejo, Tucumán, Argentina. Built with **HTML5, CSS3 and vanilla JavaScript only** — no frameworks, no build step.

## Features

- Sticky, responsive header with accessible mobile menu
- Impactful hero with animated floating chips and a course marquee
- About section with mission/vision/philosophy and animated statistic counters
- Course cards, "Why choose us" features, and 6 student testimonials
- Conversion CTA band and a validated contact form (no backend required)
- Scroll-reveal animations, hover micro-interactions, smooth scrolling
- SEO: title, meta description, Open Graph/Twitter tags, JSON-LD structured data
- Accessibility: semantic HTML, skip link, keyboard support, visible focus, `prefers-reduced-motion`

## Structure

```
project/
├── index.html
├── css/styles.css
├── js/script.js
├── assets/
│   ├── images/   (hero-classroom.svg, og-cover.svg)
│   └── icons/    (logo.svg)
└── README.md
```

## Run locally

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

It's a static site — Vercel auto-detects it with no configuration. You can also drag-and-drop the folder in the Vercel dashboard.

## Customize

- **Colors / fonts:** CSS variables at the top of `css/styles.css`.
- **Content:** edit text directly in `index.html`.
- **Contact form:** currently client-side only. Connect it to a service (Formspree, Vercel Functions, etc.) by handling the submit in `js/script.js`.
