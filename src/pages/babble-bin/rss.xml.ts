import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const babbles = (await getCollection("babble-bin")).filter(
    (entry) => entry.data.pubDate !== null
  );
  return rss({
    title: "babble bin",
    description: "a bin full of babbles",
    site: context.site!,
    items: babbles.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate!,
      description: "",
      link: `./babble-bin/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
};
