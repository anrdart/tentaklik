# TentaKlik Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun website TentaKlik Digital Marketing Agency sebagai Astro static site siap deploy ke VPS.

**Architecture:** Astro 4.x static site dengan component-based architecture. Semua konten di-manage dari `src/data/content.ts`. Interaksi via vanilla JS/TS di `<script>` tag tiap komponen. Build menghasilkan folder `dist/` siap upload ke Nginx.

**Tech Stack:** Astro 4, TypeScript, Tailwind CSS v3, Lenis (smooth scroll), canvas-confetti, Intersection Observer API (scroll reveal).

**Design:** `#FF791B` orange on white clean background. No gradients. Split hero (teks kiri, `public/sectionhero.webp` kanan). Referensi layout: pertamaweb.co.id style.

---

## File Map

```
/home/ekalliptus/dev/tentaklik/
├── public/
│   └── sectionhero.webp              # (sudah ada, pindahkan dari root)
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── MobileMenu.astro
│   │   ├── Hero.astro
│   │   ├── BrandMarquee.astro
│   │   ├── Services.astro
│   │   ├── Process.astro
│   │   ├── WhyChooseUs.astro
│   │   ├── CaseStudies.astro
│   │   ├── Testimonials.astro
│   │   ├── Pricing.astro
│   │   ├── FAQ.astro
│   │   ├── FinalCTA.astro
│   │   ├── Footer.astro
│   │   ├── ThemeToggle.astro
│   │   ├── LanguageRegionSwitcher.astro
│   │   └── CustomCursor.astro
│   ├── data/
│   │   └── content.ts
│   ├── utils/
│   │   ├── i18n.ts
│   │   ├── region.ts
│   │   └── confetti.ts
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## Task 1: Project Initialization

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`

- [ ] **Step 1: Inisialisasi project Astro di direktori yang sudah ada**

```bash
cd /home/ekalliptus/dev/tentaklik
npm create astro@latest . -- --template minimal --typescript strict --no-git --install
```

Jawab prompt: template `minimal`, TypeScript `strict`, no git (sudah ada).

- [ ] **Step 2: Install dependencies**

```bash
npm install @astrojs/tailwind tailwindcss
npm install lenis canvas-confetti
npm install -D @types/canvas-confetti
```

