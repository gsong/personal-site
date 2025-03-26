import { defineEcConfig } from "astro-expressive-code";

import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

export default defineEcConfig({
  themes: ["catppuccin-latte", "catppuccin-frappe", "github-dark"],
  useDarkModeMediaQuery: false,
  themeCssSelector: (theme) => `[data-ec-theme='${theme.name}']`,
  plugins: [pluginLineNumbers()],
  frames: {
    showCopyToClipboardButton: false,
  },
});
