import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  APP_LANGUAGE_STORAGE_KEY,
  isAppLanguage,
  readAppLanguagePreference,
  readAppLocale,
  resolveAppLocale,
  setAppLanguage,
  subscribeAppLanguage,
} from "./language";

describe("resolveAppLocale", () => {
  it.each(["zh", "zh-CN", "zh-SG", "zh-Hans", "zh-Hans-CN", "zh_CN"])(
    "uses Simplified Chinese for system language %s",
    (language) => expect(resolveAppLocale("system", [language])).toBe("zh-CN"),
  );

  it.each(["en", "en-US", "fr-FR", "zh-TW", "zh-HK", "zh-MO", "zh-Hant-CN"])(
    "falls back to English for unsupported system language %s",
    (language) => expect(resolveAppLocale("system", [language])).toBe("en"),
  );

  it("uses the first system language and allows an explicit override", () => {
    expect(resolveAppLocale("system", ["en-US", "zh-CN"])).toBe("en");
    expect(resolveAppLocale("system", [])).toBe("en");
    expect(resolveAppLocale("en", ["zh-CN"])).toBe("en");
    expect(resolveAppLocale("zh-CN", ["en-US"])).toBe("zh-CN");
  });
});

describe("language preferences", () => {
  const items = new Map<string, string>();
  const storage = {
    getItem: vi.fn((key: string) => items.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      items.set(key, value);
    }),
  };

  beforeEach(() => {
    vi.stubGlobal("window", Object.assign(new EventTarget(), { localStorage: storage }));
    vi.stubGlobal("navigator", { languages: ["en-US"] });
    setAppLanguage("system");
    items.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("defaults safely when the preference is absent, invalid, or from a newer build", () => {
    expect(readAppLanguagePreference()).toBe("system");
    for (const value of ["", "fr", "en-US", "{broken", "null"]) {
      items.set(APP_LANGUAGE_STORAGE_KEY, value);
      expect(readAppLanguagePreference()).toBe("system");
      expect(isAppLanguage(value)).toBe(false);
    }
  });

  it("persists an explicit choice and notifies same-window subscribers", () => {
    const onChange = vi.fn();
    const unsubscribe = subscribeAppLanguage(onChange);
    setAppLanguage("zh-CN");
    expect(items.get(APP_LANGUAGE_STORAGE_KEY)).toBe("zh-CN");
    expect(readAppLanguagePreference()).toBe("zh-CN");
    expect(readAppLocale()).toBe("zh-CN");
    expect(onChange).toHaveBeenCalledOnce();
    unsubscribe();
    setAppLanguage("en");
    expect(onChange).toHaveBeenCalledOnce();
  });

  it("can switch even when local storage cannot be written", () => {
    storage.setItem.mockImplementationOnce(() => {
      throw new Error("Quota exceeded");
    });
    setAppLanguage("zh-CN");
    expect(readAppLocale()).toBe("zh-CN");
    // A subsequent successful write recovers persistent storage.
    setAppLanguage("en");
    expect(items.get(APP_LANGUAGE_STORAGE_KEY)).toBe("en");
  });

  it("does not fail bootstrap when storage access is blocked", () => {
    storage.getItem.mockImplementationOnce(() => {
      throw new Error("SecurityError");
    });
    expect(readAppLanguagePreference()).toBe("system");
  });
});
