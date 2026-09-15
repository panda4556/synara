// FILE: zhCN.ts
// Purpose: Optional, reversible Simplified Chinese compatibility layer for existing UI strings.

import generatedTranslations from "./zh-CN.generated.json";

const MANUAL_TRANSLATIONS: Readonly<Record<string, string>> = {
  About: "关于",
  Active: "进行中",
  Agent: "智能体",
  Agents: "智能体",
  "Agent providers": "智能体服务商",
  "All turns": "全部轮次",
  Antigravity: "Antigravity",
  Archive: "归档",
  Archived: "已归档",
  Automatic: "自动",
  "Automatically open simulator": "自动打开模拟器",
  Ayu: "Ayu",
  Backspace: "退格键",
  Bug: "Bug",
  Chat: "对话",
  Chats: "对话",
  "Choose File": "选择文件",
  "Check for updates": "检查更新",
  "Choose Chat": "选择对话",
  "Choose the provider used for new chats.": "选择新对话默认使用的服务商。",
  "Coding agent": "编码智能体",
  "Coding agents": "编码智能体",
  "Collapse panel": "收起面板",
  Comfortable: "适中",
  Composer: "输入框",
  "Composer attachments": "输入框附件",
  "Complete changelog": "完整更新日志",
  "Controls how projects are arranged in the main sidebar.": "设置项目在主侧边栏中的排列方式。",
  "Controls how threads are arranged inside each project in the main sidebar.":
    "设置各项目内的任务在主侧边栏中的排列方式。",
  "Copy Thread ID": "复制任务 ID",
  "Copy thread ID": "复制任务 ID",
  Cron: "Cron 定时表达式",
  Dracula: "Dracula",
  Droid: "Droid",
  "Edit queued prompt": "编辑排队中的提示词",
  Everforest: "Everforest",
  Fast: "快速",
  "Full access": "完全访问",
  General: "常规",
  Gruvbox: "Gruvbox",
  "Hand off": "移交",
  Help: "帮助",
  "Keyboard bindings": "快捷键",
  Language: "语言",
  "Last turn": "上一轮",
  Light: "浅色",
  "Local Servers": "本地服务器",
  Lobster: "Lobster",
  Manual: "手动",
  "Manual order": "手动排序",
  "Provider used for new chats until you pick a model. New chats then reuse your most recent model and options.":
    "尚未选择模型时，新对话使用此服务商；选择后，新对话会沿用最近使用的模型和选项。",
  "Open the iOS Simulator pane when an agent uses a device. Turn this off to use Simulator.app without the mirrored pane reopening. You can still open the pane manually.":
    "智能体使用设备时自动打开 iOS 模拟器面板。关闭后可以直接使用 Simulator.app，镜像面板不会自动重新打开；你仍可手动打开面板。",
  "Reload diff": "重新加载差异",
  "Reload file from disk": "从磁盘重新加载文件",
  Medium: "中等",
  Monokai: "Monokai",
  "New chat": "新建对话",
  "New terminal": "新建终端",
  "New thread": "新建任务",
  "No active thread": "当前没有任务",
  Nord: "Nord",
  "Open folder": "打开文件夹",
  "Open file": "打开文件",
  "Open Browser": "打开浏览器",
  "Open Files": "打开文件",
  "Open in VS Code": "在 VS Code 中打开",
  "Open new chat home": "打开新建对话首页",
  "Open Side chats": "打开侧聊",
  "Open Terminal": "打开终端",
  Oscurange: "Oscurange",
  "Pick the default workspace mode for newly created draft threads.":
    "选择新建草稿任务默认使用的工作区模式。",
  "Pick a thread…": "选择任务…",
  "Project sort order": "项目排序方式",
  Projects: "项目",
  Prompt: "提示词",
  Provider: "服务商",
  Providers: "服务商",
  Raycast: "Raycast",
  "Read only": "只读",
  "Read-only": "只读",
  "Recently active": "最近活跃",
  "Record voice note": "录制语音笔记",
  "Reasoning effort": "推理强度",
  Rename: "重命名",
  Repository: "仓库",
  "Resize Sidebar": "调整侧边栏宽度",
  "Repair state": "修复状态",
  Review: "审阅",
  "Review updates": "查看更新",
  Search: "搜索",
  "Send message": "发送消息",
  Sentry: "Sentry",
  "Select a thread or create a new one to get started.": "请选择一个任务，或新建任务后开始。",
  "Session closed": "会话已关闭",
  "Show automation run threads in the sidebar": "在侧边栏中显示自动化运行任务",
  "Show the Chats section in the sidebar": "在侧边栏中显示对话部分",
  "Show the Editor section in the Environment panel": "在环境面板中显示编辑器部分",
  "Show the Notepad section in the Environment panel": "在环境面板中显示记事本部分",
  "Show the Pinned messages section in the Environment panel": "在环境面板中显示已固定消息部分",
  "Show the Project instructions section in the Environment panel": "在环境面板中显示项目说明部分",
  "Show the Pull request section in the Environment panel": "在环境面板中显示拉取请求部分",
  "Show the Recap section in the Environment panel": "在环境面板中显示回顾部分",
  "Show the Repository section in the Environment panel": "在环境面板中显示仓库部分",
  "Show the Studio section in the sidebar": "在侧边栏中显示工作室部分",
  "Show the Text markers section in the Environment panel": "在环境面板中显示文本标记部分",
  "Show the Usage section in the Environment panel": "在环境面板中显示使用情况部分",
  "Shown automatically only when recovery actions are relevant.":
    "仅在需要执行恢复操作时自动显示。",
  Space: "空间",
  Spaces: "空间",
  Spacious: "宽松",
  Stash: "储藏",
  Steer: "引导",
  Studio: "工作室",
  Subagent: "子智能体",
  Subagents: "子智能体",
  "Switch to activity view": "切换到活动视图",
  Temple: "Temple",
  Thread: "任务",
  Threads: "任务",
  "Thread sort order": "任务排序方式",
  "Toggle right sidebar": "切换右侧边栏",
  Tokens: "令牌",
  Turn: "轮次",
  Turns: "轮次",
  Unarchive: "取消归档",
  Vercel: "Vercel",
  Workspace: "工作区",
  Workspaces: "工作区",
  Worktree: "工作树",
  Worktrees: "工作树",
  "What should we work on?": "今天想做些什么？",
  "Work in a project": "在项目中工作",
  "Ask for follow-up changes or attach images": "输入后续修改要求或添加图片",
  "Default thread mode": "默认任务模式",
  "Open the Environment panel by default on normal threads": "默认在普通任务中打开环境面板",
  "Archived threads": "已归档任务",
  Accent: "强调色",
  Background: "背景色",
  Compact: "紧凑",
  Contrast: "对比度",
  "Dark theme": "深色主题",
  "Dark theme accent color": "深色主题强调色",
  "Dark theme background color": "深色主题背景色",
  "Dark theme code font": "深色主题代码字体",
  "Dark theme code theme": "深色主题代码配色",
  "Dark theme contrast": "深色主题对比度",
  "Dark theme foreground color": "深色主题前景色",
  "Dark theme translucent sidebar": "深色主题半透明侧边栏",
  "Dark theme UI font": "深色主题界面字体",
  Foreground: "前景色",
  Full: "全宽",
  Keybindings: "快捷键",
  "Light theme": "浅色主题",
  "Light theme accent color": "浅色主题强调色",
  "Light theme background color": "浅色主题背景色",
  "Light theme code font": "浅色主题代码字体",
  "Light theme code theme": "浅色主题代码配色",
  "Light theme contrast": "浅色主题对比度",
  "Light theme foreground color": "浅色主题前景色",
  "Light theme translucent sidebar": "浅色主题半透明侧边栏",
  "Light theme UI font": "浅色主题界面字体",
  "Managed worktrees": "托管工作树",
  "Models & composer": "模型与输入框",
  "Pinned messages": "固定消息",
  Recap: "摘要",
  "System is currently using this light slot.": "系统当前使用此浅色主题。",
  "Theme preference": "主题偏好",
  "Timestamp format": "时间格式",
  "Translucent sidebar": "半透明侧边栏",
  "UI font": "界面字体",
  "Code font": "代码字体",
  "Used when your system switches to dark.": "系统切换到深色模式时使用。",
  "Background activity allowed": "允许后台活动",
  "CLI not installed": "未安装 CLI",
  "Confirm terminal tab close": "关闭终端标签页前确认",
  "Confirm thread archive": "归档任务前确认",
  "Confirm thread deletion": "删除任务前确认",
  Installed: "已安装",
  "Show pull request diff colors": "显示拉取请求差异颜色",
  "Stream assistant messages": "实时显示智能体消息",
  "Update all": "全部更新",
  "Wrap diff lines by default": "默认自动换行差异内容",
  "Ask before archiving a thread.": "归档任务前询问确认。",
  "Ask before deleting a thread and its chat history.": "删除任务及其聊天记录前询问确认。",
  "Ask before closing a terminal tab and clearing its history.":
    "关闭终端标签页并清除其历史记录前询问确认。",
  "Assistant output": "智能体输出",
  "What's new?": "新功能",
  "What’s new?": "新功能",
  "Signed out · Synara": "已退出登录 · Synara",
  "Pairing failed · Synara": "配对失败 · Synara",
  "Secure pairing interrupted": "安全配对已中断",
  "This browser no longer controls Synara.": "此浏览器已不再控制 Synara。",
  "The session and its live connections were revoked. To reconnect, generate a fresh pairing link from an active owner session and open it in this browser.":
    "该会话及其实时连接已被撤销。如需重新连接，请从仍处于活动状态的所有者会话生成新的配对链接，并在此浏览器中打开。",
  "This pairing link could not be used.": "无法使用此配对链接。",
  "The link may be incomplete, expired, or already used. Generate a new pairing link from the Synara server and try again.":
    "链接可能不完整、已过期或已被使用。请从 Synara 服务器生成新的配对链接后重试。",
  // v0.8.4: onboarding, workspace editing, model controls, and browser sessions.
  "Welcome to Synara": "欢迎使用 Synara",
  "What Synara can do": "Synara 的功能",
  "Choose your agents": "选择智能体",
  "Pick an appearance": "选择外观",
  "Add your first project": "添加第一个项目",
  "You're all set": "一切就绪",
  "A local-first workspace for coding agents. Setup takes about a minute.":
    "本地优先的编码智能体工作区，约一分钟即可完成设置。",
  "Detected on this machine. Uncheck any you don't want Synara to use.":
    "以下为此电脑上检测到的智能体。取消勾选不希望 Synara 使用的项目。",
  "Applies live behind this window. Change it anytime in Settings → Appearance.":
    "外观会立即应用到后方窗口，也可随时在“设置 → 外观”中修改。",
  "A project is a folder Synara works in. Git repositories unlock branches, worktrees, diffs and pull requests.":
    "项目是 Synara 的工作文件夹。Git 仓库还支持分支、工作树、差异和拉取请求。",
  "Local-first": "本地优先",
  "No account. Workspace data stays on this machine.": "无需额外账号，工作区数据保存在此电脑上。",
  "Your own agents": "使用你的智能体",
  "Drives the CLIs, accounts and keys already set up here.":
    "使用此电脑上已配置的 CLI、账号和密钥。",
  "Verify before done": "验证后再完成",
  "Diff, terminal, browser and PR stay in one loop.":
    "在同一工作区内查看差异、运行终端、使用浏览器和处理拉取请求。",
  "Get started": "开始设置",
  "Set up": "设置",
  Continue: "继续",
  "Skip for now": "暂时跳过",
  "Skip setup": "跳过设置",
  "Start using Synara": "开始使用 Synara",
  "Setup progress": "设置进度",
  Step: "步骤",
  "Welcome tour": "欢迎引导",
  "Open welcome tour": "打开欢迎引导",
  "Replay the first-run setup: feature tour, provider selection, appearance, and first project.":
    "重新打开首次使用引导：功能介绍、服务商选择、外观和第一个项目。",
  "Any agent": "多种智能体",
  "Run every coding agent in one workspace": "在同一工作区运行不同的编码智能体",
  "Synara sits around the agent runtimes you already trust: Claude Code, Codex, Cursor, Devin, Antigravity, Grok, Factory Droid, OpenCode, and Pi. The provider keeps its account, models, and limits. Synara owns the durable task, environment, transcript, and delivery workflow around it.":
    "Synara 整合你熟悉的智能体运行时：Claude Code、Codex、Cursor、Devin、Antigravity、Grok、Factory Droid、OpenCode 和 Pi。服务商保留各自的账号、模型和额度；Synara 负责持久化任务、环境、对话记录和交付流程。",
  "Switch models mid-thread": "在任务中切换模型",
  "Hand a thread to another provider": "将任务移交给其他服务商",
  "Usage for every provider": "查看各服务商的用量",
  "Forks from any message": "从任意消息创建分支任务",
  "Subagents and side chats": "子智能体与侧聊",
  "Diff review with file tree": "通过文件树审阅差异",
  "Commit → push → PR": "提交 → 推送 → 拉取请求",
  "Native pull-request workspace": "内置拉取请求工作区",
  "Shared Chromium surface": "共享 Chromium 浏览器界面",
  "Element annotations": "元素标注",
  "iOS Simulator pane": "iOS 模拟器面板",
  "Interval, daily, cron schedules": "按间隔、每日或 Cron 定时运行",
  "Natural-language stop conditions": "用自然语言设置停止条件",
  "Thread goals": "任务目标",
  "Parallel task batches": "批量并行任务",
  "External MCP pairing": "外部 MCP 配对",
  "Approval boundaries": "审批边界",
  "Tasks & worktrees": "任务与工作树",
  "One task, one isolated environment": "每个任务都有独立的工作环境",
  "Each task owns one body of work: its conversation, provider session, working environment, tool activity, and Git changes. Run tasks in parallel on managed Git worktrees so two agents never edit the same checkout.":
    "每个任务拥有自己的对话、服务商会话、工作环境、工具活动和 Git 更改。使用托管 Git 工作树并行运行任务，避免多个智能体同时编辑同一检出目录。",
  "Review & PRs": "审阅与拉取请求",
  "From objective to evidence": "从目标到验证结果",
  "A task is complete only after you understand and verify its result, not when the provider reports it is finished. Inspect diffs, run terminals, then commit, push, and open a pull request without leaving the workspace.":
    "只有理解并验证结果后，任务才算完成，不能仅以服务商报告完成为准。无需离开工作区，即可查看差异、运行终端，再提交、推送并创建拉取请求。",
  "Browser & devices": "浏览器与设备",
  "Verify in a real browser or simulator": "在真实浏览器或模拟器中验证",
  "Agents drive a visible, task-owned browser you can watch and annotate. On macOS, an iOS Simulator pane streams the device so agents can build, launch, and tap through an app while you follow along.":
    "智能体操作任务专属的可见浏览器，你可以观察并添加标注。macOS 上还可通过 iOS 模拟器面板观看智能体构建、启动和操作应用。",
  "Automations & goals": "自动化与目标",
  "Hand off work that should keep moving": "交给智能体持续推进工作",
  "Schedule recurring runs, attach a persistent goal to a thread so it keeps going after each clean turn, and let Synara bring you back when something needs attention. Scheduled does not mean autonomous approval.":
    "设置定期运行，为任务添加持续目标，让它在每轮正常完成后继续推进，并在需要处理时通知你。定时运行不代表自动批准操作。",
  "Agent Gateway": "智能体网关",
  "Let agents operate Synara itself": "让智能体操作 Synara",
  "A built-in MCP surface lets a supported provider session create tasks, wait on them, read transcripts, and steer other threads. Pair Codex, Claude Code, or Claude Desktop from outside with scoped, revocable credentials.":
    "内置 MCP 接口让受支持的服务商会话创建和等待任务、读取对话记录并引导其他任务。也可使用限定权限、可撤销的凭据连接外部 Codex、Claude Code 或 Claude Desktop。",
  Shortcuts: "快捷键",
  "Keep your hands on the keyboard": "用快捷键高效操作",
  "Everything in the workspace has a shortcut, and the keymap is editable from Settings. A few worth learning on day one:":
    "工作区支持快捷键操作，也可在设置中修改键位。以下快捷键值得先熟悉：",
  "Shortcuts worth learning today": "先熟悉这些快捷键",
  "Search sidebar": "搜索侧边栏",
  "Read the guide": "阅读指南",
  "Synara capabilities": "Synara 功能",
  Connected: "已连接",
  "connected ·": "已连接 ·",
  Disabled: "已禁用",
  "Needs sign-in": "需要登录",
  "need sign-in ·": "需要登录 ·",
  "Not installed": "未安装",
  "not installed": "未安装",
  "Signing in to": "正在登录",
  "Re-detect": "重新检测",
  Guide: "指南",
  "Applies to both light and dark": "同时应用于浅色和深色模式",
  "Drop a folder here, or": "将文件夹拖到此处，或",
  browse: "浏览文件夹",
  "Opening the folder picker…": "正在打开文件夹选择器…",
  "Added projects": "已添加的项目",
  "No project yet": "尚未添加项目",
  "Effort slider": "推理强度滑块",
  "Once a chat has started, show reasoning effort as a slider in the composer's model menu, with fast mode and the model list alongside it. New chats keep the separate model and effort pickers.":
    "对话开始后，在输入框的模型菜单中用滑块调整推理强度，并显示快速模式和模型列表。新对话仍使用独立的模型与推理强度选择器。",
  "Reset effort and speed": "重置推理强度与速度",
  "Reset to defaults": "恢复默认值",
  "Close editor": "关闭编辑器",
  Redo: "重做",
  "Revert all changes": "撤销所有更改",
  "Reload from disk": "从磁盘重新加载",
  Overwrite: "覆盖",
  "Saved accounts": "已保存的账号",
  "Saved logins": "已保存的登录信息",
  "Saved login": "已保存的登录信息",
  Logins: "登录信息",
  "Loading saved logins...": "正在加载已保存的登录信息…",
  "No saved logins.": "没有已保存的登录信息。",
  "Saved logins are locked.": "已保存的登录信息已锁定。",
  "Lock saved logins": "锁定登录信息",
  "Back to browser": "返回浏览器",
  "Master password": "主密码",
  "New master password": "新主密码",
  "Confirm master password": "确认主密码",
  "Set master password": "设置主密码",
  "Keep this password somewhere safe. A forgotten master password cannot be reset here.":
    "请妥善保存此密码。忘记主密码后，无法在此重置。",
  "Use at least 12 characters and enter the same password twice.":
    "密码至少需要 12 个字符，且两次输入必须一致。",
  "Could not verify the master password. Try again shortly.": "无法验证主密码，请稍后重试。",
  "Verifying...": "正在验证…",
  Unlock: "解锁",
  Password: "密码",
  "Reveal password": "显示密码",
  "Revealed password": "已显示的密码",
  "Hide password": "隐藏密码",
  "Save password?": "保存密码？",
  "Update password?": "更新密码？",
  "Delete login": "删除登录信息",
  "Delete this saved login?": "删除此登录信息？",
  "No username": "未设置用户名",
  "Saved by an agent": "由智能体保存",
  "Saved by you": "由你保存",
  "Unfinished signup": "注册未完成",
  "Saving & access": "保存与访问",
  "Saving and access": "保存与访问",
  "Allow agents to find saved accounts": "允许智能体查找已保存的账号",
  "Agent password filling and generation are unavailable.": "智能体暂不支持填写或生成密码。",
  "Offer to save passwords": "询问是否保存密码",
  "Autosave accepted logins": "自动保存已确认的登录信息",
  "Import browser cookies": "导入浏览器 Cookie",
  "Import scope": "导入范围",
  "Cookie import scope": "Cookie 导入范围",
  "Cookie source browser": "Cookie 来源浏览器",
  "Cookie source profile": "Cookie 来源配置",
  "This site:": "当前网站：",
  "All sites in this profile": "此配置中的所有网站",
  "Import all sites": "导入所有网站",
  "Import for this site": "导入当前网站",
  "I allow Synara and its agents to use all imported signed-in sessions from this profile.":
    "我允许 Synara 及其智能体使用从此配置导入的所有已登录会话。",
  "Imports all compatible cookies from the selected profile. Every imported signed-in session becomes available across Synara browser tabs and agent workflows.":
    "从所选配置导入所有兼容的 Cookie。导入的已登录会话可供 Synara 浏览器标签页和智能体工作流程共享使用。",
  "Imports this site, its subdomains, and matching parent domains. Imported sessions are shared across Synara browser tabs and agent workflows.":
    "导入当前网站、其子域和匹配父域的 Cookie。导入的会话可供 Synara 浏览器标签页和智能体工作流程共享使用。",
  "Import stopped because the browser destination changed or the operation became unavailable. Select the destination and retry.":
    "由于目标浏览器已更改或操作不可用，导入已停止。请选择目标后重试。",
};

