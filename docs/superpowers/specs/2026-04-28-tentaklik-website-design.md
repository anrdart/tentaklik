---
name: TentaKlik Website Design
description: Full design spec for TentaKlik digital marketing agency website built with Astro
type: project
---

# TentaKlik Website — Design Spec

## Overview

Website landing page untuk **TentaKlik**, digital marketing agency Indonesia. Dibangun dengan Astro + TypeScript + Tailwind CSS. Static site, deploy ke VPS via Nginx.

Layout referensi: pertamaweb.co.id style — split hero (teks kiri, image kanan), clean white background, solid orange accent.

---

## Design System

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `primary` | `#FF791B` | CTA, accent, hover, border highlight |
| `primary-dark` | `#e06510` | Hover state untuk primary |
| `primary-light` | `#FFF3EB` | Background icon, tag, badge |
| `dark` | `#0D0D0D` | Section backgrounds (Why Us, Final CTA) |
| `dark-card` | `#1A1A1A` | Card background di dark section |
| `dark-border` | `#262626` | Border di dark section |
| `white` | `#FFFFFF` | Background utama |
| `surface` | `#FAFAFA` | Background section alternating |
| `text-primary` | `#0D0D0D` | Heading |
| `text-body` | `#555555` | Body text |
| `text-muted` | `#999999` | Label, meta |
| `border` | `#EEEEEE` | Card border default |

**Rule:** Tidak ada gradient. Semua warna solid.