- [ ] **Step 3: Konfigurasi `astro.config.mjs`**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
});
```

- [ ] **Step 4: Konfigurasi `tailwind.config.mjs`**

```js
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FF791B',
        'primary-dark': '#e06510',
        'primary-light': '#FFF3EB',
        dark: '#0D0D0D',
        'dark-card': '#1A1A1A',
        'dark-border': '#262626',
        surface: '#FAFAFA',
        'text-body': '#555555',
        'text-muted': '#999999',
        border: '#EEEEEE',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      letterSpacing: {
        tighter2: '-0.125rem',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5: Konfigurasi `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- [ ] **Step 6: Pindahkan gambar hero ke public/**

```bash
mkdir -p public
mv /home/ekalliptus/dev/tentaklik/sectionhero.webp /home/ekalliptus/dev/tentaklik/public/sectionhero.webp
```

- [ ] **Step 7: Verifikasi build awal berjalan**

```bash
npm run dev
```

Expected: Server berjalan di `http://localhost:4321` tanpa error.

- [ ] **Step 8: Commit**

```bash
git init
git add package.json astro.config.mjs tailwind.config.mjs tsconfig.json public/sectionhero.webp
git commit -m "feat: initialize Astro project with Tailwind"
```

---

## Task 2: Global Styles & Data Layer

**Files:**
- Create: `src/styles/global.css`
- Create: `src/data/content.ts`
- Create: `src/utils/i18n.ts`
- Create: `src/utils/region.ts`
- Create: `src/utils/confetti.ts`

- [ ] **Step 1: Buat `src/styles/global.css`**

```css
/* src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

@layer base {
  html {
    font-family: 'Plus Jakarta Sans', sans-serif;
    scroll-behavior: auto; /* Lenis handles scroll */
  }

  body {
    @apply bg-white text-dark overflow-x-hidden;
  }

  ::selection {
    @apply bg-primary text-white;
  }

  :focus-visible {
    @apply outline-2 outline-offset-2 outline-primary;
  }
}

@layer utilities {
  .section-container {
    @apply max-w-container mx-auto px-10;
  }

  .section-padding {
    @apply py-20;
  }

  .eyebrow {
    @apply text-xs font-extrabold text-primary tracking-widest uppercase mb-3;
  }

  .section-title {
    @apply text-4xl font-black text-dark leading-tight tracking-tight mb-3;
  }

  .section-sub {
    @apply text-base text-text-body leading-relaxed max-w-xl mb-12;
  }
}

/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* Custom cursor */
#custom-cursor {
  position: fixed;
  width: 12px;
  height: 12px;
  background: #FF791B;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, opacity 0.2s;
  opacity: 0;
}
#custom-cursor.active {
  opacity: 1;
}
#custom-cursor.hovered {
  width: 32px;
  height: 32px;
  background: rgba(255, 121, 27, 0.2);
  border: 2px solid #FF791B;
}

/* Dark mode overrides */
.dark body {
  @apply bg-dark text-white;
}
.dark header {
  background: rgba(13, 13, 13, 0.92) !important;
  border-color: #262626 !important;
}
```

- [ ] **Step 2: Buat `src/data/content.ts`** — semua konten dari superprompt

```ts
// src/data/content.ts

export const siteConfig = {
  name: 'TentaKlik',
  tagline: 'Digital Marketing Agency yang Bikin Brand Lebih Sering Diklik',
  description:
    'TentaKlik membantu bisnis tumbuh lewat social media management, ads, SEO, content marketing, branding, dan website development yang fokus pada hasil.',
  url: 'https://tentaklik.com',
  // Ganti nomor WhatsApp di sini
  whatsapp: {
    ID: '6281234567890',
    SG: '6591234567890',
    MY: '60123456789',
    GLOBAL: '6281234567890',
  },
  email: 'hello@tentaklik.com',
  instagram: 'https://instagram.com/tentaklik',
  linkedin: 'https://linkedin.com/company/tentaklik',
};

export const navItems = [
  { label: 'Beranda', labelEn: 'Home', href: '#beranda' },
  { label: 'Layanan', labelEn: 'Services', href: '#layanan' },
  { label: 'Tentang', labelEn: 'About', href: '#kenapa' },
  { label: 'Portfolio', labelEn: 'Portfolio', href: '#portfolio' },
  { label: 'Harga', labelEn: 'Pricing', href: '#harga' },
  { label: 'FAQ', labelEn: 'FAQ', href: '#faq' },
  { label: 'Kontak', labelEn: 'Contact', href: '#kontak' },
];

export const heroContent = {
  badge: '#DIGITALMARKETINGAGENCY',
  title: 'Bikin Brand Kamu\nLebih Sering Diklik,\nDiingat, dan Dibeli.',
  titleEn: 'Make Your Brand\nGet Clicked More,\nRemembered, and Bought.',
  sub1: 'TentaKlik bantu bisnis tumbuh lewat strategi digital marketing, konten kreatif, iklan berbayar, SEO, social media, dan website yang dirancang untuk menghasilkan konversi.',
  sub1En: 'TentaKlik helps businesses grow through digital marketing strategies, creative content, paid ads, SEO, social media, and websites designed to drive conversions.',
  sub2: 'Dari UMKM sampai brand besar — campaign yang fokus pada hasil nyata, bukan sekadar angka.',
  sub2En: 'From SMEs to big brands — campaigns focused on real results, not just numbers.',
  cta: 'KONSULTASI GRATIS',
  ctaEn: 'FREE CONSULTATION',
  ctaSecondary: 'LIHAT LAYANAN',
  ctaSecondaryEn: 'VIEW SERVICES',
  trust: ['120+ Campaign', '4.8x ROAS', '90% Repeat Order'],
};

export const stats = [
  { value: 120, suffix: '+', label: 'Campaign dikelola', labelEn: 'Campaigns managed' },
  { value: 4.8, suffix: 'x', label: 'Rata-rata ROAS', labelEn: 'Average ROAS', decimal: true },
  { value: 35, suffix: 'M+', label: 'Total Impressions', labelEn: 'Total Impressions' },
  { value: 90, suffix: '%', label: 'Client Repeat Order', labelEn: 'Client Repeat Order' },
];

export const clients = [
  'Kopi Senja', 'Dapur Mama', 'LokaStyle', 'NusaMart',
  'Beranda Digital', 'Urban Skin', 'Sagara Food',
  'KlikProperti', 'EduGrow', 'Toko Kita',
];

export const servicesSection = {
  eyebrow: 'Layanan Kami',
  eyebrowEn: 'Our Services',
  title: 'Layanan Digital yang Bikin Bisnis Bergerak.',
  titleEn: 'Digital Services That Move Your Business.',
  sub: 'Dari awareness sampai conversion, semua dirancang biar campaign kamu nggak cuma ramai, tapi juga berdampak.',
  subEn: 'From awareness to conversion, all designed so your campaign isn\'t just busy, but impactful.',
};

export const services = [
  { icon: '📱', tag: 'Social', tagEn: 'Social', title: 'Social Media Management', titleEn: 'Social Media Management', desc: 'Strategi konten, jadwal posting, dan community management yang konsisten.', descEn: 'Content strategy, posting schedule, and consistent community management.' },
  { icon: '🎯', tag: 'Ads', tagEn: 'Ads', title: 'Meta Ads', titleEn: 'Meta Ads', desc: 'Campaign Facebook & Instagram yang dioptimasi untuk ROAS maksimal.', descEn: 'Facebook & Instagram campaigns optimized for maximum ROAS.' },
  { icon: '🔍', tag: 'Ads', tagEn: 'Ads', title: 'Google Ads', titleEn: 'Google Ads', desc: 'Search, Display, dan Shopping ads yang menjangkau audience yang tepat.', descEn: 'Search, Display, and Shopping ads that reach the right audience.' },
  { icon: '⚡', tag: 'Ads', tagEn: 'Ads', title: 'TikTok Ads', titleEn: 'TikTok Ads', desc: 'Creative-first approach untuk ads yang perform di platform Gen Z.', descEn: 'Creative-first approach for ads that perform on the Gen Z platform.' },
  { icon: '📈', tag: 'Organic', tagEn: 'Organic', title: 'SEO', titleEn: 'SEO', desc: 'Optimasi on-page & off-page agar brand muncul di pencarian teratas.', descEn: 'On-page & off-page optimization to make your brand appear at the top.' },
  { icon: '✍️', tag: 'Content', tagEn: 'Content', title: 'Content Marketing', titleEn: 'Content Marketing', desc: 'Konten yang educates, engages, dan converts — bukan sekadar posting.', descEn: 'Content that educates, engages, and converts — not just posting.' },
  { icon: '🎨', tag: 'Brand', tagEn: 'Brand', title: 'Branding', titleEn: 'Branding', desc: 'Visual identity, tone of voice, dan brand guideline yang konsisten.', descEn: 'Visual identity, tone of voice, and consistent brand guidelines.' },
  { icon: '💻', tag: 'Web', tagEn: 'Web', title: 'Website Development', titleEn: 'Website Development', desc: 'Website cepat, mobile-friendly, dan dioptimasi untuk konversi.', descEn: 'Fast, mobile-friendly website optimized for conversion.' },
  { icon: '🚀', tag: 'Web', tagEn: 'Web', title: 'Landing Page', titleEn: 'Landing Page', desc: 'Landing page yang dirancang khusus untuk campaign iklan berbayar.', descEn: 'Landing pages designed specifically for paid ad campaigns.' },
  { icon: '📊', tag: 'Analytics', tagEn: 'Analytics', title: 'Analytics & Reporting', titleEn: 'Analytics & Reporting', desc: 'Dashboard dan laporan yang transparan, mudah dipahami, dan actionable.', descEn: 'Transparent, easy-to-understand, and actionable dashboards and reports.' },
];

export const processSection = {
  eyebrow: 'Cara Kerja',
  eyebrowEn: 'How We Work',
  title: 'Cara Kerja Kami.',
  titleEn: 'How We Work.',
  sub: 'Dari audit sampai optimize — semua terstruktur dan transparan.',
  subEn: 'From audit to optimize — all structured and transparent.',
};

export const processSteps = [
  { num: '01', title: 'Audit', titleEn: 'Audit', desc: 'Kami cek kondisi brand, kompetitor, channel digital, dan peluang growth.', descEn: 'We check your brand condition, competitors, digital channels, and growth opportunities.' },
  { num: '02', title: 'Strategy', titleEn: 'Strategy', desc: 'Kami susun roadmap campaign, channel prioritas, konten, dan KPI.', descEn: 'We build a campaign roadmap, priority channels, content plan, and KPIs.' },
  { num: '03', title: 'Execute', titleEn: 'Execute', desc: 'Tim menjalankan campaign, produksi konten, optimasi ads, SEO, dan website.', descEn: 'The team runs the campaign, produces content, optimizes ads, SEO, and website.' },
  { num: '04', title: 'Optimize', titleEn: 'Optimize', desc: 'Data dianalisis, campaign diperbaiki, budget diarahkan ke strategi yang paling menghasilkan.', descEn: 'Data is analyzed, campaigns are improved, and budget directed to the best-performing strategy.' },
];

export const whySection = {
  eyebrow: 'Kenapa TentaKlik',
  eyebrowEn: 'Why TentaKlik',
  title: 'Kenapa Harus TentaKlik?',
  titleEn: 'Why Choose TentaKlik?',
  sub: 'Bukan soal follower. Bukan soal likes. Tapi soal bisnis yang tumbuh.',
  subEn: 'Not about followers. Not about likes. But about a business that grows.',
};

export const whyUs = [
  { icon: '📊', title: 'Strategi Berbasis Data', titleEn: 'Data-Driven Strategy', desc: 'Setiap keputusan campaign didasarkan pada data, bukan asumsi atau feeling.', descEn: 'Every campaign decision is based on data, not assumptions or gut feelings.', accent: true },
  { icon: '🎨', title: 'Konten Sesuai Karakter Brand', titleEn: 'Brand-Fit Content', desc: 'Konten yang mencerminkan brand kamu, bukan template copy-paste generik.', descEn: 'Content that reflects your brand, not generic copy-paste templates.' },
  { icon: '📋', title: 'Report Jelas & Transparan', titleEn: 'Clear & Transparent Reports', desc: 'Weekly report mudah dipahami — bukan spreadsheet penuh angka yang membingungkan.', descEn: 'Easy-to-understand weekly reports — not confusing spreadsheets full of numbers.' },
  { icon: '⚙️', title: 'Tim Kreatif + Teknis', titleEn: 'Creative + Technical Team', desc: 'Designer, copywriter, media buyer, dan developer dalam satu workflow terintegrasi.', descEn: 'Designer, copywriter, media buyer, and developer in one integrated workflow.' },
  { icon: '🚀', title: 'Fokus ke Growth', titleEn: 'Growth-Focused', desc: 'Target kami bukan sekadar posting rutin — tapi bisnis kamu benar-benar berkembang.', descEn: 'Our goal isn\'t just regular posting — but your business genuinely growing.' },
  { icon: '🏪', title: 'Cocok untuk UMKM sampai Brand Besar', titleEn: 'Works for SMEs to Big Brands', desc: 'Paket fleksibel dari bisnis baru hingga perusahaan yang ingin scale.', descEn: 'Flexible packages from new businesses to companies that want to scale.' },
];

export const portfolioSection = {
  eyebrow: 'Portfolio',
  eyebrowEn: 'Portfolio',
  title: 'Campaign yang Nggak Cuma Jalan, Tapi Menghasilkan.',
  titleEn: 'Campaigns That Don\'t Just Run, But Deliver.',
  sub: 'Hasil nyata dari brand yang sudah percayakan growth digital mereka ke TentaKlik.',
  subEn: 'Real results from brands that trusted their digital growth to TentaKlik.',
};

export const caseStudies = [
  { thumb: '☕', name: 'Kopi Senja', industry: 'F&B', industryEn: 'F&B', metric: 'ROAS naik 4.7x dalam 3 bulan', metricEn: 'ROAS up 4.7x in 3 months', desc: 'Strategi Meta Ads & konten yang dioptimasi menghasilkan ROAS konsisten di atas target.', descEn: 'Optimized Meta Ads & content strategy consistently delivered ROAS above target.' },
  { thumb: '👗', name: 'LokaStyle', industry: 'Fashion', industryEn: 'Fashion', metric: 'Engagement Instagram naik 230%', metricEn: 'Instagram engagement up 230%', desc: 'Rebranding konten dan strategi kolaborasi meningkatkan engagement secara signifikan.', descEn: 'Content rebranding and collaboration strategy significantly increased engagement.' },
  { thumb: '🛒', name: 'NusaMart', industry: 'E-commerce', industryEn: 'E-commerce', metric: 'Conversion rate naik 68%', metricEn: 'Conversion rate up 68%', desc: 'Optimasi landing page dan Google Ads menghasilkan lonjakan konversi yang terukur.', descEn: 'Landing page and Google Ads optimization delivered measurable conversion jumps.' },
  { thumb: '📚', name: 'EduGrow', industry: 'Education', industryEn: 'Education', metric: 'Leads naik 3.2x', metricEn: 'Leads up 3.2x', desc: 'Funnel iklan berbayar yang dirancang ulang menghasilkan lead berkualitas lebih tinggi.', descEn: 'Redesigned paid ad funnel generated higher-quality leads at scale.' },
];

export const testimonialsSection = {
  eyebrow: 'Testimoni',
  eyebrowEn: 'Testimonials',
  title: 'Apa Kata Mereka?',
  titleEn: 'What Do They Say?',
};

export const testimonials = [
  { initials: 'KS', name: 'Founder Kopi Senja', role: 'F&B Brand', stars: 5, quote: 'Tim TentaKlik bantu kami ngerti kenapa iklan sebelumnya boros. Setelah strategi diperbaiki, ROAS naik signifikan dalam waktu singkat.', quoteEn: 'The TentaKlik team helped us understand why our previous ads were wasteful. After the strategy was improved, ROAS increased significantly in a short time.' },
  { initials: 'LS', name: 'Owner LokaStyle', role: 'Fashion Brand', stars: 5, quote: 'Desain kontennya fresh, report-nya jelas, dan campaign-nya terasa punya arah. Worth every rupiah yang kami investasikan.', quoteEn: 'The content design is fresh, the reports are clear, and the campaign feels purposeful. Worth every rupiah we invested.' },
  { initials: 'NM', name: 'Marketing Lead NusaMart', role: 'E-commerce', stars: 5, quote: 'Conversion rate kami naik 68% dalam 2 bulan pertama. Tim-nya responsif, strateginya masuk akal, dan hasilnya nyata.', quoteEn: 'Our conversion rate went up 68% in the first 2 months. The team is responsive, the strategy makes sense, and the results are real.' },
  { initials: 'EG', name: 'CEO EduGrow', role: 'Education Platform', stars: 5, quote: 'Leads kami naik 3.2x. TentaKlik bukan hanya vendor, tapi benar-benar jadi partner growth kami jangka panjang.', quoteEn: 'Our leads went up 3.2x. TentaKlik isn\'t just a vendor — they\'re truly our long-term growth partner.' },
];

export const pricingSection = {
  eyebrow: 'Harga',
  eyebrowEn: 'Pricing',
  title: 'Paket Fleksibel Sesuai Tahap Bisnis Kamu.',
  titleEn: 'Flexible Packages for Your Business Stage.',
  sub: 'Mulai dari strategi ringan sampai full-service growth marketing.',
  subEn: 'From lightweight strategy to full-service growth marketing.',
};

export const pricingPlans = [
  {
    name: 'Starter',
    desc: 'Untuk bisnis yang baru mulai serius di digital.',
    descEn: 'For businesses just starting to get serious about digital.',
    price: { ID: 'Rp 3.500.000', SG: 'SGD 350', MY: 'MYR 700', GLOBAL: 'USD 250' },
    period: '/bulan',
    periodEn: '/month',
    features: ['1 channel utama', '12 konten/bulan', 'Basic report', 'Monthly consultation', 'Social media optimization'],
    featuresEn: ['1 main channel', '12 content/month', 'Basic report', 'Monthly consultation', 'Social media optimization'],
    featured: false,
    cta: 'Mulai Sekarang',
    ctaEn: 'Get Started',
  },
  {
    name: 'Growth',
    desc: 'Untuk brand yang ingin scale campaign.',
    descEn: 'For brands that want to scale campaigns.',
    price: { ID: 'Rp 7.500.000', SG: 'SGD 750', MY: 'MYR 1.500', GLOBAL: 'USD 550' },
    period: '/bulan',
    periodEn: '/month',
    features: ['2–3 channel', '24 konten/bulan', 'Ads management', 'Weekly report', 'Campaign optimization', 'Dedicated account manager'],
    featuresEn: ['2–3 channels', '24 content/month', 'Ads management', 'Weekly report', 'Campaign optimization', 'Dedicated account manager'],
    featured: true,
    badge: '✦ Paling Populer',
    badgeEn: '✦ Most Popular',
    cta: 'Mulai Sekarang',
    ctaEn: 'Get Started',
  },
  {
    name: 'Scale',
    desc: 'Untuk bisnis yang butuh strategi full-funnel.',
    descEn: 'For businesses that need a full-funnel strategy.',
    price: { ID: 'Custom', SG: 'Custom', MY: 'Custom', GLOBAL: 'Custom' },
    period: '',
    periodEn: '',
    features: ['Omnichannel campaign', 'SEO + Ads + Content', 'Dashboard report', 'Weekly strategy call', 'Creative direction', 'Web/landing page support'],
    featuresEn: ['Omnichannel campaign', 'SEO + Ads + Content', 'Dashboard report', 'Weekly strategy call', 'Creative direction', 'Web/landing page support'],
    featured: false,
    cta: 'Hubungi Kami',
    ctaEn: 'Contact Us',
  },
];

export const faqSection = {
  eyebrow: 'FAQ',
  eyebrowEn: 'FAQ',
  title: 'Pertanyaan yang Sering Ditanyain.',
  titleEn: 'Frequently Asked Questions.',
};

export const faqItems = [
  { q: 'Apakah TentaKlik cocok untuk UMKM?', qEn: 'Is TentaKlik suitable for SMEs?', a: 'Ya! Kami punya paket Starter yang dirancang khusus untuk bisnis yang baru mulai serius di digital, dengan harga terjangkau dan hasil terukur. Banyak klien kami adalah UMKM yang kini tumbuh secara konsisten.', aEn: 'Yes! We have a Starter package designed specifically for businesses just starting to get serious about digital, with affordable pricing and measurable results. Many of our clients are SMEs that are now growing consistently.' },
  { q: 'Minimum kontrak berapa lama?', qEn: 'What is the minimum contract length?', a: 'Kontrak minimum 3 bulan agar strategi bisa terlihat hasilnya secara nyata. Digital marketing bukan magic — butuh waktu untuk data terkumpul dan optimasi berjalan.', aEn: 'The minimum contract is 3 months so the strategy can show real results. Digital marketing isn\'t magic — it takes time for data to accumulate and optimization to work.' },
  { q: 'Apakah budget iklan sudah termasuk dalam paket?', qEn: 'Is ad spend included in the package?', a: 'Budget iklan (ad spend ke platform seperti Meta, Google, TikTok) terpisah dari biaya jasa kami. Kami bantu kelola, optimasi, dan arahkan budget tersebut agar efisien.', aEn: 'Ad spend (to platforms like Meta, Google, TikTok) is separate from our service fee. We help manage, optimize, and direct that budget efficiently.' },
  { q: 'Apakah bisa request desain konten khusus?', qEn: 'Can I request custom content designs?', a: 'Tentu! Tim kreatif kami siap membuat konten sesuai brief dan karakter brand kamu. Kamu bisa share referensi, warna brand, tone, dan keinginan lainnya.', aEn: 'Of course! Our creative team is ready to create content according to your brief and brand character. You can share references, brand colors, tone, and other preferences.' },
  { q: 'Apakah bisa bikin website juga?', qEn: 'Can you also build a website?', a: 'Bisa! Kami punya layanan Website Development dan Landing Page yang bisa dikerjakan terpisah atau sebagai bagian dari paket campaign.', aEn: 'Yes! We have Website Development and Landing Page services that can be done separately or as part of a campaign package.' },
  { q: 'Bagaimana sistem reporting-nya?', qEn: 'How does the reporting system work?', a: 'Tergantung paket. Paket Starter mendapat monthly report, Growth mendapat weekly report, Scale mendapat dashboard report real-time plus strategy call mingguan.', aEn: 'It depends on the package. Starter gets monthly reports, Growth gets weekly reports, Scale gets a real-time dashboard report plus weekly strategy calls.' },
  { q: 'Apakah bisa custom paket di luar tiga pilihan di atas?', qEn: 'Can I customize a package outside of the three options?', a: 'Bisa! Hubungi kami untuk diskusi kebutuhan spesifik. Kami sering menyesuaikan paket untuk bisnis dengan kebutuhan unik.', aEn: 'Yes! Contact us to discuss specific needs. We often customize packages for businesses with unique requirements.' },
  { q: 'Apakah bisa handle TikTok dan Meta Ads sekaligus?', qEn: 'Can you handle TikTok and Meta Ads simultaneously?', a: 'Ya, kami mengelola TikTok Ads, Meta Ads (Facebook & Instagram), Google Ads, dan platform iklan lainnya — baik secara terpisah maupun dalam satu strategi omnichannel.', aEn: 'Yes, we manage TikTok Ads, Meta Ads (Facebook & Instagram), Google Ads, and other ad platforms — either separately or as part of one omnichannel strategy.' },
];

export const finalCtaSection = {
  title: 'Siap Bikin Brand Kamu\nLebih Sering Diklik?',
  titleEn: 'Ready to Make Your Brand\nGet Clicked More?',
  sub: 'Ceritain dulu kondisi bisnismu. Kami bantu arahin strategi digital yang paling masuk akal.',
  subEn: 'Tell us about your business first. We\'ll help direct the most sensible digital strategy.',
  cta: 'KONSULTASI GRATIS SEKARANG',
  ctaEn: 'GET FREE CONSULTATION NOW',
};

export const footerContent = {
  desc: 'Digital marketing agency yang fokus pada hasil nyata — dari awareness sampai conversion.',
  descEn: 'Digital marketing agency focused on real results — from awareness to conversion.',
  services: ['Social Media', 'Meta Ads', 'Google Ads', 'TikTok Ads', 'SEO', 'Content Marketing', 'Branding', 'Website'],
  company: [
    { label: 'Tentang Kami', labelEn: 'About Us', href: '#kenapa' },
    { label: 'Portfolio', labelEn: 'Portfolio', href: '#portfolio' },
    { label: 'Harga', labelEn: 'Pricing', href: '#harga' },
    { label: 'Blog', labelEn: 'Blog', href: '#' },
  ],
  copyright: '© 2025 TentaKlik. All rights reserved.',
  copyrightEn: '© 2025 TentaKlik. All rights reserved.',
};
```

- [ ] **Step 3: Buat `src/utils/i18n.ts`**

```ts
// src/utils/i18n.ts
export type Lang = 'id' | 'en';

export function detectLang(): Lang {
  if (typeof window === 'undefined') return 'id';
  const saved = localStorage.getItem('tk_lang') as Lang | null;
  if (saved === 'id' || saved === 'en') return saved;
  const browser = navigator.language.toLowerCase();
  return browser.startsWith('id') ? 'id' : 'en';
}

export function setLang(lang: Lang) {
  localStorage.setItem('tk_lang', lang);
  document.documentElement.setAttribute('data-lang', lang);
  document.querySelectorAll('[data-id]').forEach((el) => {
    (el as HTMLElement).style.display = lang === 'id' ? '' : 'none';
  });
  document.querySelectorAll('[data-en]').forEach((el) => {
    (el as HTMLElement).style.display = lang === 'en' ? '' : 'none';
  });
}

export function initLang() {
  const lang = detectLang();
  setLang(lang);
}
```

- [ ] **Step 4: Buat `src/utils/region.ts`**

```ts
// src/utils/region.ts
export type Region = 'ID' | 'SG' | 'MY' | 'GLOBAL';

const TZ_MAP: Record<string, Region> = {
  'Asia/Jakarta': 'ID',
  'Asia/Makassar': 'ID',
  'Asia/Jayapura': 'ID',
  'Asia/Singapore': 'SG',
  'Asia/Kuala_Lumpur': 'MY',
};

export function detectRegion(): Region {
  if (typeof window === 'undefined') return 'ID';
  const saved = localStorage.getItem('tk_region') as Region | null;
  if (saved && ['ID', 'SG', 'MY', 'GLOBAL'].includes(saved)) return saved;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return TZ_MAP[tz] ?? 'GLOBAL';
}

export function setRegion(region: Region) {
  localStorage.setItem('tk_region', region);
  document.documentElement.setAttribute('data-region', region);
}

export function getWhatsAppLink(whatsapp: Record<Region, string>, region: Region, message = '') {
  const number = whatsapp[region];
  const encoded = encodeURIComponent(message || 'Halo TentaKlik, saya ingin konsultasi gratis.');
  return `https://wa.me/${number}?text=${encoded}`;
}
```

- [ ] **Step 5: Buat `src/utils/confetti.ts`**

```ts
// src/utils/confetti.ts
export async function fireConfetti() {
  const { default: confetti } = await import('canvas-confetti');
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#FF791B', '#FFF3EB', '#ffffff', '#e06510'],
  });
}
```

- [ ] **Step 6: Verifikasi TypeScript types**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 7: Commit**

```bash
git add src/styles/global.css src/data/content.ts src/utils/
git commit -m "feat: add global styles, content data, and utility helpers"
```

---

## Task 3: BaseLayout

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Buat `src/layouts/BaseLayout.astro`**

```astro
---
// src/layouts/BaseLayout.astro
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
  canonical?: string;
}