const TERM_NORMALIZATIONS: ReadonlyArray<readonly [string, string]> = [
  ["编码代理", "编码智能体"],
  ["子代理", "子智能体"],
  ["提供者", "服务商"],
  ["提供商", "服务商"],
  ["项目集", "项目"],
  ["作曲器", "输入框"],
  ["创作器", "输入框"],
  ["撰写器", "输入框"],
  ["线程", "任务"],
  ["存档", "归档"],
  ["回合", "轮次"],
  ["签出", "检出"],
  ["侧边板", "侧聊"],
  ["代理", "智能体"],
];

const EXACT_TRANSLATIONS: Readonly<Record<string, string>> = Object.freeze({
  ...generatedTranslations,
  ...MANUAL_TRANSLATIONS,
});

interface PatternTranslation {
  readonly source: RegExp;
  readonly translate: (match: RegExpMatchArray) => string;
}

const capture = (match: RegExpMatchArray, index: number): string => match[index] ?? "";

const PATTERN_TRANSLATIONS: ReadonlyArray<PatternTranslation> = [
  {
    source: /^(\d+) of (\d+) enabled$/i,
    translate: (match) => `已启用 ${capture(match, 1)}/${capture(match, 2)} 个`,
  },
  {
    source: /^(\d+) installed$/i,
    translate: (match) => `已安装 ${capture(match, 1)} 个`,
  },
  {
    source: /^(\d+) updates? available$/i,
    translate: (match) => `有 ${capture(match, 1)} 项可用更新`,
  },
  {
    source: /^Disable (.+)$/i,
    translate: (match) => `禁用 ${capture(match, 1)}`,
  },
  {
    source: /^Enable (.+)$/i,
    translate: (match) => `启用 ${capture(match, 1)}`,
  },
  {
    source: /^Reorder (.+)$/i,
    translate: (match) => `调整 ${capture(match, 1)} 顺序`,
  },
  {
    source: /^Show (.+) in the provider picker$/i,
    translate: (match) => `在服务商选择器中显示 ${capture(match, 1)}`,
  },
  {
    source: /^(.+) CLI is not installed$/i,
    translate: (match) => `未安装 ${capture(match, 1)} CLI`,
  },
  {
    source: /^Current (v.+)$/i,
    translate: (match) => `当前版本 ${capture(match, 1)}`,
  },
  {
    source: /^(.+) update available$/i,
    translate: (match) => `${capture(match, 1)} 有可用更新`,
  },
  {
    source: /^(.+) has a newer version available\.$/i,
    translate: (match) => `${capture(match, 1)} 有新版本可用。`,
  },
  {
    source: /^(\d+) threads?$/i,
    translate: (match) => `${capture(match, 1)} 个任务`,
  },
  {
    source: /^(\d+) projects?$/i,
    translate: (match) => `${capture(match, 1)} 个项目`,
  },
  {
    source: /^(\d+) chats?$/i,
    translate: (match) => `${capture(match, 1)} 个对话`,
  },
  {
    source: /^(\d+) files?$/i,
    translate: (match) => `${capture(match, 1)} 个文件`,
  },
  {
    source: /^(\d+) changes?$/i,
    translate: (match) => `${capture(match, 1)} 处更改`,
  },
  {
    source: /^(\d+) additions?$/i,
    translate: (match) => `新增 ${capture(match, 1)} 行`,
  },
  {
    source: /^(\d+) deletions?$/i,
    translate: (match) => `删除 ${capture(match, 1)} 行`,
  },
  {
    source: /^(\d+) agents?$/i,
    translate: (match) => `${capture(match, 1)} 个智能体`,
  },
  {
    source: /^(\d+) runs?$/i,
    translate: (match) => `${capture(match, 1)} 次运行`,
  },
  {
    source: /^(\d+) messages?$/i,
    translate: (match) => `${capture(match, 1)} 条消息`,
  },
  {
    source: /^(\d+) tokens?$/i,
    translate: (match) => `${capture(match, 1)} 个令牌`,
  },
  {
    source: /^(\d+) selected$/i,
    translate: (match) => `已选择 ${capture(match, 1)} 项`,
  },
  {
    source: /^Step (\d+) of (\d+)$/i,
    translate: (match) => `第 ${capture(match, 1)} 步，共 ${capture(match, 2)} 步`,
  },
  {
    source: /^Page (\d+) of (\d+)$/i,
    translate: (match) => `第 ${capture(match, 1)} 页，共 ${capture(match, 2)} 页`,
  },
  {
    source: /^Run (\d+)$/i,
    translate: (match) => `第 ${capture(match, 1)} 次运行`,
  },
  {
    source: /^Working for (.+)$/i,
    translate: (match) => `已工作 ${capture(match, 1)}`,
  },
  {
    source: /^Last checked (.+)$/i,
    translate: (match) => `上次检查：${capture(match, 1)}`,
  },
  {
    source: /^Last updated (.+)$/i,
    translate: (match) => `上次更新：${capture(match, 1)}`,
  },
  {
    source: /^Updated (.+)$/i,
    translate: (match) => `更新于 ${capture(match, 1)}`,
  },
  {
    source: /^Retrying in (.+)$/i,
    translate: (match) => `${capture(match, 1)} 后重试`,
  },
  {
    source: /^(\d+)% remaining$/i,
    translate: (match) => `剩余 ${capture(match, 1)}%`,
  },
];

