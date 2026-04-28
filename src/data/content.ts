// src/data/content.ts

export const siteConfig = {
  name: 'TentaKlik',
  tagline: 'Digital Marketing Agency yang Bikin Brand Lebih Sering Diklik',
  description:
    'TentaKlik membantu bisnis tumbuh lewat social media management, ads, SEO, content marketing, branding, dan website development yang fokus pada hasil.',
  url: 'https://tentaklik.com',
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
  sub1En: "TentaKlik helps businesses grow through digital marketing strategies, creative content, paid ads, SEO, social media, and websites designed to drive conversions.",
  sub2: 'Dari UMKM sampai brand besar — campaign yang fokus pada hasil nyata, bukan sekadar angka.',
  sub2En: "From SMEs to big brands — campaigns focused on real results, not just numbers.",
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
  titleEn: "Digital Services That Move Your Business.",
  sub: "Dari awareness sampai conversion, semua dirancang biar campaign kamu nggak cuma ramai, tapi juga berdampak.",
  subEn: "From awareness to conversion, all designed so your campaign isn't just busy, but impactful.",
};

export const services = [
  { icon: '📱', tag: 'Social', tagEn: 'Social', title: 'Social Media Management', titleEn: 'Social Media Management', desc: 'Strategi konten, jadwal posting, dan community management yang konsisten.', descEn: 'Content strategy, posting schedule, and consistent community management.' },
  { icon: '🎯', tag: 'Ads', tagEn: 'Ads', title: 'Meta Ads', titleEn: 'Meta Ads', desc: 'Campaign Facebook & Instagram yang dioptimasi untuk ROAS maksimal.', descEn: 'Facebook & Instagram campaigns optimized for maximum ROAS.' },
  { icon: '🔍', tag: 'Ads', tagEn: 'Ads', title: 'Google Ads', titleEn: 'Google Ads', desc: 'Search, Display, dan Shopping ads yang menjangkau audience yang tepat.', descEn: 'Search, Display, and Shopping ads that reach the right audience.' },
  { icon: '⚡', tag: 'Ads', tagEn: 'Ads', title: 'TikTok Ads', titleEn: 'TikTok Ads', desc: 'Creative-first approach untuk ads yang perform di platform Gen Z.', descEn: 'Creative-first approach for ads that perform on the Gen Z platform.' },
  { icon: '📈', tag: 'Organic', tagEn: 'Organic', title: 'SEO', titleEn: 'SEO', desc: 'Optimasi on-page & off-page agar brand muncul di pencarian teratas.', descEn: 'On-page & off-page optimization to make your brand appear at the top.' },
  { icon: '✍️', tag: 'Content', tagEn: 'Content', title: 'Content Marketing', titleEn: 'Content Marketing', desc: 'Konten yang educates, engages, dan converts — bukan sekadar posting.', descEn: "Content that educates, engages, and converts — not just posting." },
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
  { num: '04', title: 'Optimize', titleEn: 'Optimize', desc: 'Data dianalisis, campaign diperbaiki, budget diarahkan ke strategi yang paling menghasilkan.', descEn: "Data is analyzed, campaigns are improved, and budget directed to the best-performing strategy." },
];

export const whySection = {
  eyebrow: 'Kenapa TentaKlik',
  eyebrowEn: 'Why TentaKlik',
  title: 'Kenapa Harus TentaKlik?',
  titleEn: 'Why Choose TentaKlik?',
  sub: 'Bukan soal follower. Bukan soal likes. Tapi soal bisnis yang tumbuh.',
  subEn: "Not about followers. Not about likes. But about a business that grows.",
};

