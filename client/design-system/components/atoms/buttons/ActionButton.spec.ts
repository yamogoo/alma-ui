import { mount } from "@vue/test-utils";

import ActionButton from "./ActionButton.vue";

describe("ActionButton", () => {
  describe("components", () => {
    test("should render Button component", () => {
      const wrapper = mount(ActionButton, {
        props: {
          size: "lg",
          tone: "neutral",
          mode: "primary",
        },
      });

      const buttonEl = wrapper.find('[data-testid="button"]');
      const isButtonExists = buttonEl.exists();

      expect(isButtonExists).toBeTruthy();
      expect(isButtonExists).toMatchInlineSnapshot(`true`);
    });
  });
});
