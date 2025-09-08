<script setup lang="ts">
import type { DividerProps } from "./divider";

withDefaults(defineProps<DividerProps>(), {
  variant: "default",
  size: "md",
  color: "primary",
  orientation: "horizontal",
});
</script>

<template>
  <div
    class="divider"
    :class="[
      `divider_variant-${variant}`,
      `divider_size-${String(size)}`,
      `divider_color-${String(color)}`,
      `divider_orientation-${orientation}`,
    ]"
  ></div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSize($map: $divider) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      $border-width: px2rem(get($val, "self.border-width.value"));
      $padding: get($val, "self.padding.value");

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
            border-bottom-color: themed("divider.#{$name}.self.border.value");
          }
        }

        &-vertical {
          @include themify($themes) {
            border-right-color: themed("divider.#{$name}.self.border.value");
          }
        }
      }
    }
  }
}

.divider {
  @extend %base-transition;

  @include defineSize();
  @include defineThemes(map.keys(get($themes, "light.divider")));
}
</style>
