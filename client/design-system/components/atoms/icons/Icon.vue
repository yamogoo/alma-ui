<script setup lang="ts">
import { defineAsyncComponent, computed, markRaw } from "vue";

import type { UIElementVariant } from "@/typings";

import type {
  IconName,
  IconStyle,
  IconWeight,
  IconColor,
  IconSize,
} from "./icon";
import { Skeleton } from "@/components/atoms";

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const symbol = computed(() => {
  const { name, style, weight } = props;

  return markRaw(
    defineAsyncComponent(async () => {
      return import(`../../../assets/icons/${name}_${style}_${weight}.svg`);
    })
  );
});
</script>

<script lang="ts">
export interface Props {
  variant?: UIElementVariant;
  name: IconName;
  style: IconStyle;
  weight: IconWeight;
  color?: IconColor;
  size?: IconSize;
}
</script>

<template>
  <div
    class="icon"
    :class="[
      {
        [`icon_variant-${variant}`]: !!variant,
        [`icon_size-${String(size)}`]: !!size,
        [`icon_color-${String(color)}`]: !!color,
      },
    ]"
    data-testid="icon"
  >
    <Suspense>
      <component v-if="symbol" :is="symbol" viewBox="0 0 24 24"></component>
      <template #fallback>
        <Skeleton></Skeleton>
      </template>
    </Suspense>
  </div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSizes($map: $icon) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      $box-size: px2rem(get($val, "self.size.value"));

      &_variant-#{$variant} {
        &.icon_size-#{$size} {
          @include box($box-size);
        }
      }
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_color-#{$name} {
      @include themify($themes) {
        fill: themed("label.#{$name}.value");
      }
    }
  }
}

.icon {
  @include box(auto, inherit);
  line-height: 0;
  fill: inherit;
  @extend %base-transition;

  @include defineSizes();
  @include defineThemes(map.keys(get($themes, "light.label")));

  svg {
    @include box(auto, inherit);
    fill: inherit;
    @extend %base-transition;

    path {
      fill: inherit;
      @extend %base-transition;
    }
  }

  .skeleton {
    @include box(100%);
  }
}
</style>
