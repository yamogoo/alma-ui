<script setup lang="ts">
import type { CarouselProps } from "./carousel";

withDefaults(defineProps<CarouselProps>(), {});
</script>

<template>
  <div class="carousel"></div>
</template>

<style lang="scss">
/* .carousel { } */
</style>
