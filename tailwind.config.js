/** @type {import('tailwindcss').Config} */

import tailwindcssAnimated  from 'tailwindcss-animated'
const svgToDataUri = require("mini-svg-data-uri");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

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
    tailwindcssAnimated,
    // addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
}
