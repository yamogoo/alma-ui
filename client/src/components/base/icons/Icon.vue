<script setup lang="ts">
import { defineAsyncComponent, computed } from "vue";

import type {
  IconName,
  IconStyle,
  IconWeight,
  IconColor,
  IconSize,
} from "./icons";
import Skeleton from "@/components/base/skeleton/Skeleton.vue";

const props = defineProps<Props>();

const symbol = computed(() => {
  const name = props.name;
  const style = props.style;
  const weight = props.weight;

  return defineAsyncComponent(async () => {
    return import(`../../../assets/icons/${name}_${style}_${weight}.svg`);
  });
});
</script>

<script lang="ts">
export interface Props {
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
      { [`icon_size-${size}`]: !!size, [`icon_color-${color}`]: !!color },
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
  @each $size, $val in $map {
    &_size-#{$size} {
      @include box(px2rem(map.get($val, "size")));
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_color-#{$name} {
      @include themify($themes) {
        fill: themed("label.#{$name}");
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
  @include defineThemes(primary primary-inversed secondary disabled accent);

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
