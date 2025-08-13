<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, ref, computed, watch } from "vue";
import g from "gsap";

import tokens from "@/tokens";

import type { UIElementAxisDirection, UIElementOrientation } from "@/typings";

const props = withDefaults(defineProps<Props>(), {
  orientation: "vertical",
  direction: "forward",
  duration: 0.55,
  screenCount: 1,
  autoPlay: false,
  interval: 3,
  sid: 0,
  size: "md",
  isInactiveItemUnmounted: false,
  isDruggable: false,
  editScale: 1,
  gap: 0,
  isItemsClickable: true,
});

const emit = defineEmits<{
  (e: "update:sid", sid: number): void;
}>();

const refRoot = ref<HTMLDivElement | null>(null);
const refTrack = ref<HTMLDivElement | null>(null);

const screenSize = computed(() => {
  const orientation = props.orientation;
  const width = refRoot.value?.clientWidth;
  const height = refRoot.value?.clientHeight;

  return orientation === "vertical" ? height : width;
});

const currentSid = ref(props.sid);
const autoplayTimer = ref<ReturnType<typeof setInterval> | null>(null);

const startAutoPlay = () => {
  stopAutoPlay();
  if (!props.autoPlay) return;

  autoplayTimer.value = setInterval(
    () => {
      const count = props.screenCount || 1;

      let next =
        props.direction === "backward"
          ? (currentSid.value - 1 + count) % count
          : (currentSid.value + 1) % count;

      currentSid.value = next;
    },
    (props.interval || 1) * 1000 + 200
  );
};

const stopAutoPlay = () => {
  if (autoplayTimer.value) {
    clearInterval(autoplayTimer.value);
    autoplayTimer.value = null;
  }
};

watch(currentSid, (idx) => {
  onAnimate(idx);
  emit("update:sid", idx);
});

/* * * Touch Actions * * */

const isDragging = ref(false);
const startCoord = ref(0);
const delta = ref(0);
const clickStartTime = ref(0);

const itemGap = computed(() => props.gap ?? 0);
const itemFullSize = computed(() => (screenSize.value ?? 0) + itemGap.value);
const trackOffset = (sid: number) =>
  -sid * itemFullSize.value +
  (screenSize.value ?? 0) / 2 -
  (screenSize.value ?? 0) / 2;

const updateItemsScale = () => {
  if (!refTrack.value) return;
  const children = Array.from(refTrack.value.children) as HTMLElement[];
  const scale = props.isDruggable ? (props.editScale ?? 1) : 1;

  children.forEach((el) => {
    g.to(el, {
      scale,
      duration: props.duration,
      ease: "power4.out",
      transformOrigin: "center center",
    });
  });
};

const onPointerDown = (e: PointerEvent) => {
  if (!props.isDruggable || !refTrack.value) return;

  isDragging.value = true;
  startCoord.value = props.orientation === "vertical" ? e.clientY : e.clientX;
  clickStartTime.value = performance.now();

  stopAutoPlay();
  refTrack.value.setPointerCapture(e.pointerId);
};

const onPointerMove = (e: PointerEvent) => {
  if (!props.isDruggable || !isDragging.value || !refTrack.value) return;

  const currentCoord = props.orientation === "vertical" ? e.clientY : e.clientX;

  delta.value = currentCoord - startCoord.value;
  const moveOffset = trackOffset(currentSid.value) + delta.value;

  g.set(refTrack.value, {
    [props.orientation === "vertical" ? "y" : "x"]: moveOffset,
  });
};

const onPointerUp = () => {
  if (!props.isDruggable || !isDragging.value) return;
  isDragging.value = false;

  const distance = Math.abs(delta.value);
  const threshold = (screenSize.value ?? 0) * 0.1;

  if (distance > threshold) {
    const direction = delta.value > 0 ? -1 : 1;
    const count = props.screenCount || 1;
    const next = Math.max(0, Math.min(count - 1, currentSid.value + direction));
    currentSid.value = next;
  }

  delta.value = 0;
  onAnimate(currentSid.value);

  if (props.autoPlay) startAutoPlay();
};

const isCursorGrabbing = computed(() => props.isDruggable && isDragging.value);

onMounted(() => {
  nextTick(() => {
    onAnimate(currentSid.value, 0);
    startAutoPlay();
    updateItemsScale();

    refTrack.value?.addEventListener("pointerdown", onPointerDown);
    refTrack.value?.addEventListener("pointermove", onPointerMove);
    refTrack.value?.addEventListener("pointerup", onPointerUp);
    refTrack.value?.addEventListener("pointercancel", onPointerUp);
    refTrack.value?.addEventListener("pointerleave", onPointerUp);
  });
});

