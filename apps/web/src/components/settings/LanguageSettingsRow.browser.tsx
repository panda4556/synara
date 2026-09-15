import "../../index.css";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import {
  APP_LANGUAGE_STORAGE_KEY,
  readAppLanguagePreference,
  setAppLanguage,
} from "~/localization/language";
import { installAppLocalization } from "~/localization/runtime";
import { settingRowAnchorId } from "~/settingsNavigation";
import { LanguageSettingsRow } from "./LanguageSettingsRow";

let dispose: (() => void) | undefined;
let fixtures: HTMLDivElement;

beforeEach(() => {
  vi.spyOn(navigator, "languages", "get").mockReturnValue(["en-US"]);
  setAppLanguage("system");
  fixtures = document.createElement("div");
  fixtures.innerHTML = `
    <h2 data-test="heading">Settings</h2>
    <span data-test="counter">3 threads</span>
    <button data-test="action" title="New chat" aria-label="New chat">New chat</button>
    <input data-test="input" placeholder="New chat" value="New chat" />
    <input data-test="submit" type="submit" value="New chat" />
    <div class="chat-markdown">New chat</div>
    <div data-message-id="message">New chat</div>
    <pre>New chat</pre><code>New chat</code><div class="xterm">New chat</div>
    <div contenteditable="true">New chat</div>
    <div contenteditable="plaintext-only">New chat</div>
    <div data-zh-cn-skip>New chat</div>
  `;
  document.body.append(fixtures);
  dispose = installAppLocalization();
});

afterEach(() => {
  dispose?.();
  dispose = undefined;
  fixtures.remove();
  setAppLanguage("system");
  window.localStorage.removeItem(APP_LANGUAGE_STORAGE_KEY);
  vi.restoreAllMocks();
});

function element<T extends Element = HTMLElement>(selector: string): T {
  const found = fixtures.querySelector<T>(selector);
  if (!found) throw new Error(`Missing test fixture: ${selector}`);
  return found;
}

