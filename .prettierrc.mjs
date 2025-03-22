/** @type {import("prettier").Config} */
const config = {
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-astro-organize-imports",
    "prettier-plugin-tailwindcss",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: "*.jsonc",
      options: {
        parser: "json",
      },
    },
  ],
};

export default config;
