import { fileURLToPath } from 'url';
import type { Config as tailwindConfig } from 'tailwindcss';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: { strict: true },

  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI
  },

  alias: {
    '@types': fileURLToPath(new URL('./types', import.meta.url)),
    '@models': fileURLToPath(new URL('./models', import.meta.url)),
    '@validators': fileURLToPath(new URL('./validators', import.meta.url))
  },

  css: [
    '@/assets/css/main.css'
  ],

  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],

  eslint: {
    cache: false
  },

  vite: {
    server: {
      hmr: { protocol: 'ws', host: '0.0.0.0', port: 3001 }
    }
  },

  nitro: {
    plugins: [
      '~/server/db/mongodb.ts'
    ]
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    config: <Partial<tailwindConfig>> {
      darkMode: 'class',
      configPath: '~/config/tailwind.ts'
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'light'
  }
});
