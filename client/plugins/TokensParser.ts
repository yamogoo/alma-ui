// Portions of this file were developed with the assistance of AI tools (ChatGPT).

import fs from "node:fs/promises";
import path from "node:path";
import { readFileSync } from "node:fs";
import * as _ from "lodash-es";

import { JSONBuilder, type JSONBuilderOptions } from "./JSONBuilder";

export type List<T> = Array<T>;

export interface TokenObj {
  value?: string | number;
  type?: string;
  unit?: string;
  meta: {
    description?: string;
    category?: string;
    build?: {
      web?: {
        exportAsVar?: boolean;
        varName?: string;
        status?: "unused" | "active";
      };
      ios: {
        applyMultiplier?: boolean;
        status?: "unused" | "active";
      };
      android: {
        applyMultiplier?: boolean;
        status?: "unused" | "active";
      };
    };
  };
}

export interface IMap extends TokenObj {
  [key: string]: Value<unknown>;
}

export type Value<T> = string | number | List<T> | T | IMap;

export interface ParseValueOptions {
  convertCase: boolean;
  convertPxToRem: boolean;
  convertToCSSVariables: boolean;
  includeFileName: boolean;
  fileName?: string;
  key?: string;
  unit?: string;
}

export interface JSONToSCSSOptions {
  name: string;
  header: string;
  comment: string;
  options: Partial<ParseValueOptions>;
  mapOptions?: Partial<ParseValueOptions>;
  varsOptions?: Partial<ParseValueOptions>;
}

export interface TokensParserOptions {
  builder?: JSONBuilderOptions;
  source?: string;
  paths?: string[];
  outDir: string;
  cssVarsOutDir?: string;
  build?: string;
  entryFilePath?: string;
  mapOptions?: Partial<ParseValueOptions>;
  varsOptions?: Partial<ParseValueOptions>;
  parseOptions?: Partial<ParseValueOptions>;
  useFileStructureLookup?: boolean;
  useReflectOriginalStructure?: boolean;
}

abstract class Parser {
  abstract parseValue<T>(value: Value<T>, opts: ParseValueOptions): Value<T>;
  abstract parseList(list: List<unknown>, opts: ParseValueOptions): string;
  abstract parseMap<T extends object>(
    map: Value<T>,
    opts: ParseValueOptions,
    path?: string[]
  ): string;
}

export class SCSSParser extends Parser {
  private tokensParser: TokensParser;
  private collectedCssVars: string[] = [];

  constructor(tokensParser: TokensParser) {
    super();
    this.tokensParser = tokensParser;
  }

  private normalizeValue(value: any, opts: ParseValueOptions): string {
    if (_.isString(value) && value.startsWith("{")) {
      const nested = this.tokensParser.parseNestedValue(value, opts);
      return this.normalizeValue(nested, opts);
    }

    if (typeof value === "number") {
      return this.tokensParser.convertNumberByKey(value, opts.key, opts);
    }

    if (typeof value === "string") {
      if (/^\d+(\.\d+)?$/.test(value)) {
        return this.tokensParser.convertNumberByKey(
          Number(value),
          opts.key,
          opts
        );
      }
      return value;
    }

    if (_.isArray(value)) {
      return value.map((v) => this.normalizeValue(v, opts)).join(" ");
    }

    if (_.isPlainObject(value)) {
      if ("value" in value) {
        const localOpts: ParseValueOptions = {
          ...opts,
          key:
            typeof (value as any).type === "string"
              ? (value as any).type
              : opts.key,
          unit:
            Object.prototype.hasOwnProperty.call(value, "unit") &&
            typeof (value as any).unit === "string"
              ? (value as any).unit
              : opts.unit,
        };
        return this.normalizeValue((value as any).value, localOpts);
      }
      return this.parseMap(value as IMap, opts);
    }

    return String(value);
  }

  parseValue(value: any, opts: ParseValueOptions): string {
    return this.normalizeValue(value, opts);
  }

