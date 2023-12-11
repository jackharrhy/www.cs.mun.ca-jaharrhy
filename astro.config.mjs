import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

// https://astro.build/config
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      include: ["**/react/*"],
    }),
    solidJs({
      include: ["**/solid/*"],
    }),
    mdx(),
  ],
  base: "/~jaharrhy/",
  site: "https://www.cs.mun.ca/~jaharrhy/",
});
