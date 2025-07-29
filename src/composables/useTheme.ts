import {
  onMounted,
  ref,
  computed,
  watch,
  type Ref,
  type MaybeRefOrGetter,
  toValue,
} from "vue";

import type { Theme, SystemTheme, LocalStorageKey } from "@/typings";

import { useTypedLocalStorage } from "@/composables";

export interface UseThemeOptions {
  prefix?: string;
  selector?: string;
  key?: LocalStorageKey;
  systemKey?: LocalStorageKey;
}

export const DEFAULT_IS_SYSTEM_THEME_ENABLED = Boolean(
  import.meta.env.IS_SYSTEM_THEME_ENABLE
);

export const useTheme = (
  init: MaybeRefOrGetter<Theme>,
  opts?: UseThemeOptions
) => {
  const { selector, prefix, key, systemKey } = {
    prefix: "theme-",
    selector: "body",
    key: "THEME",
    systemKey: "IS_SYSTEM_THEME_ENABLED",
    ...opts,
  } as Required<UseThemeOptions>;

  const localTheme = useTypedLocalStorage(key, toValue(init));
  const localSystemTheme: Ref<SystemTheme> = ref("dark");
  const isSystemThemeEnabled = useTypedLocalStorage(
    systemKey,
    DEFAULT_IS_SYSTEM_THEME_ENABLED
  );

  const theme = computed({
    set(value: Theme) {
      localTheme.value = value;
      return value;
    },
    get() {
      return isSystemThemeEnabled.value
        ? localSystemTheme.value
        : localTheme.value;
    },
  });

  const setTheme = (_theme: Theme): void => {
    theme.value = _theme;
  };

  const toggleTheme = (): void => {
    return theme.value === "light" ? setTheme("dark") : setTheme("light");
  };

  const setIsSystemThemeEnabled = (isEnabled: boolean) =>
    (isSystemThemeEnabled.value = isEnabled);

  const setIntiSystemTheme = (): void => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setSystemTheme(isDark);
  };

  const setSystemTheme = (isDark: boolean): void => {
    localSystemTheme.value = isDark ? "dark" : "light";
  };

  const onUpdateSystemTheme = (): void => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", ({ matches: isDark }) => {
        console.log(isDark);
        setSystemTheme(isDark);
      });
  };

  onMounted(() => {
    setIntiSystemTheme();
    onUpdateSystemTheme();
  });

  watch(
    theme,
    (newTheme, prevTheme) => {
      const htmlEl = document.querySelector(selector);
      if (htmlEl) {
        htmlEl.classList.remove(`${prefix}${prevTheme}`);
        htmlEl.classList.add(`${prefix}${newTheme}`);
      }
    },
    { immediate: true }
  );

  return {
    theme,
    setTheme,
    toggleTheme,
    localTheme,
    localSystemTheme,
    isSystemThemeEnabled,
    setIsSystemThemeEnabled,
  };
};