function normalizeTranslatedTerms(value: string): string {
  let normalized = value;
  for (const [source, target] of TERM_NORMALIZATIONS) {
    normalized = normalized.replaceAll(source, target);
  }
  return normalized;
}

function splitOuterWhitespace(value: string): {
  readonly leading: string;
  readonly content: string;
  readonly trailing: string;
} {
  const leading = value.match(/^\s*/u)?.[0] ?? "";
  const trailing = value.match(/\s*$/u)?.[0] ?? "";
  if (leading.length === value.length) {
    return { leading: value, content: "", trailing: "" };
  }
  return {
    leading,
    content: value.slice(leading.length, value.length - trailing.length),
    trailing,
  };
}

export function translateSimplifiedChineseText(value: string): string {
  const { leading, content, trailing } = splitOuterWhitespace(value);
  if (!content) return value;

  const lookupKey = content.replace(/\s+/gu, " ");
  const exact = EXACT_TRANSLATIONS[lookupKey];
  if (exact !== undefined) {
    return `${leading}${normalizeTranslatedTerms(exact)}${trailing}`;
  }

  for (const pattern of PATTERN_TRANSLATIONS) {
    const match = lookupKey.match(pattern.source);
    if (match) {
      return `${leading}${pattern.translate(match)}${trailing}`;
    }
  }
  return value;
}

