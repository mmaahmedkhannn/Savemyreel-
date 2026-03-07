# SaveMyReel – replit.md

## Overview

SaveMyReel is a free, web-based social media video and image downloader. Users paste a URL from a supported platform (Instagram, TikTok, Facebook, Twitter/X, YouTube, or Pinterest) and the app extracts and serves the media for download. The site is built with Next.js 15/16 and React 19, using the App Router. It is SEO-heavy with structured data (JSON-LD), sitemaps, robots.txt, and platform-specific landing pages. Monetization is through Google AdSense. The app does not store any user data or downloaded media on its own servers.

**Supported Platforms:**
- Instagram (reels, carousels, photos, stories)
- TikTok (videos, slideshows, watermark-free)
- Facebook (videos, reels)
- Twitter / X (videos, GIFs)
- YouTube (videos, shorts)
- Pinterest (pins, images, GIFs, Idea Pins)

---

## User Preferences

Preferred communication style: Simple, everyday language.

---

## System Architecture

### Frontend Architecture

- **Framework:** Next.js (App Router) with React 19
- **Language:** TypeScript (strict mode)
- **Styling:** CSS Modules per component + a global `globals.css` with CSS custom properties (dark theme: violet/pink palette on near-black background)
- **Fonts:** Google Fonts via `next/font` — Space Grotesk (headings) and DM Sans (body)
- **Animations:** Framer Motion for Hero component; CSS keyframe animations elsewhere
- **Icons:** Lucide React
- **Utility:** `clsx` for conditional class names

**Key Components:**
- `Navbar` – Fixed top nav with mobile hamburger menu and language selector
- `Hero` – Main download interface: platform selector tabs, URL input, loading state, result display
- `DownloadResult` – Shows extracted media with preview and download buttons; handles carousels and quality options
- `HowItWorks` – Per-platform step guide with animated SVG illustrations
- `Features` – Feature grid with animated cards
- `Footer` – Links to legal pages, platform downloaders, blog guides
- `LanguageSelector` – Dropdown locale switcher
- `StepGuide` – Reusable 3-step visual guide used on platform landing pages

**Pages (App Router):**
- `/` – Home (Hero + HowItWorks + Features + Footer)
- `/instagram-downloader`, `/tiktok-downloader`, `/facebook-downloader`, `/twitter-downloader`, `/youtube-downloader`, `/pinterest-downloader` – Platform-specific SEO landing pages with JSON-LD structured data
- `/about`, `/features`, `/faq`, `/contact`, `/blog`, `/blog/[slug]`
- Legal: `/privacy-policy`, `/terms`, `/cookie-policy`, `/dmca`, `/disclaimer`, `/accessibility`

### Backend Architecture

- **Runtime:** Next.js API Routes (Node.js)
- **Media Extraction:** Multiple strategies per platform:
  - **YouTube:** `python3 -m yt_dlp` (pip-installed, v2026+) with PO Token generation via `bgutils-js` + `jsdom` to bypass YouTube's datacenter IP bot detection; uses `--js-runtimes node --remote-components ejs:github` for cipher solving; PO tokens cached for 6 hours
  - **Instagram:** Custom `xdt_api__v1__media__shortcode__web_info` JSON parser for carousel/reel extraction
  - **Pinterest:** Direct HTTP scraping with og:meta tags + `upgradeToOriginal()` URL upgrader for full-resolution images
  - **TikTok, Facebook, Twitter:** `lib/ytdlp.ts` wrapper calling system yt-dlp binary
  - **`instagram-url-direct`** and **`@sasmeee/igdl`** — Instagram-specific npm helpers
- **Proxy endpoint (`/api/proxy`):** Proxies CDN URLs through the server to bypass CORS for in-browser video previews
- **Stream endpoint (`/api/stream`):** Pipes media from the source URL to the client as a download, setting appropriate `Content-Disposition` headers
- **Rate limiting:** In-memory `Map`-based rate limiter (`lib/rate-limit.ts`) — defaults to 10 requests per minute per IP

### Data Storage

- **No database.** The app is stateless — no user accounts, no saved URLs, no stored media.
- Rate limit state is in-process memory (resets on server restart).

### Internationalization (i18n)

- `LocaleProvider` context (`lib/i18n/LocaleProvider`) exposes `locale`, `setLocale`, `locales`, and `t()` translation function
- Language selector in the Navbar allows runtime locale switching
- Translation keys used throughout components (e.g., `t("nav.about")`, `t("features.fast.title")`)

### SEO & Metadata

- Per-page `metadata` exports (Next.js App Router convention)
- JSON-LD structured data (`HowTo`, `FAQPage`, `WebSite`, `SoftwareApplication` schemas) embedded in platform pages
- `app/sitemap.ts` generates an XML sitemap with all major routes
- `app/robots.ts` disallows `/api/` routes
- Open Graph and Twitter card images via `app/opengraph-image.tsx` (Edge runtime)
- PWA manifest at `public/manifest.json`

### Security

- Security headers set in both `next.config.ts` (via `headers()`) and `middleware.ts`:
  - CSP allowing Google AdSense, Analytics, and Fonts
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Strict-Transport-Security`
  - `Permissions-Policy` restricting camera, mic, geolocation, etc.
- Input validation with `zod`
- URL validation before API calls (domain matching per platform)

### Developer Scripts

- `scripts/download-bin.js` — Downloads the yt-dlp binary for the current OS at `postinstall`
- `scripts/auto-sync.js` — File watcher that auto-commits and pushes to GitHub (debounced, 5s delay); runs alongside Next.js dev server via `concurrently`

---

## External Dependencies

### Core Runtime Dependencies

| Package | Purpose |
|---|---|
| `next` | Framework (App Router, SSR, API routes) |
| `react` / `react-dom` | UI rendering |
| `framer-motion` | Animations in Hero |
| `lucide-react` | Icon library |
| `clsx` | Conditional CSS class utility |
| `zod` | Schema validation |
| `axios` | HTTP client for scraping |
| `cheerio` | HTML parsing (Instagram scraper) |
| `cross-fetch` | Fetch polyfill |

### Media Extraction Dependencies

| Package | Purpose |
|---|---|
| `yt-dlp` (pip-installed, v2026+) | Primary YouTube extractor with cipher solving via `--js-runtimes node --remote-components ejs:github` |
| `youtubei.js` (npm) | YouTube fallback for videos with direct (non-ciphered) URLs |
| `yt-dlp` (system binary, Nix) | Extractor for TikTok, Facebook, Twitter via `lib/ytdlp.ts` wrapper |
| `instagram-url-direct` | Instagram URL resolution helper |
| `@sasmeee/igdl` | Instagram download helper |

### Google Services

| Service | Purpose |
|---|---|
| Google AdSense (`pagead2.googlesyndication.com`) | Monetization ads |
| Google Analytics (`www.google-analytics.com`) | Usage analytics |
| Google Fonts | Space Grotesk + DM Sans fonts |

### Replit Integration

| Package | Purpose |
|---|---|
| `@replit/connectors-sdk` | Replit-specific integrations/connectors |

### Dev Dependencies

- `typescript`, `eslint`, `eslint-config-next` — Linting and type checking
- `concurrently` — Run Next.js dev + auto-sync script in parallel
- `@types/node`, `@types/react`, `@types/react-dom` — TypeScript types

### External Binary

- **yt-dlp** — Downloaded from GitHub releases at `postinstall` into `./bin/yt-dlp` (or `yt-dlp.exe` on Windows). The app also falls back to a system `yt-dlp` in PATH if the local binary is missing.