import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const babbles = await getCollection("babble-bin");
  return rss({
    title: "babble bin",
    description: "a bin full of babbles",
    site: context.site,
    items: babbles.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: "",
      link: `./babble-bin/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
