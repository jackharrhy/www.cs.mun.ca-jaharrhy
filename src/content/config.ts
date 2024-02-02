import { z, defineCollection } from "astro:content";

const babbleBinCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
  }),
});

export const collections = {
  "babble-bin": babbleBinCollection,
};