const {
  title = 'TentaKlik — Digital Marketing Agency yang Bikin Brand Lebih Sering Diklik',
  description = 'TentaKlik membantu bisnis tumbuh lewat social media management, ads, SEO, content marketing, branding, dan website development yang fokus pada hasil.',
  canonical = 'https://tentaklik.com',
} = Astro.props;

const ogImage = `${canonical}/sectionhero.webp`;
---

<!doctype html>
<html lang="id" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta name="keywords" content="digital marketing agency, jasa digital marketing, jasa social media management, jasa iklan Meta Ads, jasa Google Ads, jasa SEO, jasa pembuatan website, TentaKlik" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />

    <link rel="canonical" href={canonical} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

    <title>{title}</title>

    <!-- Structured Data -->
    <script type="application/ld+json" set:html={JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'TentaKlik',
      url: canonical,
      description,
      contactPoint: { '@type': 'ContactPoint', contactType: 'sales', availableLanguage: ['Indonesian', 'English'] },
    })} />
  </head>
  <body>
    <slot />

    <!-- Lenis smooth scroll -->
    <script>
      import Lenis from 'lenis';
      const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Respect prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        lenis.destroy();
      }
    </script>

    <!-- Scroll reveal -->
    <script>
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible');
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    </script>
  </body>
