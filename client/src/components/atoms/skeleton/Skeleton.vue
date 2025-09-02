<script setup lang="ts">
import { onMounted, ref } from "vue";
import g from "gsap";

import tokens from "@/tokens";

withDefaults(defineProps<Props>(), {
  color: "default",
});

const refShape = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (refShape.value) onAnimate(refShape.value);
});

const onAnimate = (el: Element): void => {
  const width = el.clientWidth;

  g.fromTo(
    el,
    {
      x: -width,
    },
    {
      x: width,
      duration: 0.75,
      repeat: -1,
    }
  );
};
</script>

<script lang="ts">
export type Color = keyof typeof tokens.themes.light.skeleton;

export interface Props {
  color?: Color;
}
</script>

<template>
  <div class="skeleton">
    <div ref="refShape" class="skeleton__shape"></div>
  </div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineTheme($names) {
  @each $name in $names {
    &_variant-#{$name} {
      &.skeleton__shape {
        @include themify($themes) {
          $color-in: themed("skeleton.#{$name}.color-in.value");
          $color-out: themed("skeleton.#{$name}.color-out.value");
          background: linear-gradient(90deg, $color-out, $color-in, $color-out);
        }
      }
    }
  }
}

.skeleton {
  position: relative;
  border-radius: px2rem(get($roundness, "xs.value"));
  overflow: hidden;
  z-index: 1;
  cursor: wait;

  @include defineTheme(map.keys(get($themes, "light.skeleton")));

  &__shape {
    position: absolute;
    inset: 0;
    z-index: 0;
    @extend %base-transition;
  }
}
</style>
