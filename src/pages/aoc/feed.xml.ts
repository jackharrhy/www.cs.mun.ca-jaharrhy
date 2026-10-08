import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export const GET = async () => {
  const items = await pagesGlobToRssItems(import.meta.glob("./**/*.mdx"));

  items.sort((a, b) => {
    const aDate = new Date(a.pubDate ?? 0);
    const bDate = new Date(b.pubDate ?? 0);
    return bDate.getTime() - aDate.getTime();
  });

  return rss({
    title: "~jaharrhy - advent of code",
    description: "jack's advent of code ramblings",
    site: import.meta.env.SITE,
    items,
    customData: `<language>en-us</language>`,
    stylesheet: "/~jaharrhy/rss/styles/aoc.xsl",
  });
};
