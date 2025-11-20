# UI/UX 界面开发规范 v1.0

## 目录

1. [设计哲学与原则](#1-设计哲学与原则)
2. [色彩系统实现](#2-色彩系统实现)
3. [排版系统实现](#3-排版系统实现)
4. [布局与组件规范](#4-布局与组件规范)
5. [交互动效实现](#5-交互动效实现)
6. [组件开发指南](#6-组件开发指南)
7. [UX 用户体验准则](#7-ux-用户体验准则)
8. [代码规范与最佳实践](#8-代码规范与最佳实践)
9. [常见错误与禁止项](#9-常见错误与禁止项)

---

## 1. 设计哲学与原则

### 1.1 核心关键词

在开发任何界面时,必须时刻牢记这四个核心关键词:

- **温暖 (Warmth)**: 使用暖色调,避免冷蓝和深黑
- **呼吸 (Breathing)**: 给内容留白,让界面有呼吸感
- **去框化 (De-boxing)**: 能用留白和线条的,绝不使用卡片容器
- **纸感 (Paper-like)**: 模拟纸张质感,营造自然书写体验

### 1.2 设计禁忌

开发时必须严格遵守以下禁忌:

```typescript
// ❌ 错误示例 - 禁止使用
const FORBIDDEN_STYLES = {
  // 禁止冷色调
  coldColors: ['#0066FF', '#00FFFF', '#667788'],

  // 禁止纯黑纯白
  pureColors: ['#000000', '#FFFFFF'],

  // 禁止使用渐变
  gradients: 'linear-gradient(...)',

  // 禁止使用弥散光效果
  glowEffects: 'drop-shadow(...)',

  // 禁止复杂阴影
  complexShadows: '0 20px 60px rgba(...)'
};
```

### 1.3 杂志式排版思维

界面应该像杂志而非软件:

- **文字即内容**: 文字本身是界面主体,不是填充物
- **层级分明**: 通过字号、字重、字体类型建立清晰层级
- **留白克制**: 用空间引导视觉,而非用框线分割
- **呼吸节奏**: 内容区块之间要有舒适的间距

---

## 2. 色彩系统实现

### 2.1 色彩变量定义

在 `tailwind.config.js` 或 CSS 变量中定义:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // 基础色
        canvas: '#FDFCF8',      // 背景色 (暖白纸张)
        divider: '#EBE5E0',     // 分割线 (极淡暖灰)

        // 品牌色
        terracotta: {
          DEFAULT: '#E86435',   // 主色 (陶土橙)
          hover: '#F2E8E3',     // 悬停/次级色
        },

        // 文字色
        text: {
          primary: '#2D2A26',   // 主要文本 (近黑暖调)
          secondary: '#8E8780', // 次要文本 (暖灰)
        }
      }
    }
  }
}
```

### 2.2 在组件中使用色彩

```tsx
// ✅ 正确示例
export const Component = () => (
  <div className="bg-canvas text-text-primary">
    <h1 className="text-terracotta">标题</h1>
    <p className="text-text-secondary">描述文字</p>
    <button className="bg-terracotta hover:bg-terracotta-hover">
      按钮
    </button>
  </div>
);

// ❌ 错误示例 - 不要使用硬编码颜色值
<div style={{ backgroundColor: '#FDFCF8' }}> // 不推荐
<div className="bg-[#FDFCF8]"> // 勉强可用,但优先使用语义化命名
```

### 2.3 色彩使用准则

| 场景 | 使用颜色 | Tailwind 类名 |
|------|---------|--------------|
| 页面背景 | `#FDFCF8` | `bg-canvas` |
| 主要文本 | `#2D2A26` | `text-text-primary` |
| 次要文本/说明 | `#8E8780` | `text-text-secondary` |
| 主要按钮 | `#2D2A26` 或 `#E86435` | `bg-text-primary` / `bg-terracotta` |
| 次级按钮 | `#F2E8E3` | `bg-terracotta-hover` |
| 悬停状态 | `#F2E8E3` | `hover:bg-terracotta-hover` |
| 高亮/强调 | `#E86435` | `text-terracotta` |
| 分割线 | `#EBE5E0` | `border-divider` |

---

## 3. 排版系统实现

### 3.1 字体配置

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        serif: ['Merriweather', 'Noto Serif SC', 'STSong', 'serif'],
      }
    }
  }
}
```

```css
/* index.css - 引入字体 */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&display=swap');

/* 或使用本地字体 */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
```

### 3.2 文字层级规范

```tsx
// ✅ 正确的排版层级实现
export const TypographyExamples = () => (
  <div>
    {/* H1 - 页面主标题 */}
    <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif font-bold text-text-primary leading-tight">
      页面大标题
    </h1>

    {/* H2 - 模块标题 */}
    <h2 className="text-3xl md:text-4xl font-serif font-medium text-text-primary mb-6">
      模块标题
    </h2>

    {/* H3 - 小节标题 */}
    <h3 className="text-xl md:text-2xl font-serif text-text-primary mb-4">
      小节标题
    </h3>

    {/* Label - 小标签 */}
    <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
      Label Text
    </span>

    {/* Body - 正文 */}
    <p className="text-base md:text-lg leading-relaxed text-text-primary font-light">
      正文内容使用无衬线字体,保证可读性。
    </p>

    {/* Secondary Text - 次要文本 */}
    <p className="text-sm text-text-secondary">
      说明文字或辅助信息
    </p>
  </div>
);
```

### 3.3 字体使用决策树

```
是标题/模块名?
  ├─ 是 → 使用 font-serif (衬线体)
  │      └─ 大标题: text-4xl ~ text-8xl + font-bold
  │      └─ 中标题: text-2xl ~ text-3xl + font-medium
  │
  └─ 否 → 使用 font-sans (无衬线体)
         ├─ 按钮/UI: font-medium
         ├─ 正文: font-normal 或 font-light
         └─ 小标签: font-bold + uppercase
```

---

## 4. 布局与组件规范

### 4.1 HoverRow 组件 (核心组件)

这是本设计语言的核心特征 - 去卡片化列表。

#### 基础实现

```tsx
// src/components/ui/HoverRow.tsx
interface HoverRowProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const HoverRow: React.FC<HoverRowProps> = ({
  children,
  onClick,
  className = ""
}) => (
  <div
    onClick={onClick}
    className={`
      group
      w-full
      transition-all
      duration-500
      border-b
      border-divider
      last:border-0
      cursor-pointer
      hover:bg-terracotta-hover/30
      hover:pl-4
      ${className}
    `}
  >
    {children}
  </div>
);
```

#### 使用场景与示例

```tsx
// ✅ 正确使用 - 人设列表
<div className="border-t border-divider">
  {personas.map(persona => (
    <HoverRow
      key={persona.id}
      onClick={() => handleSelect(persona)}
      className="py-6 flex items-center justify-between"
    >
      <div className="flex items-center gap-6">
        <Avatar name={persona.name} />
        <div>
          <h3 className="text-xl font-medium text-text-primary mb-1
                         group-hover:text-terracotta transition-colors">
            {persona.name}
          </h3>
          <p className="text-sm text-text-secondary">{persona.niche}</p>
        </div>
      </div>
      <ArrowRight
        size={20}
        className="text-terracotta opacity-0 group-hover:opacity-100
                   transition-all transform translate-x-2
                   group-hover:translate-x-0"
      />
    </HoverRow>
  ))}
</div>
```

#### HoverRow 设计要点

| 特性 | 实现方式 | 必须遵守 |
|------|---------|---------|
| **全宽布局** | `w-full` | ✅ 必须 |
| **只有上下分割线** | `border-b border-divider` | ✅ 必须 |
| **无左右边框** | 不添加 `border-x` | ✅ 禁止 |
| **悬停背景** | `hover:bg-terracotta-hover/30` | ✅ 必须 |
| **悬停时左侧缩进** | `hover:pl-4` | 推荐 |
| **动效时长** | `duration-500` (0.5秒) | 推荐 |
| **操作按钮隐藏** | `opacity-0 group-hover:opacity-100` | ✅ 必须 |
| **禁止阴影** | 不添加 `shadow` | ✅ 禁止 |
| **禁止圆角** | 不添加 `rounded` | ✅ 禁止 |

### 4.2 Button 组件

#### 完整实现

```tsx
// src/components/ui/Button.tsx
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text' | 'icon' | 'ghost';
  icon?: LucideIcon;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon: Icon,
  className = '',
  disabled = false,
  ...props
}) => {
  const variants = {
    // 主要按钮: 深色或橙色背景
    primary: `
      bg-text-primary text-white
      hover:bg-terracotta
      transition-colors
      rounded-full
      px-6 py-3
      font-medium
    `,

    // 次级按钮: 淡陶土背景
    secondary: `
      bg-terracotta-hover
      text-terracotta
      hover:bg-terracotta
      hover:text-white
      transition-colors
      rounded-full
      px-5 py-2
      font-medium
      text-sm
    `,

    // 文字链接: 带下划线
    text: `
      text-text-primary
      hover:text-terracotta
      font-medium
      px-0
      underline
      decoration-1
      decoration-divider
      hover:decoration-terracotta
      underline-offset-4
      transition-all
    `,

    // 图标按钮: 圆形
    icon: `
      w-10 h-10
      rounded-full
      flex items-center justify-center
      hover:bg-terracotta-hover
      text-text-primary
      transition-colors
    `,

    // Ghost 按钮: 透明背景
    ghost: `
      text-text-secondary
      hover:text-text-primary
      transition-colors
      flex items-center gap-2
    `
  };

  return (
    <button
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2
        active:scale-95
        transition-transform
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon size={18} strokeWidth={2} />}
      {children}
    </button>
  );
};
```

#### 按钮变体使用指南

```tsx
// ✅ Primary - 主要操作
<Button variant="primary" onClick={handleSubmit}>
  立即开始
