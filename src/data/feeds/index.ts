import type { APIContext } from "astro";

import { getCollection } from "astro:content";
import { Feed } from "feed";

import { createUrl, mdxToHtml } from "./utils";

export async function generateFeed(context: APIContext) {
  // biome-ignore lint/style/noNonNullAssertion: we know
  const site = context.site!.toString();

  const author = {
    name: "George Song",
    email: "george@gsong.dev",
    link: site,
  };

  const articles = (await getCollection("articles")).sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf(),
  );

  const feed = new Feed({
    title: "George's Articles",
    description: "Various articles by George Song",
    id: site,
    link: site,
    language: "en-us",
    favicon: createUrl("/favicon.png", site) as string,
    copyright: `Copyright ${new Date().getFullYear()} George Song`,
    feedLinks: {
      rss: createUrl("/rss.xml", site) as string,
      atom: createUrl("/atom.xml", site) as string,
    },
    author,
  });

  for (const article of articles) {
    const link = createUrl(`/articles/${article.id}`, site) as string;

    feed.addItem({
      title: article.data.title,
      id: link,
      link,
      published: article.data.published,
      date: article.data.updated || article.data.published,
      author: [author],
      description: await mdxToHtml(article.data.description, site),
      content: await mdxToHtml(article.body || "", site),
    });
  }

  return feed;
}
