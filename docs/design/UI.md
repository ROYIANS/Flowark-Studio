UI 设计语言规范 v1.0

1. 设计哲学 (Design Philosophy)

核心关键词：温暖 (Warmth)、呼吸 (Breathing)、去框化 (De-boxing)、纸感 (Paper-like)

拒绝科技冷感：不使用冷蓝、霓虹色、深黑模式。

拒绝过度容器：能用留白和线条分割的内容，绝不使用卡片（Card）或边框盒子。

拒绝视觉噪音：不使用渐变色、不使用弥散光、不使用复杂的投影。

像杂志一样排版：强调文字的层级（字号、字重、衬线体），让内容本身成为界面主体。

2. 色彩系统 (Color System)

我们使用一套源自自然陶土与纸张的暖色系。

2.1 基础色 (Base)

背景色 (Canvas): #FDFCF8

说明：通体使用的暖白色，模拟高档道林纸的质感。不要使用纯白 #FFFFFF。

分割线 (Divider): #EBE5E0

说明：极淡的暖灰色，用于隐形分割。

2.2 品牌色 (Brand)

主色 (Primary - Terracotta): #E86435

说明：陶土橙。代表热情、行动与创造力。用于主要按钮、高亮文字、图标点缀。

交互悬停 (Hover/Secondary): #F2E8E3

说明：极淡的陶土色。用于鼠标悬停背景、次级按钮背景。

2.3 文字色 (Typography)

主要文本 (Primary Text): #2D2A26

说明：近黑色，带一点点暖调。用于标题、正文。严禁使用纯黑 #000000。

次要文本 (Secondary Text): #8E8780

说明：暖灰色。用于说明文字、副标题、未选中状态。

3. 排版系统 (Typography)

3.1 字体选择

标题 (Headings): 使用 Serif (衬线体)。

目的：营造杂志的高级感和文学感。

应用：页面大标题 (H1)、模块标题 (H2)。

正文/UI (Body/UI): 使用 Sans-serif (无衬线体)。

目的：保证清晰的阅读体验和现代感。

应用：按钮文字、列表内容、正文编辑。

3.2 层级规范

H1 (页面标题): text-4xl 或 text-5xl, font-serif, #2D2A26。

H2 (模块标题): text-2xl 或 text-3xl, font-serif, #2D2A26。

Label (小标签): text-xs, font-bold, uppercase, tracking-widest (大写字母+宽字间距), #E86435。

4. 布局与组件 (Layout & Components)

4.1 去卡片化列表 (The "HoverRow")

这是本设计语言的核心特征。

结构：全宽 (Full-width) 布局，只有上下分割线，左右无边框。

交互：鼠标悬停时，背景色平滑过渡为 #F2E8E3 (透明度50%或实色)。

动效：悬停时，行内的图标（如箭头）或操作按钮才显现，或发生位移（如向右移动 2px）。

禁止：禁止给列表项加阴影、圆角边框。

4.2 按钮 (Buttons)

形状：rounded-full (全圆角/胶囊形)。

质感：Matte (哑光)。无渐变，无高光，无厚重阴影。

Primary: 背景 #2D2A26 (黑) 或 #E86435 (橙)，文字白。

Secondary: 背景 #F2E8E3 (淡陶)，文字 #E86435。

Text Link: 带有下划线 underline decoration-1，悬停时下划线变色。

4.3 图标 (Icons)

风格：Lucide 或类似线条图标。

粗细：stroke-width={2} (中等) 或 stroke-width={1.5} (细致)。

颜色：默认使用次要文本色 #8E8780，激活/悬停使用主色 #E86435。

5. 交互原则 (Interaction Principles)

所见即所得 (WYSIWYG)：编辑内容时，不要弹出复杂的模态框 (Modal)，尽量在当前页面直接编辑（如 Notion）。

微交互 (Micro-interactions)：

按钮点击要有 active:scale-95 (轻微缩放)。

页面切换要有 animate-in fade-in (柔和淡入)。

引导性：空状态不要只放图标，要放“下一步行动”的按钮（如“创建新人设”）。

6. 错误示范 (Don'ts) ❌

❌ 不要使用：纯黑色 #000000 作为文字。

❌ 不要使用：任何形式的渐变色按钮。

❌ 不要使用：卡片式布局（即带有 shadow, rounded, border 的方块容器）。

❌ 不要使用：Emoji (💡) 作为主要图标，请使用线条图标 (Lucide Zap)。

❌ 不要使用：冷色调（如科技蓝、青色），除非用于第三方品牌色（如“图文笔记”那个蓝色图标例外，但背景要是淡色）。