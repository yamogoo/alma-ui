<!-- is the base for components that float over the rest of the page -->
<script setup lang="ts">
import type { UIElementColor } from "@/typings";

defineProps<Props>();
</script>

<script lang="ts">
export type Color = Extract<UIElementColor, "primary" | "primary-inversed">;

export interface Props {
  id?: string;
  color?: Color;
}
</script>

<template>
  <div class="overlay" :class="[{ [`overlay_color-${color}`]: !!color }]"></div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineTheme($names) {
  @each $name in $names {
    &_color-#{$name} {
      @include themify($themes) {
        background-color: themed("overlay.background-#{$name}");
      }
    }
  }
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;

  @include defineTheme(primary primary-inversed);
}
</style>