</Button>

// ✅ Secondary - 次级操作
<Button variant="secondary" onClick={handleEdit}>
  编辑
</Button>

// ✅ Text - 文字链接
<Button variant="text" onClick={handleRefresh} icon={RefreshCcw}>
  换一批
</Button>

// ✅ Icon - 纯图标按钮
<Button variant="icon" onClick={handleClose}>
  <X size={18} />
</Button>

// ✅ Ghost - 轻量操作
<Button variant="ghost" onClick={handleMore}>
  查看更多
</Button>
```

#### 按钮设计要点

| 特性 | 实现 | 说明 |
|------|------|------|
| **形状** | `rounded-full` | 必须使用全圆角(胶囊形) |
| **质感** | 无渐变,无高光 | 保持哑光(Matte)质感 |
| **点击反馈** | `active:scale-95` | 轻微缩放提供触感反馈 |
| **禁用状态** | `disabled:opacity-50` | 降低透明度 |
| **过渡动画** | `transition-colors` / `transition-transform` | 所有状态变化都应平滑 |
| **禁止阴影** | 不添加 `shadow` | ❌ 禁止 |

### 4.3 Avatar 组件

```tsx
// src/components/ui/Avatar.tsx
interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  src?: string; // 可选: 头像图片
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 'md',
  src
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl'
  };

  return src ? (
    <img
      src={src}
      alt={name}
      className={`${sizes[size]} rounded-full object-cover shrink-0`}
    />
  ) : (
    <div className={`
      ${sizes[size]}
      rounded-full
      bg-divider
      text-text-secondary
      flex items-center justify-center
      font-serif font-bold
      shrink-0
    `}>
      {name[0]}
    </div>
  );
};
```

### 4.4 页面布局模式

#### 模式 1: 居中内容布局 (Landing Page)

```tsx
export const LandingLayout = () => (
  <div className="bg-canvas min-h-screen flex flex-col items-center">
    {/* 顶部导航 */}
    <header className="w-full max-w-7xl px-6 md:px-8 py-6">
      {/* ... */}
    </header>

    {/* 内容区 */}
    <main className="w-full max-w-4xl px-6 py-24">
      {/* ... */}
    </main>

    {/* 页脚 */}
    <footer className="w-full max-w-7xl px-8 py-10 border-t border-divider">
      {/* ... */}
    </footer>
  </div>
);
```

#### 模式 2: 侧边栏 + 内容布局 (Dashboard)

```tsx
export const DashboardLayout = () => (
  <div className="flex min-h-screen bg-canvas">
    {/* 左侧导航 */}
    <aside className="w-64 border-r border-divider sticky top-0 h-screen p-8">
      {/* 导航内容 */}
    </aside>

    {/* 右侧主内容区 */}
    <main className="flex-1 p-6 md:p-12 max-w-4xl">
      {/* 主要内容 */}
    </main>
  </div>
);
```

#### 模式 3: 编辑器布局 (Editor)

```tsx
export const EditorLayout = () => (
  <div className="min-h-screen bg-canvas flex flex-col">
    {/* 顶部工具栏 - 粘性定位 */}
    <div className="h-16 px-6 border-b border-divider
                    bg-canvas/90 backdrop-blur sticky top-0 z-10">
      {/* 工具栏 */}
    </div>

    <div className="flex-1 flex">
      {/* 主编辑区 */}
      <main className="flex-1 p-8 md:p-16 max-w-4xl mx-auto">
        {/* 编辑器 */}
      </main>

      {/* 右侧辅助栏 (可选) */}
      <aside className="w-72 border-l border-divider p-8 hidden xl:block">
        {/* AI 建议等 */}
      </aside>
    </div>
  </div>
);
```

---

## 5. 交互动效实现

### 5.1 微交互原则

所有交互动效必须遵循:

- **轻量**: 动画时长 300-500ms
- **自然**: 使用 ease-in-out 或 cubic-bezier
- **目的明确**: 每个动画都应传达明确信息
- **性能优先**: 优先使用 transform 和 opacity

### 5.2 常用动效实现

#### 按钮点击

```tsx
// ✅ 轻微缩放
<button className="active:scale-95 transition-transform duration-150">
  点击我
