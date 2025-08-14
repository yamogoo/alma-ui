<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import gsap from "gsap";

import type { UIElementContentKey } from "@/typings";

interface Props {
  contentKey: UIElementContentKey;
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 0.4,
});

const refWrapper = ref<HTMLElement>();

watch(
  () => props.contentKey,
  async () => {
    if (!refWrapper.value) return;

    const el = refWrapper.value;
    const prevHeight = el.offsetHeight;

    await nextTick();
    const newHeight = el.offsetHeight;

    const { duration } = props;

    gsap.fromTo(
      el,
      { height: prevHeight },
      {
        height: newHeight,
        duration,
        ease: "power4.out",
        onComplete: () => {
          nextTick(() => {
            el.style.height = "auto";
          });
        },
      }
    );
  }
);
</script>

<template>
  <div ref="refWrapper" class="animated-wrapper">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.animated-wrapper {
  position: relative;
  overflow: hidden;
}
</style>
