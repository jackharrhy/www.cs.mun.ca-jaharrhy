import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  base: "/~jaharrhy/",
  site: "https://www.cs.mun.ca/~jaharrhy/"
});