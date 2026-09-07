import { readAppLocale, subscribeAppLanguage, type AppLocale } from "./language";
import { installSimplifiedChineseLocalization } from "./zhCN";

let disposeInstalledRuntime: (() => void) | undefined;

/** Apply preferences before React mounts, then switch in place without reloading a session. */
export function installAppLocalization(): () => void {
  if (typeof document === "undefined") return () => {};
  disposeInstalledRuntime?.();
  let currentLocale: AppLocale | undefined;
  let disposed = false;
  let restoreEnglish: (() => void) | undefined;
  const root = document.documentElement;
  const originalLang = root.lang;
  const originalLocale = root.dataset.synaraLocale;
  const applyLanguage = () => {
    const locale = readAppLocale();
    if (locale === currentLocale) return;
    restoreEnglish?.();
    restoreEnglish = undefined;
    currentLocale = locale;
    root.lang = locale;
    root.dataset.synaraLocale = locale;
    if (locale === "zh-CN") restoreEnglish = installSimplifiedChineseLocalization();
  };
  applyLanguage();
  const unsubscribe = subscribeAppLanguage(applyLanguage);
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    unsubscribe();
    restoreEnglish?.();
    restoreEnglish = undefined;
    root.lang = originalLang;
    if (originalLocale === undefined) delete root.dataset.synaraLocale;
    else root.dataset.synaraLocale = originalLocale;
    if (disposeInstalledRuntime === dispose) disposeInstalledRuntime = undefined;
  };
  disposeInstalledRuntime = dispose;
  return dispose;
}

if (import.meta.hot) import.meta.hot.dispose(() => disposeInstalledRuntime?.());
