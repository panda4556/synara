# Synara 简体中文构建

此分支基于 Synara `v0.8.1`，通过启动时的 DOM 本地化层提供简体中文界面。

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
bun run --cwd apps/web build
```

Windows 本地构建使用依赖自带的 x64 原生预编译模块，不要求 Visual Studio 额外安装 Spectre C++ 库。

## 更新策略

本地中文安装包不包含官方更新源，避免官方英文版本自动覆盖中文资源。升级时应在新版源码上重新生成词库、完成浏览器验收并重新打包。
