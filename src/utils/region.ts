// src/utils/region.ts
import type { Region } from '@/data/content';

export type { Region };

const COUNTRY_TO_REGION: Record<string, Region> = {
  ID: 'ID',
  SG: 'SG',
  MY: 'MY',
};

export function detectRegion(): Region {
  if (typeof window === 'undefined') return 'ID';
  // Return cached value immediately if available
  const cached = localStorage.getItem('tk_region') as Region | null;
  if (cached && ['ID', 'SG', 'MY', 'GLOBAL'].includes(cached)) return cached;
  return 'ID'; // fallback until IP resolves
}

export async function detectAndSetRegionFromIP(): Promise<Region> {
  // Already cached — use it
  const cached = localStorage.getItem('tk_region') as Region | null;
  if (cached && ['ID', 'SG', 'MY', 'GLOBAL'].includes(cached)) {
    setRegion(cached);
    return cached;
  }

  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('IP API failed');
    const data = await res.json() as { country_code?: string };
    const region: Region = COUNTRY_TO_REGION[data.country_code ?? ''] ?? 'GLOBAL';
    setRegion(region);
    return region;
  } catch {
    // Fallback: timezone-based
    const TZ_MAP: Record<string, Region> = {
      'Asia/Jakarta': 'ID',
      'Asia/Makassar': 'ID',
      'Asia/Jayapura': 'ID',
      'Asia/Singapore': 'SG',
      'Asia/Kuala_Lumpur': 'MY',
    };
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const region: Region = TZ_MAP[tz] ?? 'GLOBAL';
    setRegion(region);
    return region;
  }
}

export function setRegion(region: Region) {
  localStorage.setItem('tk_region', region);
  document.documentElement.setAttribute('data-region', region);
  // Dispatch event so Pricing and other components can react
  window.dispatchEvent(new CustomEvent('regionchange', { detail: { region } }));
}

export function getWhatsAppLink(
  whatsapp: Record<Region, string>,
  region: Region,
  message = ''
) {
  const number = whatsapp[region];
  const encoded = encodeURIComponent(message || 'Halo TentaKlik, saya ingin konsultasi gratis.');
  return `https://wa.me/${number}?text=${encoded}`;
}
