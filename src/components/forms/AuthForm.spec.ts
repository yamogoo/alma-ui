import { mount } from "@vue/test-utils";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { createTestingPinia } from "@pinia/testing";

import AuthForm from "@/components/forms/AuthForm.vue";

import { useLocaleStore } from "@/stores";

describe("AuthForm.vue", () => {
  let wrapper: ReturnType<typeof mount>;
  const mountComponent = (props = {}) => {
    return mount(AuthForm, {
      props,
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            createSpy: vi.fn,
          }),
        ],
        stubs: {
          FormWrapper: true,
          Form: true,
          ActionButton: true,
          Input: true,
          Text: true,
        },
      },
    });
  };

  beforeEach(() => {
    wrapper = mountComponent();
    const store = useLocaleStore();
    store.$t = {
      auth: {
        login: {
          form: {
            title: "Login",
            userName: "Username",
            password: "Password",
            login: "Log in",
            skip: "Skip",
          },
        },
      },
    } as any;
  });

  test("renders with default values", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("updates localEmail when props.email changes", async () => {
    await wrapper.setProps({ email: "test@example.com" });
    expect((wrapper.vm as any).localEmail).toBe("test@example.com");
  });

  test("updates localPassword when props.password changes", async () => {
    await wrapper.setProps({ password: "123456" });
    expect((wrapper.vm as any).localPassword).toBe("123456");
  });

  test("calls update:email when entering email", async () => {
    const spy = vi.fn();

    wrapper = mountComponent({ "onUpdate:email": spy });

    (wrapper.vm as any).onUpdateEmail("new@mail.com");

    expect(spy).toHaveBeenCalledWith("new@mail.com");
  });

  test("calls update:password when entering a password", async () => {
    const spy = vi.fn();

    wrapper = mountComponent({ "onUpdate:password": spy });

    (wrapper.vm as any).onUpdatePasword("123456");

    expect(spy).toHaveBeenCalledWith("123456");
  });

  test("calls submit with email and password", async () => {
    const spy = vi.fn();

    wrapper = mountComponent({ onSubmit: spy });

    (wrapper.vm as any).localEmail = "test@mail.com";
    (wrapper.vm as any).localPassword = "pass123";

    await (wrapper.vm as any).onSubmit();
    expect(spy).toHaveBeenCalledWith("test@mail.com", "pass123");
  });

  test("call continue-as-guest", async () => {
    const spy = vi.fn();
    wrapper = mountComponent({ "onContinue-as-guest": spy });
    (wrapper.vm as any).onContinueAsGuest();
    expect(spy).toHaveBeenCalled();
  });

  test("submit button is inactive when password is short", async () => {
    (wrapper.vm as any).localPassword = "12";

    await wrapper.vm.$nextTick();

    expect((wrapper.vm as any).isValid).toBe(false);
  });

  // test("displays an error if passed", async () => {
  //   await wrapper.setProps({ error: "Invalid credentials" });

  //   expect(wrapper.find('[data-testid="auth-form-error"]').exists()).toBe(true);
  // });
});
