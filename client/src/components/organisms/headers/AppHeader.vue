<script setup lang="ts">
import { Group, ToolbarBlock, LogoWithDescriptor } from "@/components/atoms";

import { LanguageMenu, ThemeSwitch } from "@@/components/moleculas";
import type { AppHeaderProps } from "@@/components/organisms";

withDefaults(defineProps<AppHeaderProps>(), {
  as: "header",
  isMainElement: true,
});
</script>

<template>
  <component
    :is="as"
    class="app-header"
    :role="isMainElement ? undefined : 'banner'"
  >
    <LogoWithDescriptor></LogoWithDescriptor>
    <Group :direction="'forward'" :orientation="'horizontal'" :size="'md'">
      <ToolbarBlock><LanguageMenu></LanguageMenu></ToolbarBlock>
      <ToolbarBlock><ThemeSwitch></ThemeSwitch></ToolbarBlock>
    </Group>
  </component>
</template>

<style lang="scss">
@mixin defineSizes($map: app.$header) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
    }
  }
}

.app-header {
  $padding-v: px2rem(get($spacing, "sm"));

  box-sizing: border-box;
  position: relative;
  width: 100%;
  @extend %main-container;

  padding-top: $padding-v;
  padding-bottom: $padding-v;
}
</style>
