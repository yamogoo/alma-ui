<script setup lang="ts">
import tokens from "@/tokens";

import type {
  UIElementColor,
  UIElementContentKey,
  UIElementUnionProps,
} from "@/typings";

import AnimatedWrapper from "@/components/atoms/containers/AnimatedWrapper.vue";

withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
  color: "primary",
  bordered: false,
});
</script>

<script lang="ts">
export type Size = keyof typeof tokens.formWrapper.default;

export type Color = Extract<UIElementColor, "primary" | "secondary">;

export interface Props extends Partial<UIElementUnionProps> {
  size?: Size;
  color?: Color;
  bordered?: boolean;
  duration?: number;
  contentKey?: UIElementContentKey;
}
</script>

<template>
  <div
    class="form-wrapper"
    :class="[
      `form-wrapper_variant-${variant}`,
      `form-wrapper_size-${size}`,
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
      $padding-h: px2rem(get($val, "padding-h.value"));
      $padding-v: px2rem(get($val, "padding-v.value"));
      $header-padding-h: px2rem(get($val, "header.padding-h.value"));
      $header-padding-v: px2rem(get($val, "header.padding-v.value"));
      $border-radius: px2rem(get($val, "border-radius.value"));
      $border-width: px2rem(get($val, "border-width.value"));

      &_variant-#{$variant} {
        &.form-wrapper_size-#{$size} {
          padding: $padding-v $padding-h;
          border-radius: $border-radius;

          &.form-wrapper_bordered {
            border-style: solid;
            border-width: $border-width;
          }

          .form-wrapper__header {
            padding: $header-padding-v $header-padding-h;
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
        background-color: themed("form-wrapper.background-#{$name}");
        border-color: themed("form-wrapper.border-#{$name}");
      }
    }
  }
}

.form-wrapper {
  overflow: hidden;

  @include defineSize();
  @include defineThemes(primary secondary);
}
</style>
