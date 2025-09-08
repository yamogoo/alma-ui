<script setup lang="ts">
import { onUnmounted, ref, watch } from "vue";
import g from "gsap";

import { useHover, useTimeout } from "@/composables/local";

import type { TooltipProps } from "./tooltip";

import CharTooltipLabel from "./CharTooltipLabel.vue";

const FOCUS_SHOW_TOOLTIP_TIME_MS = 250,
  UNFOCUS_HIDE_TOOLTIP_TIME_MS = 750;

const TOOLTIP_OPACITY_IN = 1,
  TOOLTIP_OPACITY_OUT = 0,
  TOOLTIP_SCALE_IN = 1,
  TOOLTIP_SCALE_OUT = 0.9;

const TOOLTIP_DURATION_IN = 0.2,
  TOOLTIP_DURATION_OUT = 0.25;

withDefaults(defineProps<TooltipProps>(), {
  align: "center",
});

const refContent = ref<HTMLDivElement | null>(null);

const isTooltipShown = ref(false);

const { isHovered: isContentFocused } = useHover(refContent);

const focusTimer = useTimeout(() => {
  isTooltipShown.value = true;
}, FOCUS_SHOW_TOOLTIP_TIME_MS);

const unfocusTimer = useTimeout(() => {
  isTooltipShown.value = false;
}, UNFOCUS_HIDE_TOOLTIP_TIME_MS);

const stopTimers = (): void => {
  focusTimer.stop();
  unfocusTimer.stop();
};

watch(isContentFocused, (isFocused) => {
  stopTimers();

  isFocused ? focusTimer.start() : unfocusTimer.start();
});

onUnmounted(() => {
  stopTimers();
});

/* * * Animations * * */

const onTooltipEnter = (el: Element, done: () => void): void => {
  g.fromTo(
    el,
    {
      opacity: TOOLTIP_OPACITY_OUT,
      scale: TOOLTIP_SCALE_OUT,
    },
    {
      opacity: TOOLTIP_OPACITY_IN,
      scale: TOOLTIP_SCALE_IN,
      duration: TOOLTIP_DURATION_IN,
      ease: "power4.out",
      onComplete: done,
    }
  );
};

const onTooltipLeave = (el: Element, done: () => void): void => {
  g.to(el, {
    opacity: TOOLTIP_OPACITY_OUT,
    scale: TOOLTIP_SCALE_OUT,
    duration: TOOLTIP_DURATION_OUT,
    ease: "power4.in",
    onComplete: done,
  });
};
</script>

<template>
  <div class="tooltip" :class="[`tooltip_align-${align}`]">
    <div ref="refContent" class="tooltip__content">
      <slot></slot>
    </div>
    <Transition :css="false" @enter="onTooltipEnter" @leave="onTooltipLeave">
      <CharTooltipLabel
        v-if="isTooltipShown"
        class="tooltip__label"
        :label="label"
      ></CharTooltipLabel>
    </Transition>
  </div>
</template>

<style lang="scss">
.tooltip {
  box-sizing: border-box;
  position: relative;

  &__label {
    position: absolute;
    z-index: 9999;
  }

  /* * * Modifiers * * */

  &_align {
    &-start {
      .tooltip__label {
        left: 0;
      }
    }

    &-center {
      .tooltip__label {
        left: 50%;
        transform: translateX(-50%);
      }
    }

    &-end {
      .tooltip__label {
        right: 0;
      }
    }
  }
}
</style>