const TEXT_CONTENT_SKIP_SELECTOR = [
  "script",
  "style",
  "noscript",
  "pre",
  "code",
  "kbd",
  "samp",
  "textarea",
  "input",
  "[contenteditable]:not([contenteditable='false'])",
  "[data-testid='composer-editor']",
  "[data-zh-cn-skip]",
  ".xterm",
  ".cm-editor",
  ".monaco-editor",
  ".shiki",
].join(",");

const RICH_CONTENT_SELECTOR = ".chat-markdown,[data-message-id]";
const RICH_CONTENT_UI_SELECTOR = [
  "button",
  "[role='button']",
  "[role='menuitem']",
  "[role='tab']",
  "[data-slot='tooltip-content']",
].join(",");

const TRANSLATABLE_ATTRIBUTES = [
  "aria-description",
  "aria-label",
  "data-placeholder",
  "placeholder",
  "title",
] as const;

function isUiControlInsideRichContent(element: Element): boolean {
  const richContent = element.closest(RICH_CONTENT_SELECTOR);
  return richContent !== null && element.closest(RICH_CONTENT_UI_SELECTOR) !== null;
}

function shouldSkipText(element: Element): boolean {
  if (element.closest(TEXT_CONTENT_SKIP_SELECTOR)) return true;
  return element.closest(RICH_CONTENT_SELECTOR) !== null && !isUiControlInsideRichContent(element);
}

