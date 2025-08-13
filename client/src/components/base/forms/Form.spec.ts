import { mount } from "@vue/test-utils";

import Form from "@/components/base/forms/Form.vue";
import Text from "@/components/base/typography/Text.vue";

vi.mock("vue", async (orig) => {
  const actual = await orig();
  return {
    ...(actual as object),
    useId: () => "mock-id",
  };
});

describe("Form", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("elements", () => {
    test("renders the footer slot if it exists", () => {
      const wrapper = mount(Form, {
        slots: { footer: "<div class='custom-footer'>Footer Content</div>" },
      });
      const footer = wrapper.find(".form__footer");

      expect(footer.exists()).toBe(true);
      expect(footer.text()).toContain("Footer Content");
    });

    test("does not render footer if slot footer is empty", () => {
      const wrapper = mount(Form);

      expect(wrapper.find(".form__footer").exists()).toBe(false);
    });
  });

  describe("classes", () => {
    test("adds a class to the color", () => {
      const wrapper = mount(Form, {
        props: { color: "primary" },
      });

      expect(wrapper.classes()).toContain("form_color-primary");
    });

    test("adds class for size", () => {
      const wrapper = mount(Form, {
        props: { size: "md" },
      });

      expect(wrapper.classes("form_size-md")).toBeTruthy();
    });
  });

  describe("values", () => {
    test("assigns an id to the form via useId", () => {
      const wrapper = mount(Form);

      expect(wrapper.attributes("id")).toBe("mock-id");
    });

    test("renders the title via title", () => {
      const wrapper = mount(Form, {
        props: { title: "My Title" },
      });

      const header = wrapper.find("[data-testid='form-header']");

      expect(header.exists()).toBe(true);

      const comp = wrapper.findComponent(Text);

      expect(comp.props("variant")).toBe("title-4");
      expect(comp.props("textColor")).toBe("primary");
      expect(comp.text()).toBe("My Title");
    });
  });

  describe("slots", () => {
    test("renders header slot", () => {
      const wrapper = mount(Form, {
        slots: { header: "<div class='custom-header'>Header Content</div>" },
      });

      expect(wrapper.find(".custom-header").exists()).toBeTruthy();
    });

    test("renders body slot always", () => {
      const wrapper = mount(Form, {
        slots: { default: "<p>Body content</p>" },
      });

      const body = wrapper.find(".form__body");

      expect(body.exists()).toBe(true);
      expect(body.text()).toContain("Body content");
    });
  });
});
