<script setup lang="ts">
import tokens from "@/tokens";

import type {
  UIElementColor,
  UIElementOrientation,
  UIElementVariant,
} from "@/typings";

withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
  color: "primary",
  orientation: "horizontal",
});
</script>

<script lang="ts">
export type Variant = UIElementVariant;

export type Size = keyof typeof tokens.divider.default;

export type Color = Extract<UIElementColor, "primary" | "secondary">;

export interface Props {
  variant?: Variant;
  size?: Size;
  color?: Color;
  orientation?: UIElementOrientation;
}
</script>

<template>
  <div
    class="divider"
    :class="[
      `divider_variant-${variant}`,
      `divider_size-${size}`,
      `divider_color-${color}`,
      `divider_orientation-${orientation}`,
    ]"
  ></div>
</template>

<style lang="scss">
@mixin defineSize($map: $divider) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      $border-width: px2rem(get($val, "border-width.value"));
      $padding: px2rem(get($val, "padding.value"));

      &_variant-#{$variant} {
        &.divider_size-#{$size} {
          &.divider_orientation {
            &-horizontal {
              border-bottom-style: solid;
              border-bottom-width: $border-width;
              margin: $padding 0;
            }

            &-vertical {
              border-right-style: solid;
              border-right-width: $border-width;
              margin: 0, $padding;
            }
          }
        }
      }
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_color-#{$name} {
      &.divider_orientation {
        &-horizontal {
          @include themify($themes) {
            border-bottom-color: themed("divider.border-#{$name}");
          }
        }

        &-vertical {
          @include themify($themes) {
            border-right-color: themed("divider.border-#{$name}");
          }
        }
      }
    }
  }
}

.divider {
  @extend %base-transition;

  @include defineSize();
  @include defineThemes(primary secondary);
}
</style>
