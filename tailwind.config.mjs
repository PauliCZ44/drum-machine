import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    safeList: ['btn-xs'],
    content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
  },
  theme: {
    minWidth: {
      40: '10rem',
      60: '15rem',
      80: '20rem',
      100: '25rem',
    },
    maxWidth: {
      120: '30rem',
      160: '40rem',
      200: '50rem',
    },
  },
  variants: {},
  plugins: [typography, daisyui],
  daisyui: {
    themes: ['forest', 'dark', 'light', 'emerald', 'synthwave'],
  },
};
