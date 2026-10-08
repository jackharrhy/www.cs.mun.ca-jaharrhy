import { defineConfig } from "astro/config";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";

export default defineConfig({
  compressHTML: true,
  vite: {
    plugins: [basicSsl()],
    css: {
      postcss: {
        plugins: [{
          postcssPlugin: "fix-98-css-hover-query",
          AtRule: {
            media(rule) {
              // 98.css 0.1.21 has invalid media syntax rejected by Lightning CSS.
              if (rule.params === "(not(hover))" && rule.source?.input.file?.includes("/98.css/")) {
                rule.params = "(hover: none)";
              }
            },
          },
        }],
      },
    },
    server: {
      https: true,
    },
  },
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
