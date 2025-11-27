# Flowark Studio UI/UX 开发指南

本文档旨在指导开发者如何通过代码实现 `docs/design/UI.md` 中定义的“展览”风格。

---

## 1. Tailwind 配置 (Tailwind Configuration)

确保 `tailwind.config.js` 包含以下核心配置：

```javascript
theme: {
  extend: {
    colors: {
      canvas: '#FDFCF8',
      terracotta: {
        DEFAULT: '#E86435',
        light: '#F2E8E3',
      },
      text: {
        primary: '#2D2A26',
        secondary: '#8E8780',
        muted: '#BDB8B4',
      },
      divider: '#EBE5E0',
    },
    fontFamily: {
      serif: ['Playfair Display', 'Merriweather', 'serif'],
      sans: ['Inter', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    boxShadow: {
      'soft': '0 4px 20px -2px rgba(45, 42, 38, 0.04)',
      'float': '0 12px 40px -8px rgba(45, 42, 38, 0.08)',
    }
  }
}
```

## 2. 全局样式 (Global Styles)

在 `src/index.css` 中应用纸张纹理和基础排版：

```css
@layer base {
  :root {
    --paper-texture: url("data:image/svg+xml,..."); /* 噪点纹理 */
  }

  body {
    @apply bg-canvas text-text-primary font-sans antialiased;
    background-image: var(--paper-texture);
  }

  h1, h2, h3 {
    @apply font-serif font-medium tracking-tight;
  }
}
```

## 3. 核心组件实现模式

### 3.1 展签 (Label)

用于元数据、标签、面包屑。

```jsx
// ✅ 正确
<span className="text-xs font-mono uppercase tracking-widest text-text-muted">
  Figure 01
</span>

// ❌ 错误
<span className="text-sm text-gray-500">
  Figure 01
</span>
```

### 3.2 展品卡片 (Exhibit Card)

用于展示内容、灵感、作品。

```jsx
<div className="bg-white border border-divider p-8 hover:shadow-float transition-all duration-700 hover:-translate-y-1 group">
  <div className="mb-6 text-terracotta group-hover:scale-110 transition-transform duration-500">
    <Icon />
  </div>
  <h3 className="font-serif text-2xl mb-4 group-hover:text-terracotta transition-colors">
    Title
  </h3>
  <p className="text-text-secondary leading-relaxed">
    Description...
  </p>
</div>
```

### 3.3 按钮 (Curator Button)

```jsx
// Primary
<button className="px-8 py-3 bg-terracotta text-white font-serif italic tracking-wide hover:bg-terracotta-hover transition-colors shadow-soft">
  Start Creating
</button>

// Ghost / Secondary
<button className="px-6 py-3 text-text-secondary hover:text-text-primary hover:bg-terracotta-light/50 transition-colors font-mono text-xs uppercase tracking-widest">
  View Details
</button>
```

## 4. 动效规范 (Animation Guidelines)

使用 `framer-motion` 实现。

*   **页面进入**: `initial={{ opacity: 0, y: 20 }}` -> `animate={{ opacity: 1, y: 0 }}` (`duration: 0.8s`)
*   **视差滚动**: 使用 `useScroll` 和 `useTransform` 实现背景元素的缓慢移动。
*   **微交互**: `hover` 状态下的颜色过渡应至少为 `duration-300`，位置移动应为 `duration-500` 或更长，营造“重力感”。

## 5. 常见错误 (Anti-Patterns)

*   ❌ **不要使用纯黑 (`#000000`)**：使用 `text-text-primary` (`#2D2A26`)。
*   ❌ **不要使用默认阴影**：使用 `shadow-soft` 或 `shadow-float`。
*   ❌ **不要填满屏幕**：保持页面两侧至少 `px-6` (移动端) 或 `px-12` (桌面端) 的留白。
*   ❌ **不要混用字体**：标题必须是 Serif，正文必须是 Sans，标签必须是 Mono。

---

遵循以上指南，我们将共同构建一个具有高度艺术一致性的 Flowark Studio。