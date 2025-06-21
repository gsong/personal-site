import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import type { Author, FeedOptions } from "feed";
import { Feed } from "feed";

import { createUrl, mdxToHtml } from "./utils";

interface SiteAuthor extends Author {
  link: string;
}

export async function generateFeed(context: APIContext): Promise<Feed> {
  // biome-ignore lint/style/noNonNullAssertion: we know
  const site = context.site!.toString();
  const author: SiteAuthor = {
    name: "George Song",
    email: "george@gsong.dev",
    link: site,
  };
  const feed = createFeedInstance(site, author);

  await addArticlesToFeed(feed, site, author);

  return feed;
}

function createFeedInstance(site: string, author: SiteAuthor): Feed {
  const feedOptions: FeedOptions = {
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
  };

  return new Feed(feedOptions);
}

async function addArticlesToFeed(
  feed: Feed,
  site: string,
  author: SiteAuthor,
): Promise<void> {
  const articles = (await getCollection("articles")).sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf(),
  );

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
}
