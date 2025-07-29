import { useConfigStore } from "./useConfigStore";

describe("useConfigStore", () => {
  /* * * Settings * * */

  test("should set a theme", async () => {
    const store = useConfigStore();

    store.setTheme("dark");
    expect(store.currentTheme).toBe("dark");
    expect(store.getSid).toBe(1);

    store.setTheme("light");
    expect(store.currentTheme).toBe("light");
    expect(store.getSid).toBe(0);
  });

  test("should set a currentTemperatureUnit", async () => {
    const store = useConfigStore();

    store.setTemperatureUnit(2);
    expect(store.currentTemperatureUnit).toBe(2);

    store.setTemperatureUnit(1);
    expect(store.currentTemperatureUnit).toBe(1);
  });

  test("should set a currentMeasurementUnit", async () => {
    const store = useConfigStore();

    store.setMeasurementUnit(2);
    expect(store.currentMeasurementUnit).toBe(2);

    store.setMeasurementUnit(1);
    expect(store.currentMeasurementUnit).toBe(1);
  });

  test("should set a currentTimeUnit", async () => {
    const store = useConfigStore();

    store.setTimeUnit(1);
    expect(store.currentTimeUnit).toBe(1);

    store.setTimeUnit(2);
    expect(store.currentTimeUnit).toBe(2);
  });

  test("should set a currentScreenBrightness", async () => {
    const store = useConfigStore();

    store.setScreenBrightness(90);
    expect(store.currentTimeUnit).toBe(90);

    store.setScreenBrightness(100);
    expect(store.currentTimeUnit).toBe(100);
  });

  /* * * Common * * */

  test("should set currentVersion", () => {
    const store = useConfigStore();

    store.setCurrentPackageVersion("1");
    expect(store.currentPackageVersion).toBe("1");

    store.setCurrentPackageVersion("2");
    expect(store.currentPackageVersion).toBe("2");
  });
});