  parseList(list: List<unknown>, opts: ParseValueOptions): string {
    return list.map((v) => this.normalizeValue(v, opts)).join(" ");
  }

  private serializeMeta(
    meta: any,
    opts: ParseValueOptions,
    path: string[] = []
  ): string {
    if (!meta) return "()";

    const entries = Object.entries(meta).map(([k, v]) => {
      if (_.isPlainObject(v)) {
        return `${k}: ${this.serializeMeta(v, opts, [...path, k])}`;
      } else if (_.isArray(v)) {
        const arr = v
          .map((i) =>
            _.isPlainObject(i)
              ? this.serializeMeta(i, opts, [...path, k])
              : `"${i}"`
          )
          .join(", ");
        return `${k}: (\n    ${arr}\n  )`;
      } else {
        return `${k}: "${String(v)}"`;
      }
    });

    return `(\n  ${entries.join(",\n  ")}\n)`;
  }

  parseMap<T extends object>(
    map: Value<T>,
    opts: ParseValueOptions,
    path: string[] = []
  ): string {
    const useReflect =
      this.tokensParser.opts.useReflectOriginalStructure ?? true;

    if (typeof map === "string")
      return this.tokensParser.parseNestedValue(map, opts);
    if (_.isArray(map)) return this.parseList(map, opts);

    if (_.isPlainObject(map)) {
      const keys = Object.keys(map as IMap);
      const hasTokenFields = ["value", "type", "unit", "description"].some(
        (k) => keys.includes(k)
      );

      if (hasTokenFields) {
        const tokenObj = map as IMap;

        // --- exportAsVar support (выполняется всегда) ---
        if (tokenObj.meta?.build?.web?.exportAsVar) {
          const varName =
            tokenObj.meta.build.web.varName ||
            `--${path.join("-") || opts.fileName || "token"}`;

          const localOpts: ParseValueOptions = {
            ...opts,
            key: typeof tokenObj.type === "string" ? tokenObj.type : opts.key,
            unit:
              Object.prototype.hasOwnProperty.call(tokenObj, "unit") &&
              typeof tokenObj.unit === "string"
                ? (tokenObj.unit as string)
                : opts.unit,
          };

          let cssValue: string;
          if (
            _.isPlainObject(tokenObj.value) ||
            Array.isArray(tokenObj.value)
          ) {
            cssValue = this.parseMap(tokenObj.value, localOpts, [
              ...path,
              "value",
            ]);
          } else {
            cssValue = this.normalizeValue(tokenObj.value, localOpts);
          }

          this.collectedCssVars.push(`  ${varName}: ${cssValue};`);
        }

        if (useReflect) {
          const parts: string[] = [];

          // --- value ---
          if (tokenObj.value !== undefined) {
            if (_.isPlainObject(tokenObj.value)) {
              parts.push(
                `value: ${this.parseMap(tokenObj.value, opts, [...path, "value"])}`
              );
            } else if (Array.isArray(tokenObj.value)) {
              parts.push(
                `value: ${this.parseList(tokenObj.value as any[], opts)}`
              );
            } else {
              const localOpts: ParseValueOptions = {
                ...opts,
                key:
                  typeof tokenObj.type === "string" ? tokenObj.type : opts.key,
                unit:
                  Object.prototype.hasOwnProperty.call(tokenObj, "unit") &&
                  typeof tokenObj.unit === "string"
                    ? (tokenObj.unit as string)
                    : opts.unit,
              };
              parts.push(
                `value: ${this.normalizeValue(tokenObj.value, localOpts)}`
              );
            }
          }

          // --- type / unit / description / extra keys ---
          for (const field of ["type", "unit", "description"]) {
            if (tokenObj[field] !== undefined) {
              let parsed = this.normalizeValue(tokenObj[field], opts);
              parsed = `"${parsed}"`;
              parts.push(`${field}: ${parsed}`);
            }
          }

          const extraKeys = keys.filter(
            (k) => !["value", "type", "unit", "description", "meta"].includes(k)
          );
          for (const extraKey of extraKeys) {
            const kebabKey = opts.convertCase
              ? this.tokensParser.toKebabCase(extraKey)
              : extraKey;
            const value = this.parseMap(
              (map as IMap)[extraKey] as Value<object>,
              opts,
              [...path, kebabKey]
            );
            parts.push(`${kebabKey}: ${value}`);
          }

          return `(\n  ${parts.join(",\n  ")}\n)`;
        } else {
          // --- Minimal structure: value only, но сохраняем вложенные ключи ---
          if (tokenObj.value === undefined) {
            const nestedParts: string[] = [];
            const subKeys = keys.filter(
              (k) => !["type", "unit", "meta", "description"].includes(k)
            );
            for (const subKey of subKeys) {
              const kebabKey = opts.convertCase
                ? this.tokensParser.toKebabCase(subKey)
                : subKey;
              const value = this.parseMap((map as IMap)[subKey] as any, opts, [
                ...path,
                kebabKey,
              ]);
              nestedParts.push(`${kebabKey}: ${value}`);
            }
            return `(\n  ${nestedParts.join(",\n  ")}\n)`;
          }

          const localOpts: ParseValueOptions = {
            ...opts,
            key: typeof tokenObj.type === "string" ? tokenObj.type : opts.key,
            unit:
              Object.prototype.hasOwnProperty.call(tokenObj, "unit") &&
              typeof tokenObj.unit === "string"
                ? (tokenObj.unit as string)
                : opts.unit,
          };

          if (_.isPlainObject(tokenObj.value)) {
            return this.parseMap(tokenObj.value, localOpts, [...path, "value"]);
          } else if (Array.isArray(tokenObj.value)) {
            return this.parseList(tokenObj.value as any[], localOpts);
          } else {
            return this.normalizeValue(tokenObj.value, localOpts);
          }
        }
      }

      // --- Plain object без токенов ---
      const nestedParts: string[] = [];
      for (const [k, v] of Object.entries(map)) {
        if (!this.tokensParser.isKeyValidated(k)) continue;
        const kebabKey = opts.convertCase
          ? this.tokensParser.toKebabCase(k)
          : k;
        const value = this.parseMap(v as any, opts, [...path, kebabKey]);
        nestedParts.push(`${kebabKey}: ${value}`);
      }
      return `(\n  ${nestedParts.join(",\n  ")}\n)`;
    }

    return String(map);
  }

