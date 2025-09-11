<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { useConfigStore } from "@@/stores";

import themeIcon from "@/assets/animations/themeIcon.json";

import { AnimatedIcon, ToggleSwitch } from "@/components/atoms";

const { currentTheme } = storeToRefs(useConfigStore());
const { toggleTheme } = useConfigStore();

const isLightTheme = ref(false);

const setSwitchState = (): void => {
  isLightTheme.value = currentTheme.value === "light";
};

watch(currentTheme, () => setSwitchState(), { immediate: true });

const onChangeTheme = () => toggleTheme();
</script>

<template>
  <div class="theme-switch">
    <AnimatedIcon
      :animation-data="themeIcon"
      :speed="1.33"
      :is-active="!isLightTheme"
      :size="'sm'"
      :color="'disabled'"
    ></AnimatedIcon>
    <ToggleSwitch
      data-testid="theme-switch"
      :is-active="isLightTheme"
      :is-disabled="false"
      :size="'sm'"
      aria-label="change-theme"
      @update:is-active="onChangeTheme"
    ></ToggleSwitch>
  </div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSizes($map: app.$theme-switch) {
  $gap: px2rem(get($map, "gap.value"));
  $padding-v: px2rem(get($map, "padding-v.value"));
  $padding-h: px2rem(get($map, "padding-h.value"));
  $padding: $padding-v $padding-h;

  @debug app.$theme-switch;

  & {
    gap: $gap;
    padding: $padding;
  }
}

.theme-switch {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
