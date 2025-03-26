import { defineEcConfig } from "astro-expressive-code";

import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

export default defineEcConfig({
  themes: ["catppuccin-latte", "catppuccin-frappe", "github-dark"],
  useDarkModeMediaQuery: false,
  plugins: [pluginLineNumbers()],
  frames: {
    showCopyToClipboardButton: false,
  },
});
