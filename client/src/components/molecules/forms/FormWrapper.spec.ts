import { mount } from "@vue/test-utils";

import FormWrapper from "./FormWrapper.vue";

const CLASS_NAME = "form-wrapper";

describe("FormWrapper", () => {
  describe("classes", () => {
    test("renders with default class", () => {
      const wrapper = mount(FormWrapper, {
        props: {
          size: "md",
          color: "primary",
        },
      });

      expect(wrapper.classes(`${CLASS_NAME}_color-primary`)).toBeTruthy();
      expect(wrapper.classes(`${CLASS_NAME}_size-md`)).toBeTruthy();
    });
  });

  describe("slots", () => {
    test("renders default slot", () => {
      const wrapper = mount(FormWrapper, {
        slots: { default: "<div class='default-slot'>Slot Content</div>" },
      });

      expect(wrapper.find(".default-slot").exists()).toBeTruthy();
    });
  });
});