  public getCssVarsBlock(): string {
    if (this.collectedCssVars.length === 0) return "";
    return `\n:root {\n${this.collectedCssVars.join("\n")}\n}\n`;
  }
}

export class TokensParser {
  parser: Parser;
  opts: TokensParserOptions;
  defaultParseOptions: ParseValueOptions;
  defaultMapOptions: ParseValueOptions;
  defaultVarsOptions: ParseValueOptions;
  fileCache: Record<string, any> = {};

  constructor(opts: TokensParserOptions) {
    this.opts = {
      ...opts,
      builder: {
        format: "json",
        outDir: opts.builder?.outDir ?? opts.source,
        paths: opts.builder?.paths ?? opts.paths ?? ["."],
        includeRootDirName: opts.builder?.includeRootDirName ?? false,
        useTokensInSeparateFiles:
          opts.builder?.useTokensInSeparateFiles ?? true,
      },
    };
    this.parser = new SCSSParser(this);

    this.defaultParseOptions = {
      convertCase: false,
      convertPxToRem: false,
      convertToCSSVariables: false,
      includeFileName: false,
      ...opts.parseOptions,
    };

    this.defaultMapOptions = {
      ...this.defaultParseOptions,
      ...opts.mapOptions,
    };

    this.defaultVarsOptions = {
      ...this.defaultParseOptions,
      ...opts.varsOptions,
    };
  }

