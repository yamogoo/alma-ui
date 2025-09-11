<script setup lang="ts">
import type { FormWrapperProps } from "./formWrapper";

import AnimatedWrapper from "@/components/atoms/containers/AnimatedWrapper.vue";

withDefaults(defineProps<FormWrapperProps>(), {
  variant: "default",
  size: "lg",
  color: "primary",
  bordered: false,
});
</script>

<template>
  <div
    class="form-wrapper"
    :class="[
      `form-wrapper_variant-${variant}`,
      `form-wrapper_size-${String(size)}`,
      `form-wrapper_color-${color}`,

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
      $padding: get($val, "self.padding.value");

      $border-radius: px2rem(get($val, "self.border-radius.value"));
      $border-width: px2rem(get($val, "self.border-width.value"));

      $header-padding: get($val, "elements.header.padding.value");

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
  @each $name in $names {
    &_color-#{$name} {
      @include themify($themes) {
        background-color: themed("form-wrapper.#{$name}.background.value");
        border-color: themed("form-wrapper.#{$name}.border.value");
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