</button>
```

#### 悬停显示

```tsx
// ✅ 从隐藏到显示 + 位移
<div className="group relative">
  <div className="content">主要内容</div>
  <button className="
    opacity-0
    group-hover:opacity-100
    translate-x-2
    group-hover:translate-x-0
    transition-all
    duration-300
  ">
    操作按钮
  </button>
</div>
```

#### 页面切换

```tsx
// ✅ 淡入淡出 + 上滑
<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
  页面内容
</div>

// 需要配置 tailwindcss-animate 插件
```

#### 悬停背景色变化

```tsx
// ✅ 平滑过渡
<div className="
  bg-transparent
  hover:bg-terracotta-hover/30
  transition-colors
  duration-500
">
  悬停我
</div>
```

### 5.3 加载状态

```tsx
// ✅ 旋转加载指示器
export const LoadingSpinner = () => (
  <div className="min-h-screen bg-canvas flex flex-col items-center justify-center">
    <div className="
      w-16 h-16
      border-4
      border-terracotta-hover
      border-t-terracotta
      rounded-full
      animate-spin
      mb-8
    "></div>
    <h2 className="text-2xl font-serif text-text-primary mb-2">
      正在构思...
    </h2>
    <p className="text-text-secondary">
      AI 正在为您注入灵感
    </p>
  </div>
);
```

### 5.4 通知/Toast 组件

```tsx
// ✅ 品味印记通知示例
export const TasteImprintNotification: React.FC<{
  points: number;
  message: string;
}> = ({ points, message }) => (
  <div className="
    fixed top-6 right-6
    bg-white
    border border-divider
    px-6 py-4
    flex items-center gap-3
    animate-in slide-in-from-top-2 fade-in
    duration-300
    shadow-sm
  ">
    <Sparkles size={20} className="text-terracotta" />
    <div>
      <p className="text-sm font-medium text-text-primary">
        +{points} 品味印记
      </p>
      <p className="text-xs text-text-secondary">{message}</p>
    </div>
  </div>
);
```

---

## 6. 组件开发指南

### 6.1 图标使用规范

项目统一使用 `lucide-react` 图标库。

```tsx
import { TrendingUp, Eye, Sparkles } from 'lucide-react';

