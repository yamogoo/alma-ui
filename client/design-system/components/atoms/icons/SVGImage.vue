<script setup lang="ts">
import { defineAsyncComponent, computed } from "vue";

import { type SVGImageProps } from "./svgImage";
import { Skeleton } from "@/components/atoms";

const props = defineProps<SVGImageProps>();

const modules = import.meta.glob("../../../assets/images/**/*.svg", {
  eager: false,
});

const symbol = computed(() => {
  const name = props.name;
  const path = `../../../assets/images/${name}.svg`;

  const loader = modules[path];
  if (!loader) {
    throw new Error(`SVG not found: ${path}`);
  }

  return defineAsyncComponent(loader as any);
});
</script>

<template>
  <div
    class="svg-image"
    data-testid="svg-image"
    :class="[
      {
        [`svg-image_size-${size}`]: !!size,
        [`svg-image_mode-${mode}`]: !!mode,
      },
    ]"
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
      @include box(px2rem(get($val, "size")));
    }
  }
}

@mixin defineThemes($map: get($themes, "light.abstracts.label")) {
  @each $mode, $val in $map {
    &_mode-#{$mode} {
      @include themify($themes) {
        fill: themed("label.abstracts.#{$mode}");
      }
    }
  }
}

.svg-image {
  @include box(auto, inherit);
  line-height: 0;
  fill: inherit;
  @extend %base-transition;

  @include defineSizes();
  @include defineThemes();

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
