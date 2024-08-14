import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from "@astrojs/sitemap";
import { VitePWA } from "vite-plugin-pwa";

// Helper imports
import { manifest, seoConfig } from "./src/utils/seoConfig";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  compressHTML: true,
  prefetch: true,
  integrations: [tailwind(), sitemap()],
  site: seoConfig.baseURL,
  vite: {
    vite: {
      build: {
        cssMinify: "lightningcss"
      },
      plugins: [VitePWA({
        registerType: "autoUpdate",
        manifest,
        workbox: {
          globDirectory: ".vercel/output/static",
          globPatterns: ["**/*.{html,js,css,woff,woff2,ttf,eot,ico}"],
          runtimeCaching: [{
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60
              }
            }
          }, {
            urlPattern: /\.(?:woff|woff2|ttf|eot|ico)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "fonts",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60
              }
            }
          }],
          navigateFallback: null
        }
      })]
    }
  }
});