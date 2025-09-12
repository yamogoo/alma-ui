<script setup lang="ts">
import type { MainHeaderProps } from "./mainHeader";

withDefaults(defineProps<MainHeaderProps>(), {
  as: "header",
  variant: "default",
  size: "md",
  isMainElement: true,
});
</script>

<template>
  <component
    :is="as"
    class="main-header"
    :class="[
      `main-header_variant-${variant}`,
      `main-header_size-${size}`,
      `main-header_mode-${mode}`,
      `main-header_tone-${tone}`,
    ]"
    :role="isMainElement ? undefined : 'banner'"
  >
    <div class="main-header__section-left">
      <slot name="left"></slot>
    </div>
    <div class="main-header__section-content">
      <slot></slot>
    </div>
    <div class="main-header__section-right">
      <slot name="right"></slot>
    </div>
  </component>
</template>

<style lang="scss">
@mixin defineSizes($map: get($templates, "main-header")) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      &_variant-#{$variant} {
        &.main-header_size-#{$size} {
          $padding-v: px2rem(get($val, "self.padding"));
          padding-top: $padding-v;
          padding-bottom: $padding-v;
        }
      }
    }
  }
}

.main-header {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  @extend %main-container;
  @include defineSizes();
}
</style>
