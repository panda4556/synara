import { useSyncExternalStore } from "react";
import {
  readAppLanguagePreference,
  readAppLocale,
  setAppLanguage,
  subscribeAppLanguage,
} from "./language";

export function useAppLanguage() {
  const preference = useSyncExternalStore(
    subscribeAppLanguage,
    readAppLanguagePreference,
    () => "system" as const,
  );
  const locale = useSyncExternalStore(subscribeAppLanguage, readAppLocale, () => "en" as const);
  return { preference, locale, setLanguage: setAppLanguage };
}