  async buildAndParse() {
    const builder = new JSONBuilder(this.opts.builder!);
    await builder.build();

    if (this.opts.builder) {
      const builder = new JSONBuilder(this.opts.builder);
      await builder.build();
    }

    const { source, outDir } = this.opts;
    if (source && outDir) {
      await this.listDir(source, outDir);
    }

    await this.generateEntryFile();
  }

  isKeyValidated(key: string): boolean {
    return /^[^$:].*/.test(key);
  }

  toKebabCase(key: string): string {
    return key
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2")
      .toLowerCase();
  }

  valuePxToRem(value: number): string {
    return `px2rem(${value}px)`;
  }

  convertNumberByKey(
    value: number,
    key?: string,
    opts?: ParseValueOptions
  ): string {
    if (opts && Object.prototype.hasOwnProperty.call(opts, "unit")) {
      const unitVal = (opts as any).unit;

      if (unitVal === "") {
        return `${value}`;
      }

      if (typeof unitVal === "string") {
        return `${value}${unitVal}`;
      }
    }

    if (["font-size", "line-height", "letter-spacing"].includes(key || "")) {
      return `${value}em`;
    }

    return opts?.convertPxToRem ? this.valuePxToRem(value) : `${value}px`;
  }

  normalizeValue(value: any, opts: ParseValueOptions): string {
    if (typeof value === "number") {
      return this.convertNumberByKey(value, opts.key, opts);
    }

    if (typeof value === "string") {
      if (value.startsWith("{")) {
        const nested = this.parseNestedValue(value, opts);
        return this.normalizeValue(nested, opts);
      }

      if (/^\d+(\.\d+)?$/.test(value)) {
        return this.convertNumberByKey(Number(value), opts.key, opts);
      }

      if (/^\d+(\.\d+)?(px|rem|em|%)$/.test(value)) {
        return value;
      }

      return value;
    }

    if (Array.isArray(value)) {
      return value.map((v) => this.normalizeValue(v, opts)).join(" ");
    }

    if (_.isPlainObject(value) && "value" in value) {
      const localOpts: ParseValueOptions = {
        ...opts,
        key:
          typeof (value as any).type === "string"
            ? (value as any).type
            : opts.key,
        unit:
          Object.prototype.hasOwnProperty.call(value, "unit") &&
          typeof (value as any).unit === "string"
            ? (value as any).unit
            : opts.unit,
      };
      return this.normalizeValue((value as any).value, localOpts);
    }

    return String(value);
  }

