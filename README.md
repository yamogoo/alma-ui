# AlmaDS Monorepo

AlmaDS is a design system with support for scalable design tokens, Vue 3 components, and tools for editing and previewing tokens.  
This repository is organized as a **monorepo**.

---

## 📦 Structure

packages/
almads-core/ # Core: TokensParser, exporters (CSS/SCSS/TS), CLI
almads-tokens/ # JSON tokens (themes, brands)
almads-vue/ # Vue 3 components using tokens
almads-tokens-ui/ # Token editor (Vite + Vue + TS)

apps/
sparkpad/ # Playground and demo applications based on AlmaDS
docs/ # Documentation and examples

yaml
Copy code

---

## 🚀 Quick Start

1. Install dependencies (pnpm recommended):
   ```bash
   pnpm install
   ```

bash
Copy code
pnpm build
Run the playground:

bash
Copy code
pnpm --filter sparkpad dev
🛠 Key Packages
almads-core — Token parser, CLI, and exporters (CSS variables, SCSS maps, JSON, TS).

almads-tokens — Base themes and AlmaDS tokens.

almads-vue — Vue 3 component library with token support.

almads-tokens-ui — Visual token editor (edit, preview, export).
