// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), AstroPWA({
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}']
    },
    manifest: {
      name: 'Billiard Scoreboard',
      short_name: 'BilliardScore',
      description: 'A simple billiard scoreboard PWA',
      theme_color: '#000000',
      background_color: '#000000',
      display: 'fullscreen',
      orientation: 'landscape',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    }
  })],

  vite: {
    plugins: [tailwindcss()]
  }
});