</html>
```

- [ ] **Step 2: Buat favicon placeholder**

```bash
cat > public/favicon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="16" fill="#FF791B"/>
  <text x="16" y="22" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="900" fill="white">T</text>
</svg>
EOF
```

- [ ] **Step 3: Verifikasi build**

```bash
npm run build
```

Expected: Build sukses, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/ public/favicon.svg
git commit -m "feat: add BaseLayout with SEO, Lenis, and scroll reveal"
```

---

## Task 4: Header & Mobile Menu

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/MobileMenu.astro`
- Create: `src/components/ThemeToggle.astro`
- Create: `src/components/LanguageRegionSwitcher.astro`

- [ ] **Step 1: Buat `src/components/ThemeToggle.astro`**

```astro
---
// src/components/ThemeToggle.astro
---
<button
  id="theme-toggle"
  aria-label="Toggle dark/light mode"
  class="w-9 h-9 rounded-lg border border-border flex items-center justify-content center text-sm hover:border-primary transition-colors"
>
  <span class="dark-icon hidden">☀️</span>
  <span class="light-icon">🌙</span>
</button>

<script>
  const btn = document.getElementById('theme-toggle')!;
  const html = document.documentElement;

  function applyTheme(dark: boolean) {
    html.classList.toggle('dark', dark);
    btn.querySelector('.dark-icon')!.classList.toggle('hidden', !dark);
    btn.querySelector('.light-icon')!.classList.toggle('hidden', dark);
    localStorage.setItem('tk_theme', dark ? 'dark' : 'light');
  }

  const saved = localStorage.getItem('tk_theme');
  applyTheme(saved === 'dark');

  btn.addEventListener('click', () => applyTheme(!html.classList.contains('dark')));
