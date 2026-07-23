![Portfolio](/public/images/landing.png)

> 🔗 **Sitio WEB:** https://branjes-dev.vercel.app/ 

# Astro Starter Kit: Minimal

```
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/branjes-dev)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/branjes-dev)
[![Open in GitHub VSCode](https://github.com/codespaces/badge.svg)](https://vscode.dev/github/branjesusdev/branjes-dev)

## ⚙️ Stack

➡️ [**Tailwindcss**](https://tailwindcss.com/) : pnpm astro add tailwind
<br/>

➡️ [**Astro.Build**](https://astro.build/)
<br/>

➡️ [**PostCss**](https://postcss.org/)

## 🚀 Getting Started

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
ultra install
```

## 📂 Project Structure


```
/
├── public/
├── src/
│   └── pages/
│       ├── index.astro
│       └── 404.astro
├── package.json
│── postcss.config.cjs
└── tailwind.config.js
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
| `npx @astrojs/upgrade`    | Update Astro                                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
