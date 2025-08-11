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
  <div
    class="icon"
    :class="[{ [`icon_${size}`]: !!size, [`icon_${color}`]: !!color }]"
    data-testid="icon"
  >
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

@mixin defineSizes($map: $icon) {
  @each $size, $val in $map {
    &_#{$size} {
      @include box(px2rem(map.get($val, "size")));
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_#{$name} {
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
