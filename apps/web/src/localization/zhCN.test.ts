// FILE: zhCN.test.ts
// Purpose: Protects the localized build's exact terms, dynamic counters, and content boundaries.

import { describe, expect, it } from "vitest";

import { translateSimplifiedChineseText } from "./zhCN";

describe("translateSimplifiedChineseText", () => {
  it("uses the product glossary instead of literal machine translations", () => {
    expect(translateSimplifiedChineseText("General")).toBe("常规");
    expect(translateSimplifiedChineseText("Thread")).toBe("任务");
    expect(translateSimplifiedChineseText("Provider")).toBe("服务商");
    expect(translateSimplifiedChineseText("Projects")).toBe("项目");
    expect(translateSimplifiedChineseText("Steer")).toBe("引导");
  });

  it("covers the updated v0.8.3 controls and settings description", () => {
    expect(translateSimplifiedChineseText("Automatically open simulator")).toBe("自动打开模拟器");
    expect(translateSimplifiedChineseText("Reload diff")).toBe("重新加载差异");
    expect(translateSimplifiedChineseText("Reload file from disk")).toBe("从磁盘重新加载文件");
    expect(
      translateSimplifiedChineseText(
        "Provider used for new chats until you pick a model. New chats then reuse your most recent model and options.",
      ),
    ).toBe("尚未选择模型时，新对话使用此服务商；选择后，新对话会沿用最近使用的模型和选项。");
  });

  it("normalizes terminology inside generated sentence translations", () => {
    expect(translateSimplifiedChineseText("No active thread")).toBe("当前没有任务");
    expect(translateSimplifiedChineseText("Could not archive thread")).toBe("无法归档任务");
    expect(translateSimplifiedChineseText("Add Providers")).toBe("添加服务商");
  });

  it("covers the v0.8.4 welcome tour, editor, model controls, and browser sessions", () => {
    expect(translateSimplifiedChineseText("Welcome to Synara")).toBe("欢迎使用 Synara");
    expect(translateSimplifiedChineseText("Open welcome tour")).toBe("打开欢迎引导");
    expect(translateSimplifiedChineseText("Revert all changes")).toBe("撤销所有更改");
    expect(translateSimplifiedChineseText("Effort slider")).toBe("推理强度滑块");
    expect(translateSimplifiedChineseText("Saved logins")).toBe("已保存的登录信息");
    expect(translateSimplifiedChineseText("Saving & access")).toBe("保存与访问");
    expect(translateSimplifiedChineseText("Confirm master password")).toBe("确认主密码");
    expect(translateSimplifiedChineseText("Import browser cookies")).toBe("导入浏览器 Cookie");
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