// ✅ 正确使用
<Sparkles
  size={20}              // 大小: 16/18/20/24
  strokeWidth={1.5}      // 粗细: 1.5(细致) 或 2(中等)
  className="text-terracotta"
/>

// ✅ 根据状态变化颜色
<Eye
  size={18}
  className="text-text-secondary group-hover:text-terracotta transition-colors"
/>
```

#### 图标大小指南

| 场景 | 尺寸 | strokeWidth |
|------|------|-------------|
| 正文内联 | 16 | 1.5 |
| 按钮图标 | 18 | 2 |
| 标题旁边 | 20 | 1.5 |
| 功能卡片 | 32 | 1.5 |

#### 禁止使用 Emoji

```tsx
// ❌ 错误 - 不要使用 Emoji
<span>💡</span>

// ✅ 正确 - 使用线条图标
<Lightbulb size={20} className="text-terracotta" />
```

### 6.2 表单输入组件

```tsx
// ✅ 符合设计语言的输入框
export const Input: React.FC<{
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}> = ({ placeholder, value, onChange, type = 'text' }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="
      w-full
      px-0 py-3
      bg-transparent
      border-b border-divider
      focus:border-terracotta
      outline-none
      text-text-primary
      placeholder-text-secondary/50
      transition-colors
      duration-300
    "
  />
);

