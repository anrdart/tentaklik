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
