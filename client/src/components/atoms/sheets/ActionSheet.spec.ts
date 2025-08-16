import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import gsap from "gsap";

import ActionSheet from "./ActionSheet.vue";
import { mountWithTeleport } from "@/utils";

vi.mock("gsap", () => ({
  default: {
    fromTo: vi.fn(),
    to: vi.fn(),
  },
}));

describe("ActionSheet.vue", () => {
  mountWithTeleport();

  test("renders nothing when inactive initially", () => {
    const wrapper = mount(ActionSheet, {
      props: { containerId: "#app", isActive: false },
    });

    expect(wrapper.find(".action-sheet").exists()).toBe(false);
  });

  test("renders and plays open animation when isActive = true", async () => {
    const wrapper = mount(ActionSheet, {
      props: { containerId: "#app", isActive: false },
    });

    await wrapper.setProps({ isActive: true });
    await nextTick();

    const el = document.querySelector(".action-sheet");
    expect(el).not.toBeNull();

    expect(gsap.fromTo).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      { y: "100%", opacity: 0 },

      expect.objectContaining({ y: "0%", opacity: 1 })
    );
  });

  test("applies size and color classes", async () => {
    const wrapper = mount(ActionSheet, {
      props: {
        containerId: "#app",
        isActive: false,
        size: "md",
        color: "primary",
      },
      attachTo: document.body,
    });

    await wrapper.setProps({ isActive: true });
    await nextTick();
    await nextTick();

    const el = document.querySelector(
      "#app .action-sheet"
    ) as HTMLElement | null;

    expect(el).not.toBeNull();
    expect(el!.classList.contains("action-sheet_size-md")).toBe(true);
    expect(el!.classList.contains("action-sheet_color-primary")).toBe(true);
  });
});
