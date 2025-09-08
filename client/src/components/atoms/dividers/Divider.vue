<script setup lang="ts">
import type { DividerProps } from "./divider";

withDefaults(defineProps<DividerProps>(), {
  variant: "default",
  size: "md",
  color: "primary",
  orientation: "horizontal",
  align: "center",
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
      `divider_align-${align}`,
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

              &.divider_align {
                &-start {
                  margin: 0 0 $padding * 2 0;
                }

                &-center {
                  margin: $padding 0;
                }

                &-end {
                  margin: $padding * 2 0 0 0;
                }
              }
            }

            &-vertical {
              border-right-style: solid;
              border-right-width: $border-width;

              &.divider_align {
                &-start {
                  margin: 0 $padding * 2 0 0;
                }

                &-center {
                  margin: 0 $padding;
                }

                &-end {
                  margin: 0 0 0 $padding * 2;
                }
              }
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
