<script setup lang="ts">
import type { ControlWrapperProps } from "./controlWrapper";

withDefaults(defineProps<ControlWrapperProps>(), {
  variant: "default",
  size: "md",
});
</script>

<template>
  <div
    class="control-wrapper"
    :class="{
      [`control-wrapper_variant-${variant}`]: !!variant,
      [`control-wrapper_size-${size}`]: !!size,
    }"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss">
@mixin defineButtonSizes($map: $control-wrapper) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      $gap: px2rem(get($val, "self.gap.value"));
      $padding-v: px2rem(get($val, "self.padding-v.value"));
      $padding-h: px2rem(get($val, "self.padding-h.value"));
      $padding: $padding-v $padding-h;

      &_variant-#{$variant} {
        &.control-wrapper_size-#{$size} {
          gap: $gap;
          padding: $padding;
        }
      }
    }
  }
}

.control-wrapper {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: max-content;

  @include defineButtonSizes();
}
</style>
