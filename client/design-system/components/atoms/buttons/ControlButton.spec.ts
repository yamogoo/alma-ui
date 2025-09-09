import { mount } from "@vue/test-utils";

import ControlButton from "./ControlButton.vue";

describe("ActionButton", () => {
  describe("components", () => {
    test("should render Button component", () => {
      const wrapper = mount(ControlButton, {
        props: {
          size: "lg",
          color: "accent",
        },
      });

      const buttonEl = wrapper.find('[data-testid="button"]');
      const isButtonExists = buttonEl.exists();

      expect(isButtonExists).toBeTruthy();
      expect(isButtonExists).toMatchInlineSnapshot(`true`);
    });
  });
});
