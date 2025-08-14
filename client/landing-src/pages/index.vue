<script setup lang="ts">
import Page from "@/components/base/page/Page.vue";
import Text from "@/components/base/typography/Text.vue";

import LandingHeader from "@@/components/LandingHeader.vue";
import LandingCover from "@@/components/LandingCover.vue";
import LandingFooter from "@@/components/LandingFooter.vue";
</script>

<template>
  <Page>
    <LandingHeader></LandingHeader>
    <LandingCover>
      <Text :variant="'title-1'">Promo</Text>
    </LandingCover>
    <LandingFooter></LandingFooter>
  </Page>
</template>
