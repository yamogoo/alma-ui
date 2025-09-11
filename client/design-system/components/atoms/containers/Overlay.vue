<!-- is the base for components that float over the rest of the page -->
<script setup lang="ts">
import type { OverlayProps } from "./overlay";

defineProps<OverlayProps>();
</script>

<template>
  <div class="overlay" :class="[{ [`overlay_mode-${mode}`]: !!mode }]"></div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineTheme($names) {
  @each $name in $names {
    &_color-#{$name} {
      @include themify($themes) {
        background-color: themed("overlay.#{$name}.background.value");
      }
    }
  }
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;

  @include defineTheme(map.keys(get($themes, "light.overlay")));
}
</style>
