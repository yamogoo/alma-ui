<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import g from "gsap";

import { useAuthStore } from "@/stores";

import { useTimeout } from "@/composables";

import Page from "@/components/base/page/Page.vue";
import AuthForm from "@/components/forms/AuthForm.vue";

const START_DELAY = 350;
const MESSAGE_DURATION_IN = 0.65;
const CONTAINER_DELAY = 0.45;
const CONTAINER_DURATION_IN = 0.45;
const FORM_DELAY = 0.5;
const FORM_DURATION_IN = 0.55;

const router = useRouter();

const { isLoggedIn, error: loginError } = storeToRefs(useAuthStore());
const { login } = useAuthStore();

const refContent = ref<HTMLDivElement | null>();
const refMessage = ref<HTMLDivElement | null>();
const refForm = ref<HTMLDivElement | null>();

const onRedirectToEditor = (): void => {
  router.push("/editor");
};

const onRedirectIfLoggedIn = (): void => {
  if (isLoggedIn.value) onRedirectToEditor();
};

const onLogin = async (email: string, password: string): Promise<void> => {
  await login(email, password);
  onRedirectIfLoggedIn();
};

const onContinueAsGuest = (): void => {
  onRedirectToEditor();
};

const containerToCenterOffset = (): number => {
  const height = refContent.value?.clientHeight ?? 0;
  const messageHeight = refMessage.value?.clientHeight ?? 0;

  const offset = (height - messageHeight) / 2;
  return offset;
};

/* * * Animations * * */

const messageAnimTimer = useTimeout(() => {
  const el = refMessage.value;

  if (el) onAnimMessageEnter(el);
}, START_DELAY);

const onAnimContainerEnter = (el: Element): void => {
  g.to(el, {
    y: 0,
    ease: "power4.out",
    duration: CONTAINER_DURATION_IN,
    delay: CONTAINER_DELAY,
  });
};

const onAnimFormEnter = (el: Element): void => {
  const height = el.clientHeight / 3;

  g.fromTo(
    el,
    {
      y: height,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      ease: "power4.out",
      direction: FORM_DURATION_IN,
      delay: FORM_DELAY,
    }
  );
};

const onAnimMessageEnter = (el: Element): void => {
  g.fromTo(
    el,
    {
      scale: 0.85,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      ease: "power4.out",
      direction: MESSAGE_DURATION_IN,
      onComplete: () => {
        const form = refForm.value;
        const container = refContent.value;

        if (form) onAnimFormEnter(form);
        if (container) onAnimContainerEnter(container);
      },
    }
  );
};

const setContainerStartPosition = (): void => {
  const el = refContent.value;
  if (!el) return;

  g.set(el, {
    y: containerToCenterOffset(),
    duration: 0,
  });
};

const animInit = (): void => {
  if (!refForm.value || !refMessage.value) return;

  refForm.value!.style = "opacity: 0;";
  refMessage.value!.style = "opacity: 0;";

  setContainerStartPosition();
  messageAnimTimer.start();
};

const onPageAnimCompleted = (): void => {
  animInit();
};

onMounted(() => {
  onRedirectIfLoggedIn();
});

onUnmounted(() => {
  messageAnimTimer.stop();
});
</script>

<template>
  <Page class="login" @anim-enter-completed="onPageAnimCompleted">
    <div ref="refContent" class="login__content">
      <Transition :css="false">
        <div class="login__form-wrapper" ref="refForm">
          <AuthForm
            :error="loginError"
            @submit="onLogin"
            @continue-as-guest="onContinueAsGuest"
          ></AuthForm>
        </div>
      </Transition>
    </div>
  </Page>
</template>

<style lang="scss">
@use "sass:map";

.login {
  box-sizing: border-box;
  position: relative;
  align-content: center;
  @include box(100%);
  padding: map.get($spacing, "lg");
  overflow: hidden;

  &__content {
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: px2rem(64px);
  }

  .auth-form {
    margin: auto;
  }
}
</style>
