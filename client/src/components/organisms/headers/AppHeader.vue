<script setup lang="ts">
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
  ></component>
</template>

<style lang="scss">
@mixin defineSizes($map: app.$header) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
    }
  }
}
</style>
