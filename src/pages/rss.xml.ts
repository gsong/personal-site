import type { APIContext } from "astro";

import { generateFeed } from "@/data/feeds";

export async function GET(context: APIContext) {
  const feed = await generateFeed(context);
  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/xml" },
  });
}
