<script setup lang="ts">
import type { FormWrapperProps } from "./formWrapper";

import AnimatedWrapper from "@/components/atoms/containers/AnimatedWrapper.vue";

withDefaults(defineProps<FormWrapperProps>(), {
  variant: "default",
  size: "lg",
  mode: "primary",
  bordered: false,
});
</script>

<template>
  <div
    class="form-wrapper"
    :class="[
      `form-wrapper_variant-${variant}`,
      `form-wrapper_size-${size}`,
      `form-wrapper_mode-${mode}`,

      { 'form-wrapper_bordered': bordered },
    ]"
    data-testid="form-wrapper"
  >
    <AnimatedWrapper :duration="duration" :content-key="contentKey ?? ''">
      <div v-if="$slots.header" class="form-wrapper__header">
        <slot name="header"></slot>
      </div>
      <slot></slot>
    </AnimatedWrapper>
  </div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSize($map: $form-wrapper) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      $padding: get($val, "self.padding");

      $border-radius: px2rem(get($val, "self.border-radius"));
      $border-width: px2rem(get($val, "self.border-width"));

      $header-padding: get($val, "elements.header.padding");

      &_variant-#{$variant} {
        &.form-wrapper_size-#{$size} {
          padding: $padding;
          border-radius: $border-radius;

          &.form-wrapper_bordered {
            border-style: solid;
            border-width: $border-width;
          }

          .form-wrapper__header {
            padding: $header-padding;
          }
        }
      }
    }
  }
}

@mixin defineThemes($names) {
  @each $mode in $names {
    &_mode-#{$mode} {
      @include themify($themes) {
        background-color: themed("form-wrapper.#{$mode}.background");
        border-color: themed("form-wrapper.#{$mode}.border");
      }
    }
  }
}

.form-wrapper {
  overflow: hidden;
  @extend %base-transition;

  @include defineSize();
  @include defineThemes(map.keys(get($themes, "light.form-wrapper")));
}
</style>