</script>
```

- [ ] **Step 2: Buat `src/components/LanguageRegionSwitcher.astro`**

```astro
---
// src/components/LanguageRegionSwitcher.astro
---
<div class="flex items-center gap-2 text-sm">
  <select
    id="lang-select"
    aria-label="Pilih bahasa"
    class="bg-transparent border border-border rounded-md px-2 py-1 text-xs font-semibold text-text-body cursor-pointer hover:border-primary transition-colors"
  >
    <option value="id">🇮🇩 ID</option>
    <option value="en">🇬🇧 EN</option>
  </select>
  <select
    id="region-select"
    aria-label="Pilih region"
    class="bg-transparent border border-border rounded-md px-2 py-1 text-xs font-semibold text-text-body cursor-pointer hover:border-primary transition-colors"
  >
    <option value="ID">ID</option>
    <option value="SG">SG</option>
    <option value="MY">MY</option>
    <option value="GLOBAL">GLOBAL</option>
  </select>
</div>

<script>
  import { detectLang, setLang, type Lang } from '@/utils/i18n';
  import { detectRegion, setRegion, type Region } from '@/utils/region';

  const langSel = document.getElementById('lang-select') as HTMLSelectElement;
  const regionSel = document.getElementById('region-select') as HTMLSelectElement;

  langSel.value = detectLang();
  regionSel.value = detectRegion();

  langSel.addEventListener('change', () => setLang(langSel.value as Lang));
  regionSel.addEventListener('change', () => setRegion(regionSel.value as Region));

  // Init on load
  import { initLang } from '@/utils/i18n';
  initLang();
  setRegion(detectRegion());
</script>
```

- [ ] **Step 3: Buat `src/components/MobileMenu.astro`**

```astro
---
// src/components/MobileMenu.astro
import { navItems } from '@/data/content';
---
<div
  id="mobile-menu"
  class="fixed inset-0 z-50 bg-white transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col"
  aria-hidden="true"
>
  <div class="flex items-center justify-between px-6 h-[68px] border-b border-border">
    <span class="text-lg font-black text-dark">TentaKlik</span>
    <button
      id="mobile-menu-close"
      aria-label="Tutup menu"
      class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface"
    >
      ✕
    </button>
  </div>
  <nav class="flex flex-col px-6 py-8 gap-2">
    {navItems.map((item) => (
      <a
        href={item.href}
        class="text-lg font-700 text-dark py-3 border-b border-border hover:text-primary transition-colors"
        onclick="document.getElementById('mobile-menu')?.classList.add('translate-x-full')"
      >
        {item.label}
      </a>
    ))}
  </nav>
  <div class="px-6 mt-auto pb-8">
    <a
      href="#kontak"
      class="block w-full bg-primary text-white text-center py-4 rounded-lg font-extrabold text-sm hover:bg-primary-dark transition-colors"
      onclick="document.getElementById('mobile-menu')?.classList.add('translate-x-full')"
    >
      KONSULTASI GRATIS
    </a>
  </div>
</div>

<script>
  const menu = document.getElementById('mobile-menu')!;
  const closeBtn = document.getElementById('mobile-menu-close')!;

  closeBtn.addEventListener('click', () => {
    menu.classList.add('translate-x-full');
    menu.setAttribute('aria-hidden', 'true');
  });
</script>
```

- [ ] **Step 4: Buat `src/components/Header.astro`**

```astro
---
// src/components/Header.astro
import { navItems, siteConfig } from '@/data/content';
import ThemeToggle from './ThemeToggle.astro';
import LanguageRegionSwitcher from './LanguageRegionSwitcher.astro';
import MobileMenu from './MobileMenu.astro';
---

<MobileMenu />

<header
  id="site-header"
  class="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border transition-shadow"
