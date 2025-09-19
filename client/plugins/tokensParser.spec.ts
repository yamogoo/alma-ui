import { describe, test, expect, beforeEach } from "vitest";
import { TokensParser, SCSSParser } from "./TokensParser";

describe("TokensParser helpers", () => {
  let parser: TokensParser;

  beforeEach(() => {
    parser = new TokensParser({
      outDir: "out",
      build: "build",
    });
  });

  test("toKebabCase should convert camelCase to kebab-case", () => {
    expect(parser.toKebabCase("fontSizeLarge")).toBe("font-size-large");
  });

  test("convertNumberByKey should append px by default", () => {
    expect(parser.convertNumberByKey(16, "width")).toBe("16px");
  });

  test("convertNumberByKey should append em for font-size", () => {
    expect(parser.convertNumberByKey(1.5, "font-size")).toBe("1.5em");
  });

  test("convertNumberByKey should respect unit override", () => {
    expect(
      parser.convertNumberByKey(20, "custom", { unit: "rem" } as any)
    ).toBe("20rem");
  });

  test("normalizeValue should convert numeric string", () => {
    expect(
      parser.normalizeValue("24", { convertPxToRem: false, key: "width" })
    ).toBe("24px");
  });
});

describe("SCSSParser parseMap", () => {
  let tokensParser: TokensParser;
  let scssParser: SCSSParser;

  beforeEach(() => {
    tokensParser = new TokensParser({
      outDir: "out",
      build: "build",
      mapOptions: { convertToCSSVariables: true },
    });
    scssParser = new SCSSParser(tokensParser);
  });

  test("should generate SCSS map and CSS variable for simple token", () => {
    const token = {
      value: 16,
      type: "font-size",
      meta: {
        build: { web: { exportAsVar: true } },
      },
    };

    const result = scssParser.parseMap(token, {
      convertPxToRem: false,
      fileName: "font",
    });

    expect(result).toContain("value: 16em");
    const cssBlock = scssParser.getCssVarsBlock();
    expect(cssBlock).toContain("--font");
  });

  test("should respect excludeCSSVariables", () => {
    const tp = new TokensParser({
      outDir: "out",
      build: "build",
      mapOptions: {
        convertToCSSVariables: true,
        excludeCSSVariables: ["font.json"],
      },
    });
    const sp = new SCSSParser(tp);

    const token = {
      value: 10,
      type: "line-height",
      meta: {
        build: { web: { exportAsVar: true } },
      },
    };

    sp.parseMap(token, {
      convertPxToRem: false,
      fileName: "font",
    });

    expect(sp.getCssVarsBlock()).not.toContain("--font");
  });
});
