// src/utils/i18n.ts
export type Lang = 'id' | 'en';

export function detectLang(): Lang {
  if (typeof window === 'undefined') return 'id';
  const saved = localStorage.getItem('tk_lang') as Lang | null;
  if (saved === 'id' || saved === 'en') return saved;
  return navigator.language.toLowerCase().startsWith('id') ? 'id' : 'en';
}

export function setLang(lang: Lang) {
  localStorage.setItem('tk_lang', lang);
  document.documentElement.setAttribute('data-lang', lang);
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function initLang() {
  // Apply immediately, before paint if possible
  const lang = detectLang();
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem('tk_lang', lang);
}
