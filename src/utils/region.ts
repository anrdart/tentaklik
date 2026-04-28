// src/utils/region.ts
import type { Region } from '@/data/content';

export type { Region };

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

export function getWhatsAppLink(
  whatsapp: Record<Region, string>,
  region: Region,
  message = ''
) {
  const number = whatsapp[region];
  const encoded = encodeURIComponent(
    message || 'Halo TentaKlik, saya ingin konsultasi gratis.'
  );
  return `https://wa.me/${number}?text=${encoded}`;
}