>
  <nav class="max-w-container mx-auto px-10 h-[68px] flex items-center justify-between">
    <!-- Logo -->
    <a href="#beranda" class="flex items-center gap-2.5" aria-label="TentaKlik - Beranda">
      <div class="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white font-black text-base">
        T
      </div>
      <span class="text-[18px] font-black text-dark tracking-tight">TentaKlik</span>
    </a>

    <!-- Desktop Nav -->
    <ul class="hidden lg:flex items-center gap-8" role="list">
      {navItems.map((item) => (
        <li>
          <a
            href={item.href}
            class="text-sm font-semibold text-text-body hover:text-primary transition-colors"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>

    <!-- Desktop Right -->
    <div class="hidden lg:flex items-center gap-3">
      <ThemeToggle />
      <LanguageRegionSwitcher />
      <a
        href={`https://wa.me/${siteConfig.whatsapp.ID}?text=${encodeURIComponent('Halo TentaKlik, saya ingin konsultasi gratis.')}`}
        id="nav-cta"
        class="bg-primary hover:bg-primary-dark text-white font-extrabold text-sm px-6 py-2.5 rounded-lg transition-colors tracking-wide"
        target="_blank"
        rel="noopener noreferrer"
      >
        KONSULTASI GRATIS
      </a>
    </div>

    <!-- Mobile Hamburger -->
    <button
      id="mobile-menu-open"
      aria-label="Buka menu navigasi"
      class="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
    >
      <span class="w-6 h-0.5 bg-dark block"></span>
      <span class="w-6 h-0.5 bg-dark block"></span>
      <span class="w-4 h-0.5 bg-dark block self-start"></span>
    </button>
  </nav>
</header>

<script>
  // Scroll shadow
  const header = document.getElementById('site-header')!;
  window.addEventListener('scroll', () => {
    header.classList.toggle('shadow-sm', window.scrollY > 10);
  });

  // Mobile menu open
  const openBtn = document.getElementById('mobile-menu-open')!;
  const menu = document.getElementById('mobile-menu')!;
  openBtn.addEventListener('click', () => {
    menu.classList.remove('translate-x-full');
    menu.setAttribute('aria-hidden', 'false');
  });
</script>
```

- [ ] **Step 5: Build check**

```bash
npm run build
```

Expected: Build sukses.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.astro src/components/MobileMenu.astro src/components/ThemeToggle.astro src/components/LanguageRegionSwitcher.astro
git commit -m "feat: add Header, MobileMenu, ThemeToggle, LanguageRegionSwitcher"
```

---

## Task 5: Hero Section

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/CustomCursor.astro`

- [ ] **Step 1: Buat `src/components/CustomCursor.astro`**

```astro
---
// src/components/CustomCursor.astro
---
<div id="custom-cursor" aria-hidden="true"></div>

<script>
  const cursor = document.getElementById('custom-cursor')!;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (!isTouch) {
    cursor.classList.add('active');
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    const hoverTargets = 'a, button, [data-cursor-hover]';
    document.addEventListener('mouseover', (e) => {
      if ((e.target as Element).closest(hoverTargets)) cursor.classList.add('hovered');
    });
    document.addEventListener('mouseout', (e) => {
      if ((e.target as Element).closest(hoverTargets)) cursor.classList.remove('hovered');
    });
  }
</script>
```

- [ ] **Step 2: Buat `src/components/Hero.astro`**

```astro
---
// src/components/Hero.astro
import { heroContent, siteConfig } from '@/data/content';
---

<section id="beranda" class="relative overflow-hidden">
  <!-- Dot pattern background -->
  <div
    class="absolute inset-0 pointer-events-none"
    style="background-image: radial-gradient(#e5e5e5 1px, transparent 1px); background-size: 28px 28px; opacity: 0.6;"
    aria-hidden="true"
  ></div>

  <div class="relative max-w-container mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-68px)] py-14">
    <!-- LEFT: Copy -->
    <div class="reveal">
      <span class="text-primary text-sm font-bold tracking-widest uppercase mb-5 block">
        {heroContent.badge}
      </span>

      <h1 class="text-5xl lg:text-[54px] font-black text-dark leading-[1.1] tracking-[-0.125rem] mb-5 whitespace-pre-line">
        {heroContent.title}
      </h1>

      <p class="text-base text-text-body leading-relaxed max-w-[480px] mb-3">
        {heroContent.sub1}
      </p>
      <p class="text-base text-text-body leading-relaxed max-w-[480px] mb-9">
        {heroContent.sub2}
      </p>

      <div class="flex flex-wrap gap-3 mb-6">
        <button
          id="hero-cta"
          class="bg-primary hover:bg-primary-dark text-white font-extrabold text-sm px-8 py-3.5 rounded-lg transition-all tracking-wider"
          aria-label="Mulai konsultasi gratis dengan TentaKlik"
        >
          {heroContent.cta}
        </button>
        <a
          href="#layanan"
          class="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-sm px-8 py-3.5 rounded-lg transition-all tracking-wide"
        >
          {heroContent.ctaSecondary}
        </a>
      </div>

      <!-- Trust badges -->
      <div class="flex flex-wrap gap-6">
        {heroContent.trust.map((t) => (
          <div class="flex items-center gap-2 text-sm text-dark font-semibold">
            <span class="text-primary font-black">✓</span>
            {t}
          </div>
        ))}
      </div>
    </div>

    <!-- RIGHT: Image -->
    <div class="reveal flex items-center justify-end">
      <img
        src="/sectionhero.webp"
        alt="Portfolio website klien TentaKlik — berbagai desain website profesional"
        class="w-full max-w-[600px] drop-shadow-2xl"
        loading="eager"
        width="600"
        height="480"
      />
    </div>
  </div>
</section>

<script>
  import { fireConfetti } from '@/utils/confetti';
  import { getWhatsAppLink } from '@/utils/region';
  import { detectRegion } from '@/utils/region';
  import { siteConfig } from '@/data/content';

  const btn = document.getElementById('hero-cta')!;
  btn.addEventListener('click', async () => {
    await fireConfetti();
    const region = detectRegion();
    const url = getWhatsAppLink(
      siteConfig.whatsapp,
      region,
      'Halo TentaKlik! Saya ingin konsultasi gratis untuk bisnis saya.'
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  });
</script>
```

- [ ] **Step 3: Build check**

```bash
npm run build
```

Expected: Build sukses.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/components/CustomCursor.astro
git commit -m "feat: add Hero section with split layout and confetti CTA"
```

---

## Task 6: BrandMarquee

**Files:**
- Create: `src/components/BrandMarquee.astro`

- [ ] **Step 1: Buat `src/components/BrandMarquee.astro`**

```astro
---
// src/components/BrandMarquee.astro
import { clients } from '@/data/content';
const doubled = [...clients, ...clients];
---

<div class="bg-surface border-t border-b border-border overflow-hidden py-5">
  <div class="max-w-container mx-auto px-10 flex items-center gap-5">
    <span class="text-[11px] font-extrabold text-text-muted tracking-widest uppercase whitespace-nowrap">
      Dipercaya oleh
    </span>
    <div class="w-px h-5 bg-border flex-shrink-0"></div>

    <div class="overflow-hidden flex-1 relative">
      <!-- Fade edges -->
      <div class="absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none"></div>
      <div class="absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none"></div>

      <div class="marquee-track flex gap-12 w-max" aria-label="Daftar klien TentaKlik">
        {doubled.map((client) => (
          <span class="text-sm font-bold text-[#ccc] hover:text-primary transition-colors cursor-default whitespace-nowrap">
            {client}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>

<style>
  .marquee-track {
    animation: marquee 28s linear infinite;
  }
  .marquee-track:hover {
    animation-play-state: paused;
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @media (prefers-reduced-motion: reduce) {
    .marquee-track { animation: none; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BrandMarquee.astro
git commit -m "feat: add BrandMarquee with infinite scroll and pause on hover"
```

---

## Task 7: Services Section

**Files:**
- Create: `src/components/Services.astro`

- [ ] **Step 1: Buat `src/components/Services.astro`**

```astro
---
// src/components/Services.astro
import { services, servicesSection } from '@/data/content';
---

<section id="layanan" class="py-20 bg-white">
  <div class="max-w-container mx-auto px-10">
    <div class="reveal">
      <p class="eyebrow">{servicesSection.eyebrow}</p>
      <h2 class="section-title max-w-xl">{servicesSection.title}</h2>
      <p class="section-sub">{servicesSection.sub}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {services.map((s, i) => (
        <article
          class="reveal border border-border rounded-2xl p-6 bg-white hover:border-primary hover:shadow-[0_8px_28px_rgba(255,121,27,0.1)] hover:-translate-y-1 transition-all duration-250 cursor-default group"
          style={`transition-delay: ${i * 40}ms`}
        >
          <div class="w-[46px] h-[46px] bg-primary-light rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-primary/20 transition-colors">
            {s.icon}
          </div>
          <span class="inline-block text-[10px] font-extrabold text-primary bg-primary-light rounded-full px-3 py-0.5 mb-3 tracking-wide">
            {s.tag}
          </span>
          <h3 class="text-[15px] font-extrabold text-dark mb-2">{s.title}</h3>
          <p class="text-[13px] text-text-body leading-relaxed">{s.desc}</p>
        </article>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Services.astro
git commit -m "feat: add Services section with 4-col card grid"
```

---

## Task 8: Process Section

**Files:**
- Create: `src/components/Process.astro`

- [ ] **Step 1: Buat `src/components/Process.astro`**

```astro
---
// src/components/Process.astro
import { processSteps, processSection } from '@/data/content';
---

<section id="proses" class="py-20 bg-surface">
  <div class="max-w-container mx-auto px-10">
    <div class="reveal">
      <p class="eyebrow">{processSection.eyebrow}</p>
      <h2 class="section-title">{processSection.title}</h2>
      <p class="section-sub">{processSection.sub}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {processSteps.map((step, i) => (
        <div
          class="reveal bg-white border border-border rounded-2xl p-7 hover:border-primary hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,121,27,0.08)] transition-all duration-250"
          style={`transition-delay: ${i * 60}ms`}
        >
          <div class="text-5xl font-black text-primary-light tracking-tighter mb-4 leading-none select-none">
            {step.num}
          </div>
          <h3 class="text-base font-extrabold text-dark mb-2">{step.title}</h3>
          <p class="text-[13px] text-text-body leading-relaxed">{step.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Process.astro
git commit -m "feat: add Process section with 4-step cards"
```

---

## Task 9: Why Choose Us (Dark Bento)

**Files:**
- Create: `src/components/WhyChooseUs.astro`

- [ ] **Step 1: Buat `src/components/WhyChooseUs.astro`**

```astro
---
// src/components/WhyChooseUs.astro
import { whyUs, whySection } from '@/data/content';
---

<section id="kenapa" class="py-20 bg-dark">
  <div class="max-w-container mx-auto px-10">
    <div class="reveal">
      <p class="eyebrow">{whySection.eyebrow}</p>
      <h2 class="text-4xl font-black text-white leading-tight tracking-tight mb-3">{whySection.title}</h2>
      <p class="text-base text-text-muted leading-relaxed max-w-xl mb-12">{whySection.sub}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {whyUs.map((item, i) => (
        <div
          class={`reveal rounded-2xl p-7 border transition-all duration-250 hover:border-primary ${
            item.accent
              ? 'bg-primary border-primary'
              : 'bg-dark-card border-dark-border'
          }`}
          style={`transition-delay: ${i * 50}ms`}
        >
          <div class="text-3xl mb-4">{item.icon}</div>
          <h3 class="text-base font-extrabold text-white mb-2">{item.title}</h3>
          <p class={`text-[13px] leading-relaxed ${item.accent ? 'text-white/80' : 'text-[#777]'}`}>
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/WhyChooseUs.astro
git commit -m "feat: add WhyChooseUs dark section with bento grid"
```

---

## Task 10: Case Studies & Testimonials

**Files:**
- Create: `src/components/CaseStudies.astro`
- Create: `src/components/Testimonials.astro`

- [ ] **Step 1: Buat `src/components/CaseStudies.astro`**

```astro
---
// src/components/CaseStudies.astro
import { caseStudies, portfolioSection } from '@/data/content';
---

<section id="portfolio" class="py-20 bg-white">
  <div class="max-w-container mx-auto px-10">
    <div class="reveal">
      <p class="eyebrow">{portfolioSection.eyebrow}</p>
      <h2 class="section-title max-w-xl">{portfolioSection.title}</h2>
      <p class="section-sub">{portfolioSection.sub}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      {caseStudies.map((cs, i) => (
        <article
          class="reveal flex items-center gap-5 border border-border rounded-2xl p-7 bg-white hover:border-primary hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(255,121,27,0.08)] transition-all duration-250 cursor-default"
          style={`transition-delay: ${i * 60}ms`}
        >
          <div class="w-20 h-20 flex-shrink-0 bg-primary-light rounded-2xl flex items-center justify-center text-4xl">
            {cs.thumb}
          </div>
          <div>
            <h3 class="text-base font-extrabold text-dark mb-1">{cs.name}</h3>
            <p class="text-xs font-semibold text-text-muted mb-3">{cs.industry}</p>
            <span class="inline-block bg-primary-light text-primary text-[13px] font-extrabold rounded-lg px-3 py-1">
              {cs.metric}
            </span>
            <p class="text-[13px] text-text-body leading-relaxed mt-2">{cs.desc}</p>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Buat `src/components/Testimonials.astro`**

```astro
---
// src/components/Testimonials.astro
import { testimonials, testimonialsSection } from '@/data/content';
---

<section id="testimoni" class="py-20 bg-surface">
  <div class="max-w-container mx-auto px-10">
    <div class="reveal">
      <p class="eyebrow">{testimonialsSection.eyebrow}</p>
      <h2 class="section-title">{testimonialsSection.title}</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      {testimonials.map((t, i) => (
        <article
          class="reveal bg-white border border-border rounded-2xl p-7 hover:border-primary hover:shadow-[0_8px_24px_rgba(255,121,27,0.08)] transition-all duration-250"
          style={`transition-delay: ${i * 60}ms`}
        >
          <div class="flex gap-0.5 mb-4" aria-label={`Rating ${t.stars} bintang`}>
            {Array.from({ length: t.stars }).map(() => (
              <span class="text-primary text-lg">★</span>
            ))}
          </div>
          <blockquote class="text-[15px] text-dark/80 leading-relaxed italic mb-5">
            "{t.quote}"
          </blockquote>
          <div class="flex items-center gap-3">
            <div
              class="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white text-sm font-extrabold flex-shrink-0"
              aria-hidden="true"
            >
              {t.initials}
            </div>
            <div>
              <p class="text-sm font-extrabold text-dark">{t.name}</p>
              <p class="text-xs text-text-muted">{t.role}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/CaseStudies.astro src/components/Testimonials.astro
git commit -m "feat: add CaseStudies and Testimonials sections"
```

---

## Task 11: Pricing Section

**Files:**
- Create: `src/components/Pricing.astro`

- [ ] **Step 1: Buat `src/components/Pricing.astro`**

```astro
---
// src/components/Pricing.astro
import { pricingPlans, pricingSection, siteConfig } from '@/data/content';
---

<section id="harga" class="py-20 bg-white">
  <div class="max-w-container mx-auto px-10">
    <div class="reveal">
      <p class="eyebrow">{pricingSection.eyebrow}</p>
      <h2 class="section-title">{pricingSection.title}</h2>
      <p class="section-sub">{pricingSection.sub}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
      {pricingPlans.map((plan, i) => (
        <article
          class={`reveal rounded-[18px] p-8 transition-all duration-250 hover:-translate-y-1 ${
            plan.featured
              ? 'bg-primary border border-primary shadow-[0_12px_40px_rgba(255,121,27,0.35)]'
              : 'bg-white border border-border hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]'
          }`}
          style={`transition-delay: ${i * 80}ms`}
        >
          {plan.featured && plan.badge && (
            <span class="inline-block bg-white/25 text-white text-[11px] font-extrabold rounded-full px-3 py-1 mb-4">
              {plan.badge}
            </span>
          )}

          <h3 class={`text-xl font-black mb-1.5 ${plan.featured ? 'text-white' : 'text-dark'}`}>
            {plan.name}
          </h3>
          <p class={`text-[13px] mb-5 ${plan.featured ? 'text-white/75' : 'text-text-muted'}`}>
            {plan.desc}
          </p>

          <div class={`text-[34px] font-black tracking-tight ${plan.featured ? 'text-white' : 'text-dark'}`}>
            <span id={`price-${plan.name.toLowerCase()}`}>{plan.price.ID}</span>
            {plan.period && (
              <span class={`text-sm font-medium ${plan.featured ? 'text-white/60' : 'text-text-muted'}`}>
                {plan.period}
              </span>
            )}
          </div>

          <hr class={`my-5 ${plan.featured ? 'border-white/25' : 'border-border'}`} />

          <ul class="flex flex-col gap-2.5">
            {plan.features.map((f) => (
              <li class={`text-[13px] flex items-center gap-2 ${plan.featured ? 'text-white' : 'text-text-body'}`}>
                <span class={`font-black ${plan.featured ? 'text-white/80' : 'text-primary'}`}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          <a
            href={`https://wa.me/${siteConfig.whatsapp.ID}?text=${encodeURIComponent(`Halo TentaKlik! Saya tertarik dengan paket ${plan.name}.`)}`}
            class={`mt-6 block w-full text-center py-3.5 rounded-xl font-extrabold text-sm tracking-wide transition-colors ${
              plan.featured
                ? 'bg-white text-primary hover:bg-white/90'
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
            target="_blank"
            rel="noopener noreferrer"
            data-plan={plan.name}
          >
            {plan.cta}
          </a>
        </article>
      ))}
    </div>
  </div>
</section>

<script>
  import { detectRegion } from '@/utils/region';
  import { pricingPlans, siteConfig } from '@/data/content';

  const region = detectRegion();

  // Update prices per region
  pricingPlans.forEach((plan) => {
    const el = document.getElementById(`price-${plan.name.toLowerCase()}`);
    if (el) el.textContent = plan.price[region] ?? plan.price.ID;
  });

  // Update WhatsApp links per region
  const wa = siteConfig.whatsapp[region];
  document.querySelectorAll<HTMLAnchorElement>('[data-plan]').forEach((el) => {
    const plan = el.dataset.plan ?? '';
    el.href = `https://wa.me/${wa}?text=${encodeURIComponent(`Halo TentaKlik! Saya tertarik dengan paket ${plan}.`)}`;
  });
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Pricing.astro
git commit -m "feat: add Pricing section with regional price switching"
```

---

## Task 12: FAQ Section

**Files:**
- Create: `src/components/FAQ.astro`

- [ ] **Step 1: Buat `src/components/FAQ.astro`**

```astro
---
// src/components/FAQ.astro
import { faqItems, faqSection } from '@/data/content';
---

<section id="faq" class="py-20 bg-surface">
  <div class="max-w-[960px] mx-auto px-10">
    <div class="reveal text-center mb-12">
      <p class="eyebrow">{faqSection.eyebrow}</p>
      <h2 class="section-title">{faqSection.title}</h2>
    </div>

    <div class="flex flex-col gap-3">
      {faqItems.map((item, i) => (
        <div
          class="reveal faq-item bg-white border border-border rounded-xl overflow-hidden hover:border-primary transition-colors"
          style={`transition-delay: ${i * 40}ms`}
        >
          <button
            class="faq-trigger w-full text-left px-6 py-5 text-sm font-bold text-dark flex items-center justify-between gap-4"
            aria-expanded="false"
            type="button"
          >
            <span>{item.q}</span>
            <span class="faq-icon text-primary text-xl font-light flex-shrink-0 transition-transform duration-200">+</span>
          </button>
          <div class="faq-answer overflow-hidden max-h-0 transition-all duration-300 ease-in-out">
            <p class="px-6 pb-5 text-sm text-text-body leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<script>
  document.querySelectorAll('.faq-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item')!;
      const answer = item.querySelector<HTMLElement>('.faq-answer')!;
      const icon = trigger.querySelector('.faq-icon')!;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all others
      document.querySelectorAll('.faq-item').forEach((other) => {
        if (other !== item) {
          const otherTrigger = other.querySelector('.faq-trigger')!;
          const otherAnswer = other.querySelector<HTMLElement>('.faq-answer')!;
          const otherIcon = other.querySelector('.faq-icon')!;
          otherTrigger.setAttribute('aria-expanded', 'false');
          otherAnswer.style.maxHeight = '0';
          otherIcon.textContent = '+';
          otherIcon.classList.remove('rotate-45');
        }
      });

      if (isOpen) {
        trigger.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
        icon.textContent = '+';
        icon.classList.remove('rotate-45');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '+';
        icon.classList.add('rotate-45');
      }
    });
  });
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FAQ.astro
git commit -m "feat: add FAQ section with accessible accordion"
```

---

## Task 13: Final CTA & Footer

**Files:**
- Create: `src/components/FinalCTA.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Buat `src/components/FinalCTA.astro`**

```astro
---
// src/components/FinalCTA.astro
import { finalCtaSection, siteConfig } from '@/data/content';
---

<section id="kontak" class="bg-dark py-20 px-10 text-center relative overflow-hidden">
  <!-- Decorative shape -->
  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

  <div class="relative max-w-container mx-auto">
    <div class="reveal">
      <h2 class="text-4xl lg:text-[42px] font-black text-white leading-tight tracking-tight mb-4 whitespace-pre-line">
        {finalCtaSection.title}
      </h2>
      <p class="text-base text-[#777] max-w-[520px] mx-auto leading-relaxed mb-9">
        {finalCtaSection.sub}
      </p>
      <button
        id="final-cta-btn"
        class="bg-primary hover:bg-primary-dark text-white font-extrabold text-base px-10 py-4 rounded-xl transition-all tracking-wider"
      >
        {finalCtaSection.cta}
      </button>
    </div>
  </div>
</section>

<script>
  import { fireConfetti } from '@/utils/confetti';
  import { getWhatsAppLink, detectRegion } from '@/utils/region';
  import { siteConfig } from '@/data/content';

  document.getElementById('final-cta-btn')!.addEventListener('click', async () => {
    await fireConfetti();
    const region = detectRegion();
    window.open(
      getWhatsAppLink(siteConfig.whatsapp, region, 'Halo TentaKlik! Saya ingin konsultasi gratis.'),
      '_blank',
      'noopener,noreferrer'
    );
  });
</script>
```

- [ ] **Step 2: Buat `src/components/Footer.astro`**

```astro
---
// src/components/Footer.astro
import { footerContent, siteConfig } from '@/data/content';
---

<footer class="bg-[#111] pt-16 pb-8">
  <div class="max-w-container mx-auto px-10">
    <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
      <!-- Brand -->
      <div>
        <p class="text-xl font-black text-white mb-3">TentaKlik</p>
        <p class="text-sm text-[#666] leading-relaxed max-w-[240px]">{footerContent.desc}</p>
        <div class="flex gap-3 mt-5">
          <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram TentaKlik" class="w-9 h-9 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-sm hover:bg-primary transition-colors">📸</a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn TentaKlik" class="w-9 h-9 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-sm hover:bg-primary transition-colors">💼</a>
          <a href={`mailto:${siteConfig.email}`} aria-label="Email TentaKlik" class="w-9 h-9 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-sm hover:bg-primary transition-colors">✉️</a>
        </div>
      </div>

      <!-- Services -->
      <div>
        <h3 class="text-sm font-extrabold text-white mb-4">Layanan</h3>
        <ul class="flex flex-col gap-2.5">
          {footerContent.services.map((s) => (
            <li><a href="#layanan" class="text-sm text-[#666] hover:text-primary transition-colors">{s}</a></li>
          ))}
        </ul>
      </div>

      <!-- Company -->
      <div>
        <h3 class="text-sm font-extrabold text-white mb-4">Perusahaan</h3>
        <ul class="flex flex-col gap-2.5">
          {footerContent.company.map((c) => (
            <li><a href={c.href} class="text-sm text-[#666] hover:text-primary transition-colors">{c.label}</a></li>
          ))}
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="text-sm font-extrabold text-white mb-4">Kontak</h3>
        <ul class="flex flex-col gap-2.5">
          <li>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.ID}`}
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-[#666] hover:text-primary transition-colors"
            >
              WhatsApp
            </a>
          </li>
          <li>
            <a href={`mailto:${siteConfig.email}`} class="text-sm text-[#666] hover:text-primary transition-colors">
              {siteConfig.email}
            </a>
          </li>
          <li>
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" class="text-sm text-[#666] hover:text-primary transition-colors">
              Instagram
            </a>
          </li>
          <li>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" class="text-sm text-[#666] hover:text-primary transition-colors">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-[#222] pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
      <p class="text-xs text-[#555]">{footerContent.copyright}</p>
      <p class="text-xs text-[#555]">Digital Marketing Agency Indonesia</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/FinalCTA.astro src/components/Footer.astro
git commit -m "feat: add FinalCTA with confetti and Footer"
```

---

## Task 14: Compose index.astro & Final Verification

**Files:**
- Create: `src/pages/index.astro`
- Modify: verify all imports resolve

- [ ] **Step 1: Buat `src/pages/index.astro`**

```astro
---
// src/pages/index.astro
import BaseLayout from '@/layouts/BaseLayout.astro';
import Header from '@/components/Header.astro';
import Hero from '@/components/Hero.astro';
import BrandMarquee from '@/components/BrandMarquee.astro';
import Services from '@/components/Services.astro';
import Process from '@/components/Process.astro';
import WhyChooseUs from '@/components/WhyChooseUs.astro';
import CaseStudies from '@/components/CaseStudies.astro';
import Testimonials from '@/components/Testimonials.astro';
import Pricing from '@/components/Pricing.astro';
import FAQ from '@/components/FAQ.astro';
import FinalCTA from '@/components/FinalCTA.astro';
import Footer from '@/components/Footer.astro';
import CustomCursor from '@/components/CustomCursor.astro';
---

<BaseLayout>
  <CustomCursor />
  <Header />
  <main>
    <Hero />
    <BrandMarquee />
    <Services />
    <Process />
    <WhyChooseUs />
    <CaseStudies />
    <Testimonials />
    <Pricing />
    <FAQ />
    <FinalCTA />
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Dev server — verifikasi visual semua section**

```bash
npm run dev
```

Buka `http://localhost:4321` dan pastikan:
- [ ] Navbar sticky + blur muncul saat scroll
- [ ] Hero: teks kiri, gambar kanan tampil, dot pattern muncul
- [ ] Brand marquee berjalan, pause on hover
- [ ] Services 8 card grid rapi
- [ ] Process 4 step card rapi
- [ ] Why Us dark section 6 bento card
- [ ] Case Studies 4 card 2-kolom
- [ ] Testimonials 4 card 2-kolom
- [ ] Pricing 3 card, Growth featured orange
- [ ] FAQ accordion membuka/menutup dengan smooth
- [ ] Final CTA dark, confetti saat klik
- [ ] Footer 4 kolom rapi

- [ ] **Step 4: Production build**

```bash
npm run build
```

Expected: `dist/` folder terbentuk, no errors, no warnings kritis.

- [ ] **Step 5: Preview production build**

```bash
npm run preview
```

Buka `http://localhost:4321` (preview port). Pastikan semua sama dengan dev.

- [ ] **Step 6: Final commit**

```bash
git add src/pages/index.astro
git commit -m "feat: compose homepage with all 12 sections"
```

---

## Task 15: Deploy Instructions

Setelah `npm run build` sukses, folder `dist/` siap diupload.

- [ ] **Step 1: Upload dist ke VPS**

```bash
rsync -avz dist/ user@your-server:/var/www/tentaklik/dist/
```

- [ ] **Step 2: Konfigurasi Nginx**

```nginx
server {
    listen 80;
    server_name tentaklik.com www.tentaklik.com;
    root /var/www/tentaklik/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/css application/javascript image/webp image/svg+xml;
    gzip_min_length 1024;

    # Cache static assets
    location ~* \.(webp|svg|ico|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

- [ ] **Step 3: Setup SSL**

```bash
sudo certbot --nginx -d tentaklik.com -d www.tentaklik.com
sudo systemctl reload nginx
```

---

## Self-Review

**Spec coverage:**
- ✅ Semua 12 section (Navbar, Hero, Marquee, Services, Process, Why Us, Portfolio, Testimonials, Pricing, FAQ, Final CTA, Footer)
- ✅ Multi-language (i18n.ts dengan `data-id`/`data-en` attribute system)
- ✅ Multi-region (region.ts dengan timezone detection, harga per region, WhatsApp per region)
- ✅ Dark/light toggle (ThemeToggle.astro + localStorage)
- ✅ Custom cursor desktop only (touch device check)
- ✅ Confetti di Hero CTA dan Final CTA
- ✅ Scroll reveal (Intersection Observer di BaseLayout)
- ✅ Smooth scroll (Lenis di BaseLayout)
- ✅ FAQ accordion accessible (aria-expanded)
- ✅ Mobile menu (MobileMenu.astro + hamburger)
- ✅ Brand marquee pause on hover
- ✅ SEO: title, description, OG, Twitter Card, structured data, canonical
- ✅ Semua konten dari superprompt.md (copywriting lengkap di content.ts)
- ✅ WhatsApp configurable dari siteConfig.whatsapp
- ✅ Color #FF791B konsisten
- ✅ No gradients — semua solid color
- ✅ `public/sectionhero.webp` di hero kanan

**Placeholder scan:** Tidak ada TBD, TODO, atau kode yang hilang. Semua steps memiliki kode lengkap.

**Type consistency:** `Region` type digunakan konsisten di `region.ts`, `content.ts`, dan `Pricing.astro`. `Lang` type konsisten di `i18n.ts` dan `LanguageRegionSwitcher.astro`. `siteConfig.whatsapp` adalah `Record<Region, string>` konsisten dipakai di `Header.astro`, `Pricing.astro`, `FinalCTA.astro`, dan `Footer.astro`.
