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
  document.querySelectorAll<HTMLElement>('[data-id]').forEach((el) => {
    el.style.display = lang === 'id' ? '' : 'none';
  });
  document.querySelectorAll<HTMLElement>('[data-en]').forEach((el) => {
    el.style.display = lang === 'en' ? '' : 'none';
  });
}

export function initLang() {
  const lang = detectLang();
  setLang(lang);
}
