# AlmaIconsProtoKit — MANIFEST

**AlmaIconsProtoKit** is a prototype UI Kit and design system infrastructure that unifies **components**, **tokens**, **fonts**, **icons**, and **utilities** into a single platform for product development.

This document provides a **project structure overview**, **module descriptions**, and **usage examples**.

📂 Project Structure

```bash
assets/         — base resources (fonts, icons, animations, SCSS core)
components/     — Vue components (atoms, molecules, organisms, templates)
composables/    — Vue composables (global and local hooks)
constants/      — UI constants
declarations/   — TypeScript declarations
directives/     — Vue directives
scripts/        — build/dev helper scripts
stories/        — Storybook stories (components and tokens)
tokens/         — design tokens (JSON), theming (light/dark), build outputs
typings/        — TypeScript types for UI, API, router, etc.
utils/          — helper utilities (units, events, sanitization, etc.)
MANIFEST.yaml   — machine-readable specification
MANIFEST.md     — human-readable documentation (this file)
```

## 📦 Modules Overview

### 🔹 Assets

- animations/ — JSON animations (e.g., spinner, themeIcon)

- fonts/ — Manrope font family (Cyrillic + Latin, weights 200–800)

- icons/ — AlmaIcons entry point (index.ts)

- images/ — graphical assets

- scss/ — style core:
  - abstracts/ — SCSS tokens, base colors, breakpoints, themes

  - core/ — SCSS functions & mixins (px2rem, themify, map-get)

  - extends/ — extensions (animations, containers, components)

  - mixins/ — reusable SCSS mixins

  - app.\*.scss — global style entry points

### 🔹 Components

Atomic design structure:

- atoms/ — smallest units (buttons, icons, inputs, typography)

- molecules/ — composed elements (dropdown, forms, snackbar)

- organisms/ — complex blocks (editor, navigation, forms)

- templates/ — ready-to-use layouts (headers, footers, menus)

Each component is written in **Vue 3 + TypeScript**, with unit tests (`.spec.ts`) and Storybook docs (`.stories.ts`).

### 🔹 Composables

- global/ — global hooks (theme, meta, connection state)

- local/ — local hooks (hover, clickOutside, drag-and-drop, seo, history, etc.)

### 🔹 Tokens

- src/ — source JSON tokens:
  - abstracts/ — colors, background, borders, shadows

  - atoms/, molecules/, templates/ — per-component tokens

  - themes/ — light and dark variants

  - typography/ — text styles

  - tokens/ — spacing, stroke, roundness, etc.

- build/ — compiled tokens for runtime (CSS vars, JSON)

- figma/ — exported tokens for Figma integration

- structure.md — documentation of token architecture

### 🔹 Stories

- decorators/ — Storybook decorators

- tokens/ — theming & token showcase

### 🔹 Utils

- unit conversion (px2rem)

- path parsing

- event helpers

- unit testing setup

### 🔹 Typings

- API, routing, themes, localization, UI controls, elements

- TypeScript declaration helpers

## Use components

```vue
<script setup lang="ts">
import { Button, Icon } from "@/components/atoms";
</script>

<template>
  <Button variant="accent">
    <Icon name="check" />
    Click me
  </Button>
</template>
```

## Use composables

```vue
import { useTheme } from "@/composables/global"; const { theme, setTheme } =
useTheme(); setTheme("dark");
```

## 📖 Summary

AlmaIconsProtoKit is not just a component library, but an **experimental design system platform** that brings together:

- 🖼️ Assets (fonts, icons, animations)

- 🎨 Tokens (colors, typography, spacing, themes)

- 🧩 Components (atomic design with Vue 3)

- ⚡ Composables & Utils (hooks and helpers)

- 📚 Documentation (Storybook, MANIFEST, Figma integration)