// ✅ 文本域
export const Textarea: React.FC<{
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}> = ({ placeholder, value, onChange, rows = 5 }) => (
  <textarea
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    rows={rows}
    className="
      w-full
      px-0 py-3
      bg-transparent
      border-b border-divider
      focus:border-terracotta
      outline-none
      text-text-primary
      placeholder-text-secondary/50
      resize-none
      transition-colors
      duration-300
      selection:bg-terracotta-hover
      selection:text-terracotta
    "
  />
);
```

### 6.3 Modal/对话框 (尽量避免使用)

根据设计原则,"所见即所得",应尽量避免使用 Modal。如果必须使用:

```tsx
// ✅ 极简 Modal 实现
export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm
                 flex items-center justify-center z-50
                 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-canvas border border-divider p-8 max-w-lg w-full
                   animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
```

---

## 7. UX 用户体验准则

### 7.1 所见即所得 (WYSIWYG)

- 编辑内容时,直接在当前页面编辑,不弹出复杂模态框
- 参考 Notion 的编辑体验
- 操作结果应立即可见

```tsx
// ✅ 正确 - 行内编辑
<input
  className="w-full text-4xl font-serif bg-transparent outline-none"
  defaultValue="这才是成年人顶级的自律:断舍离"
/>

// ❌ 错误 - 弹出编辑对话框
<Modal>
  <input value="标题" />
  <button>确认修改</button>
</Modal>
```

### 7.2 引导性原则

**空状态设计**:

```tsx
// ✅ 正确 - 提供明确的下一步行动
export const EmptyState = () => (
  <div className="text-center py-24">
    <Inbox size={64} className="text-divider mx-auto mb-6" strokeWidth={1} />
    <h3 className="text-2xl font-serif text-text-primary mb-4">
      还没有创作内容
    </h3>
    <p className="text-text-secondary mb-8">
      从灵感开始,创造你的第一篇内容
    </p>
    <Button variant="primary" onClick={handleCreate} icon={Plus}>
      创建新人设
    </Button>
  </div>
);

// ❌ 错误 - 只放图标,无引导
<div>
  <Inbox size={64} />
  <p>暂无数据</p>
