// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

export default defineConfig({
  site: process.env.SITE_URL || "https://gsong.dev",
  base: process.env.SITE_BASE || "/",
  output: "static",

  integrations: [react(), mdx(), sitemap({ lastmod: new Date() })],

  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "append" }],
    ],
  },

  server: { host: true, allowedHosts: true },

  vite: {
    plugins: [tailwindcss()],
  },
});
