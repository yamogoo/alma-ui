<script setup lang="ts">
import { defineAsyncComponent, computed } from "vue";

import type {
  SymbolName,
  SymbolStyle,
  SymbolWeight,
  SymbolColor,
  SymbolSize,
} from "./symbols";
import BaseSkeleton from "@/components/base/skeleton/BaseSkeleton.vue";

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
  name: SymbolName;
  style: SymbolStyle;
  weight: SymbolWeight;
  color?: SymbolColor;
  size?: SymbolSize;
}
</script>

<template>
  <div class="icon" data-testid="icon" :class="[size, color]">
    <Suspense>
      <component v-if="symbol" :is="symbol" viewBox="0 0 24 24"></component>
      <template #fallback>
        <BaseSkeleton></BaseSkeleton>
      </template>
    </Suspense>
  </div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineIconSizes($map: $icon) {
  @each $size, $val in $map {
    &.#{$size} {
      @include box(px2rem(map.get($val, "size")));
    }
  }
}

.icon {
  @include box(auto, inherit);
  line-height: 0;

  svg {
    @include box(auto, inherit);
    fill: inherit;

    path {
      fill: inherit;
    }
  }

  .skeleton {
    @include box(100%);
  }

  /* * * Sizes * * */

  @include defineIconSizes();

  /* * * Colors * * */

  &.primary {
    @include themify($themes) {
      fill: themed("label", "primary");
    }
  }

  &.primary-inversed {
    @include themify($themes) {
      fill: themed("label", "primary-inversed");
    }
  }

  &.secondary {
    @include themify($themes) {
      fill: themed("label", "secondary");
    }
  }

  &.secondary-inversed {
    @include themify($themes) {
      fill: themed("label", "secondary-inversed");
    }
  }

  &.disabled {
    @include themify($themes) {
      fill: themed("label", "disabled");
    }
  }

  &.accent {
    @include themify($themes) {
      fill: themed("label", "accent");
    }
  }
}
</style>
