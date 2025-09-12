<script setup lang="ts">
import { Group, ToolbarBlock, LogoWithDescriptor } from "@/components/atoms";

import { MainHeader } from "@/components/templates";

import { LanguageMenu, ThemeSwitch } from "@@/components/moleculas";
</script>

<template>
  <MainHeader class="app-header">
    <template #left>
      <LogoWithDescriptor></LogoWithDescriptor>
    </template>
    <template #right>
      <Group :direction="'forward'" :orientation="'horizontal'" :size="'md'">
        <ToolbarBlock><LanguageMenu></LanguageMenu></ToolbarBlock>
        <ToolbarBlock><ThemeSwitch></ThemeSwitch></ToolbarBlock>
      </Group>
    </template>
  </MainHeader>
</template>