onUnmounted(() => {
  stopAutoPlay();
  refTrack.value?.removeEventListener("pointerdown", onPointerDown);
  refTrack.value?.removeEventListener("pointermove", onPointerMove);
  refTrack.value?.removeEventListener("pointerup", onPointerUp);
  refTrack.value?.removeEventListener("pointercancel", onPointerUp);
  refTrack.value?.removeEventListener("pointerleave", onPointerUp);
});

watch(
  () => props.isDruggable,
  () => {
    updateItemsScale();
  }
);

/* * * Animation * * */

const onAnimate = (idx: number, duration = props.duration): void => {
  const el = refTrack.value;

  const offset = -(screenSize.value ?? 0) * idx;

  if (el) {
    g.to(el, {
      ...(props.orientation === "vertical" ? { y: offset } : { x: offset }),
      duration,
      ease: "power4.out",
    });
  }
};

watch(
  () => props.sid,
  (idx) => {
    onAnimate(idx);
  }
);

watch(
  () => props.sid,
  (idx) => {
    if (!props.autoPlay) {
      currentSid.value = idx;
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => props.autoPlay,
  (newVal) => {
    if (newVal) startAutoPlay();
    else stopAutoPlay();
  }
);

onMounted(() => {
  nextTick(() => {
    onAnimate(currentSid.value, 0);
    startAutoPlay();
  });
});

onUnmounted(() => {
  stopAutoPlay();
});

/* * * Animations * * */

const onEnter = (el: Element, done: () => void): void => {
  g.fromTo(
    el,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      ease: "power4.out",
      duration: 0.15,
      onComplete: done,
    }
  );
};

const onLeave = (el: Element, done: () => void): void => {
  g.to(el, {
    opacity: 0,
    ease: "power4.out",
    duration: 0.15,
    onComplete: () => {
      done;
    },
  });
};
</script>

<script lang="ts">
export type Size = keyof typeof tokens.carouselView;

export interface Props {
  sid?: number;
  size?: Size;
  screenCount?: number;
  orientation?: UIElementOrientation;
  autoPlay?: boolean;
  duration?: number;
  interval?: number;
  direction?: UIElementAxisDirection;
  isInactiveItemUnmounted?: boolean;
  isDruggable?: boolean;
  editScale?: number;
  gap?: number;
  isItemsClickable?: boolean;
}
</script>

<template>
  <div
    ref="refRoot"
    class="carousel-view"
    :class="[
      `carousel-view_${isItemsClickable ? 'carousel-view_clickable' : 'carousel-view_static'}`,
      {
        [`carousel-view_size-${size}`]: size,
        [`carousel-view_orientation-${orientation}`]: orientation,
        'carousel-view_grabbing': isCursorGrabbing,
      },
    ]"
  >
    <div class="carousel-view__header">
      <slot name="pagination" :sid="sid" :screenCount="screenCount"></slot>
    </div>
    <div ref="refTrack" class="carousel-view__container">
      <template v-for="idx in screenCount" :key="idx">
        <Transition :css="false" @enter="onEnter" @leave="onLeave">
          <div
            v-if="isInactiveItemUnmounted ? idx - 1 === sid : true"
            class="carousel-view__screen"
            :style="{ flex: `0 0 ${screenSize}px` }"
          >
            <slot :name="`screen-${idx}`" v-bind="{ idx: idx + 1 }"></slot>
          </div>
        </Transition>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSize($map: $carousel-view) {
  @each $size, $val in $map {
    $header-padding: map.get($val, "header-padding");

    &_size-#{$size} {
      .carousel-view__header {
        padding: $header-padding;
      }
    }
  }
}

.carousel-view {
  position: relative;
  @include box(100%);

  @include defineSize();

  &__container {
    position: relative;
    display: flex;
    @include box(100%);
  }

  &_clickable {
    cursor: pointer;
  }

  &_static {
    .carousel-view__screen {
      user-select: none;
      pointer-events: none;
    }
  }

  &_grabbing {
    cursor: grabbing;
  }

  &_orientation{
    &-vertical {
    .carousel-view__container {
      flex-direction: column;
    }
  }

    &-horizontal {
      .carousel-view__container {
        flex-direction: row;
      }
    }
  }

  &__header {
    position: absolute;
    top: 0;
    right: 0;
  }

  &__screen {
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    @include box(100%);
    overflow: hidden;
  }
}
</style>
