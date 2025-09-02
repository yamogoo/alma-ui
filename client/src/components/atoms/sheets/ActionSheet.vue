<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import gsap from "gsap";

import { OVERLAY_IDS } from "@/constants";

import type { Props } from "./ActionSheet";

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  containerId: OVERLAY_IDS.MAIN,
  size: "md",
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const refRoot = ref<HTMLElement | null>(null);

const isRendered = ref(false);

/* * * Animations * * */

watch(
  () => props.isActive,
  async (active) => {
    if (active) {
      isRendered.value = true;
      await nextTick();

      gsap.fromTo(
        refRoot.value,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.35, ease: "power4.out" }
      );
    } else {
      if (!refRoot.value) return;

      gsap.to(refRoot.value, {
        y: "100%",
        opacity: 0,
        duration: 0.25,
        ease: "power4.in",
        onComplete: () => {
          isRendered.value = false;
          emit("close");
        },
      });
    }
  }
);
</script>

<template>
  <Teleport :to="containerId">
    <div
      v-if="isRendered"
      ref="refRoot"
      class="action-sheet"
      :class="[
        `action-sheet_variant-${variant}`,
        `action-sheet_size-${size}`,
        { [`action-sheet_color-${color}`]: !!color },
      ]"
    >
      <slot></slot>
    </div>
  </Teleport>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSizes($map: $action-sheet) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      $min-height: px2rem(get($val, "self.min-height.value"));
      $border-radius: px2rem(get($val, "self.border-radius.value"));

      &_variant-#{$variant} {
        &.action-sheet_size-#{$size} {
          min-height: $min-height;
          border-radius: $border-radius $border-radius 0 0;
        }
      }
    }
  }
}

@mixin defineTheme($names) {
  @each $name in $names {
    &_color-#{$name} {
      @include themify($themes) {
        background-color: themed(
          "action-sheet.#{$name}.background.normal.value"
        );
        box-shadow: 0 -2px 12px
          themed("action-sheet.#{$name}.shadow.normal.value");
      }
    }
  }
}

.action-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  overflow: auto;

  @include defineSizes();
  @include defineTheme(map.keys(get($themes, "light.action-sheet")));
}
</style>
