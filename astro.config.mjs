// @ts-check

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://openbb.co",
  redirects: {
    "/snowflake": "/products/snowflake",
    "/odp": "/products/odp",
    "/workspace": "/products/workspace",
    "/discord": "https://discord.gg/xPHTuHCmuV",
    "/future-alpha": "/events/future-alpha-resources",
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("/blog/preview") && !page.includes("/lite/"),
    }),
  ],
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["chart.js"],
    },
  },
});
