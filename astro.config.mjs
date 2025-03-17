// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx(), sitemap()],

  server: { host: true },

  vite: {
    server: { allowedHosts: ["shadow.local"] },
    plugins: [tailwindcss()],
  },
});
