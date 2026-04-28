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

  // Show/hide elements by language
  document.querySelectorAll<HTMLElement>('[data-lang-id]').forEach((el) => {
    el.style.display = lang === 'id' ? '' : 'none';
  });
  document.querySelectorAll<HTMLElement>('[data-lang-en]').forEach((el) => {
    el.style.display = lang === 'en' ? '' : 'none';
  });

  // Dispatch event for components that need it
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function initLang() {
  setLang(detectLang());
}