export const whyUs = [
  { icon: '📊', title: 'Strategi Berbasis Data', titleEn: 'Data-Driven Strategy', desc: 'Setiap keputusan campaign didasarkan pada data, bukan asumsi atau feeling.', descEn: 'Every campaign decision is based on data, not assumptions or gut feelings.', accent: true },
  { icon: '🎨', title: 'Konten Sesuai Karakter Brand', titleEn: 'Brand-Fit Content', desc: 'Konten yang mencerminkan brand kamu, bukan template copy-paste generik.', descEn: 'Content that reflects your brand, not generic copy-paste templates.', accent: false },
  { icon: '📋', title: 'Report Jelas & Transparan', titleEn: 'Clear & Transparent Reports', desc: 'Weekly report mudah dipahami — bukan spreadsheet penuh angka yang membingungkan.', descEn: "Easy-to-understand weekly reports — not confusing spreadsheets full of numbers.", accent: false },
  { icon: '⚙️', title: 'Tim Kreatif + Teknis', titleEn: 'Creative + Technical Team', desc: 'Designer, copywriter, media buyer, dan developer dalam satu workflow terintegrasi.', descEn: 'Designer, copywriter, media buyer, and developer in one integrated workflow.', accent: false },
  { icon: '🚀', title: 'Fokus ke Growth', titleEn: 'Growth-Focused', desc: 'Target kami bukan sekadar posting rutin — tapi bisnis kamu benar-benar berkembang.', descEn: "Our goal isn't just regular posting — but your business genuinely growing.", accent: false },
  { icon: '🏪', title: 'Cocok untuk UMKM sampai Brand Besar', titleEn: 'Works for SMEs to Big Brands', desc: 'Paket fleksibel dari bisnis baru hingga perusahaan yang ingin scale.', descEn: 'Flexible packages from new businesses to companies that want to scale.', accent: false },
];

export const portfolioSection = {
  eyebrow: 'Portfolio',
  eyebrowEn: 'Portfolio',
  title: 'Campaign yang Nggak Cuma Jalan, Tapi Menghasilkan.',
  titleEn: "Campaigns That Don't Just Run, But Deliver.",
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
  { initials: 'NM', name: 'Marketing Lead NusaMart', role: 'E-commerce', stars: 5, quote: 'Conversion rate kami naik 68% dalam 2 bulan pertama. Tim-nya responsif, strateginya masuk akal, dan hasilnya nyata.', quoteEn: "Our conversion rate went up 68% in the first 2 months. The team is responsive, the strategy makes sense, and the results are real." },
  { initials: 'EG', name: 'CEO EduGrow', role: 'Education Platform', stars: 5, quote: 'Leads kami naik 3.2x. TentaKlik bukan hanya vendor, tapi benar-benar jadi partner growth kami jangka panjang.', quoteEn: "Our leads went up 3.2x. TentaKlik isn't just a vendor — they're truly our long-term growth partner." },
];

export const pricingSection = {
  eyebrow: 'Harga',
  eyebrowEn: 'Pricing',
  title: 'Paket Fleksibel Sesuai Tahap Bisnis Kamu.',
  titleEn: 'Flexible Packages for Your Business Stage.',
  sub: 'Mulai dari strategi ringan sampai full-service growth marketing.',
  subEn: 'From lightweight strategy to full-service growth marketing.',
};

export type Region = 'ID' | 'SG' | 'MY' | 'GLOBAL';