</div>
```

### 7.3 反馈机制

#### 操作反馈

- 按钮点击: `active:scale-95`
- 悬停: 背景色变化 + 操作按钮显现
- 加载: 旋转加载器 + 文字说明

#### 用户输入验证

```tsx
// ✅ 实时验证反馈
export const ValidatedInput = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  return (
    <div>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value.length < 3) {
            setError('至少输入 3 个字符');
          } else {
            setError('');
          }
        }}
        className={`
          w-full border-b transition-colors
          ${error ? 'border-red-400' : 'border-divider focus:border-terracotta'}
        `}
      />
      {error && (
        <p className="text-xs text-red-400 mt-2 animate-in fade-in duration-200">
          {error}
        </p>
      )}
    </div>
  );
};
```

### 7.4 品味印记系统 (特色UX)

这是项目的特色用户体验机制,用于记录用户偏好和行为。

```tsx
// ✅ 品味印记交互实现
const [showNotification, setShowNotification] = useState(false);
const [totalImprints, setTotalImprints] = useState(47);

const handleLike = (id: number) => {
  if (!liked.includes(id)) {
    setLiked([...liked, id]);
    setTotalImprints(totalImprints + 1);

    // 显示通知
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }
};

// 徽章显示
<TasteImprintBadge totalPoints={totalImprints} onClick={handleViewMap} />

// 通知提示
{showNotification && (
  <TasteImprintNotification
    points={1}
    message="AI记录了你的偏好"
  />
)}
```

### 7.5 响应式设计准则

```tsx
// ✅ 移动端优先的响应式布局
<div className="
  px-4 md:px-8 lg:px-12          // 间距递增
  text-base md:text-lg lg:text-xl // 字号递增
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 // 布局变化
">
  {/* 内容 */}
</div>

// ✅ 隐藏/显示元素
<aside className="hidden md:block"> // 小屏隐藏
<div className="flex md:hidden"> // 仅小屏显示
```

#### 断点使用

| 断点 | Tailwind 前缀 | 最小宽度 | 使用场景 |
|------|--------------|---------|---------|
| 默认 | (无) | < 640px | 移动端 |
| sm | `sm:` | ≥ 640px | 大屏手机 |
| md | `md:` | ≥ 768px | 平板 |
| lg | `lg:` | ≥ 1024px | 桌面 |
| xl | `xl:` | ≥ 1280px | 大屏桌面 |

---

## 8. 代码规范与最佳实践

### 8.1 组件结构

```tsx
// ✅ 推荐的组件结构
import React, { useState } from 'react';
import { Icon1, Icon2 } from 'lucide-react';
import { Button } from './ui/Button';

// 1. 类型定义
interface ComponentProps {
  title: string;
  onAction?: () => void;
  variant?: 'default' | 'compact';
}

// 2. 子组件/辅助组件
const SubComponent: React.FC<{ data: string }> = ({ data }) => (
  <div>{data}</div>
);

// 3. 主组件
export const Component: React.FC<ComponentProps> = ({
  title,
  onAction,
  variant = 'default'
}) => {
  // 4. Hooks
  const [state, setState] = useState(false);

  // 5. 事件处理函数
  const handleClick = () => {
    setState(true);
    onAction?.();
  };

  // 6. 渲染
  return (
    <div className="...">
      <h2>{title}</h2>
      <Button onClick={handleClick}>操作</Button>
    </div>
  );
};
```

### 8.2 样式组织

#### 使用 Tailwind 工具类

```tsx
// ✅ 推荐 - 使用 Tailwind 类名
<div className="flex items-center gap-4 p-6 hover:bg-terracotta-hover">

// ⚠️ 不推荐 - 内联样式
<div style={{ display: 'flex', padding: '24px' }}>

// ❌ 避免 - 不必要的自定义 CSS
<div className="custom-container"> // 除非样式特别复杂
```

#### 条件样式

```tsx
// ✅ 使用模板字符串组合类名
<div className={`
  base-class
  ${isActive ? 'bg-terracotta text-white' : 'bg-transparent text-text-primary'}
  ${size === 'large' ? 'text-2xl' : 'text-base'}
`}>

// ✅ 使用 clsx 或 classnames 库(可选)
import clsx from 'clsx';

<div className={clsx(
  'base-class',
  isActive && 'bg-terracotta',
  size === 'large' && 'text-2xl'
)}>
```

### 8.3 性能优化

```tsx
// ✅ 使用 React.memo 避免不必要的重渲染
export const ExpensiveComponent = React.memo<Props>(({ data }) => {
  return <div>{/* 复杂渲染逻辑 */}</div>;
});

