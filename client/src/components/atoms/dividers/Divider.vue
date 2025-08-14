<script setup lang="ts">
import tokens from "@/tokens";

import type { UIElementColor, UIElementOrientation } from "@/typings";

withDefaults(defineProps<Props>(), {
  size: "md",
  color: "primary",
  orientation: "horizontal",
});
</script>

<script lang="ts">
export type Size = keyof typeof tokens.divider;

export type Color = Extract<UIElementColor, "primary" | "secondary">;

export interface Props {
  size?: Size;
  color?: Color;
  orientation?: UIElementOrientation;
}
</script>

<template>
  <div
    class="divider"
    :class="[
      `divider_size-${size}`,
      `divider_color-${color}`,
      `divider_orientation-${orientation}`,
    ]"
  ></div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSize($map: $divider) {
  @each $size, $val in $map {
    $border-width: px2rem(map.get($val, "border-width"));
    $padding: px2rem(map.get($val, "padding"));

    &_size-#{$size} {
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
