import { setup, type Preview } from "@storybook/vue3";
import { type App, ref, watch } from "vue";
import { createPinia } from "pinia";

import { storyThemeDecorator } from "../src/stories/decorators";

import "@/assets/scss/app.global.styles.scss";
import "@/assets/fonts/_fonts.scss";

const pinia = createPinia();

setup((app: App) => {
  app.use(pinia);
});

const currentTheme = ref<"light" | "dark">("dark");

function updateBodyClass(theme: "light" | "dark") {
  document.body.classList.remove("theme-light", "theme-dark");
  document.body.classList.add(`theme-${theme}`);
}

updateBodyClass(currentTheme.value);

window.addEventListener("storybook:darkmode", (event: any) => {
  if (event.detail === "dark" || event.detail === "light") {
    currentTheme.value = event.detail;
  }
});

watch(currentTheme, (theme) => {
  updateBodyClass(theme);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: "light", value: "#e8e8cf" },
        { name: "dark", value: "#111113" },
      ],
      default: "dark",
    },
  },
  decorators: [
    () => ({
      template: storyThemeDecorator(),
    }),
  ],
};

export default preview;
