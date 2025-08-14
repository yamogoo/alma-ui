<script setup lang="ts">
import { useRouter } from "vue-router";

import Text, { type Props as TextProps } from "./Text.vue";

import type { Route } from "@/typings/routes";

const props = withDefaults(defineProps<Props>(), {
  textDecoration: "underline",
});

const router = useRouter();

const onClick = (e: PointerEvent): void => {
  e.preventDefault();

  if (props.to) {
    router.push({ path: props.to });
  }
};
</script>

<script lang="ts">
export interface Props extends TextProps {
  to?: Route;
  href?: string;
}
</script>

<template>
  <Text
    v-bind="props"
    :as="'a'"
    :href="href ?? to"
    class="link"
    @pointerup="onClick"
  >
    <slot></slot>
  </Text>
</template>

<style lang="scss">
@use "sass:map";

.link {
  cursor: pointer;
}
</style>
