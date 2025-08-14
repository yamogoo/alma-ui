<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import { useLocaleStore } from "@/stores";

import FormWrapper from "@/components/base/forms/FormWrapper.vue";
import CarouselView from "@/components/base/containers/CarouselView.vue";
import StepPaginationTabs from "@/components/base/tabs/StepPaginationTabs.vue";

import LoginForm from "./LoginForm.vue";
import SigninForm from "./SigninForm.vue";

const FORM_ANIMATION_DURATION = 0.35,
  FORM_VIEW_ANIMATION_DURATION = 0.5;

const { $t } = storeToRefs(useLocaleStore());

const formSid = ref(0);

const formPaginationItems = computed(() => {
  return [
    { id: 0, label: $t.value.auth.login.form.title },
    { id: 1, label: $t.value.auth.signin.form.title },
  ];
});

const onUpdateSid = (sid: number): void => {
  formSid.value = sid;

  // if (sid === 1) {
  //   emit("update:email", localEmail.value);
  //   emit("update:password", localPassword.value);
  // }
};
</script>

<template>
  <FormWrapper
    class="auth-form"
    :color="'primary'"
    bordered
    :content-key="formSid"
    :duration="FORM_ANIMATION_DURATION"
  >
    <template #header>
      <StepPaginationTabs
        :sid="formSid"
        :items="formPaginationItems"
        @update:sid="onUpdateSid"
      >
      </StepPaginationTabs>
    </template>
    <CarouselView
      :sid="formSid"
      :screen-count="2"
      :orientation="'horizontal'"
      :direction="'forward'"
      :stretch="'auto'"
      :duration="FORM_VIEW_ANIMATION_DURATION"
    >
      <template #screen-1="{ isActive }">
        <LoginForm v-show="isActive"></LoginForm>
      </template>
      <template #screen-2="{ isActive }">
        <SigninForm v-show="isActive"></SigninForm>
      </template>
    </CarouselView>
  </FormWrapper>
</template>

<style lang="scss">
$max-width: 378px;

.auth-form {
  box-sizing: border-box;
  width: 100%;
  max-width: px2rem($max-width);
}
</style>
