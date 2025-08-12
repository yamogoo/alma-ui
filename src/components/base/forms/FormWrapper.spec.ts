import { mount } from "@vue/test-utils";

import FormWrapper from "./FormWrapper.vue";

describe("FormWrapper", () => {
  describe("slots", () => {
    test("renders default slot", () => {
      const wrapper = mount(FormWrapper, {
        slots: { default: "<div class='default-slot'>Slot Content</div>" },
      });

      expect(wrapper.find(".default-slot").exists()).toBeTruthy();
    });
  });
});
