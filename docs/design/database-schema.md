# Flowark Studio 数据库设计

> **最后更新**: 2025-01-25
> **版本**: v2.0
> **数据库**: PostgreSQL 15+ (Supabase)

---

## 📊 数据库概览

### ER 图概览

```
users (用户) 1──多 personas (人设)
users 1──多 drafts (草稿)
users 1──多 subscriptions (订阅)
users 1──多 creator_accounts (创作者账户)

personas 1──多 drafts

drafts 1──多 article_reads (阅读记录)
drafts 1──多 article_likes (点赞)
drafts 1──多 article_bookmarks (收藏)
drafts 1──多 article_comments (评论)
drafts 1──多 tips (打赏)
drafts 1──多 article_purchases (单篇购买)
drafts 1──多 external_publishes (外部发布)

creator_accounts 1──多 monthly_earnings (月度收益)
creator_accounts 1──多 withdrawals (提现记录)
```

---

## 📋 核心表设计

### 1. users - 用户表

```sql
CREATE TABLE users (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 认证信息 (Supabase Auth管理)
  email TEXT UNIQUE NOT NULL,

  -- 用户资料
  username TEXT UNIQUE NOT NULL,  -- 用于 @username
  nickname TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,  -- 个人简介,最多500字

  -- 账户设置
  preferences JSONB DEFAULT '{}'::jsonb,  -- 用户偏好设置

  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- 索引
  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 20),
  CONSTRAINT nickname_length CHECK (char_length(nickname) >= 1 AND char_length(nickname) <= 50)
);

-- 索引
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- 更新时间触发器
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**preferences JSONB 结构示例**:
```json
{
  "theme": "light",
  "emailNotifications": true,
  "language": "zh-CN"
}
```

---

### 2. personas - 人设表

```sql
CREATE TABLE personas (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 关联用户
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- 人设信息
  name TEXT NOT NULL,  -- 人设名称
  niche TEXT,  -- 领域定位
  tone_prompt TEXT,  -- 语气提示词
  style_config JSONB DEFAULT '{}'::jsonb,  -- 风格配置

  -- 向量化 (用于灵感匹配)
  embedding VECTOR(1536),  -- OpenAI ada-002 或类似模型

  -- 状态
  is_active BOOLEAN DEFAULT FALSE,  -- 当前激活的人设

  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- 约束
  CONSTRAINT persona_name_length CHECK (char_length(name) >= 1 AND char_length(name) <= 50)
);

-- 索引
CREATE INDEX idx_personas_user_id ON personas(user_id);
CREATE INDEX idx_personas_active ON personas(user_id, is_active) WHERE is_active = TRUE;
CREATE INDEX idx_personas_embedding ON personas USING ivfflat (embedding vector_cosine_ops);

-- 更新时间触发器
CREATE TRIGGER update_personas_updated_at
  BEFORE UPDATE ON personas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 确保每个用户只有一个激活人设
CREATE UNIQUE INDEX idx_personas_one_active_per_user
  ON personas(user_id) WHERE is_active = TRUE;
```

**style_config JSONB 结构示例**:
```json
{
  "keywords": ["品味", "AI", "创作"],
  "forbidden_words": ["点赞", "关注", "老铁"],
  "tone": "温暖而专业"
}
```

---

### 3. drafts - 草稿/文章表

```sql
CREATE TABLE drafts (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 关联
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  persona_id UUID REFERENCES personas(id) ON DELETE SET NULL,
  inspiration_id UUID REFERENCES inspirations(id) ON DELETE SET NULL,

  -- 内容
  title TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,  -- Tiptap JSON格式
  cover_image_url TEXT,
  excerpt TEXT,  -- 摘要,最多200字

  -- 状态控制 ⭐ 核心字段
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'archived')),
  is_published_to_community BOOLEAN DEFAULT FALSE,  -- 是否发布到社区
  published_at TIMESTAMP WITH TIME ZONE,  -- 社区发布时间

  -- 访问控制 (Phase 2)
  access_level TEXT NOT NULL DEFAULT 'public'
    CHECK (access_level IN ('public', 'member_only', 'paid')),
  price DECIMAL(10, 2) CHECK (price >= 0),  -- 单篇付费价格

  -- 分类
  category TEXT,  -- 散文/随笔/评论/故事
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],  -- 标签数组

  -- 元数据
  reading_time INT,  -- 预计阅读时长(分钟)
  word_count INT DEFAULT 0,  -- 字数

  -- 创作意图 (品味系统)
  intent TEXT,  -- 创作前的意图记录

  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- 约束
  CONSTRAINT title_length CHECK (char_length(title) <= 200),
  CONSTRAINT excerpt_length CHECK (char_length(excerpt) <= 200)
);

