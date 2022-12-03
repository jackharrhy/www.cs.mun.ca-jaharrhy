import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  base: "/~jaharrhy/",
  site: "https://www.cs.mun.ca/~jaharrhy/",
});
