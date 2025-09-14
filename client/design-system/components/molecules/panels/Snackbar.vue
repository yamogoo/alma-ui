<script setup lang="ts">
import { ControlButton } from "@/components/atoms";
</script>

<template>
  <div class="snackbar">
    <slot></slot>
    <ControlButton
      class="snackbar__close-button"
      :variant="'default'"
      :size="'sm'"
      :tone="'neutral'"
      :mode="'inversed'"
      :icon-name="'cross'"
      :icon-style="'outline'"
      :icon-weight="'300'"
    ></ControlButton>
  </div>
</template>

<style lang="scss">
/* .snackbar { } */
</style>
