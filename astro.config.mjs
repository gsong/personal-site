import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkMarkers from "remark-flexible-markers";
import remarkToc from "remark-toc";

export default defineConfig({
  site: process.env.SITE_URL || "https://gsong.dev",
  base: process.env.SITE_BASE || "/",
  output: "static",

  integrations: [
    react(),
    expressiveCode(),
    mdx(),
    sitemap({ lastmod: new Date() }),
  ],

  markdown: {
    remarkPlugins: [dynamicToc, remarkMarkers],
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

function dynamicToc() {
  return (tree, { data }) => {
    const maxDepth = data.astro.frontmatter.tocDepth || 2;
    return remarkToc({ maxDepth })(tree);
  };
}
