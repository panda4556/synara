import { describe, expect, it } from "vitest";
import { settingRowAnchorId } from "./settingsNavigation";
import { rankSettingsSearchEntries, settingsSearchEntryTarget } from "./settingsSearchIndex";

describe("language settings search", () => {
  it.each(["Language", "English", "中文", "语言", "跟随系统"])(
    "finds a stable language-row target for %s",
    (query) => {
      const result = rankSettingsSearchEntries(query, 10).find(
        (entry) => entry.id === "general:language",
      );
      expect(result).toBeDefined();
      expect(settingsSearchEntryTarget(result!)).toBe(settingRowAnchorId("Language"));
    },
  );
});
