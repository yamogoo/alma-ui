<script setup lang="ts">
import { ref, toValue, watch } from "vue";
import { Vue3Lottie as LottieAnimation } from "vue3-lottie";

import type { SymbolColor, SymbolSize } from "./symbols";

const props = withDefaults(defineProps<Props>(), {
  speed: 1,
});

const emit = defineEmits<{
  (e: "complete"): void;
}>();

const refAnim = ref<typeof LottieAnimation | null>(null);

const onAnimReady = (): void => {
  onToggle(props.isActive);
};

const onToggle = (isActive: boolean): void => {
  const el = toValue(refAnim);
  if (!el) return;

  if (!isActive) {
    el.pause();
    el.setDirection("reverse");
    el.play();
  } else {
    el.pause();
    el.setDirection("forward");
    el.play();
  }
};

const rendererSettings: typeof LottieAnimation.rendererSettings = {};

watch(
  () => props.isActive,
  (_isActive) => {
    onToggle(_isActive);
  }
);

const onComplete = (): void => {
  emit("complete");
};
</script>

<script lang="ts">
export interface Props {
  animationData: typeof LottieAnimation.animationData;
  speed?: number;
  isActive: boolean;
  color?: SymbolColor;
  size?: SymbolSize;
}
</script>

<template>
  <LottieAnimation
    ref="refAnim"
    class="animated-icon"
    :class="[
      {
        [`animated-icon_${size}`]: !!size,
        [`animated-icon_${color}`]: !!color,
      },
    ]"
    :animation-data
    :auto-play="false"
    :loop="false"
    :speed
    :renderer-settings
    @on-animation-loaded="onAnimReady"
    @on-complete="onComplete"
  />
</template>

<style lang="scss">
@use "sass:map";

@mixin defineIconSizes($map: proto.$icon) {
  @each $size, $val in $map {
    &_#{$size} {
      @include box(px2rem(map.get($val, "size")) !important);
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_#{$name} {
      @include themify(proto.$themes) {
        fill: themed("label", $name);
      }
    }
  }
}

.animated-icon {
  @include box(auto, inherit);
  line-height: 0;
  @extend %base-transition;

  @include defineIconSizes();
  @include defineThemes(
    primary primary-inversed secondary secondary-inversed disabled accent accept
  );

  svg {
    @include box(auto, inherit);
    fill: inherit;
    @extend %base-transition;

    g {
      fill: inherit;

      path {
        fill: inherit;
        @extend %base-transition;
      }
    }
  }
}
</style>
