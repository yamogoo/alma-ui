<script setup lang="ts">
import tokens from "@/tokens";

import type { UIElementColor, UIElementContentKey } from "@/typings";

import AnimatedWrapper from "@/components/base/containers/AnimatedWrapper.vue";

withDefaults(defineProps<Props>(), {
  size: "md",
  color: "primary",
  bordered: false,
});
</script>

<script lang="ts">
export type Size = keyof typeof tokens.formWrapper;

export type Color = Extract<UIElementColor, "primary" | "secondary">;

export interface Props {
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
      `form-wrapper_color-${color}`,
      `form-wrapper_size-${size}`,
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
  @each $size, $val in $map {
    $padding-h: px2rem(map.get($val, "padding-h"));
    $padding-v: px2rem(map.get($val, "padding-v"));
    $header-padding-h: px2rem(map.get($val, "header-padding-h"));
    $header-padding-v: px2rem(map.get($val, "header-padding-v"));
    $border-radius: px2rem(map.get($val, "border-radius"));
    $border-width: px2rem(map.get($val, "border-width"));

    &_size-#{$size} {
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
