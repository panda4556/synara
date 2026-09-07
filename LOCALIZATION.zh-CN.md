# Synara 中文版本地化说明

此分支基于 Synara `v0.8.3`，在 **设置 → 常规 → Language / 语言** 中选择界面语言：

- **跟随系统 / System default**（默认）：简体中文系统使用中文，其他语言回退到英文。
- **English**：始终使用英文。
- **简体中文**：始终使用简体中文。

切换立即生效，无需刷新或重启；不会关闭会话、丢失草稿或修改聊天内容。选择保存在当前设备/浏览器的 `localStorage`（`synara:ui-language`），同一来源的多个窗口同步。恢复默认设置会恢复为跟随系统。

语言设置本身使用原生 React 文案。现有界面的中文仍复用可选的 DOM 兼容翻译层，并非上游已经全面接入 i18n。英文模式不启动翻译观察器；从中文切回英文时恢复最新原文，保留原有 DOM 节点和事件。未来逐步迁移原生文案时，可复用 `useAppLanguage`，并用 `data-zh-cn-skip` 标记无需兼容层处理的组件。

## 翻译范围

- 翻译导航、设置、菜单、按钮、提示、状态和常见动态计数。
- 保留产品名、模型名、命令、路径和技术标识符。
- 不翻译聊天正文、代码块、编辑器内容和终端输出，避免修改用户内容。
- `apps/web/src/localization/zh-CN.generated.json` 是生成的基础词库，`zhCN.ts` 中的人工词汇表和动态规则优先。

## 更新词库

```powershell
./scripts/generate-zh-cn-translations.ps1
```

候选文本由 `scripts/extract-localization-candidates.mjs` 从界面源码中提取。生成后应检查新增译文，并把重要产品术语加入 `MANUAL_TRANSLATIONS`。

## 验证

```powershell
bun run --cwd apps/web test src/localization/zhCN.test.ts
bun run --cwd apps/web test src/localization/language.test.ts src/settingsSearchIndex.test.ts
bun run --cwd apps/web test:browser src/components/settings/LanguageSettingsRow.browser.tsx
bun run --cwd apps/web build
```

使用仓库 `package.json` 指定的 Bun 版本。Windows 本地构建使用依赖自带的 x64 原生预编译模块，不要求 Visual Studio 额外安装 Spectre C++ 库。

## 更新策略

社区安装包不包含官方更新源，避免被不含语言选项的上游版本覆盖。升级时应在新版源码上检查新增文案、完成双向语言切换的浏览器验收并重新打包。此构建非官方发布，也不改变登录、模型、额度或计费方式。
