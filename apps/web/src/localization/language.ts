// Kept independent of React/app stores so bootstrap can apply the saved language before rendering.
export const APP_LANGUAGE_STORAGE_KEY = "synara:ui-language";
const APP_LANGUAGE_CHANGE_EVENT = "synara:ui-language-change";

export const APP_LANGUAGES = ["system", "en", "zh-CN"] as const;
export type AppLanguagePreference = (typeof APP_LANGUAGES)[number];
export type AppLocale = Exclude<AppLanguagePreference, "system">;

// Still allow switching for this window when storage is disabled or full.
let volatilePreference: AppLanguagePreference | null = null;

export function isAppLanguage(value: unknown): value is AppLanguagePreference {
  return value === "system" || value === "en" || value === "zh-CN";
}

export function readAppLanguagePreference(): AppLanguagePreference {
  if (volatilePreference !== null) return volatilePreference;
  try {
    const value = window.localStorage.getItem(APP_LANGUAGE_STORAGE_KEY);
    return isAppLanguage(value) ? value : "system";
  } catch {
    return "system";
  }
}

export function resolveAppLocale(
  preference: AppLanguagePreference,
  systemLanguages: readonly string[],
): AppLocale {
  if (preference !== "system") return preference;
  // Follow the primary OS/browser language, not a secondary language on an English system.
  const language = (systemLanguages[0] ?? "en").toLowerCase().replaceAll("_", "-");
  const parts = language.split("-");
  if (parts[0] !== "zh") return "en";
  if (parts.includes("hans")) return "zh-CN";
  if (parts.some((part) => ["hant", "tw", "hk", "mo"].includes(part))) return "en";
  return "zh-CN";
}

export function readAppLocale(): AppLocale {
  const languages = typeof navigator === "undefined" ? [] : navigator.languages;
  return resolveAppLocale(readAppLanguagePreference(), languages);
}

export function setAppLanguage(preference: AppLanguagePreference): void {
  if (!isAppLanguage(preference)) return;
  volatilePreference = preference;
  try {
    window.localStorage.setItem(APP_LANGUAGE_STORAGE_KEY, preference);
    volatilePreference = null;
  } catch {
    // The in-memory choice remains usable even if it cannot survive a restart.
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(APP_LANGUAGE_CHANGE_EVENT));
  }
}

export function subscribeAppLanguage(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== APP_LANGUAGE_STORAGE_KEY) return;
    try {
      if (event.storageArea !== null && event.storageArea !== window.localStorage) return;
    } catch {
      return;
    }
    volatilePreference = null;
    onChange();
  };
  window.addEventListener(APP_LANGUAGE_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  window.addEventListener("languagechange", onChange);
  return () => {
    window.removeEventListener(APP_LANGUAGE_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("languagechange", onChange);
  };
}
