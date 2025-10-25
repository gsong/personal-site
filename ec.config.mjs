import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
  themes: ["catppuccin-latte", "catppuccin-frappe", "github-dark"],
  useDarkModeMediaQuery: false,
  themeCssSelector: (theme) => `[data-ec-theme='${theme.name}']`,
  plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
  frames: {
    showCopyToClipboardButton: false,
  },
});
