import { computed, ref, toValue } from "vue";
import { defineStore } from "pinia";

import locales from "@/locales";

import { useAppStore } from "@/stores";

import { useTypedLocalStorage } from "@/composables";

import type { Locale } from "@/typings";

const DEFAULT_LOCALE = import.meta.env.VITE_APP_DEFAULT_LOCALE as Locale;

export type LocaleVersion = keyof typeof locales.app.en.version;

export const useLocaleStore = defineStore("locale-store", () => {
  const { version: appVersion } = useAppStore();

  const currentLocale = useTypedLocalStorage<Locale>("LOCALE", DEFAULT_LOCALE);

  const version = ref<LocaleVersion>(toValue(appVersion) as LocaleVersion);
  const setVersion = (name: LocaleVersion): void => {
    version.value = name;
  };

  const setLocale = (locale: Locale) => {
    currentLocale.value = locale;
  };

  const $t = computed(() => {
    return locales.app[currentLocale.value].version[version.value];
  });

  return {
    version,
    setVersion,
    currentLocale,
    setLocale,
    $t,
  };
});