function shouldSkipAttributes(element: Element): boolean {
  const blockedContent = element.closest(
    "pre,code,[data-zh-cn-skip],.xterm,.cm-editor,.monaco-editor",
  );
  if (blockedContent) return true;
  return element.closest(RICH_CONTENT_SELECTOR) !== null && !isUiControlInsideRichContent(element);
}

interface TranslationRecord {
  readonly source: string;
  readonly translated: string;
}

function visitSubtree(root: Node, visit: (node: Node) => void): void {
  visit(root);
  const owner = root.ownerDocument ?? (root instanceof Document ? root : null);
  if (!owner) return;
  const walker = owner.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    visit(current);
    current = walker.nextNode();
  }
}

/** Return a disposer that restores the latest English source, without replacing React's nodes. */
export function installSimplifiedChineseLocalization(): () => void {
  if (typeof document === "undefined" || !document.documentElement) return () => {};

  // Weak records do not retain unmounted menus, messages, or settings panels.
  const textRecords = new WeakMap<Text, TranslationRecord>();
  const attributeRecords = new WeakMap<Element, Map<string, TranslationRecord>>();
  const valueRecords = new WeakMap<HTMLInputElement, TranslationRecord>();

  const restoreNode = (node: Node) => {
    if (node instanceof Text) {
      const record = textRecords.get(node);
      if (record && node.data === record.translated) node.data = record.source;
      textRecords.delete(node);
    } else if (node instanceof Element) {
      for (const [attribute, record] of attributeRecords.get(node) ?? []) {
        if (node.getAttribute(attribute) === record.translated) {
          node.setAttribute(attribute, record.source);
        }
      }
      attributeRecords.delete(node);
      if (node instanceof HTMLInputElement) {
        const record = valueRecords.get(node);
        if (record && node.value === record.translated) node.value = record.source;
        valueRecords.delete(node);
      }
    }
  };
  const restoreSubtree = (root: Node) => visitSubtree(root, restoreNode);

  const translateNode = (node: Node) => {
    if (node instanceof Text) {
      const parent = node.parentElement;
      if (!parent || shouldSkipText(parent)) {
        restoreNode(node);
        return;
      }
      const source = node.data;
      if (textRecords.get(node)?.translated === source) return;
      const translated = translateSimplifiedChineseText(source);
      if (translated === source) {
        textRecords.delete(node);
      } else {
        textRecords.set(node, { source, translated });
        node.data = translated;
      }
    } else if (node instanceof Element) {
      if (shouldSkipAttributes(node)) {
        restoreNode(node);
        return;
      }
      const records = attributeRecords.get(node) ?? new Map<string, TranslationRecord>();
      for (const attribute of TRANSLATABLE_ATTRIBUTES) {
        const source = node.getAttribute(attribute);
        if (source === null) {
          records.delete(attribute);
          continue;
        }
        if (records.get(attribute)?.translated === source) continue;
        const translated = translateSimplifiedChineseText(source);
        if (translated === source) {
          records.delete(attribute);
        } else {
          records.set(attribute, { source, translated });
          node.setAttribute(attribute, translated);
        }
      }
      if (records.size > 0) attributeRecords.set(node, records);
      else attributeRecords.delete(node);

      if (node instanceof HTMLInputElement && /^(?:button|reset|submit)$/i.test(node.type)) {
        const source = node.value;
        if (valueRecords.get(node)?.translated === source) return;
        const translated = translateSimplifiedChineseText(source);
        if (translated === source) {
          valueRecords.delete(node);
        } else {
          valueRecords.set(node, { source, translated });
          node.value = translated;
        }
      }
    }
  };

  const pendingRoots = new Set<Node>();
  let disposed = false;
  let flushQueued = false;
  const flush = () => {
    flushQueued = false;
    if (disposed) return;
    for (const root of pendingRoots) {
      if (root.isConnected) visitSubtree(root, translateNode);
    }
    pendingRoots.clear();
  };
  const enqueue = (root: Node) => {
    pendingRoots.add(root);
    if (flushQueued) return;
    flushQueued = true;
    queueMicrotask(flush);
  };
  const restoreRemovedNodes = (mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      for (const node of mutation.removedNodes) {
        // Restore cached/detached DOM too, so it is safe to reuse after switching to English.
        if (!node.isConnected) restoreSubtree(node);
      }
    }
  };
  const observer = new MutationObserver((mutations) => {
    restoreRemovedNodes(mutations);
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) enqueue(node);
      } else {
        enqueue(mutation.target);
      }
    }
  });
  visitSubtree(document.documentElement, translateNode);
  observer.observe(document.documentElement, {
    attributeFilter: [...TRANSLATABLE_ATTRIBUTES, "value"],
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  });

  return () => {
    if (disposed) return;
    disposed = true;
    const undeliveredMutations = observer.takeRecords();
    observer.disconnect();
    restoreRemovedNodes(undeliveredMutations);
    visitSubtree(document.documentElement, restoreNode);
    pendingRoots.clear();
  };
}
