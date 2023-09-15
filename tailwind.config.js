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
      },

      animation: {
        movedeg: 'movedeg .3s ease-in 1 forwards',
      },

      keyframes: {
        movedeg: {
          '0%': { transform: 'rotate(-2deg) translate(1rem, 0)' },
          '30%': { transform: 'rotate(-5deg) translate(2rem, 0)' },
          '50%': { transform: 'rotate(-8deg) translate(3rem, 0)' },
          '80%': { transform: 'rotate(-10deg) translate(4rem, 0)' },
          '100%': { transform: 'rotate(-12deg) translate(5rem, 0)' }
        }
      }
    },
  },
  plugins: [
    tailwindcssAnimated
  ],
}

