import { mount } from "@vue/test-utils";

import FSNavigator from "./FSNavigator.vue";

describe("FSNavigator", () => {
  describe("slots", () => {
    test("renders header slot", () => {
      const wrapper = mount(FSNavigator, {
        slots: { header: "<div class='custom-header'>Header Content</div>" },
      });

      expect(wrapper.find(".custom-header").exists()).toBeTruthy();
    });

    test("renders body slot", () => {
      const slotContent = "Body content";

      const wrapper = mount(FSNavigator, {
        slots: { default: `<p>${slotContent}</p>` },
      });

      const body = wrapper.find(".fs-navigator__body");

      expect(body.exists()).toBe(true);
      expect(body.text()).toContain(slotContent);
    });

    test("renders footer slot", () => {
      const slotContent = "Footer content";

      const wrapper = mount(FSNavigator, {
        slots: { footer: `<p>${slotContent}</p>` },
      });

      const footer = wrapper.find(".fs-navigator__footer");

      expect(footer.exists()).toBe(true);
      expect(footer.text()).toContain(slotContent);
    });
  });
});
