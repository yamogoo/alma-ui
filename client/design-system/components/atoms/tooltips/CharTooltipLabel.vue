<script setup lang="ts">
import { useTemplateRef } from "vue";
import type { CharTooltipLabelProps } from "./charTooltipLabel";

import { Icon, Text } from "@/components/atoms";

withDefaults(defineProps<CharTooltipLabelProps>(), {
  variant: "default",
  size: "lg",
  color: "primary",
  iconStyle: "outline",
  iconWeight: "300",
});

const root = useTemplateRef("refRoot");

defineExpose({
  root,
});
</script>

<template>
  <div
    ref="refRoot"
    class="char-tooltip-label"
    :class="[
      `char-tooltip-label_variant-${variant}`,
      `char-tooltip-label_size-${size}`,
      `char-tooltip-label_color-${color}`,
    ]"
  >
    <Icon
      v-if="iconName"
      :name="iconName"
      :style="iconStyle"
      :weight="iconWeight"
      data-testid="icon"
    ></Icon>
    <Text>
      {{ label }}
    </Text>
    <!-- <Icon :name="'cross'" :style="'outline'" :weight="'300'"></Icon> -->
  </div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSized($map: $char-tooltip-label) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      &_variant-#{$variant} {
        &.char-tooltip-label_size-#{$size} {
          $gap: px2rem(get($val, "self.gap.value"));
          $padding: get($val, "self.padding.value");
          $border-radius: px2rem(get($val, "self.border-radius.value"));

          $label-font-style: get($val, "elements.label.font-style.value");

          gap: $gap;
          padding: $padding;
          border-radius: $border-radius;

          .text {
            @extend %t__#{$label-font-style};
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
        color: themed("char-tooltip-label.#{$name}.label.normal.value");
        fill: themed("char-tooltip-label.#{$name}.label.normal.value");
        background-color: themed(
          "char-tooltip-label.#{$name}.background.normal.value"
        );

        .text {
          color: inherit;
        }

        .icon {
          fill: inherit;
        }
      }
      @extend %base-transition;
    }
  }
}

.char-tooltip-label {
  display: flex;
  flex-direction: column;

  @include defineSized();
  @include defineThemes(map.keys(get($themes, "light.char-tooltip-label")));
}
</style>