  parseNestedValue(
    value: string,
    opts: ParseValueOptions,
    depth = 0,
    visited = new Set<string>()
  ): any {
    if (depth > 5) return value;
    const regex = /{([^}]+)}/g;
    let result = value;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(result)) !== null) {
      const fullMatch = match[0];
      const pathStr = match[1];

      if (visited.has(fullMatch)) {
        console.warn(`⚠️ Circular reference detected: ${fullMatch}`);
        continue;
      }

      visited.add(fullMatch);

      const pathParts = pathStr.split(".");
      const fileName = pathParts.shift();
      if (!fileName) continue;

      let json;
      if (this.fileCache[fileName]) {
        json = this.fileCache[fileName];
      } else {
        const paths = this.opts.paths ?? ["."];
        let fileFound = false;
        for (const p of paths) {
          const filePath = `${p}/${fileName}.json`;
          try {
            json = JSON.parse(readFileSync(filePath, "utf-8"));
            this.fileCache[fileName] = json;
            fileFound = true;
            break;
          } catch {}
        }

        if (!fileFound) {
          console.warn(
            `⚠️ Token file "${fileName}.json" not found in paths: ${paths.join(", ")}`
          );
          visited.delete(fullMatch);
          continue;
        }
      }

      let nestedValue = pathParts.reduce((acc, key) => acc?.[key], json);
      if (nestedValue === undefined) {
        console.warn(
          `⚠️ Token path "${pathStr}" not found in file "${fileName}"`
        );
        visited.delete(fullMatch);
        continue;
      }

      if (typeof nestedValue === "string" && nestedValue.startsWith("{")) {
        nestedValue = this.parseNestedValue(
          nestedValue,
          opts,
          depth + 1,
          visited
        );
      }

      result = result.replace(fullMatch, nestedValue);
      visited.delete(fullMatch);
    }

    return result;
  }

  flattenToCSSVariables(
    obj: any,
    path: string[] = [],
    result: string[] = [],
    opts?: ParseValueOptions
  ): string[] {
    const useOpts = opts ?? this.defaultVarsOptions;
    for (const [key, value] of Object.entries(obj)) {
      const newKey = useOpts.convertCase ? this.toKebabCase(key) : key;
      const newPath = [...path, newKey];

      if (_.isPlainObject(value)) {
        this.flattenToCSSVariables(value, newPath, result, useOpts);
      } else {
        const flatPath =
          useOpts.includeFileName && useOpts.fileName
            ? [
                useOpts.convertCase
                  ? this.toKebabCase(useOpts.fileName!)
                  : useOpts.fileName!,
                ...newPath,
              ]
            : newPath;

        const cssVarName = `--${flatPath.join("-")}`;
        const finalValue =
          value !== undefined
            ? this.parser.parseValue(value, useOpts)
            : "initial";
        result.push(`${cssVarName}: ${finalValue};`);
      }
    }
    return result;
  }

  // --- JSONToSCSS ---
  async JSONToSCSS(
    inputPath: string,
    outputDir: string,
    outputFileName: string,
    opts?: Partial<JSONToSCSSOptions>
  ): Promise<void> {
    const {
      header = "// Generated by tokensParser. ‼️ DO NOT MODIFY THIS FILE ‼️ /\n",
      name = "",
      comment = "",
      options,
      mapOptions,
      varsOptions,
    } = { ...(opts || {}) } as JSONToSCSSOptions;

    const baseOptions: ParseValueOptions = {
      ...this.defaultParseOptions,
      fileName: options?.fileName || "",
      ...(options || {}),
    };

    const parseMapOptions: ParseValueOptions = {
      ...baseOptions,
      ...(mapOptions || {}),
    };

    const parseVarsOptions: ParseValueOptions = {
      ...baseOptions,
      ...(varsOptions || {}),
    };

    const outputPath = `${outputDir}/${outputFileName}`;

    try {
      const isOutputExists = await fs
        .access(outputDir)
        .then(() => true)
        .catch(() => false);
      if (!isOutputExists) await fs.mkdir(outputDir, { recursive: true });

      const data = await fs.readFile(inputPath, "utf-8");
      const json = JSON.parse(data);

      let content = `${header}\n${comment}\n`;

      const topLevelKey =
        parseMapOptions.includeFileName && parseMapOptions.fileName
          ? parseMapOptions.convertCase
            ? this.toKebabCase(parseMapOptions.fileName)
            : parseMapOptions.fileName
          : "";

      const rootMap =
        parseMapOptions.includeFileName && parseMapOptions.fileName
          ? { [topLevelKey]: json }
          : json;

      // --- SCSS maps ---
      for (const [k, v] of Object.entries(rootMap)) {
        const kebabKey = parseMapOptions.convertCase ? this.toKebabCase(k) : k;
        const keyLine = `$${kebabKey}:`;
        const map = v as IMap;
        const str = `${keyLine}${this.parser.parseMap(map, parseMapOptions)};`;
        content += `${str}\n`;
      }

      // --- CSS vars from exportAsVar ---
      if (this.parser instanceof SCSSParser) {
        const cssVarsBlock = this.parser.getCssVarsBlock();
        if (cssVarsBlock) {
          content += cssVarsBlock;
        }
      }

      // --- All to CSS vars" (legacy)
      if (parseVarsOptions.convertToCSSVariables) {
        const flatVars = this.flattenToCSSVariables(
          json,
          [],
          [],
          parseVarsOptions
        );
        const cssContent = `:root {\n  ${flatVars.join("\n  ")}\n}`;
        if (this.opts.cssVarsOutDir) {
          const cssOutPath = `${this.opts.cssVarsOutDir}/${parseVarsOptions.fileName}.css`;
          await fs.writeFile(cssOutPath, cssContent);
          console.log(`CSS variables written to ${cssOutPath}`);
        } else {
          content += `\n${cssContent}\n`;
        }
      }

      // --- write file ---
      await fs.writeFile(outputPath, content);
      console.log(`${name} parsed to ${outputPath}`);
    } catch (err) {
      console.error(err);
    }
  }

  private async listDir(source: string, output: string) {
    try {
      const fileNames = await fs.readdir(source);
      for (const fileName of fileNames) {
        if (/^(?=.).*.json$/.test(fileName)) {
          await this.resolveAndSaveJson(`${source}/${fileName}`, fileName);
          await this.JSONToSCSS(
            `${this.opts.build}/${fileName}`,
            `${output}`,
            `_${fileName.replace(".json", ".scss")}`,
            {
              options: {
                ...this.defaultParseOptions,
                fileName: fileName.replace(/\.json$/, ""),
              },
              mapOptions: this.defaultMapOptions,
              varsOptions: this.defaultVarsOptions,
              name: fileName.replace(".json", ""),
            }
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  private async resolveAndSaveJson(
    inputPath: string,
    fileName: string
  ): Promise<void> {
    if (!this.opts.build) return;
    const unresolvedTokens: string[] = [];
    try {
      const jsonRaw = await fs.readFile(inputPath, "utf-8");
      const json = JSON.parse(jsonRaw);

      const resolveRecursive = (
        obj: any,
        opts: ParseValueOptions,
        depth = 0
      ): any => {
        if (_.isString(obj)) {
          const regex = /{([^}]+)}/g;
          let result: any = obj;
          let match: RegExpExecArray | null;
          while ((match = regex.exec(obj)) !== null) {
            const fullMatch = match[0];
            const pathStr = match[1];
            const pathParts = pathStr.split(".");
            const fileName = pathParts.shift();
            if (!fileName) continue;

            try {
              let json: any;

              if (this.fileCache[fileName]) {
                json = this.fileCache[fileName];
              } else {
                const paths = this.opts.paths ?? ["."];
                let fileFound = false;

                for (const p of paths) {
                  const filePath = `${p}/${fileName}.json`;
                  try {
                    const file = readFileSync(filePath, "utf-8");
                    json = JSON.parse(file);
                    this.fileCache[fileName] = json;
                    fileFound = true;
                    break;
                  } catch {
                    continue;
                  }
                }

                if (!fileFound) {
                  unresolvedTokens.push(fullMatch);
                  continue;
                }
              }

              let nestedValue = pathParts.reduce(
                (acc, key) => acc?.[key],
                json
              );
              if (nestedValue === undefined) {
                unresolvedTokens.push(fullMatch);
                continue;
              }

              nestedValue = resolveRecursive(nestedValue, opts, depth + 1);
              if (obj === fullMatch) return nestedValue;

              result = result.replace(fullMatch, nestedValue);
            } catch {
              unresolvedTokens.push(fullMatch);
            }
          }
          return result;
        }

        if (_.isArray(obj))
          return obj.map((v) => resolveRecursive(v, opts, depth));
        if (_.isPlainObject(obj))
          return Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [
              k,
              resolveRecursive(v, opts, depth),
            ])
          );
        return obj;
      };

      const resolvedJson = resolveRecursive(json, {
        ...this.defaultParseOptions,
        fileName: fileName.replace(/\.json$/, ""),
      });

      const buildDir = this.opts.build!;
      if (
        !(await fs
          .access(buildDir)
          .then(() => true)
          .catch(() => false))
      )
        await fs.mkdir(buildDir, { recursive: true });
      const buildPath = `${buildDir}/${fileName}`;
      await fs.writeFile(
        buildPath,
        JSON.stringify(resolvedJson, null, 2),
        "utf-8"
      );

      if (unresolvedTokens.length > 0) {
        const logPath = `${buildDir}/unresolved-tokens.log`;
        const uniqueTokens = [...new Set(unresolvedTokens)];
        await fs.writeFile(logPath, uniqueTokens.join("\n"), "utf-8");
        console.warn("Unresolved tokens saved to", logPath);
      }
    } catch (err) {
      console.error(err);
    }
  }

  private async generateEntryFile() {
    const { build, entryFilePath } = this.opts;
    if (!build || !entryFilePath) return;

    try {
      const files = await fs.readdir(build);
      const jsonFiles = files.filter((f) => f.endsWith(".json"));

      const relativeImportPath = path.relative(
        path.dirname(entryFilePath),
        build
      );

      const imports = jsonFiles
        .map((file) => {
          const name = file.replace(".json", "");
          let importPath = path
            .join(relativeImportPath, file)
            .replace(/\\/g, "/");
          if (!importPath.startsWith(".") && !importPath.startsWith("/"))
            importPath = "./" + importPath;
          return `import ${name} from "${importPath}";`;
        })
        .join("\n");

      const spreadList = jsonFiles
        .map((file) => file.replace(".json", ""))
        .join(", ");

      const content = `${imports}\n\nconst module = {\n  ${spreadList
        .split(", ")
        .map((name) => `...${name}`)
        .join(",\n  ")}\n};\n\nexport default module;\n`;

      const entryDir = path.dirname(entryFilePath);
      await fs.mkdir(entryDir, { recursive: true });
      await fs.writeFile(entryFilePath, content, "utf-8");
      console.log(`✅ TypeScript entry file generated at ${entryFilePath}`);
    } catch (err) {
      console.error("❌ Failed to generate TypeScript entry file", err);
    }
  }

  // --- Resolve links in file structure --- //

  private async resolveTokenPathRecursive(pathStr: string): Promise<any> {
    const pathParts = pathStr.split(".");

    const tryResolve = async (
      currentParts: string[],
      currentDir: string
    ): Promise<any> => {
      if (currentParts.length === 0) return undefined;

      const fileName = `${currentParts[0]}.json`;
      const filePath = path.join(currentDir, fileName);
      if (await this.isFile(filePath)) {
        const content = JSON.parse(await fs.readFile(filePath, "utf-8"));
        if (currentParts.length === 1) return content;
        return this.getNestedValue(content, currentParts.slice(1));
      }

      const dirPath = path.join(currentDir, currentParts[0]);
      if (await this.isDir(dirPath)) {
        return tryResolve(currentParts.slice(1), dirPath);
      }

      for (let i = currentParts.length; i > 0; i--) {
        const joinedFile = path.join(
          currentDir,
          currentParts.slice(0, i).join("/") + ".json"
        );
        if (await this.isFile(joinedFile)) {
          const content = JSON.parse(await fs.readFile(joinedFile, "utf-8"));
          return this.getNestedValue(content, currentParts.slice(i));
        }
      }

      return undefined;
    };

    for (const rootPath of this.opts.paths ?? ["./"]) {
      const absRoot = path.resolve(rootPath);
      const res = await tryResolve(pathParts, absRoot);
      if (res !== undefined) return res;
    }

    console.warn(`⚠️ Token path "${pathStr}" could not be resolved.`);
    return undefined;
  }

  private async isFile(p: string): Promise<boolean> {
    try {
      return (await fs.stat(p)).isFile();
    } catch {
      return false;
    }
  }

  private async isDir(p: string): Promise<boolean> {
    try {
      return (await fs.stat(p)).isDirectory();
    } catch {
      return false;
    }
  }

  private getNestedValue(obj: any, keys: string[]): any {
    return keys.reduce((acc, k) => acc?.[k], obj);
  }
}
