import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    summary: z.string(),
    published: z.date(),
    updated: z.date().optional(),
  }),
});

export const collections = { articles };
