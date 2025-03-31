# George Song's Personal Website (gsong.dev)

This repository contains the source code for George Song's personal website and blog, available at [gsong.dev](https://gsong.dev). It's built with modern web technologies, focusing on performance, content delivery, and developer experience.

## ✨ Core Technologies & Tools

This project leverages a variety of tools and frameworks to achieve its goals:

**Framework & Rendering:**

- 🚀 **[Astro](https://astro.build/):** The core web framework, used for building fast, content-focused websites with an island architecture for optimal performance.
- ⚛️ **[React](https://react.dev/):** Used for interactive UI components (islands) via Astro's React integration (`@astrojs/react`).
- 📝 **[MDX](https://mdxjs.com/):** Used for writing content (articles), allowing the use of JSX components directly within Markdown (`@astrojs/mdx`).

**Styling:**

- 🎨 **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development.
- 🌼 **[DaisyUI](https://daisyui.com/):** A Tailwind CSS component library providing pre-built UI elements.
- 🌗 **Color Scheme Toggle:** Custom implementation using Nano Stores and `localStorage` for light/dark/system theme switching.

**Content & Data:**

- 📄 **[Astro Content Collections](https://docs.astro.build/en/guides/content-collections/):** Manages blog articles, providing type safety and organization for MDX files.
- 📊 **[Mermaid](https://mermaid.js.org/):** Used via a React component to render diagrams from text definitions within articles.
- 📰 **[Feed](https://github.com/jpmonette/feed):** Library used to generate RSS and Atom feeds for blog articles.
- ✨ **[Expressive Code](https://expressive-code.com/):** Astro integration for advanced code highlighting in articles, including features like line numbers and collapsible sections.
- 🔗 **Remark/Rehype Plugins:** Used within the Astro/MDX pipeline for features like table of contents (`remark-toc`), slug generation (`rehype-slug`), and autolinking headings (`rehype-autolink-headings`).

**Development & Tooling:**

- 📦 **[pnpm](https://pnpm.io/):** Fast, disk space-efficient package manager.
- 🔧 **[Mise](https://mise.jdx.dev/):** Developer environment manager used to handle Node.js and pnpm versions consistently (`mise.toml`).
- ✅ **[TypeScript](https://www.typescriptlang.org/):** Provides static typing for improved code quality and developer experience.
- 💅 **[Biome](https://biomejs.dev/):** Fast formatter and linter used for code consistency (`biome.jsonc`).
- ✨ **[Prettier](https://prettier.io/):** Additional code formatter, configured with plugins for Astro and Tailwind CSS (`.prettierrc.mjs`).
- 🏪 **[Nano Stores](https://github.com/nanostores/nanostores):** Tiny state manager used for global state like the color scheme.

**Deployment:**

- ☁️ **[Netlify](https://www.netlify.com/):** Hosting platform used for building and deploying the static site (`netlify.toml`, `netlify-cli`).

## 📂 Project Structure

```text
/
├── public/              # Static assets (favicon, images)
├── src/
│   ├── assets/          # Site assets (images) processed by Astro
│   ├── components/      # Reusable UI components (React .tsx, Astro .astro)
│   ├── data/
│   │   ├── articles/    # Blog post content (MDX)
│   │   └── feeds/       # Logic for generating RSS/Atom feeds
│   ├── layouts/         # Base page layouts (.astro)
│   ├── pages/           # Site pages and API routes (.astro, .ts)
│   ├── styles/          # Global CSS, Tailwind config
│   ├── types/           # Global TypeScript types
│   ├── content.config.ts # Astro Content Collections configuration
│   └── store.ts         # Nano Stores state management
├── astro.config.mjs     # Astro configuration file
├── biome.jsonc          # Biome (linter/formatter) configuration
├── ec.config.mjs        # Expressive Code configuration
├── mise.toml            # Mise environment configuration
├── netlify.toml         # Netlify configuration
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # This file
```

## 🚀 Getting Started

**Prerequisites:**

- [Mise](https://mise.jdx.dev/): Install according to the official instructions. Mise will manage Node.js and pnpm versions.

**Installation:**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/gsong/personal-site.git
    cd personal-site
    ```
2.  **Install tools via Mise:**
    ```bash
    mise install
    ```
    _(This will install the correct Node.js and pnpm versions specified in `mise.toml`)_
3.  **Install project dependencies:**
    ```bash
    pnpm install
    ```

## ⚙️ Available Scripts

The following scripts are available via `pnpm run <script>`:

- `dev`: Starts the local development server (usually at `http://localhost:4321`).
- `build`: Builds the static site for production to the `dist/` directory.
- `preview`: Starts a local server to preview the production build.
- `deploy`: Builds the site and deploys it to Netlify production (requires Netlify CLI login).
- `fix`: Runs Astro type checking, Biome linting/formatting fixes, and Prettier formatting.
- `postinstall`: (Internal) Updates `packageManager` field in `package.json` using Mise after installation (runs automatically unless in CI).

## ☁️ Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/ae709d72-969b-4493-bb5f-624130304c6a/deploy-status)](https://app.netlify.com/sites/zukefresh/deploys)

The site is automatically built and deployed to [Netlify](https://www.netlify.com/) upon pushes to the main branch. Manual production deploys can be triggered using `pnpm run deploy`.
