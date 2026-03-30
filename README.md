<div align="center">
  <img src="src/assets/images/logo.png" alt="Formula One Central" width="120" />

  # Formula One Central

  **A comprehensive Formula One fan platform built with Angular 21**

  [![Angular](https://img.shields.io/badge/Angular-21-red.svg)](https://angular.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/) [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE) [![Live](https://img.shields.io/badge/Live-Vercel-black.svg)](https://formula1-omega.vercel.app/)

  [🌐 Live Demo](https://formula1-omega.vercel.app/)
</div>

---

## About

Formula One Central is a modern, fully responsive single-page application for Formula One enthusiasts. Built with Angular 21 and standalone components, it covers the full history of the sport — from the very first World Championship in 1950 to the current 2025 season — through drivers, constructors, championship records, a photo gallery, and more.

---

## Features

### 🏠 Home
- Hero section with season stats (77 years of F1, 22 races, 11 teams, 22 drivers)
- Embedded highlight videos: *This is Formula One*, *Most Nail-Biting Moments*, and *Grosjean's Fireball Crash*
- Quick navigation to all major sections

### 🏆 Hall of Fame
- Profiles of all **35 Formula One World Champions**
- Paginated browsing with champion portrait photos
- Click-through to a dedicated detail page per driver with full career stats, birth details, and teams

### 🏁 Teams
- All **20+ constructors** with team photo, logo, and key statistics
- Detail pages covering full name, base, team principals, chassis, power unit, first entry year, championships, pole positions, fastest laps, and highest race finish
- Paginated listing (2 teams per page)

### 📊 Points System
- Full breakdown of the F1 points scoring structure across **6 distinct eras** (from 1950 to present)
- Side-by-side comparison of how each finishing position has been rewarded throughout history

### 📸 Gallery
- **132 high-resolution `.webp` photos** from F1 events
- Infinite-scroll loading powered by `ngx-infinite-scroll`
- Thumbnail previews with a full-size lightbox on click

### 📞 Contact
- Reactive contact form (first name, last name, email, message)
- Built with Angular Reactive Forms and full validation

### 🌍 Internationalisation
- Full UI available in **English** and **Bulgarian**
- Language switcher in the navigation bar (flag icons)
- Powered by `@ngx-translate/core` with JSON translation files loaded at runtime

### 🔝 Navigation
- Responsive header with hamburger menu on mobile
- Scroll-to-top on every route change
- Active route highlighting via `routerLinkActive`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21 (standalone components, `OnPush` everywhere) |
| Language | TypeScript 5.9 (strict mode) |
| Styling | SCSS with CSS custom property design tokens |
| Routing | Angular Router — all routes lazy-loaded via `loadComponent` |
| State | Angular signals + `computed()` |
| i18n | `@ngx-translate/core` v17 + `@ngx-translate/http-loader` v17 |
| Infinite scroll | `ngx-infinite-scroll` v21 |
| Reactivity | RxJS 7.8 |
| Build | `@angular/build:application` (esbuild / Vite-based) |
| Deploy | Vercel (zero-config) |

---

## Getting Started

### Prerequisites

- Node.js **v18** or higher
- npm **v9** or higher
- Angular CLI **v21** — `npm install -g @angular/cli`

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/TihomirDenev/Formula1.git
   cd Formula1
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser** at `http://localhost:4200`

### Available scripts

| Script | Description |
|---|---|
| `npm start` | Start the dev server (`ng serve`) |
| `npm run build` | Production build to `dist/formula1/` |
| `npm run watch` | Incremental dev build in watch mode |

---

## Project Structure

```
src/
├── app/
│   ├── app.ts              # Root component (scroll-to-top, i18n bootstrap)
│   ├── app.config.ts       # provideRouter, provideHttpClient, TranslateModule
│   └── app.routes.ts       # All lazy-loaded routes
├── libs/
│   ├── components/
│   │   ├── layout/         # Shell: <app-navigation> + <router-outlet> + <app-footer>
│   │   ├── navigation/     # Responsive nav, hamburger menu, language switcher
│   │   └── footer/         # Logo, nav links, social links, copyright
│   ├── constants/          # All hard-coded strings & labels per feature
│   ├── models/             # TypeScript interfaces (Racer, F1Team, PointsSystem …)
│   ├── pages/
│   │   ├── home/           # Landing page with videos and stats
│   │   ├── gallery/        # 132-photo infinite-scroll gallery
│   │   ├── point-system/   # 6-era points scoring table
│   │   ├── hof/            # Hall of Fame — 35 champions
│   │   ├── racer/          # Individual champion detail page
│   │   ├── teams/          # All constructors listing
│   │   ├── team/           # Individual team detail page
│   │   ├── contacts/       # Reactive contact form
│   │   └── not-found/      # 404 page
│   └── services/
│       └── image-optimization.service.ts  # Image preloading & caching
├── styles/
│   └── _tokens.scss        # CSS custom properties (colours, shadows, typography)
├── assets/
│   ├── i18n/               # en.json, bg.json translation files
│   ├── images/             # All static images (cars, flags, logos, hof, teams, gallery)
│   └── videos/             # 3 embedded MP4 highlight videos
├── styles.scss             # Global resets + @use 'tokens'
└── index.html              # App shell with OG tags and PWA meta tags
```

---

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/gallery` | Photo Gallery |
| `/point-system` | Points System |
| `/hall-of-fame` | Hall of Fame |
| `/hall-of-fame/:racer` | Champion Detail |
| `/teams` | All Teams |
| `/teams/:team` | Team Detail |
| `/contacts` | Contact Form |
| `**` | 404 Not Found |

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <a href="https://github.com/TihomirDenev/Formula1">View on GitHub</a> •
  <a href="https://formula1-omega.vercel.app">View Live Demo</a>
</div>