export const pricingPlans = [
  {
    name: 'Starter',
    desc: 'Untuk bisnis yang baru mulai serius di digital.',
    descEn: 'For businesses just starting to get serious about digital.',
    price: { ID: 'Rp 3.500.000', SG: 'SGD 350', MY: 'MYR 700', GLOBAL: 'USD 250' } as Record<Region, string>,
    period: '/bulan',
    periodEn: '/month',
    features: ['1 channel utama', '12 konten/bulan', 'Basic report', 'Monthly consultation', 'Social media optimization'],
    featuresEn: ['1 main channel', '12 content/month', 'Basic report', 'Monthly consultation', 'Social media optimization'],
    featured: false,
    badge: '',
    badgeEn: '',
    cta: 'Mulai Sekarang',
    ctaEn: 'Get Started',
  },
  {
    name: 'Growth',
    desc: 'Untuk brand yang ingin scale campaign.',
    descEn: 'For brands that want to scale campaigns.',
    price: { ID: 'Rp 7.500.000', SG: 'SGD 750', MY: 'MYR 1.500', GLOBAL: 'USD 550' } as Record<Region, string>,
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
    price: { ID: 'Custom', SG: 'Custom', MY: 'Custom', GLOBAL: 'Custom' } as Record<Region, string>,
    period: '',
    periodEn: '',
    features: ['Omnichannel campaign', 'SEO + Ads + Content', 'Dashboard report', 'Weekly strategy call', 'Creative direction', 'Web/landing page support'],
    featuresEn: ['Omnichannel campaign', 'SEO + Ads + Content', 'Dashboard report', 'Weekly strategy call', 'Creative direction', 'Web/landing page support'],
    featured: false,
    badge: '',
    badgeEn: '',
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
  { q: 'Minimum kontrak berapa lama?', qEn: 'What is the minimum contract length?', a: 'Kontrak minimum 3 bulan agar strategi bisa terlihat hasilnya secara nyata. Digital marketing bukan magic — butuh waktu untuk data terkumpul dan optimasi berjalan.', aEn: "The minimum contract is 3 months so the strategy can show real results. Digital marketing isn't magic — it takes time for data to accumulate and optimization to work." },
  { q: 'Apakah budget iklan sudah termasuk dalam paket?', qEn: 'Is ad spend included in the package?', a: 'Budget iklan (ad spend ke platform seperti Meta, Google, TikTok) terpisah dari biaya jasa kami. Kami bantu kelola, optimasi, dan arahkan budget tersebut agar efisien.', aEn: 'Ad spend (to platforms like Meta, Google, TikTok) is separate from our service fee. We help manage, optimize, and direct that budget efficiently.' },
  { q: 'Apakah bisa request desain konten khusus?', qEn: 'Can I request custom content designs?', a: 'Tentu! Tim kreatif kami siap membuat konten sesuai brief dan karakter brand kamu. Kamu bisa share referensi, warna brand, tone, dan keinginan lainnya.', aEn: 'Of course! Our creative team is ready to create content according to your brief and brand character. You can share references, brand colors, tone, and other preferences.' },
  { q: 'Apakah bisa bikin website juga?', qEn: 'Can you also build a website?', a: 'Bisa! Kami punya layanan Website Development dan Landing Page yang bisa dikerjakan terpisah atau sebagai bagian dari paket campaign.', aEn: 'Yes! We have Website Development and Landing Page services that can be done separately or as part of a campaign package.' },
  { q: 'Bagaimana sistem reporting-nya?', qEn: 'How does the reporting system work?', a: 'Tergantung paket. Paket Starter mendapat monthly report, Growth mendapat weekly report, Scale mendapat dashboard report real-time plus strategy call mingguan.', aEn: 'It depends on the package. Starter gets monthly reports, Growth gets weekly reports, Scale gets a real-time dashboard report plus weekly strategy calls.' },
  { q: 'Apakah bisa custom paket di luar tiga pilihan di atas?', qEn: 'Can I customize a package outside of the three options?', a: 'Bisa! Hubungi kami untuk diskusi kebutuhan spesifik. Kami sering menyesuaikan paket untuk bisnis dengan kebutuhan unik.', aEn: 'Yes! Contact us to discuss specific needs. We often customize packages for businesses with unique requirements.' },
  { q: 'Apakah bisa handle TikTok dan Meta Ads sekaligus?', qEn: 'Can you handle TikTok and Meta Ads simultaneously?', a: 'Ya, kami mengelola TikTok Ads, Meta Ads (Facebook & Instagram), Google Ads, dan platform iklan lainnya — baik secara terpisah maupun dalam satu strategi omnichannel.', aEn: 'Yes, we manage TikTok Ads, Meta Ads (Facebook & Instagram), Google Ads, and other ad platforms — either separately or as part of one omnichannel strategy.' },
];

export const finalCtaSection = {
  title: 'Siap Bikin Brand Kamu\nLebih Sering Diklik?',
  titleEn: "Ready to Make Your Brand\nGet Clicked More?",
  sub: 'Ceritain dulu kondisi bisnismu. Kami bantu arahin strategi digital yang paling masuk akal.',
  subEn: "Tell us about your business first. We'll help direct the most sensible digital strategy.",
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
};
