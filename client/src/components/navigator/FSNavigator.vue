<template>
  <div class="fs-navigator">
    <div v-if="$slots.header" class="fs-navigator__header">
      <slot name="header"></slot>
    </div>
    <div class="fs-navigator__body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="fs-navigator__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
