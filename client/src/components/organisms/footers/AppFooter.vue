<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useLocaleStore } from "@@/stores";

import { Text } from "@/components/atoms";
import type { AppFooterProps } from "@@/components/organisms";

withDefaults(defineProps<AppFooterProps>(), {
  as: "footer",
  isMainElement: true,
});

const { $t } = storeToRefs(useLocaleStore());
</script>

<template>
  <component
    :is="as"
    class="app-footer"
    :role="isMainElement ? undefined : 'banner'"
  >
    <Text :variant="'caption-3'" :text-color="'secondary'"
      >{{ $t.about.author }} | 2025</Text
    >
  </component>
</template>

<style lang="scss">
@mixin defineSizes($map: app.$header) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
    }
  }
}

.app-footer {
  $padding-v: px2rem(get($spacing, "sm.value"));

  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  @extend %main-container;
  padding-top: $padding-v;
  padding-bottom: $padding-v;
}
</style>
