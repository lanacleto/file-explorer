import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "svelte",
      bundler: "vite",
    },
    supportFile: "cypress/support/component.ts",
  },
});
