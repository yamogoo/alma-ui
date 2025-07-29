import { ref, computed, type ComputedRef } from "vue";
import { defineStore } from "pinia";

// import { useLocaleStore } from "@/stores";

import { useTheme } from "@/composables";

import type { Theme, Themes } from "@/typings";

export const themes: Themes = ["light", "dark"];

export const DEFAULT_THEME = import.meta.env.VITE_UI_LOCAL_THEME as
  | Theme
  | undefined;

export const DEFAULT_PROTO_THEME = import.meta.env.VITE_UI_LOCAL_PROTO_THEME as
  | Theme
  | undefined;

export const useConfigStore = defineStore("config", () => {
  // const { $t } = storeToRefs(useLocaleStore());

  const settingsData = computed(() => {
    return {};
  });

  const {
    theme: currentTheme,
    isSystemThemeEnabled,
    setTheme,
    toggleTheme,
    setIsSystemThemeEnabled,
  } = useTheme(DEFAULT_THEME ?? "dark", {
    selector: "html",
    prefix: "theme-",
    key: "THEME",
    systemKey: "IS_SYSTEM_THEME_ENABLED",
  });

  const isLightTheme = computed(() => {
    return currentTheme.value === "light";
  });

  const {
    theme: currentProtoTheme,
    isSystemThemeEnabled: isSystemProtoThemeEnabled,
    setTheme: setProtoTheme,
    toggleTheme: toggleProtoTheme,
    setIsSystemThemeEnabled: setIsSystemProtoThemeEnabled,
  } = useTheme(DEFAULT_PROTO_THEME ?? "dark", {
    selector: "html",
    prefix: "theme-proto-",
    key: "PROTO_THEME",
    systemKey: "IS_SYSTEM_PROTO_THEME_ENABLED",
  });

  const isLightProtoTheme = computed(() => {
    return currentProtoTheme.value === "light";
  });

  const protoThemeKey = computed(() => {
    return currentProtoTheme.value === "light" ? "protoLight" : "protoDark";
  });

  const getSid: ComputedRef<number> = computed(() => {
    return themes.findIndex((theme) => theme === currentTheme.value);
  });

  /* * * Common * * */

  const currentPackageVersion = ref("");
  const setCurrentPackageVersion = (version: string) =>
    (currentPackageVersion.value = version);

  return {
    settingsData,

    currentTheme,
    isLightTheme,
    isSystemThemeEnabled,
    setTheme,
    toggleTheme,
    setIsSystemThemeEnabled,
    getSid,

    currentProtoTheme,
    protoThemeKey,
    isLightProtoTheme,
    isSystemProtoThemeEnabled,
    setProtoTheme,
    toggleProtoTheme,
    setIsSystemProtoThemeEnabled,

    currentPackageVersion,
    setCurrentPackageVersion,
  };
});
