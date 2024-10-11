/** @type {import('tailwindcss').Config} */

import tailwindcssAnimated  from 'tailwindcss-animated'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        light: ['font-light', 'system-ui'],
        custom: ['font-regular', 'system-ui'],
        bold: ['font-bold', 'system-ui'],
        semibold: ['font-semibold', 'system-ui'],
      },
      colors: {
        blue: {
          magneta: 'var(--blue-magneta)'
        },
        green :{
          magneta: 'var(--green-magneta)'
        },
        brav: {
          primary: 'var(--yellow-vibrant)',
          secondary: '#7cba01',
        }
      },

      animation: {
        movedeg: 'movedeg .3s ease-in 1 forwards',
        octocatwave: 'octocatwave .56s ease-in .3s',
      },

      keyframes: {
        movedeg: {
          '0%': { transform: 'rotate(-2deg) translate(1rem, 0)' },
          '30%': { transform: 'rotate(-5deg) translate(2rem, 0)' },
          '50%': { transform: 'rotate(-8deg) translate(3rem, 0)' },
          '80%': { transform: 'rotate(-10deg) translate(4rem, 0)' },
          '100%': { transform: 'rotate(-12deg) translate(5rem, 0)' }
        },
        octocatwave: {
          '0%,100%': { transform: 'rotate(0)' },
          '20%,60%': { transform: 'rotate(-25deg)' },
          '40%,80%': { transform: 'rotate(10deg)' },
        }
      }
    },
  },
  plugins: [
    tailwindcssAnimated
  ],
}

