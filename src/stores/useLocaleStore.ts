import { computed } from "vue";
import { defineStore } from "pinia";

import locales from "@/locales";

import { useTypedLocalStorage } from "@/composables";

import type { Locale } from "@/typings";

const DEFAULT_LOCALE = import.meta.env.VITE_APP_DEFAULT_LOCALE as Locale;

export type LocaleVersion = keyof typeof locales.app.en.version;

export const useLocaleStore = defineStore("locale-store", () => {
  const currentLocale = useTypedLocalStorage<Locale>("LOCALE", DEFAULT_LOCALE);

  const setLocale = (locale: Locale) => {
    currentLocale.value = locale;
  };

  const $t = computed(() => {
    const app = locales.app;
    return app[currentLocale.value];
  });

  return {
    currentLocale,
    setLocale,
    $t,
  };
});
