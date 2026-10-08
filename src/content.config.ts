import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const babbleBinCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/babble-bin" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date().nullable(),
  }),
});

export const collections = {
  "babble-bin": babbleBinCollection,
};
