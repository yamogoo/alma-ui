# Sparkpad

### R&D Playground for UI & System Design

> "I’m not building a universal framework. I’m creating tools for myself to explore architectural and visual approaches. Sparkpad is an example of my R&D work, showcasing how I think and design systems."

Sparkpad combines a custom design system with an MDX editor. It’s not meant for everyone — it’s a laboratory for experimentation, prototyping, and refining ideas.

## 🚀 Core Idea

A self-built design system that works like a lightweight framework:

- Typed components

- Design tokens

- Themes

- Consistent animations

- Predominantly my own composables

- Fully custom component library

- Custom icons from my another project [Alma Icons](https://almaicons.netlify.app/icons)

- SCSS core with mixins and utility classes

- My component [Vue3ResizeBounding](https://resize-bounding.netlify.app/) for intuitive resizable layouts

> Everything is optimized for my stack and workflow, without the bloat of prebuilt UI libraries.

## 🎯 Advantages of the Custom Design System

1. **Modularity & Scalability**

   The architecture is constructor-like: add new components, themes, or states without refactoring.

2. **Deep Icon Integration**

   Supports a typed set of multi-style and multi-width icons, specifically my own Alma Icons, solving problems that off-the-shelf UI frameworks often ignore.

3. **Right-sized Component Set**

   No hundreds of unnecessary UI elements — only what’s needed for your workflow.

4. **Unified Application Style**

   The system is designed around my working approach, so any new project grows from the same foundation.

5. **Consistent Component Animation with GSAP**

   All elements follow a shared animation model, delivering smooth and expressive UI. For some this may feel like overkill, but for my style it’s essential.

6. **SCSS Core**

   A central SCSS layer provides mixins, utility functions, and helpers to streamline styling and maintain consistency across all components.

7. **Own Composables & Component Library**

   Most functionality is implemented via my own composables, and all UI is built with a fully custom component library, giving full control over behavior, reactivity, and design patterns.

8. **Resizable Layouts with Vue3ResizeBounding**

   The Vue3ResizeBounding component allows creating flexible, resizable UI panels, fully integrated into Sparkpad.

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

> Developed a modular token system for the design system with support for JSON, YAML, and TypeScript. TokensParser and JSONBuilder were partially developed with AI assistance, but all architecture, integration, and other components were implemented independently.

## ⚡ Philosophy

Sparkpad is a research-focused project, not just a product. Its main purpose is:

- Explore new UI and UX patterns

- Experiment with modular, typed, and scalable design systems

- Serve as a foundation for future personal projects

## 💻 Demo

_Currently no public demo available — project is intended for R&D and internal exploration._

## 📦 Installation

# Clone repository

git clone https://github.com/yamogoo/sparkpad.git

# Install dependencies

```bash
cd sparkpad

pnpm install
```

## 🚀 Usage

# Run development server

```bash
pnpm dev
```

_Then open http://localhost:3000 to see Sparkpad in action._

## 📝 R&D Notes

- Not a universal framework; built for personal experimentation

- Components, animations, and composables are optimized for my workflow

- Design system demonstrates scalable architecture, typed tokens, GSAP animations, and icon integration

- Resizable layouts enabled via Vue3ResizeBounding

- Future projects will grow from this foundation

## License

Licensing is in accordance with the original.

[MIT](https://github.com/yamogoo/sparkpad/blob/main/LICENSE)

## Author

**Mikhail Grebennikov** - [yamogoo](https://github.com/yamogoo)
