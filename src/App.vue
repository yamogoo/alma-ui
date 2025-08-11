<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useResizeObserver } from "@vueuse/core";

import {
  useAuthStore,
  useConfigStore,
  useLayoutStore,
  useLocaleStore,
} from "@/stores";

import { useMeta, useTheme } from "@/composables";

useMeta("author", import.meta.env.APP_AUTHOR_NAME);
useTheme("light");

const { setAppSize } = useLayoutStore();
const { setLocale } = useLocaleStore();

const { initializeAuth } = useAuthStore();

useConfigStore();
setLocale("en");

const refApp = ref<HTMLDivElement | null>();

useResizeObserver(refApp, (entries) => {
  const entry = entries[0];
  const { width, height } = entry.contentRect;
  setAppSize({ width, height });
});

onMounted(() => {
  initializeAuth();
});
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
/* #app {} */
</style>