-- 索引
CREATE INDEX idx_drafts_user_id ON drafts(user_id);
CREATE INDEX idx_drafts_status ON drafts(status);
CREATE INDEX idx_drafts_published ON drafts(is_published_to_community, published_at DESC)
  WHERE is_published_to_community = TRUE;
CREATE INDEX idx_drafts_category ON drafts(category) WHERE category IS NOT NULL;
CREATE INDEX idx_drafts_tags ON drafts USING GIN(tags);
CREATE INDEX idx_drafts_created_at ON drafts(created_at DESC);
CREATE INDEX idx_drafts_updated_at ON drafts(updated_at DESC);

-- 全文搜索索引
CREATE INDEX idx_drafts_title_search ON drafts USING gin(to_tsvector('chinese', title));
CREATE INDEX idx_drafts_excerpt_search ON drafts USING gin(to_tsvector('chinese', excerpt));

-- 更新时间触发器
CREATE TRIGGER update_drafts_updated_at
  BEFORE UPDATE ON drafts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**content JSONB 结构** (Tiptap JSON):
```json
{
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": { "level": 1 },
      "content": [{ "type": "text", "text": "标题" }]
    },
    {
      "type": "paragraph",
      "content": [{ "type": "text", "text": "正文内容..." }]
    }
  ]
}
```

---

### 4. subscriptions - 会员订阅表

