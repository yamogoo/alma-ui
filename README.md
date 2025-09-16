# AlmaProtoKit

### R&D Playground for UI & System Design

> AlmaProtoKit is my personal R&D project — an experimental design system platform where I explore new approaches to UI development, design tokens, iconography, and cross-framework integration.

This is not a production-ready library, but rather a prototype environment where I test ideas that may later evolve into Alma-UI, Alma-Tokens, Alma-Icons, or other parts of the Alma ecosystem.

Think of AlmaProtoKit as a design-system R&D playground rather than a production framework.

## 🚀 Goals of AlmaProtoKit

- Experiment with design tokens pipelines (JSON → SCSS → CSS variables).

- Prototype multi-weight icon systems.

- Explore runtime vs compile-time theming strategies.

- Validate component patterns for Vue 3 and React.

- Research how to bridge design tools (Figma) with developer platforms.

> Everything is optimized for my stack and workflow, without the bloat of prebuilt UI libraries.

## 🎯 Status

🚧 Experimental & evolving. Expect breaking changes.

## 🛠 Stack & Tech

- Vue 3 + TypeScript

- GSAP for animations

- Custom design tokens & themes

- [Alma Icons](https://almaicons.netlify.app/icons)

- SCSS core with mixins and utilities

- Fully custom components and composables

- MDX editor for rich content

- [Vue3ResizeBounding](https://resize-bounding.netlify.app/) for resizable UI

**Modular Design Tokens System**

> Developed a modular token system for the design system with support for JSON, YAML, and TypeScript. TokensParser and JSONBuilder were partially developed with AI assistance, but all architecture, integration, and other components were implemented independently. The AI-generated files are located in [`~/client/plugins`](https://github.com/yamogoo/alma-ui/tree/main/client/plugins).

## 💻 Demo

_Currently no public demo available — project is intended for R&D and internal exploration._

```bash
# Clone repository
git clone https://github.com/yamogoo/alma-ui.git

# Go to project folder
cd alma-proto-kit

# Install dependencies
pnpm install

# Run dev server
pnpm dev
```

_Then open http://localhost:3000 to see AlmaProtoKit in action._

## License

MIT for code. Icons and creative assets may be licensed separately.

[MIT](https://github.com/yamogoo/alma-ui/blob/main/LICENSE)

## Author

**Mikhail Grebennikov** - [yamogoo](https://github.com/yamogoo)
