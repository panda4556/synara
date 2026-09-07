# Synara 可选语言社区版

当前版本：**v0.8.3-cn.1**，基于 [Synara v0.8.3](https://github.com/Emanuele-web04/synara/releases/tag/v0.8.3)。本 fork 提供 Windows x64 安装包，让用户自行选择界面语言；不是上游官方发布。

[下载最新版](https://github.com/panda4556/synara/releases/latest) · [本版安装包](https://github.com/panda4556/synara/releases/download/v0.8.3-cn.1/Synara-0.8.3-cn.1-x64.exe) · [更新日志](https://github.com/panda4556/synara/blob/language-selection-v0.8.3/CHANGELOG.zh-CN.md) · [上游项目](https://github.com/Emanuele-web04/synara)

## 这一版有什么变化

- 从原来的固定中文界面改为 **跟随系统 / System default、English、简体中文** 三种选择。
- 切换立即生效，不需要重启；正常情况下刷新和重启后保留选择，同一来源的多个窗口同步。
- 默认跟随系统/浏览器的首选语言：简体中文使用中文，其他未支持语言回退英文。也可以手动固定为 English 或简体中文。
- 在设置中搜索 `Language`、`English`、`中文`、`语言` 或 `跟随系统`，可以找到语言选项。
- 基线升级到 v0.8.3，包含上游修复打包应用缺少 `zod` 导致部分 ACP 服务商无法启动的问题，以及 Diff 布局记忆等改进。

![设置中的语言选择](https://github.com/panda4556/synara/releases/download/v0.8.3-cn.1/language-selector.png)

## 安装与升级

1. 下载 **`Synara-0.8.3-cn.1-x64.exe`**。GitHub 自动生成的 `Source code (zip/tar.gz)` 是源码，不是安装包。
2. 保存工作并正常退出 Synara。升级前建议备份自己的 Synara 数据与配置；默认数据目录为 `%USERPROFILE%\.synara`，桌面配置通常位于 `%APPDATA%\synara`。如自定义了数据目录，也要备份对应位置。
3. 校验安装包，运行安装程序，并沿用原安装位置。已在 Windows 本机验证从 `0.8.1-cn.1` 覆盖升级至本版，原有对话可以打开；这不替代对其他环境的完整回归测试。
4. 打开 **设置 → 常规 → Language / 语言**。英文界面对应 **Settings → General → Language / 语言**。
5. 选择所需语言，立即生效。执行全局“恢复默认设置”也会将语言恢复为“跟随系统”。

安装包版本为 `0.8.3-cn.1`，Windows 文件属性可能显示四段版本 `0.8.3.0`，两者指同一社区构建。如果仍看到 `0.8.1`，请检查是否尚未退出旧进程，或快捷方式是否指向另一份安装。

升级期间可能执行上游数据库迁移，不建议直接用旧版程序打开已经迁移的数据。如必须回退，应先退出程序并保留当前数据，再恢复升级前匹配的备份和旧版程序。备份可能包含登录信息，请勿上传到公开仓库或 issue。

## 文件校验与签名

本安装包**未进行代码签名**，Windows 可能显示未知发布者或 SmartScreen 提示。请核对下载来源和校验值；SHA-256 只能用于核对文件一致性，不能代替发布者签名或安全审计。

下载同一 Release 的 `SHA256SUMS.txt`，在 PowerShell 中运行：

```powershell
Get-FileHash -LiteralPath .\Synara-0.8.3-cn.1-x64.exe -Algorithm SHA256
```

本版安装包预期 SHA-256：

```text
08df74e1e126f690bac68ff4ca7b5219765f42271f76ff944e2f05e892891e58
```

`artifact-win-x64.provenance.json` 记录源码提交、锁文件校验值和发布附件校验值，是未签名的构建来源记录，不是第三方认证。

## 翻译范围与限制

- 翻译导航、设置、菜单、按钮、提示和常见动态状态；保留产品名、模型名和技术标识符。
- 不翻译或改写聊天正文、用户输入、代码、编辑器与终端输出。本地化不改变服务商登录、模型调用、额度或计费方式。
- 语言入口使用原生 React 文案；已有界面的中文仍通过可选的兼容翻译层实现，并非上游已经完成全量原生 i18n。切回英文会停用该层并恢复原文。
- 未覆盖的文案和部分原生系统界面仍可能显示英文。暂不提供繁体中文或其他语言词库。
- 本次只发布并验证 Windows x64 安装包，不提供本社区版本的 macOS/Linux 安装包。
- 语言偏好保存在当前设备/浏览器；如果存储被禁用或清理，选择可能无法跨重启保留。
- 设置页原有顶栏点击区域可能遮挡全局“恢复默认设置”按钮的一部分，可用键盘 Tab 聚焦后确认；语言下拉框操作不受影响。
- **不启用自动更新**。后续版本请从本 fork 的 Releases 手动下载安装；官方安装包不保证包含此语言功能。

## 源码与验证

- 安装包源码：[40d34881c8624f79a8ea2c1e1bdd5b0bfaf9f9f7](https://github.com/panda4556/synara/commit/40d34881c8624f79a8ea2c1e1bdd5b0bfaf9f9f7)。发布标签 `v0.8.3-cn.1` 固定到此提交。
- 上游基线：[8599826d75d9932e69c301f2441f585da8f211e2](https://github.com/Emanuele-web04/synara/commit/8599826d75d9932e69c301f2441f585da8f211e2)。
- 维护分支：[language-selection-v0.8.3](https://github.com/panda4556/synara/tree/language-selection-v0.8.3)。首页和发布说明是打包后的独立文档更新，不改变安装包内容。
- 本地化、语言偏好与设置搜索：30 项单元测试通过；语言控件：5 项 Chromium 组件测试通过。
- Web、Server、Desktop 生产构建通过；最终 NSIS 安装包解包后的运行时依赖与 Windows 隔离启动检查通过。
- 已验证完整设置页双向语言切换、刷新保留、恢复默认，以及本机升级后启动和实际语言入口。
- 未执行全仓 `bun fmt`、`bun lint`、`bun typecheck`；这些检查不计入已通过的验证范围。

实现细节与测试命令见 [LOCALIZATION.zh-CN.md](https://github.com/panda4556/synara/blob/language-selection-v0.8.3/LOCALIZATION.zh-CN.md)。发布仅含程序、公共说明和校验文件，不包含构建机器的账号凭据、聊天数据库或备份。

## 致谢与许可证

Synara 原项目由 Emanuele Di Pietro 及原作者/贡献者开发。本 fork 的增量工作是中文本地化与语言选择支持，沿用 [MIT License](https://github.com/panda4556/synara/blob/language-selection-v0.8.3/LICENSE)，保留原有版权声明；第三方依赖保留各自许可证。

## English summary

This unofficial Windows x64 build is based on Synara v0.8.3. Choose **System default, English, or Simplified Chinese** in **Settings → General → Language / 语言**. Switching is immediate and the preference is saved locally. Conversation text, code, and terminal output are not translated. The build is unsigned, has no automatic update feed, and retains a compatibility translation layer for existing UI strings. Download the `.exe`, review the limitations above, and verify it against `SHA256SUMS.txt`.