```sql
CREATE TABLE subscriptions (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 关联用户
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- 订阅信息
  plan TEXT NOT NULL CHECK (plan IN ('monthly', 'yearly')),
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'canceled', 'expired', 'trialing')),

  -- 时间信息
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  trial_ends_at TIMESTAMP WITH TIME ZONE,  -- 试用结束时间

  -- 支付信息
  auto_renew BOOLEAN DEFAULT TRUE,
  payment_method TEXT,  -- 'wechat', 'alipay', 'stripe'

  -- 外部订阅ID (Stripe subscription ID等)
  external_subscription_id TEXT,

  -- 金额
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'CNY',

  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  canceled_at TIMESTAMP WITH TIME ZONE
);

-- 索引
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_expires_at ON subscriptions(expires_at);
CREATE UNIQUE INDEX idx_subscriptions_active_user
  ON subscriptions(user_id)
  WHERE status = 'active';

-- 更新时间触发器
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

### 5. creator_accounts - 创作者收益账户

```sql
CREATE TABLE creator_accounts (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 关联用户 (一对一)
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- 收益统计
  total_earnings DECIMAL(10, 2) DEFAULT 0 CHECK (total_earnings >= 0),  -- 总收益
  withdrawn DECIMAL(10, 2) DEFAULT 0 CHECK (withdrawn >= 0),  -- 已提现
  balance DECIMAL(10, 2) DEFAULT 0 CHECK (balance >= 0),  -- 可提现余额

  -- 支付信息
  payment_info JSONB DEFAULT '{}'::jsonb,

  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_creator_accounts_user_id ON creator_accounts(user_id);

-- 更新时间触发器
CREATE TRIGGER update_creator_accounts_updated_at
  BEFORE UPDATE ON creator_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**payment_info JSONB 结构示例**:
```json
{
  "alipay": {
    "account": "138****1234",
    "realName": "张三"
  },
  "wechat": {
    "account": "wxid_****",
    "realName": "张三"
  }
}
```

---

### 6. monthly_earnings - 月度收益记录

```sql
CREATE TABLE monthly_earnings (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 关联创作者
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- 月份 (2025-01-01)
  month DATE NOT NULL,

  -- 阅读数据
  total_reading_time INT DEFAULT 0,  -- 总阅读时长(秒)
  total_reads INT DEFAULT 0,  -- 总阅读次数
  member_reads INT DEFAULT 0,  -- 会员阅读次数

  -- 收益数据
  member_pool_share DECIMAL(10, 2) DEFAULT 0,  -- 会员池分成
  tips_received DECIMAL(10, 2) DEFAULT 0,  -- 打赏收入
  paid_article_revenue DECIMAL(10, 2) DEFAULT 0,  -- 单篇付费收入
  total_earnings DECIMAL(10, 2) DEFAULT 0,  -- 本月总收益

  platform_fee DECIMAL(10, 2) DEFAULT 0,  -- 平台抽成
  net_earnings DECIMAL(10, 2) DEFAULT 0,  -- 实际到账

  -- 状态
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'settled', 'paid')),
  settled_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,

  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_monthly_earnings_creator_id ON monthly_earnings(creator_id);
CREATE INDEX idx_monthly_earnings_month ON monthly_earnings(month DESC);
CREATE UNIQUE INDEX idx_monthly_earnings_creator_month
  ON monthly_earnings(creator_id, month);
```

---

### 7. withdrawals - 提现记录

```sql
CREATE TABLE withdrawals (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 关联创作者
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- 提现信息
  amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 50),  -- 最低50元
  payment_method TEXT NOT NULL,  -- 'alipay', 'wechat', 'bank'
  payment_account TEXT NOT NULL,  -- 脱敏后的账户信息

  -- 状态
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'completed', 'failed')),

  -- 失败原因
  failure_reason TEXT,

  -- 外部交易ID
  transaction_id TEXT,

  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 索引
CREATE INDEX idx_withdrawals_creator_id ON withdrawals(creator_id);
CREATE INDEX idx_withdrawals_status ON withdrawals(status);
CREATE INDEX idx_withdrawals_created_at ON withdrawals(created_at DESC);
```

---

## 📊 社区互动表

### 8. article_reads - 阅读记录

```sql
CREATE TABLE article_reads (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 关联
  draft_id UUID NOT NULL REFERENCES drafts(id) ON DELETE CASCADE,
  reader_id UUID REFERENCES users(id) ON DELETE SET NULL,  -- 未登录用户为NULL

  -- 阅读数据
  read_duration INT DEFAULT 0,  -- 阅读时长(秒)
  read_percentage INT DEFAULT 0 CHECK (read_percentage >= 0 AND read_percentage <= 100),  -- 阅读进度

  -- 会员状态
  is_member BOOLEAN DEFAULT FALSE,
  is_paid_access BOOLEAN DEFAULT FALSE,  -- 单篇付费

  -- IP和设备 (用于反作弊)
  ip_address INET,
  user_agent TEXT,

  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_article_reads_draft_id ON article_reads(draft_id);
CREATE INDEX idx_article_reads_reader_id ON article_reads(reader_id) WHERE reader_id IS NOT NULL;
CREATE INDEX idx_article_reads_member ON article_reads(draft_id, is_member) WHERE is_member = TRUE;
CREATE INDEX idx_article_reads_created_at ON article_reads(created_at DESC);

-- 分区表 (按月分区,提升查询性能)
-- 生产环境可考虑使用时间分区
```

---

### 9. article_likes - 点赞表

```sql
CREATE TABLE article_likes (
  -- 联合主键
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  draft_id UUID NOT NULL REFERENCES drafts(id) ON DELETE CASCADE,

  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  PRIMARY KEY (user_id, draft_id)
);

-- 索引
CREATE INDEX idx_article_likes_draft_id ON article_likes(draft_id);
CREATE INDEX idx_article_likes_user_id ON article_likes(user_id);
CREATE INDEX idx_article_likes_created_at ON article_likes(created_at DESC);
```

---

### 10. article_bookmarks - 收藏表

```sql
CREATE TABLE article_bookmarks (
  -- 联合主键
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  draft_id UUID NOT NULL REFERENCES drafts(id) ON DELETE CASCADE,

  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  PRIMARY KEY (user_id, draft_id)
);

-- 索引
CREATE INDEX idx_article_bookmarks_draft_id ON article_bookmarks(draft_id);
CREATE INDEX idx_article_bookmarks_user_id ON article_bookmarks(user_id);
CREATE INDEX idx_article_bookmarks_created_at ON article_bookmarks(created_at DESC);
```

---

### 11. article_comments - 评论表

```sql
CREATE TABLE article_comments (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 关联
  draft_id UUID NOT NULL REFERENCES drafts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES article_comments(id) ON DELETE CASCADE,  -- 回复评论

  -- 内容
  content TEXT NOT NULL CHECK (char_length(content) <= 500),

  -- 批注式评论 (Phase 2)
  selected_text TEXT,  -- 批注的原文
  position JSONB,  -- 批注位置 {"paragraph": 3, "offset": 10}

  -- 状态
  is_deleted BOOLEAN DEFAULT FALSE,

  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_article_comments_draft_id ON article_comments(draft_id);
CREATE INDEX idx_article_comments_user_id ON article_comments(user_id);
CREATE INDEX idx_article_comments_parent_id ON article_comments(parent_id)
  WHERE parent_id IS NOT NULL;
CREATE INDEX idx_article_comments_created_at ON article_comments(created_at DESC);

-- 更新时间触发器
CREATE TRIGGER update_article_comments_updated_at
  BEFORE UPDATE ON article_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

### 12. tips - 打赏记录

```sql
CREATE TABLE tips (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 关联
  from_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  draft_id UUID REFERENCES drafts(id) ON DELETE SET NULL,  -- 可选,针对某篇文章

  -- 打赏信息
  amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 1),
  message TEXT CHECK (char_length(message) <= 100),

  -- 支付信息
  payment_method TEXT NOT NULL,
  transaction_id TEXT,

  -- 平台分成
  platform_fee DECIMAL(10, 2) NOT NULL,  -- 10%
  creator_revenue DECIMAL(10, 2) NOT NULL,  -- 90%

  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_tips_from_user ON tips(from_user_id);
CREATE INDEX idx_tips_to_creator ON tips(to_creator_id);
CREATE INDEX idx_tips_draft_id ON tips(draft_id) WHERE draft_id IS NOT NULL;
CREATE INDEX idx_tips_created_at ON tips(created_at DESC);
```

---

## 🔮 Phase 2/3 扩展表

### 13. inspirations - 灵感库 (Phase 3)

```sql
CREATE TABLE inspirations (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 内容
  title TEXT NOT NULL,
  content_skeleton TEXT,  -- 内容骨架
  source_url TEXT,  -- 来源URL
  analysis JSONB,  -- AI分析结果

  -- 向量化
  embedding VECTOR(1536),

  -- 分类
  category TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],

  -- 统计
  view_count INT DEFAULT 0,
  use_count INT DEFAULT 0,  -- 被使用次数

  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_inspirations_category ON inspirations(category);
CREATE INDEX idx_inspirations_embedding ON inspirations
  USING ivfflat (embedding vector_cosine_ops);
```

---

### 14. taste_imprints - 品味印记 (Phase 2)

```sql
CREATE TABLE taste_imprints (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 关联用户
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- 印记类型
  type TEXT NOT NULL CHECK (type IN (
    'intent_filled',  -- 填写意图 +2
    'emotion_confirmed',  -- 情绪确认 +1
    'title_voted',  -- 标题投票 +1
    'reflection_written',  -- 复盘 +3
    'inspiration_liked'  -- 灵感点赞 +1
  )),

  -- 上下文
  context JSONB,  -- {"draft_id": "...", "choice": "..."}

  -- 印记点数
  points INT NOT NULL DEFAULT 1,

  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_taste_imprints_user_id ON taste_imprints(user_id);
CREATE INDEX idx_taste_imprints_type ON taste_imprints(type);
CREATE INDEX idx_taste_imprints_created_at ON taste_imprints(created_at DESC);
```

---

### 15. external_publishes - 外部平台发布记录 (Phase 3)

```sql
CREATE TABLE external_publishes (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 关联草稿
  draft_id UUID NOT NULL REFERENCES drafts(id) ON DELETE CASCADE,

  -- 平台信息
  platform TEXT NOT NULL CHECK (platform IN (
    'wechat', 'xiaohongshu', 'zhihu', 'medium', 'other'
  )),
  platform_url TEXT,  -- 外部平台的文章链接

  -- 状态
  status TEXT DEFAULT 'success' CHECK (status IN ('pending', 'success', 'failed')),
  error_message TEXT,

  -- 时间戳
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_external_publishes_draft_id ON external_publishes(draft_id);
CREATE INDEX idx_external_publishes_platform ON external_publishes(platform);
```

---

## 🛠️ 辅助函数和触发器

### 更新时间戳函数

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

### 统计视图

```sql
-- 文章统计视图
CREATE VIEW draft_statistics AS
SELECT
  d.id AS draft_id,
  d.title,
  d.user_id AS creator_id,
  COUNT(DISTINCT ar.id) AS read_count,
  COUNT(DISTINCT al.user_id) AS like_count,
  COUNT(DISTINCT ab.user_id) AS bookmark_count,
  COUNT(DISTINCT ac.id) AS comment_count,
  AVG(ar.read_duration) AS avg_read_duration,
  AVG(ar.read_percentage) AS avg_read_percentage
FROM drafts d
LEFT JOIN article_reads ar ON d.id = ar.draft_id
LEFT JOIN article_likes al ON d.id = al.draft_id
LEFT JOIN article_bookmarks ab ON d.id = ab.draft_id
LEFT JOIN article_comments ac ON d.id = ac.draft_id AND ac.is_deleted = FALSE
WHERE d.is_published_to_community = TRUE
GROUP BY d.id, d.title, d.user_id;
```

---

## 🔐 Row Level Security (RLS)

Supabase 使用 RLS 实现细粒度权限控制:

```sql
-- 启用 RLS
ALTER TABLE drafts ENABLE ROW LEVEL SECURITY;

-- 策略: 用户只能看到自己的草稿或已发布到社区的文章
CREATE POLICY "Users can view own drafts or published articles"
  ON drafts FOR SELECT
  USING (
    auth.uid() = user_id  -- 自己的草稿
    OR (is_published_to_community = TRUE AND status = 'published')  -- 已发布
  );

-- 策略: 用户只能编辑自己的草稿
CREATE POLICY "Users can update own drafts"
  ON drafts FOR UPDATE
  USING (auth.uid() = user_id);

-- 策略: 用户只能删除自己的草稿
CREATE POLICY "Users can delete own drafts"
  ON drafts FOR DELETE
  USING (auth.uid() = user_id);
```

---

## 📄 相关文档

- [产品定位](./product-positioning.md)
- [功能路线图](./feature-roadmap.md)
- [商业模式](./business-model.md)
- [API设计](./api-design.md)
- [系统架构](./architecture.md)

---

**最后更新**: 2025-01-25
**维护者**: ROYIANS (royians@vidorra.life)
