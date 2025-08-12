<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";

import { useLocaleStore } from "@/stores";

import FormWrapper from "@/components/base/forms/FormWrapper.vue";
import Form from "@/components/base/forms/Form.vue";
import ActionButton from "@/components/base/buttons/ActionButton.vue";
import Input from "@/components/base/inputs/Input.vue";
import Text from "@/components/base/typography/Text.vue";

const { $t } = storeToRefs(useLocaleStore());

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:email", email: string): void;
  (e: "update:password", password: string): void;
  (e: "submit", email: string, password: string): void;
}>();

const MIN_PASSWORD_LENGTH =
  +import.meta.env.VITE__FORM_PASSWORD_MIN_LENGTH || 0;

const localEmail = ref<string>("");
const localPassword = ref<string>("");

const isPasswordValid = computed(
  () => localPassword.value.length >= MIN_PASSWORD_LENGTH
);

const isValid = computed(() => isPasswordValid.value);

watch(
  () => props.email,
  (email) => {
    localEmail.value = email ?? "";
  }
);

watch(
  () => props.password,
  (password) => {
    localPassword.value = password ?? "";
  }
);

const onUpdateEmail = (email: string): void => {
  emit("update:email", email);
};

const onUpdatePasword = (password: string): void => {
  emit("update:password", password);
};

const onSubmit = async (): Promise<void> => {
  emit("submit", localEmail.value, localPassword.value);
};
</script>

<script lang="ts">
export interface Props {
  email?: string;
  password?: string;
  error?: string | null;
}
</script>

<template>
  <FormWrapper class="auth-form" :color="'primary'" bordered>
    <Form
      :title="$t.auth.login.form.title"
      :color="'primary'"
      :aria-label="'Login'"
    >
      <Input
        v-model:value="localEmail"
        :placeholder="$t.auth.login.form.userName"
        :type="'text'"
        :is-error="!!error"
        @update:value="onUpdateEmail"
      ></Input>
      <Input
        v-model:value="localPassword"
        :type="'password'"
        :placeholder="$t.auth.login.form.password"
        :is-error="!!error"
        @update:value="onUpdatePasword"
      ></Input>
      <Text v-if="!!error" :variant="'caption-1'" :text-color="'error'">{{
        error
      }}</Text>
      <template #footer>
        <ActionButton
          :color="'accent'"
          :size="'md'"
          :stretch="'fill'"
          :label="$t.auth.login.form.login"
          :is-disabled="!isValid"
          @press="onSubmit"
          @key.enter="onSubmit"
        ></ActionButton>
      </template>
    </Form>
  </FormWrapper>
</template>

<style lang="scss">
.auth-form {
  box-sizing: border-box;
  width: 100%;
  max-width: px2rem(378px);
}
</style>
