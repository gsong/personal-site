import { Buffer } from "node:buffer";
import minifyHtml from "@minify-html/node";
import type { Root as HastRoot, RootContent } from "hast";
import type { Root as MdastRoot } from "mdast";
import rehypeStringify from "rehype-stringify";
import remarkMarkers from "remark-flexible-markers";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import type { Plugin } from "unified";
import { unified } from "unified";

type UrlLike = URL | string;

export async function mdxToHtml(
  mdxContent: string,
  site: UrlLike,
): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkMarkers, { markerClassName: () => [] })
    .use(remarkRemoveToc)
    .use(remarkRemoveImports)
    .use(remarkRehype)
    .use(rehypeAbsoluteUrls, site)
    .use(rehypeStringify)
    .process(mdxContent);

  return minifyHtml
    .minify(Buffer.from(result.toString()), { keep_closing_tags: true })
    .toString();
}

export function createUrl(path: string, baseUrl: UrlLike): string | null {
  try {
    const fullUrl = new URL(path, baseUrl);
    return fullUrl.href;
  } catch (error) {
    console.error("Invalid path or base URL:", error);
    return null;
  }
}

// Remark plugins
const remarkRemoveImports: Plugin<[], MdastRoot> = () => {
  return (tree) => {
    tree.children = tree.children.filter((node) => node.type !== "mdxjsEsm");
    return tree;
  };
};

const remarkRemoveToc: Plugin<[], MdastRoot> = () => {
  return (tree: MdastRoot) => {
    tree.children = tree.children.filter((node) => {
      if (node.type === "heading" && node.depth === 2) {
        const text = node.children
          .filter((child) => child.type === "text")
          .map((child) => child.value)
          .join("")
          .trim();
        const tocRegex = /(table[ -]of[ -])?contents?|toc/i;
        return !tocRegex.test(text);
      }
      return true;
    });
    return tree;
  };
};

// Rehype plugins
const rehypeAbsoluteUrls: Plugin<[UrlLike], HastRoot> = (baseUrl) => {
  return (tree) => {
    const visit = (node: RootContent | HastRoot) => {
      if (node.type === "element") {
        if (node.tagName === "a" && node.properties?.href) {
          node.properties.href = createUrl(
            node.properties.href as string,
            baseUrl,
          );
        }
      }
      if ("children" in node) {
        node.children.forEach(visit);
      }
    };
    visit(tree);
    return tree;
  };
};
