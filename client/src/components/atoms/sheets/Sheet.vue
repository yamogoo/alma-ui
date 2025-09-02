<script setup lang="ts">
import tokens from "@/tokens";

import type { UIElementUnionProps } from "@/typings";

withDefaults(defineProps<Props>(), {
  isOpen: false,
  isDialog: false,
});
</script>

<script lang="ts">
export type Color = keyof typeof tokens.themes.light.sheet;

export interface Props extends Partial<UIElementUnionProps> {
  color?: Color;
  isOpen: boolean;
  isDialog?: boolean;
}
</script>

<template>
  <div v-if="isOpen" class="sheet" :class="{ sheet_dialog: isDialog }">
    <div class="sheet__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSizes($map: $sheet) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      $min-height: px2rem(get($val, "self.min-height.value"));
      $border-radius: px2rem(get($val, "self.border-radius.value"));

      &_variant-#{$variant} {
        &.sheet__size-#{$size} {
          min-height: $min-height;
          border-radius: $border-radius $border-radius 0 0;
        }
      }
    }
  }
}

@mixin defineTheme($names) {
  @each $name in $names {
    &_color-#{$name} {
      @include themify($themes) {
        background-color: themed("sheet.#{$name}.background.normal.value");
        box-shadow: 0 -2px 12px themed("sheet.#{$name}.shadow.normal.value");
      }
    }
  }
}

.sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  overflow: auto;

  @include defineSizes();
  @include defineTheme(map.keys(get($themes, "light.sheet")));
}
</style>
