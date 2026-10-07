# Built locally — EU Annual Report on the State of Regions and Cities 2026

An accessible, bilingual, interactive editorial piece built around the European Committee of the Regions' 2026 report. Pure static site — zero build step, zero dependency, deployable to GitHub Pages (or Netlify, or any static host) in two minutes.

## What's in it

- **Hero** with animated concentric rings and a quote condensed from the foreword
- **Pulse** — the 10 headline signals as a snappable rail, each with cluster colour, bar, source and *copy citation* button
- **Interactive Europe map** with 20 pins (coloured by thematic cluster), cluster chips, hover tooltips, keyboard navigation
- **Local story atlas** — 20 stories as cards with icons, metric chips, cluster filter chips + text search
- **Story detail modal** with deep-linked URLs (`#story/matosinhos`), copy-citation, copy-link, prev/next navigation
- **Themes** — 10 vertical tabs with per-theme accent colour, policy asks (shown in CoR briefing / press mode), and related local stories
- **Regional Thermometer** — animated headline ring + 7 micro-gauges, one per indicator, colour-coded by direction
- **Policy choice** — a working slider between *centralised* and *place-based* that actually desaturates the whole page as you push toward centralised
- **Evidence** dossiers for the press / policy desk with per-theme copy-citation
- **Reading modes** — 1-minute story / CoR briefing / Press & policy desk, remembered per visitor
- **FR / EN switch** — persisted, with proper `hreflang`
- **Reading-progress bar**
- **Open Graph + Twitter cards + JSON-LD** structured data (Report + Dataset)

## Files

```
built-locally/
├── index.html         Semantic structure, one landmark per section
├── styles.css         Design tokens, cluster palette, responsive, print
├── data.js            Named-object schema: SIGNALS, STORIES, THEMES, THERMOMETER
├── i18n.js            UI strings (en/fr) and inline icon library
├── app.js             All interactions (modal routing, map, mix slider, …)
├── README.md          You are here
└── assets/
    ├── favicon.svg
    └── og.svg          1200×630 social-preview card
```

## Preview locally

Open `index.html` directly in a browser — no server required. For the `<dialog>` element and ES modules to behave identically, you can also serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Built locally — v1"
git branch -M main
git remote add origin git@github.com:<you>/built-locally.git
git push -u origin main
```

Then in the repo settings → **Pages** → source: `main` / root → save. The site is live at `https://<you>.github.io/built-locally/` within a minute.

An empty `.nojekyll` file is included so GitHub Pages serves everything as-is (no Jekyll processing).

## Accessibility

- Semantic landmarks and logical heading hierarchy
- Skip link, visible focus ring, keyboard operation on every interactive element (modal, tabs, chips, map pins, slider)
- Arrow-key navigation for theme tabs; `Esc` closes the story modal
- `aria-live` for story count, modal updates, toast notifications
- Reduced-motion media query **and** manual toggle
- High-contrast toggle
- Semantic colour choices: colour never carries meaning alone (icons + labels always accompany it)
- Responsive from 320px up; print stylesheet strips chrome and keeps content

## Content and rights

Content condensed from the European Committee of the Regions' *State of regions and cities: EU annual report 2026* (CdR_0463/10-2026, ISBN 978-92-895-4140-4, DOI 10.2863/1166719). The report is published under CC BY 4.0 unless otherwise noted. Third-party photos, maps and other embedded works may require separate permission; this prototype uses original CSS/SVG visuals and does not reproduce report photography.

The simplified Europe silhouette is drawn by hand (not derived from Natural Earth or EuroGeographics data).
