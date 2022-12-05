import rss from "@astrojs/rss";

export const get = () =>
  rss({
    title: "~jaharrhy - advent of code",
    description: "jack's advent of code ramblings",
    site: import.meta.env.SITE,
    items: import.meta.glob("./**/day*.mdx"),
    customData: `<language>en-us</language>`,
  });