describe("interface language", () => {
  it("translates v0.8.4 controls without rewriting editor drafts or password values", async () => {
    const panel = document.createElement("section");
    panel.innerHTML = `
      <h2>Welcome to Synara</h2>
      <button>Revert all changes</button>
      <div data-zh-cn-skip><span>Settings</span><span title="New chat">Saved logins</span></div>
      <input type="password" value="Settings" aria-label="Master password" />
      <input readonly value="New chat" aria-label="Revealed password" />
    `;
    fixtures.append(panel);
    setAppLanguage("zh-CN");
    await vi.waitFor(() => expect(panel.querySelector("h2")?.textContent).toBe("欢迎使用 Synara"));
    expect(panel.querySelector("button")?.textContent).toBe("撤销所有更改");
    expect(panel.querySelector("[data-zh-cn-skip]")?.textContent).toBe("SettingsSaved logins");
    expect(panel.querySelector("span[title]")?.getAttribute("title")).toBe("New chat");
    expect(panel.querySelector<HTMLInputElement>("input[type=password]")?.value).toBe("Settings");
    expect(panel.querySelector<HTMLInputElement>("input[readonly]")?.value).toBe("New chat");
    setAppLanguage("en");
    expect(panel.querySelector("h2")?.textContent).toBe("Welcome to Synara");
    expect(panel.querySelector("button")?.textContent).toBe("Revert all changes");
  });

  it("uses a saved language on startup and tolerates repeated runtime cleanup", () => {
    dispose?.();
    window.localStorage.setItem(APP_LANGUAGE_STORAGE_KEY, "zh-CN");
    const previousDispose = installAppLocalization();
    expect(element("[data-test=heading]").textContent).toBe("设置");
    dispose = installAppLocalization();
    previousDispose();
    expect(document.documentElement.lang).toBe("zh-CN");
    setAppLanguage("en");
    expect(element("[data-test=heading]").textContent).toBe("Settings");
  });

  it("switches both ways through Settings, persists, and leaves user content intact", async () => {
    const mounted = await render(<LanguageSettingsRow />);
    const selector = mounted.getByRole("combobox", { name: "Language / 语言" });
    await expect.element(selector).toHaveTextContent("System default");
    const input = element<HTMLInputElement>("[data-test=input]");
    input.value = "New chat — my unsent draft";
    await selector.click();
    await page.getByRole("option", { name: "简体中文", exact: true }).click();

    await expect.element(selector).toHaveTextContent("简体中文");
    expect(window.localStorage.getItem(APP_LANGUAGE_STORAGE_KEY)).toBe("zh-CN");
    expect(document.documentElement.lang).toBe("zh-CN");
    await vi.waitFor(() => expect(element("[data-test=heading]").textContent).toBe("设置"));
    expect(element("[data-test=action]").getAttribute("aria-label")).toBe("新建对话");
    expect(input.placeholder).toBe("新建对话");
    expect(element<HTMLInputElement>("[data-test=submit]").value).toBe("新建对话");
    for (const protectedNode of fixtures.querySelectorAll(
      ".chat-markdown,[data-message-id],pre,code,.xterm,[contenteditable],[data-zh-cn-skip]",
    )) {
      expect(protectedNode.textContent).toBe("New chat");
    }
    expect(input.value).toBe("New chat — my unsent draft");

    // Simulate React updating an existing text node and attribute while Chinese is active.
    element("[data-test=counter]").firstChild!.textContent = "12 threads";
    element("[data-test=action]").setAttribute("title", "Settings");
    await vi.waitFor(() => expect(element("[data-test=counter]").textContent).toBe("12 个任务"));

    await selector.click();
    await expect.element(page.getByRole("option", { name: "English", exact: true })).toBeVisible();
    await page.getByRole("option", { name: "English", exact: true }).click();
    await expect.element(selector).toHaveTextContent("English");
    expect(document.documentElement.lang).toBe("en");
    expect(element("[data-test=heading]").textContent).toBe("Settings");
    expect(element("[data-test=counter]").textContent).toBe("12 threads");
    expect(element("[data-test=action]").getAttribute("title")).toBe("Settings");
    expect(element("[data-test=action]").getAttribute("aria-label")).toBe("New chat");
    expect(input.placeholder).toBe("New chat");
    expect(element<HTMLInputElement>("[data-test=submit]").value).toBe("New chat");
    expect(input.value).toBe("New chat — my unsent draft");
    expect(document.getElementById(settingRowAnchorId("Language"))).not.toBeNull();

    await mounted.unmount();
    dispose?.();
    dispose = installAppLocalization();
    const remounted = await render(<LanguageSettingsRow />);
    await expect.element(remounted.getByRole("combobox")).toHaveTextContent("English");
    await remounted.unmount();
  });

  it("follows system changes only in automatic mode and resets to the system language", async () => {
    const mounted = await render(<LanguageSettingsRow />);
    vi.spyOn(navigator, "languages", "get").mockReturnValue(["zh-CN"]);
    window.dispatchEvent(new Event("languagechange"));
    await expect.element(mounted.getByRole("combobox")).toHaveTextContent("跟随系统");
    expect(document.documentElement.lang).toBe("zh-CN");
    setAppLanguage("en");
    window.dispatchEvent(new Event("languagechange"));
    await expect.element(mounted.getByRole("combobox")).toHaveTextContent("English");
    expect(document.documentElement.lang).toBe("en");
    await mounted.getByRole("button", { name: "Reset language to system default" }).click();
    await expect.element(mounted.getByRole("combobox")).toHaveTextContent("跟随系统");
    expect(readAppLanguagePreference()).toBe("system");
    await mounted.unmount();
  });

  it("synchronizes other windows and storage clear, but ignores session storage", async () => {
    const mounted = await render(<LanguageSettingsRow />);
    window.localStorage.setItem(APP_LANGUAGE_STORAGE_KEY, "zh-CN");
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: APP_LANGUAGE_STORAGE_KEY,
        storageArea: window.sessionStorage,
      }),
    );
    expect(document.documentElement.lang).toBe("en");
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: APP_LANGUAGE_STORAGE_KEY,
        storageArea: window.localStorage,
      }),
    );
    await expect.element(mounted.getByRole("combobox")).toHaveTextContent("简体中文");
    expect(document.documentElement.lang).toBe("zh-CN");
    window.localStorage.removeItem(APP_LANGUAGE_STORAGE_KEY);
    window.dispatchEvent(
      new StorageEvent("storage", { key: null, storageArea: window.localStorage }),
    );
    await expect.element(mounted.getByRole("combobox")).toHaveTextContent("System default");
    expect(document.documentElement.lang).toBe("en");
    await mounted.unmount();
  });

  it("restores detached nodes and does not translate queued updates after switching off", async () => {
    setAppLanguage("zh-CN");
    const counter = element("[data-test=counter]");
    await vi.waitFor(() => expect(counter.textContent).toBe("3 个任务"));
    counter.remove();
    const heading = element("[data-test=heading]");
    heading.firstChild!.textContent = "New chat";
    setAppLanguage("en");
    fixtures.append(counter);
    // Drain mutation callbacks and queued translation microtasks before asserting.
    await new Promise<void>((resolve) => window.setTimeout(resolve, 0));
    expect(counter.textContent).toBe("3 threads");
    expect(heading.textContent).toBe("New chat");
    setAppLanguage("zh-CN");
    expect(heading.textContent).toBe("新建对话");
    setAppLanguage("en");
    expect(heading.textContent).toBe("New chat");
  });
});
