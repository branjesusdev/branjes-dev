import { defineConfig, envField } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { VitePWA } from "vite-plugin-pwa";

// Helper imports
import { manifest, seoConfig } from "./src/utils/seoConfig";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  server: { port: 8080 },
  compressHTML: true,
  prefetch: true,
  // On-demand rendering (instead of pure static) so `src/pages/api/chat.ts`
  // can run as a Vercel serverless function. Every existing page opts back
  // into prerendering individually (`export const prerender = true`), so
  // they keep building to plain static HTML exactly as before — only the
  // chat endpoint is actually dynamic.
  output: "server",
  adapter: vercel(),
  // `astro:env`'s server vars are read at actual request time (via
  // `process.env` under the hood), unlike plain `import.meta.env`, which
  // Vite statically inlines at BUILD time — that would bake in `undefined`
  // permanently if the build step doesn't have the secret set, regardless
  // of what's configured on Vercel afterwards for runtime.
  env: {
    schema: {
      GROQ_API_KEY: envField.string({ context: "server", access: "secret" }),
    },
  },
  build: {
    // Both page stylesheets are small (under ~11 KiB); inlining them into
    // the HTML removes two separate render-blocking CSS requests from the
    // critical path entirely, instead of just reordering/deferring them.
    inlineStylesheets: "always",
  },
  integrations: [tailwind(), sitemap()],
  site: seoConfig.baseURL,
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
});