### Typography
- **Font**: Plus Jakarta Sans (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800, 900
- **Heading**: 900 weight, letter-spacing negatif (`-1px` s/d `-2px`)
- **Body**: 400–600 weight, line-height 1.65–1.7
- **Eyebrow**: 12px, 800 weight, uppercase, letter-spacing 1px, `#FF791B`

### Spacing
- Section padding: `80px` vertikal
- Container max-width: `1280px`, centered, padding `0 40px`
- Card gap: `16px–20px`
- Card padding: `24px–32px`

### Components
- **Border radius**: card `14px`, pricing `18px`, button `8px`, avatar `50%`
- **Border**: `1.5px solid #eee` default, `1.5px solid #FF791B` hover
- **Box shadow hover**: `0 8px 28px rgba(255,121,27,.1)`
- **Transform hover**: `translateY(-3px)`
- **Transition**: `all 0.25s ease`

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Astro 4.x (static output) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Fonts | Google Fonts (Plus Jakarta Sans) |
| Scroll | Lenis (smooth scroll) |
| Animations | CSS transitions + Intersection Observer (scroll reveal) |
| Confetti | canvas-confetti |
| Build | `astro build` → `dist/` folder |
| Deploy | VPS + Nginx (static) |

**No React/Vue/Svelte.** Semua interaksi vanilla JS/TS di `<script>` tag Astro.

---

## File Structure

```
src/
├── layouts/
│   └── BaseLayout.astro          # HTML shell, SEO meta, font, global scripts
├── pages/
│   └── index.astro               # Compose semua section
├── components/
│   ├── Header.astro              # Navbar sticky + mobile menu
│   ├── Hero.astro                # Split hero + dot pattern
│   ├── BrandMarquee.astro        # Infinite client marquee
│   ├── Services.astro            # 4-col card grid
│   ├── Process.astro             # 4-step card horizontal
│   ├── WhyChooseUs.astro         # Dark section + 3-col bento
│   ├── CaseStudies.astro         # 2-col portfolio grid
│   ├── Pricing.astro             # 3-col pricing, featured center
│   ├── Testimonials.astro        # 2-col testimonial grid
│   ├── FAQ.astro                 # Accordion
│   ├── FinalCTA.astro            # Dark section CTA + confetti
│   ├── Footer.astro              # 4-col footer
│   ├── ThemeToggle.astro         # Dark/light toggle (localStorage)
│   ├── LanguageRegionSwitcher.astro
│   ├── CustomCursor.astro        # Custom cursor desktop only
│   └── MobileMenu.astro          # Slide-in mobile nav
├── data/
│   └── content.ts               # Semua konten: services, pricing, testimonials, dll.
├── utils/
│   ├── i18n.ts                  # Translations ID/EN
│   ├── region.ts                # Region detection + settings (ID/SG/MY/GLOBAL)
│   └── confetti.ts              # Confetti trigger helper
└── styles/
    └── global.css               # Tailwind directives + custom CSS
public/
└── sectionhero.webp             # Hero portfolio image
```

---

## Sections (urutan halaman)

### 1. Header / Navbar
- Logo kiri (icon bulat orange + teks hitam "TentaKlik")
- Nav links tengah: Beranda, Layanan, Tentang, Portfolio, Harga, FAQ, Kontak
- Kanan: ThemeToggle + LanguageRegionSwitcher + tombol "KONSULTASI GRATIS" (orange)
- Sticky, `backdrop-filter: blur(10px)`, border-bottom `#eee`
- Mobile: hamburger → slide-in menu full-width

### 2. Hero
- Layout: `grid grid-cols-2`, align-items center, min-height `calc(100vh - 68px)`
- Background: dot pattern `radial-gradient(#e5e5e5 1px, transparent 1px)` 28px × 28px
- Kiri:
  - Tag kecil `#DIGITALMARKETINGAGENCY` (orange, uppercase)
  - H1: "Bikin Brand Kamu Lebih Sering Diklik, Diingat, dan Dibeli." — 54px, 900 weight
  - 2 paragraf subheadline (16px, #555)
  - 2 tombol: KONSULTASI GRATIS (solid orange) + LIHAT LAYANAN (outline orange)
  - Trust badges: ✓ 120+ Campaign · ✓ 4.8x ROAS · ✓ 90% Repeat Order
- Kanan:
  - `public/sectionhero.webp` — max-width 600px, `drop-shadow`
- Interaksi: Confetti saat klik KONSULTASI GRATIS

### 3. Brand Marquee
- Background `#FAFAFA`, border top/bottom `#eee`
- Label "Dipercaya oleh" + divider + infinite scroll marquee
- Fade kiri-kanan via `::before`/`::after` pseudo
- Pause on hover
- 10 brand dummy: Kopi Senja, LokaStyle, NusaMart, EduGrow, Dapur Mama, Urban Skin, Sagara Food, KlikProperti, Beranda Digital, Toko Kita

### 4. Services
- Background: `#fff`
- Eyebrow + H2 + sub
- Grid `4 cols` desktop, `2 cols` tablet, `1 col` mobile
- 8 kartu layanan (Social Media, Meta Ads, Google Ads, TikTok Ads, SEO, Content Marketing, Branding, Website)
- Setiap kartu: icon box orange-light, tag pill, judul, deskripsi
- Hover: border orange, shadow orange, `translateY(-3px)`

### 5. Process
- Background: `#FAFAFA`
- Grid `4 cols` desktop, `2 cols` tablet, `1 col` mobile
- 4 step: 01 Audit, 02 Strategy, 03 Execute, 04 Optimize
- Step number besar (40px, `#FFF3EB` — barely visible), judul, deskripsi
- Hover: border orange, `translateY(-3px)`

### 6. Why Choose Us
- Background: `#0D0D0D` (dark)
- Eyebrow orange, H2 putih, sub abu
- Bento grid `3 cols` × 2 rows
- Card pertama `.accent` (background `#FF791B`, teks putih)
- Card lain: `#1A1A1A`, border `#262626`, hover border orange

### 7. Case Studies / Portfolio
- Background: `#fff`
- Grid `2 cols`
- 4 kartu: emoji thumb, nama, industri, metric badge (orange pill)
- Hover: border orange, shadow, `translateY(-3px)`

### 8. Testimonials
- Background: `#FAFAFA`
- Grid `2 cols`
- 4 kartu: star rating (orange ★), kutipan italic, avatar circle orange + inisial, nama + peran
- Hover: border orange, shadow

### 9. Pricing
- Background: `#fff`
- Grid `3 cols`
- Starter (plain) · Growth (featured: `#FF791B` bg, teks putih) · Scale (plain)
- Featured naik sedikit secara visual (box-shadow orange lebih kuat)
- CTA tiap paket → WhatsApp link dari config

### 10. FAQ
- Background: `#FAFAFA`
- Max-width `960px` centered
- 5–8 item accordion
- Click toggle show/hide answer dengan smooth transition
- Border hover orange

### 11. Final CTA
- Background: `#0D0D0D`
- H2 putih, sub abu, tombol solid orange besar
- Confetti saat klik

### 12. Footer
- Background: `#111`
- Grid `2fr 1fr 1fr 1fr`
- Logo + deskripsi · Layanan · Perusahaan · Kontak
- Border-bottom `#222`
- Copyright bar bawah

---

## Data Config (`src/data/content.ts`)

Semua konten di-export dari satu file:

```ts
export const siteConfig = { name, tagline, whatsapp, email, ... }
export const navItems = [...]
export const heroContent = { badge, title, sub, cta, trust, stats }
export const services = [{ icon, tag, title, desc }]
export const processSteps = [{ num, title, desc }]
export const whyUs = [{ icon, title, desc, accent? }]
export const caseStudies = [{ thumb, name, industry, metric }]
export const pricingPlans = [{ name, price, desc, features, featured?, cta }]
export const testimonials = [{ initials, name, role, stars, quote }]
export const faqItems = [{ q, a }]
export const footerLinks = { services, company, contact }
export const regionalSettings = { ID: { currency, whatsapp, ... }, SG, MY, GLOBAL }
export const translations = { id: {...}, en: {...} }
```

---

## Interactions

| Interaksi | Implementasi |
|---|---|
| Smooth scroll | Lenis |
| Scroll reveal | Intersection Observer + CSS class `is-visible` |
| Card hover | Tailwind transition + CSS |
| Confetti CTA | canvas-confetti via `confetti.ts` |
| Custom cursor desktop | `CustomCursor.astro` + JS mousemove |
| Dark/light toggle | `ThemeToggle.astro`, `localStorage`, class `dark` di `<html>` |
| Language switcher | `LanguageRegionSwitcher.astro`, `localStorage`, i18n dari `content.ts` |
| Region selector | Same component, regional config dari `content.ts` |
| FAQ accordion | Vanilla JS toggle `max-height` + transition |
| Mobile menu | `MobileMenu.astro`, slide-in, hamburger toggle |
| Brand marquee pause | CSS `animation-play-state: paused` on hover |
| Animated counter | Intersection Observer + requestAnimationFrame |

---

## Multi-Language (i18n)

- Bahasa: `id-ID` (default jika browser = Indonesia) dan `en-US`
- Deteksi: `navigator.language` → fallback `en`
- Simpan pilihan: `localStorage` key `tk_lang`
- Switcher manual: dropdown di navbar
- Teks UI di `src/utils/i18n.ts`, konten di `src/data/content.ts`

## Multi-Region

- Region: `ID`, `SG`, `MY`, `GLOBAL`
- Deteksi: `Intl.DateTimeFormat().resolvedOptions().timeZone` → map ke region
- Pengaruh: currency format, harga (dari config), WhatsApp number, CTA link
- Simpan: `localStorage` key `tk_region`
- Selector manual: dropdown di navbar (berdampingan dengan language switcher)
- **Tidak pakai geolocation API** (tidak butuh permission)

---

## SEO

- Title: "TentaKlik — Digital Marketing Agency yang Bikin Brand Lebih Sering Diklik"
- Description: "TentaKlik membantu bisnis tumbuh lewat social media management, ads, SEO, content marketing, branding, dan website development yang fokus pada hasil."
- Open Graph + Twitter Card
- Canonical URL
- Structured data: `Organization` schema
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Heading hierarchy: satu `<h1>` di hero, `<h2>` per section, `<h3>` per card

## Accessibility

- Button: `aria-label` jika icon-only
- FAQ accordion: `aria-expanded`, `aria-controls`
- Navbar: keyboard navigable, focus visible
- Color contrast: teks `#555` di atas `#fff` ≥ 4.5:1
- `prefers-reduced-motion`: matikan animasi scroll reveal + Lenis

## Performance

- `astro build` → output static di `dist/`
- Font preconnect + `display=swap`
- Gambar: `sectionhero.webp` di `public/` (sudah WebP)
- JavaScript: hanya Lenis + vanilla interaction scripts (< 30KB total est.)
- Tidak ada heavy framework di client

---

## Deploy

```
npm install
npm run dev          # localhost:4321
npm run build        # output: dist/
npm run preview      # preview dist/

# VPS Nginx
server {
  listen 80;
  server_name tentaklik.com www.tentaklik.com;
  root /var/www/tentaklik/dist;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
  gzip on;
  gzip_types text/css application/javascript image/webp;
}
# + Certbot untuk SSL
```

---

## File yang Perlu Diedit untuk Kustomisasi

| Kebutuhan | File |
|---|---|
| Ganti teks/copywriting | `src/data/content.ts` |
| Ganti harga paket | `src/data/content.ts` → `pricingPlans` |
| Ganti nomor WhatsApp | `src/data/content.ts` → `siteConfig.whatsapp` + `regionalSettings` |
| Ganti warna utama | `tailwind.config.ts` → `primary: '#FF791B'` |
| Ganti font | `src/layouts/BaseLayout.astro` + `tailwind.config.ts` |
| Ganti bahasa | `src/utils/i18n.ts` |
| Ganti region/harga regional | `src/data/content.ts` → `regionalSettings` |
| Ganti layanan | `src/data/content.ts` → `services` |
| Ganti testimonial | `src/data/content.ts` → `testimonials` |
| Ganti portfolio | `src/data/content.ts` → `caseStudies` |
| Ganti gambar hero | `public/sectionhero.webp` |