// ✅ 使用 useCallback 缓存事件处理函数
const handleClick = useCallback(() => {
  // 处理逻辑
}, [dependencies]);

// ✅ 使用 useMemo 缓存计算结果
const filteredData = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);
```

### 8.4 可访问性 (Accessibility)

```tsx
// ✅ 提供 aria 标签
<button
  aria-label="关闭对话框"
  onClick={handleClose}
>
  <X size={18} />
</button>

// ✅ 键盘导航支持
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  onClick={handleClick}
>

// ✅ 语义化 HTML
<article>
  <header>
    <h2>标题</h2>
  </header>
  <main>
    <p>内容</p>
  </main>
</article>
```

---

## 9. 常见错误与禁止项

### 9.1 色彩使用错误

```tsx
// ❌ 错误示例
<div className="bg-black text-white"> // 使用纯黑
<div className="bg-blue-500"> // 使用冷蓝色
<div className="bg-gradient-to-r from-purple-500 to-pink-500"> // 使用渐变
<button className="shadow-2xl"> // 复杂阴影

// ✅ 正确示例
<div className="bg-text-primary text-white"> // 使用 #2D2A26
<div className="bg-terracotta"> // 使用品牌色
<div className="bg-canvas"> // 使用背景色
<button className="shadow-sm"> // 最多使用极淡阴影(如必要)
```

### 9.2 布局容器错误

```tsx
// ❌ 错误 - 卡片式布局
<div className="rounded-lg shadow-lg border p-6 bg-white">
  内容
</div>

// ✅ 正确 - 去框化
<div className="border-b border-divider py-6">
  内容
</div>

// ❌ 错误 - 过度使用容器
<div className="container">
  <div className="wrapper">
    <div className="box">
      内容
    </div>
  </div>
</div>

// ✅ 正确 - 极简容器
<div className="max-w-4xl mx-auto px-6">
  内容
</div>
```

### 9.3 图标使用错误

```tsx
// ❌ 错误
<span>💡</span> // 使用 Emoji
<FontAwesomeIcon icon={...} /> // 使用其他图标库
<img src="icon.svg" /> // 使用 SVG 文件

// ✅ 正确
<Lightbulb size={20} className="text-terracotta" /> // 使用 Lucide React
```

### 9.4 动画过度

```tsx
// ❌ 错误 - 过度动画
<div className="animate-bounce animate-pulse animate-spin"> // 多个动画
<div className="transition-all duration-2000"> // 过长时长

// ✅ 正确 - 轻量动画
<div className="transition-colors duration-300">
<div className="animate-in fade-in duration-500">
```

### 9.5 文字排版错误

```tsx
// ❌ 错误
<h1 className="font-sans"> // 标题使用无衬线
<button className="font-serif"> // 按钮使用衬线
<p className="text-black"> // 使用纯黑文字

// ✅ 正确
<h1 className="font-serif text-text-primary">
<button className="font-sans">
<p className="text-text-primary">
```

---

## 10. 检查清单 (Checklist)

开发新组件或页面时,请对照此清单:

### 色彩检查
- [ ] 背景使用 `#FDFCF8` (`bg-canvas`)
- [ ] 主要文本使用 `#2D2A26` (`text-text-primary`)
- [ ] 次要文本使用 `#8E8780` (`text-text-secondary`)
- [ ] 品牌色使用 `#E86435` (`text-terracotta`)
- [ ] 没有使用纯黑 `#000000` 或纯白 `#FFFFFF`
- [ ] 没有使用冷色调(蓝、青等)
- [ ] 没有使用渐变色

### 排版检查
- [ ] 标题使用衬线字体 (`font-serif`)
- [ ] 正文/UI 使用无衬线字体 (`font-sans`)
- [ ] 字号层级清晰 (H1 > H2 > H3 > Body)
- [ ] 小标签使用大写 + 字母间距 (`uppercase tracking-widest`)

