/** @type {import('tailwindcss').Config} */

import tailwindcssAnimated  from 'tailwindcss-animated'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        light: ['comfortaa-light', 'system-ui'],
        custom: ['comfortaa-regular', 'system-ui'],
        bold: ['comfortaa-bold', 'system-ui'],
        semibold: ['comfortaa-semibold', 'system-ui']
      },
      colors: {
        blue: {
          magneta: 'var(--blue-magneta)'
        },
        green :{
          magneta: 'var(--green-magneta)'
        },
        brav: {
          primary: '#cced89',
          secondary: '#7cba01',
        }
      }
    },
  },
  plugins: [
    tailwindcssAnimated
  ],
}

