<script setup lang="ts">
import { ref, toValue, watch } from "vue";
import { Vue3Lottie as LottieAnimation } from "vue3-lottie";

import type { AnimatedIconProps } from "./animatedIcon";

const props = withDefaults(defineProps<AnimatedIconProps>(), {
  variant: "default",
  speed: 1,
  loop: false,
});

const emit = defineEmits<{
  (e: "completed"): void;
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

const onCompleted = (): void => {
  emit("completed");
};
</script>

<template>
  <LottieAnimation
    ref="refAnim"
    class="animated-icon"
    :class="[
      {
        [`animated-icon_variant-${variant}`]: !!variant,
        [`animated-icon_size-${size}`]: !!size,
        [`animated-icon_color-${color}`]: !!color,
      },
    ]"
    :animation-data
    :auto-play="false"
    :loop
    :speed
    :renderer-settings
    @on-animation-loaded="onAnimReady"
    @on-complete="onCompleted"
  />
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSizes($map: $icon) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      &_variant-#{$variant} {
        &.animated-icon_size-#{$size} {
          $icon-size: px2rem(get($val, "self.size.value"));

          width: $icon-size !important;
          height: $icon-size !important;
        }
      }
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_color-#{$name} {
      svg {
        path {
          @include themify($themes) {
            fill: themed("label.#{$name}.value");
            stroke: themed("label.#{$name}.value");
          }
        }
      }
    }
  }
}

.animated-icon {
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
