import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  experimental: {
    security: {
      csrfProtection: {
        origin: true,
      },
    },
  },
  integrations: [tailwind()],
});