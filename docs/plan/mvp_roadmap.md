# Flowark MVP 开发任务清单 (Development Roadmap)

> **目标**: 在 2 周内构建一个可用的、包含核心“品味闭环”的最小可行性产品。
> **策略**: 优先保证核心体验（编辑器 + 人设），非核心功能（如复杂的后台管理、支付）暂缓或使用 Mock 数据。

## Phase 1: 基础设施搭建 (Infrastructure) - Day 1-2

- [ ] **项目初始化**
    - [ ] 使用 `create-next-app` 初始化 Next.js 14 项目 (TypeScript, Tailwind)。
    - [ ] 配置 ESLint, Prettier 和 Git 规范。
    - [ ] 安装核心依赖: `tiptap`, `ai`, `framer-motion`, `lucide-react`, `zustand`。
- [ ] **数据库与鉴权 (Supabase)**
    - [ ] 创建 Supabase 项目。
    - [ ] 定义 SQL Schema (Users, Personas, Drafts, Inspirations)。
    - [ ] 配置 Auth (Google Login + Email)。
    - [ ] 生成 TypeScript 类型定义 (`supabase gen types`)。
- [ ] **UI 组件库搭建**
    - [ ] 封装基础 UI 组件 (Button, Input, Modal, Toast)。
    - [ ] 实现“极简主义”布局 (Layout, Sidebar)。
    - [ ] 配置全局字体 (Serif for headings, Sans for body)。

## Phase 2: 核心功能 - 人设与灵感 (Persona & Inspiration) - Day 3-5

- [ ] **人设档案系统 (Persona Engine)**
    - [ ] 实现人设创建向导 (Wizard): 引导用户输入名称、领域、语气关键词。
    - [ ] 实现人设卡片展示与切换逻辑。
    - [ ] **AI**: 编写 Prompt，让 AI 根据用户简单的描述自动生成详细的“语气提示词 (Tone Prompt)”。
- [ ] **灵感策展器 (Inspiration Curator)**
    - [ ] 搭建灵感瀑布流页面。
    - [ ] **Mock Data**: 暂时手动录入 10-20 条高质量的“品味灵感”数据（含标题、标签、骨架结构）。
    - [ ] 实现灵感详情页：展示“爆款逻辑拆解”而非原文。
    - [ ] 实现“一键引用”: 点击灵感 -> 创建草稿 -> 自动填入骨架。

## Phase 3: 核心功能 - 沉浸式编辑器 (Immersive Editor) - Day 6-10

- [ ] **Tiptap 基础集成**
    - [ ] 初始化编辑器实例。
    - [ ] 自定义样式：去除默认边框，调整行高、字间距，实现“纸感”。
    - [ ] 实现基础格式工具 (H1, H2, Bold, Quote) - *使用浮动菜单 (Bubble Menu) 而非固定顶栏*。
- [ ] **AI 交互实现 (The "Magic")**
    - [ ] **指令面板 (Command Palette)**: 输入 `/` 唤起 AI 菜单 (续写、润色、起标题)。
    - [ ] **流式润色**: 选中文字 -> 点击润色 -> AI 流式输出建议 -> 用户确认/拒绝。
    - [ ] **侧边流 (Side Stream)**: 实现右侧隐形侧边栏，用于与 AI 对话和展示建议。
- [ ] **多模态视图**
    - [ ] 实现“图文模式”与“脚本模式”的切换。
    - [ ] 脚本模式下，将文档渲染为分镜卡片流。

## Phase 4: 核心功能 - 品味决策复盘 (Taste Feedback) - Day 11-13

- [ ] **诊断系统**
    - [ ] **AI**: 编写“人设一致性”和“节奏分析”的 Prompt。
    - [ ] 实现“一键诊断”按钮：发送文档内容 -> AI 分析 -> 返回 JSON。
- [ ] **可视化报告**
    - [ ] 使用 Recharts 或类似库绘制“情绪波形图”和“雷达图”。
    - [ ] 实现“复盘卡片”：允许用户输入创作心得。
- [ ] **数据持久化**
    - [ ] 将诊断报告和复盘记录保存到数据库。

## Phase 5: 优化与发布 (Polish & Launch) - Day 14

- [ ] **全链路测试**: 模拟用户从“创建人设”到“复盘”的完整流程。
- [ ] **性能优化**: 优化编辑器加载速度，减少 AI 响应延迟。
- [ ] **部署**: 部署到 Vercel。
- [ ] **文档**: 编写 README 和简单的用户指南。

---

## 待确认事项 (To Discuss)
1.  是否需要先做一个简单的 Landing Page (落地页) 来收集早期用户邮箱？
2.  Mock 数据的来源：您是否有偏好的特定领域（如生活方式、职场、科技）作为 MVP 的演示样本？