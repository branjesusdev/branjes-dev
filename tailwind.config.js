/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: ['comfortaa-regular', 'comfortaa-light', 'comfortaa-bold', 'comfortaa-semibold', 'system-ui'],
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
  plugins: [],
}

