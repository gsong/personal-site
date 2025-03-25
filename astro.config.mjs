import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";

export default defineConfig({
  site: process.env.SITE_URL || "https://gsong.dev",
  base: process.env.SITE_BASE || "/",
  output: "static",

  integrations: [
    react(),
    expressiveCode({
      themes: ["catppuccin-latte", "github-dark"],
      plugins: [pluginLineNumbers()],
      frames: {
        showCopyToClipboardButton: false,
      },
    }),
    mdx(),
    sitemap({ lastmod: new Date() }),
  ],

  markdown: {
    remarkPlugins: [dynamicToc],
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
