import { computed, ref, type Ref } from "vue";
import { defineStore } from "pinia";

import tokens from "@/tokens";

import type { ISize } from "@/typings";

export const useLayoutStore = defineStore("layout-store", () => {
  const appSize: Ref<ISize> = ref({
    width: 0,
    height: 0,
  });

  const setAppSize = (size: ISize): void => {
    appSize.value = size;
  };

  const layoutType = computed(() => {
    if (appSize.value.width < tokens.breakpoints.md) return "mobile";

    return "desktop";
  });

  const isDesktopLayout = computed(() => {
    return appSize.value.width >= tokens.breakpoints.lg;
  });

  const isTabletLayout = computed(() => {
    return (
      appSize.value.width >= tokens.breakpoints.md &&
      appSize.value.width < tokens.breakpoints.lg
    );
  });

  const isMobileLayout = computed(() => {
    return appSize.value.width < tokens.breakpoints.md;
  });

  return {
    appSize,
    setAppSize,
    layoutType,
    isDesktopLayout,
    isTabletLayout,
    isMobileLayout,
  };
});
