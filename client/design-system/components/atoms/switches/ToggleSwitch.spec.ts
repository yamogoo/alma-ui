import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

// import { getTypedEmittedEvent } from "@/utils/vitest";

import ToggleSwitch from "./ToggleSwitch.vue";

// const ACTIVE_CLASS = "toggle-switch_active",
//   NORMAL_CLASS = "toggle-switch_normal";

// const getInput = <T>(wrapper: VueWrapper<T>) => {
//   return wrapper.find('input[type="checkbox"]');
// };

describe("ToggleSwitch", () => {
  describe("props", () => {
    test.each([true, false])(
      "should render correctly with useNative=%s",
      (useNative) => {
        const wrapper = mount(ToggleSwitch, {
          props: { useNative, isActive: true },
        });

        expect(wrapper.exists()).toBe(true);

        if (useNative) {
          expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
        } else {
          // expect(wrapper.attributes("role")).toBe("switch");
          // expect(wrapper.attributes("aria-checked")).toBe("true");
        }
      }
    );
  });

  // describe("values", () => {
  //   test("should not emit events when disabled", async () => {
  //     const wrapper = mount(ToggleSwitch, {
  //       props: { isDisabled: true, useNative: false },
  //     });

  //     await wrapper.trigger("keydown", { key: "Enter" });
  //     expect(wrapper.emitted("update:is-active")).toBeFalsy();

  //     const input = wrapper.find('input[type="checkbox"]');
  //     await input.trigger("change");
  //     expect(wrapper.emitted("update:is-active")).toBeFalsy();
  //   });

  //   test.each([true])(
  //     'should add class attribute "active" to container DOM if "state" prop equals %s',
  //     (state) => {
  //       const wrapper = mount(ToggleSwitch, {
  //         props: {
  //           state,
  //         },
  //       });

  //       const className = wrapper.classes(ACTIVE_CLASS);

  //       expect(className).toBe(true);
  //       expect(wrapper.classes(NORMAL_CLASS)).toBe(false);
  //       expect(className).toMatchSnapshot();
  //     }
  //   );

  //   test.each([false])(
  //     'should add class attribute "normal" to container DOM if "state" prop equals %s',
  //     (state) => {
  //       const wrapper = mount(ToggleSwitch, {
  //         props: {
  //           state,
  //         },
  //       });

  //       const className = wrapper.classes(NORMAL_CLASS);

  //       expect(className).toBe(true);
  //       expect(wrapper.classes(ACTIVE_CLASS)).toBe(false);
  //       expect(className).toMatchSnapshot();
  //     }
  //   );
  // });

  // describe("events", () => {
  //   test('should emit "update:is-acitve" when clicking on the wrapper', async () => {
  //     const wrapper = mount(ToggleSwitch, {
  //       props: {
  //         state: true,
  //         useNative: true,
  //       },
  //     });

  //     const inputEl = getInput(wrapper);
  //     await inputEl.trigger("change");

  //     const emittedEvent = getTypedEmittedEvent(wrapper, "update:is-active");

  //     expect(emittedEvent).toHaveLength(1);
  //     expect(wrapper.emitted()).toHaveProperty("update:is-active");
  //     expect(emittedEvent).toMatchSnapshot();
  //   });

  //   // test('should toggle state on "Enter" and "Space" keydown for custom switch', async () => {
  //   //   const wrapper = mount(ToggleSwitch, {
  //   //     props: { useNative: false, isActive: false },
  //   //   });

  //   //   await wrapper.trigger("keydown", { key: "Enter" });

  //   //   expect(wrapper.emitted("update:is-active")).toBeTruthy();

  //   //   await wrapper.trigger("keydown", { key: " " });

  //   //   expect(wrapper.emitted("update:is-active")?.length).toBe(2);
  //   // });
  // });
});