### 布局检查
- [ ] 列表使用 `HoverRow`,不使用卡片
- [ ] 没有使用不必要的边框盒子
- [ ] 分割线使用 `border-divider`
- [ ] 留白充足,有呼吸感

### 组件检查
- [ ] 按钮使用 `rounded-full` (胶囊形)
- [ ] 图标使用 `lucide-react`
- [ ] 图标粗细为 `strokeWidth={1.5}` 或 `{2}`
- [ ] 没有使用 Emoji

### 交互检查
- [ ] 按钮有 `active:scale-95` 点击反馈
- [ ] 悬停有 `hover:` 状态变化
- [ ] 页面切换有淡入动画
- [ ] 操作按钮默认隐藏,悬停显示
- [ ] 动画时长合理 (300-500ms)

### UX 检查
- [ ] 空状态有明确的下一步操作引导
- [ ] 加载状态有加载指示器 + 文字说明
- [ ] 表单有实时验证反馈
- [ ] 操作有即时反馈
- [ ] 移动端适配良好

### 可访问性检查
- [ ] 按钮有 `aria-label`
- [ ] 可键盘导航
- [ ] 颜色对比度符合 WCAG AA 标准
- [ ] 使用语义化 HTML

---

## 附录: 快速参考

### A. 常用 Tailwind 类名组合

```css
/* 页面容器 */
.page-container {
  @apply bg-canvas min-h-screen;
}

/* 内容区域 */
.content-wrapper {
  @apply max-w-4xl mx-auto px-6 py-12;
}

/* 标题样式 */
.heading-1 {
  @apply text-4xl md:text-6xl font-serif font-bold text-text-primary;
}

.heading-2 {
  @apply text-2xl md:text-4xl font-serif font-medium text-text-primary;
}

/* 正文样式 */
.body-text {
  @apply text-base md:text-lg leading-relaxed text-text-primary font-light;
}

/* 次要文本 */
.secondary-text {
  @apply text-sm text-text-secondary;
}

/* 分割线 */
.divider {
  @apply border-b border-divider;
}
```

### B. 设计 Token 速查

| Token | 值 | Tailwind 类名 |
|-------|---|--------------|
| **色彩** |
| Canvas | `#FDFCF8` | `bg-canvas` |
| Divider | `#EBE5E0` | `border-divider` |
| Terracotta | `#E86435` | `bg-terracotta` / `text-terracotta` |
| Terracotta Hover | `#F2E8E3` | `bg-terracotta-hover` |
| Text Primary | `#2D2A26` | `text-text-primary` |
| Text Secondary | `#8E8780` | `text-text-secondary` |
| **字体** |
| Sans-serif | Inter / PingFang SC | `font-sans` |
| Serif | Merriweather / Noto Serif SC | `font-serif` |
| **间距** |
| Extra Small | 0.5rem (8px) | `p-2` / `gap-2` |
| Small | 1rem (16px) | `p-4` / `gap-4` |
| Medium | 1.5rem (24px) | `p-6` / `gap-6` |
| Large | 2rem (32px) | `p-8` / `gap-8` |
| Extra Large | 3rem (48px) | `p-12` / `gap-12` |
| **圆角** |
| Full (按钮/Avatar) | 9999px | `rounded-full` |
| None (容器) | 0 | `rounded-none` |
| **动画时长** |
| Fast | 150ms | `duration-150` |
| Normal | 300ms | `duration-300` |
| Slow | 500ms | `duration-500` |

---

## 总结

本规范文档旨在确保所有开发者在实现界面时,能够严格遵循"浮光手记"的设计语言:

1. **温暖、呼吸、去框化、纸感** - 四大核心原则
2. **杂志式排版** - 文字即内容,层级分明
3. **HoverRow 核心组件** - 去卡片化列表的标志性实现
4. **轻量微交互** - 自然、克制的动效
5. **所见即所得** - 直接编辑,减少模态框

遵循此规范,可确保整个产品保持一致的视觉语言和用户体验。

**版本**: 1.0
**最后更新**: 2025-11-20
**维护者**: Flowark Studio Team
