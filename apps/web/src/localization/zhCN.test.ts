// FILE: zhCN.test.ts
// Purpose: Protects the localized build's exact terms, dynamic counters, and content boundaries.

import { describe, expect, it } from "vitest";

import { translateSimplifiedChineseText } from "./zhCN";

describe("translateSimplifiedChineseText", () => {
  it("uses the product glossary instead of literal machine translations", () => {
    expect(translateSimplifiedChineseText("Thread")).toBe("任务");
    expect(translateSimplifiedChineseText("Provider")).toBe("服务商");
    expect(translateSimplifiedChineseText("Projects")).toBe("项目");
    expect(translateSimplifiedChineseText("Steer")).toBe("引导");
  });

  it("normalizes terminology inside generated sentence translations", () => {
    expect(translateSimplifiedChineseText("No active thread")).toBe("当前没有任务");
    expect(translateSimplifiedChineseText("Could not archive thread")).toBe("无法归档任务");
    expect(translateSimplifiedChineseText("Add Providers")).toBe("添加服务商");
  });

  it("preserves outer whitespace from JSX text nodes", () => {
    expect(translateSimplifiedChineseText("  New chat\n")).toBe("  新建对话\n");
  });

  it("translates common dynamic counters", () => {
    expect(translateSimplifiedChineseText("3 threads")).toBe("3 个任务");
    expect(translateSimplifiedChineseText("12 files")).toBe("12 个文件");
    expect(translateSimplifiedChineseText("85% remaining")).toBe("剩余 85%");
  });

  it("translates dynamic provider status labels", () => {
    expect(translateSimplifiedChineseText("9 of 9 enabled")).toBe("已启用 9/9 个");
    expect(translateSimplifiedChineseText("Reorder Codex")).toBe("调整 Codex 顺序");
    expect(translateSimplifiedChineseText("Show Claude in the provider picker")).toBe(
      "在服务商选择器中显示 Claude",
    );
    expect(translateSimplifiedChineseText("Pi update available")).toBe("Pi 有可用更新");
  });

  it("leaves unknown text and protected product names unchanged", () => {
    expect(translateSimplifiedChineseText("Synara")).toBe("Synara");
    expect(translateSimplifiedChineseText("my-project-name")).toBe("my-project-name");
  });
});
