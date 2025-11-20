import React, { useState, useEffect } from 'react';
import {
    Sparkles,
    ArrowRight,
    RefreshCcw,
    Wand2,
    LayoutGrid,
    Zap,
    Plus,
    ArrowLeft,
    PenTool,
    Film,
    Crown,
    BarChart3,
    Check,
    MoreHorizontal,
    TrendingUp,
    Eye,
    Heart,
    MessageCircle,
    Download,
    Share2,
    CornerDownLeft
} from 'lucide-react';

// --- 极简主义配色 (Warm Minimalist) ---
// 背景：bg-[#FDFCF8] (通体暖白)
// 交互：hover:bg-[#F2E8E3]
// 重点：text-[#E86435] (陶土橙)
// 文本：text-[#2D2A26] (近黑)
// 辅助：text-[#8E8780] (暖灰)
// 线条：border-[#EBE5E0]

// --- 模拟数据 ---
const INITIAL_PERSONAS = [
    { id: 1, name: "健身博主小王", niche: "居家健身 | 减脂餐", stats: "2小时前活跃" },
    { id: 2, name: "职场里的小美", niche: "职场穿搭 | 办公好物", stats: "刚刚活跃" },
];

const INSPIRATIONS = [
    { id: 1, type: 'text', title: '普通人如何靠“不精致”生活圈粉？', tag: '潜力热点', interaction: '8.2k 互动' },
    { id: 2, type: 'video', title: '沉浸式回家：独居女生的治愈夜', tag: '视觉系', interaction: '1.5w 完播' },
    { id: 3, type: 'text', title: '30岁裸辞，我后悔了吗？', tag: '争议话题', interaction: '999+ 评论' },
    { id: 4, type: 'video', title: '便利店调酒：10元搞定微醺快乐', tag: '创意', interaction: '5k 收藏' },
];

// --- 通用组件 ---

const Button = ({ children, variant = 'primary', onClick, className = '', icon: Icon, disabled = false }) => {
    const variants = {
        primary: "bg-[#2D2A26] text-white hover:bg-[#E86435] transition-colors rounded-full px-6 py-3 font-medium",
        secondary: "bg-[#F2E8E3] text-[#E86435] hover:bg-[#E86435] hover:text-white transition-colors rounded-full px-5 py-2 font-medium text-sm",
        text: "text-[#2D2A26] hover:text-[#E86435] font-medium px-0 underline decoration-1 decoration-[#EBE5E0] hover:decoration-[#E86435] underline-offset-4 transition-all",
        icon: "w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F2E8E3] text-[#2D2A26] transition-colors",
        ghost: "text-[#8E8780] hover:text-[#2D2A26] transition-colors flex items-center gap-2"
    };

    return (
        <button onClick={onClick} disabled={disabled} className={`flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-50 ${variants[variant]} ${className}`}>
            {Icon && <Icon size={18} strokeWidth={2} />}
            {children}
        </button>
    );
};

const HoverRow = ({ children, onClick, className = "" }) => (
    <div
        onClick={onClick}
        className={`group w-full transition-colors duration-300 border-b border-[#EBE5E0] last:border-0 cursor-pointer hover:bg-[#F2E8E3]/50 ${className}`}
    >
        {children}
    </div>
);

const Avatar = ({ name, size = "md" }) => {
    const sizes = { sm: "w-8 h-8 text-xs", md: "w-12 h-12 text-lg", lg: "w-16 h-16 text-xl" };
    return (
        <div className={`${sizes[size]} rounded-full bg-[#EBE5E0] text-[#8E8780] flex items-center justify-center font-serif font-bold shrink-0`}>
            {name[0]}
        </div>
    );
};

// --- 0. 落地页 (Landing Page) ---
const LandingPage = ({ onStart }) => {
    // 核心功能卡片组件
    const FeatureCard = ({ icon: Icon, title, description, color = '#E86435' }) => (
        <div className="p-8 border border-[#EBE5E0] bg-white shadow-sm hover:shadow-xl transition-shadow duration-500 rounded-none flex flex-col items-start text-left">
            <Icon size={32} className="mb-4" style={{ color: color }} strokeWidth={2.5} />
            <h3 className="text-xl font-medium text-[#2D2A26] mb-2">{title}</h3>
            <p className="text-[#8E8780] text-sm leading-relaxed">{description}</p>
        </div>
    );

    return (
        <div className="bg-[#FDFCF8] min-h-screen flex flex-col items-center">

            {/* 导航栏 (Minimal Header) */}
            <header className="w-full max-w-7xl px-6 md:px-8 py-6 flex justify-between items-center sticky top-0 bg-[#FDFCF8]/90 z-20 border-b border-[#EBE5E0]/50 backdrop-blur-sm">
                <div className="text-xl font-serif text-[#E86435] flex items-center gap-2">
                    <Wand2 size={24} strokeWidth={2.5}/> 浮光手记
                </div>
                <Button variant="secondary" onClick={onStart} className="px-5 py-2 text-base">
                    免费体验
                </Button>
            </header>

            {/* 1. 英雄区域 (Hero Section) */}
            <section className="text-center py-24 md:py-32 w-full max-w-4xl px-6">
                <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#2D2A26] mb-8 leading-tight">
                    抛弃工具，只关注创作
                </h1>
                <p className="text-xl text-[#8E8780] mb-12 max-w-2xl mx-auto leading-relaxed">
                    「浮光手记」是一款为内容创作者量身定制的工具。我们去掉了多余的边框和干扰，为您还原纸笔时代的纯粹创作。
                </p>
                <Button
                    variant="primary"
                    onClick={onStart}
                    icon={ArrowRight}
                    className="text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                    立即开始 (无需注册)
                </Button>
                <p className="mt-4 text-xs text-[#8E8780]">已获得 4.8k 创作者推荐，无需下载</p>
            </section>

            {/* 2. 核心价值展示 (Core Value Section) */}
            <section className="w-full max-w-7xl px-6 md:px-8 py-20 bg-[#F2E8E3]/50 border-t border-b border-[#EBE5E0]">
                <h2 className="text-4xl font-serif text-[#2D2A26] mb-16 text-center">告别低效，迎接高质内容</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={LayoutGrid}
                        title="人设档案：精准定位"
                        description="为您的每一个创作身份建立独立的档案，包括语气、内容方向和核心价值，确保内容风格高度一致，人设不跑偏。"
                        color="#E86435"
                    />
                    <FeatureCard
                        icon={TrendingUp}
                        title="浮光灵感：热点捕捉"
                        description="实时聚合社交媒体热门话题和高潜内容，AI 分析其爆火逻辑，让您快人一步抓住下一个流量风口。告别盲目追热点。"
                        color="#2D2A26"
                    />
                    <FeatureCard
                        icon={PenTool}
                        title="沉浸式：去框化编辑"
                        description="提供一个干净、无干扰的写作界面。从灵感捕捉到脚本生成，像在温暖的纸上书写一样流畅自然，专注于文字本身。"
                        color="#E86435"
                    />
                </div>
            </section>

            {/* 3. 创作流程展示 (Process Showcase) */}
            <section className="w-full max-w-7xl px-6 md:px-8 py-24">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* 文字介绍区 */}
                    <div>
                        <span className="text-sm font-bold tracking-widest uppercase text-[#E86435] mb-4 block">创作进化论</span>
                        <h2 className="text-4xl font-serif text-[#2D2A26] mb-6 leading-snug">从“想不出来”到“一键成稿”</h2>
                        <p className="text-lg text-[#8E8780] mb-8">
                            告别空白文档的恐惧。浮光手记提供完整的 AI 辅助链路：分析人设 → 匹配热点 → 生成脚本 → 智能优化。您的创作效率将提升 40% 以上。
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-[#2D2A26]">
                                <Check size={20} className="text-[#E86435] shrink-0" /> <span>自动优化标题，提升点击率和曝光。</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#2D2A26]">
                                <Check size={20} className="text-[#E86435] shrink-0" /> <span>分镜 + 口播文案，视频制作流程化。</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#2D2A26]">
                                <Check size={20} className="text-[#E86435] shrink-0" /> <span>数据追踪与智能建议，反哺下一次创作。</span>
                            </div>
                        </div>
                    </div>

                    {/* 模拟编辑器截图/UI */}
                    <div className="bg-white p-6 shadow-2xl border border-[#EBE5E0] h-96 overflow-hidden relative">
                        <div className="text-4xl font-serif font-bold text-[#2D2A26] mb-4">今天的我，只想写字</div>
                        <p className="text-[#8E8780] leading-relaxed">
                            这里是模拟的沉浸式编辑界面。没有侧边栏，没有工具箱，只有您的文字和灵感在流淌。
                            我们相信，最强大的工具，是让你忘记工具本身。每一次输入都像在温暖的纸张上留下墨迹，让创作成为一种享受。
                            （更多内容正在此无边框界面中滚动...）
                        </p>
                        {/* 模拟滚动条效果 */}
                        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* 4. 底部 CTA (Final Call to Action) */}
            <section className="w-full bg-[#2D2A26] text-white py-20 text-center">
                <h2 className="text-5xl font-serif font-bold mb-6">下一篇爆款，从这里开始</h2>
                <p className="text-lg text-[#8E8780] mb-10">
                    加入数千名创作者的行列，让您的内容创作真正高效且充满乐趣。
                </p>
                <Button
                    variant="secondary"
                    onClick={onStart}
                    icon={Sparkles}
                    className="text-lg px-8 py-4 bg-[#E86435] text-white hover:bg-[#F2E8E3] hover:text-[#2D2A26] shadow-xl"
                >
                    即刻开启「浮光手记」
                </Button>
            </section>

            {/* 5. 极简页脚 (Footer) */}
            <footer className="w-full max-w-7xl px-8 py-10 text-center border-t border-[#EBE5E0] text-sm text-[#8E8780]">
                <p>© {new Date().getFullYear()} 浮光手记. All Rights Reserved. | 温暖杂志极简主义设计.</p>
            </footer>
        </div>
    );
};


// --- 1. 人设档案 ---
const PersonaArchives = ({ personas, onSelect, onCreate }) => {
    return (
        <div className="min-h-screen bg-[#FDFCF8] flex flex-col items-center pt-32 px-6">
            <div className="max-w-2xl w-full">
                <div className="mb-16 text-left">
                    <h1 className="text-4xl font-serif font-medium text-[#2D2A26] mb-4">人设档案</h1>
                    <p className="text-[#8E8780]">选择一个身份，开始书写。</p>
                </div>

                <div className="space-y-0 border-t border-[#EBE5E0]">
                    {personas.map(persona => (
                        <HoverRow key={persona.id} onClick={() => onSelect(persona)} className="py-6 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <Avatar name={persona.name} size="md" />
                                <div>
                                    <h3 className="text-xl font-medium text-[#2D2A26] mb-1 group-hover:text-[#E86435] transition-colors">{persona.name}</h3>
                                    <p className="text-sm text-[#8E8780] font-light">{persona.niche}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                <span className="text-xs text-[#8E8780]">{persona.stats}</span>
                                <ArrowRight size={20} className="text-[#E86435]" />
                            </div>
                        </HoverRow>
                    ))}

                    <HoverRow onClick={onCreate} className="py-6 flex items-center gap-6 text-[#8E8780] hover:text-[#E86435]">
                        <div className="w-12 h-12 rounded-full border border-dashed border-[#8E8780] flex items-center justify-center group-hover:border-[#E86435] transition-colors">
                            <Plus size={20} />
                        </div>
                        <span className="text-lg font-medium">创建新人设</span>
                    </HoverRow>
                </div>
            </div>
        </div>
    );
};

// --- 1.5 创建向导 ---
const PersonaCreator = ({ onBack, onComplete }) => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [niche, setNiche] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            onComplete({ id: Date.now(), name, niche, stats: "刚刚创建" });
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#FDFCF8] flex flex-col pt-32 px-6 items-center">
            <div className="max-w-xl w-full">
                <button onClick={onBack} className="mb-12 text-[#8E8780] hover:text-[#2D2A26] flex items-center gap-2">
                    <ArrowLeft size={18} /> 取消
                </button>

                {isGenerating ? (
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 w-48 bg-[#F2E8E3] rounded"></div>
                        <div className="h-4 w-64 bg-[#F2E8E3] rounded"></div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div>
                            <span className="text-[#E86435] font-bold mb-4 block text-sm tracking-widest uppercase">Step {step} / 2</span>
                            <h2 className="text-3xl md:text-4xl font-serif text-[#2D2A26] mb-4 leading-tight">
                                {step === 1 ? "首先，你想成为谁？" : "在这个身份下，你想专注什么领域？"}
                            </h2>
                        </div>

                        {step === 1 ? (
                            <input
                                autoFocus
                                type="text"
                                className="w-full bg-transparent border-b-2 border-[#EBE5E0] py-4 text-2xl md:text-3xl text-[#2D2A26] focus:outline-none focus:border-[#E86435] placeholder-[#EBE5E0] transition-colors"
                                placeholder="输入人设名称..."
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && name && setStep(2)}
                            />
                        ) : (
                            <div className="flex flex-wrap gap-3">
                                {["极简生活", "职场干货", "美妆护肤", "美食探店"].map(item => (
                                    <button
                                        key={item}
                                        onClick={() => setNiche(item)}
                                        className={`px-6 py-3 rounded-full border transition-all text-lg
                      ${niche === item ? 'border-[#E86435] text-[#E86435] bg-[#F2E8E3]' : 'border-[#EBE5E0] text-[#8E8780] hover:border-[#8E8780]'}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="pt-8 flex items-center justify-between">
                            {step === 2 && <button onClick={() => setStep(1)} className="text-[#8E8780]">上一步</button>}
                            <div className="flex-1"></div>
                            <Button
                                variant="primary"
                                onClick={() => step === 1 ? setStep(2) : handleGenerate()}
                                disabled={step === 1 ? !name : !niche}
                                icon={step === 1 ? ArrowRight : Sparkles}
                            >
                                {step === 1 ? "继续" : "生成档案"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- 2. 仪表盘 (Dashboard) ---
// 包含 "灵感发现" 和 "数据分析" 两个 Tab

const DataAnalysisView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-3xl font-serif text-[#2D2A26] mb-8">数据洞察</h2>

        {/* 核心指标 - 大数字风格 */}
        <div className="grid grid-cols-3 gap-12 mb-12 border-b border-[#EBE5E0] pb-12">
            <div>
                <div className="text-sm text-[#8E8780] mb-2 flex items-center gap-2">
                    <TrendingUp size={16}/> 粉丝增长
                </div>
                <div className="text-4xl font-serif text-[#2D2A26]">+1,240</div>
                <div className="text-xs text-[#E86435] mt-2 font-medium">↑ 12% 较上周</div>
            </div>
            <div>
                <div className="text-sm text-[#8E8780] mb-2 flex items-center gap-2">
                    <Eye size={16}/> 内容曝光
                </div>
                <div className="text-4xl font-serif text-[#2D2A26]">8.5w</div>
                <div className="text-xs text-[#E86435] mt-2 font-medium">↑ 5% 较上周</div>
            </div>
            <div>
                <div className="text-sm text-[#8E8780] mb-2 flex items-center gap-2">
                    <MessageCircle size={16}/> 互动总量
                </div>
                <div className="text-4xl font-serif text-[#2D2A26]">3,820</div>
                <div className="text-xs text-[#8E8780] mt-2">持平</div>
            </div>
        </div>

        {/* 表现最佳的内容 */}
        <h3 className="text-xl font-medium text-[#2D2A26] mb-6">表现最佳</h3>
        <div className="space-y-0">
            {[1, 2, 3].map((i) => (
                <div key={i} className="py-4 flex items-center justify-between border-b border-[#EBE5E0] last:border-0 group hover:bg-[#F2E8E3]/30 cursor-pointer transition-colors">
                    <div className="flex items-center gap-4">
                        <span className="text-[#E86435] font-serif font-bold text-lg">0{i}</span>
                        <div>
                            <div className="text-[#2D2A26] font-medium">如何低成本打造氛围感书房？</div>
                            <div className="text-xs text-[#8E8780] mt-1">发布于 3天前 • 图文</div>
                        </div>
                    </div>
                    <div className="text-sm font-medium text-[#2D2A26]">4.2k 互动</div>
                </div>
            ))}
        </div>

        {/* 简单的建议 */}
        <div className="mt-12 bg-[#F2E8E3] p-6 rounded-none flex items-start gap-4">
            <Sparkles className="text-[#E86435] shrink-0 mt-1" size={20} />
            <div>
                <h4 className="font-bold text-[#E86435] mb-1">AI 诊断建议</h4>
                <p className="text-[#2D2A26] text-sm leading-relaxed">
                    您的粉丝对“职场干货”类内容的互动率比“日常分享”高出 40%。建议下周增加 2 篇关于办公效率工具的图文内容。
                </p>
            </div>
        </div>
    </div>
);

const Dashboard = ({ persona, onBack, onCreate, onGoHub }) => {
    const [tab, setTab] = useState('inspiration'); // inspiration | analysis

    return (
        <div className="flex min-h-screen bg-[#FDFCF8]">
            {/* 左侧导航 */}
            <aside className="w-64 hidden md:flex flex-col p-8 border-r border-[#EBE5E0] sticky top-0 h-screen">
                <div onClick={onBack} className="cursor-pointer flex items-center gap-3 mb-12 group">
                    <Avatar name={persona.name} size="sm" />
                    <span className="font-medium text-[#2D2A26] group-hover:text-[#E86435] transition-colors">{persona.name}</span>
                </div>

                <nav className="space-y-2">
                    <div
                        onClick={() => setTab('inspiration')}
                        className={`pl-4 border-l-2 py-2 cursor-pointer transition-colors flex items-center justify-between group
             ${tab === 'inspiration' ? 'border-[#E86435] text-[#E86435] font-medium' : 'border-transparent text-[#8E8780] hover:text-[#2D2A26]'}`}
                    >
                        灵感发现
                        {tab === 'inspiration' && <ArrowRight size={14}/>}
                    </div>

                    <div onClick={onGoHub} className="pl-4 border-l-2 border-transparent py-2 text-[#8E8780] hover:text-[#2D2A26] cursor-pointer transition-colors group flex items-center justify-between">
                        创作空间
                        <Plus size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E86435]"/>
                    </div>

                    <div
                        onClick={() => setTab('analysis')}
                        className={`pl-4 border-l-2 py-2 cursor-pointer transition-colors flex items-center justify-between group
             ${tab === 'analysis' ? 'border-[#E86435] text-[#E86435] font-medium' : 'border-transparent text-[#8E8780] hover:text-[#2D2A26]'}`}
                    >
                        数据分析
                        {tab === 'analysis' && <ArrowRight size={14}/>}
                    </div>
                </nav>

                <div className="mt-auto pt-8 border-t border-[#EBE5E0]">
                    <p className="text-xs text-[#8E8780] mb-4">本周创作: 3 篇</p>
                    <a href="#" className="text-sm text-[#E86435] font-bold flex items-center gap-2 hover:underline">
                        <Crown size={14}/> 升级会员
                    </a>
                </div>
            </aside>

            {/* 右侧内容区 */}
            <main className="flex-1 p-6 md:p-12 max-w-4xl">
                {tab === 'inspiration' ? (
                    // 灵感列表
                    <>
                        <div className="flex justify-between items-baseline mb-12 animate-in fade-in duration-500">
                            <h2 className="text-3xl font-serif text-[#2D2A26]">今日灵感</h2>
                            <Button variant="text" onClick={() => {}} icon={RefreshCcw}>换一批</Button>
                        </div>

                        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                            {INSPIRATIONS.map((item) => (
                                <div key={item.id} className="group relative pb-8 border-b border-[#EBE5E0] last:border-0">
                                    <div className="flex items-baseline gap-3 mb-2">
                                        <span className="text-xs font-bold tracking-wider uppercase text-[#E86435]">{item.tag}</span>
                                        <span className="text-xs text-[#8E8780]">•</span>
                                        <span className="text-xs text-[#8E8780]">{item.type === 'text' ? '图文' : '视频'}</span>
                                    </div>

                                    <div className="flex justify-between items-start gap-8">
                                        <h3 className="text-2xl font-serif text-[#2D2A26] leading-relaxed group-hover:text-[#E86435] transition-colors cursor-pointer">
                                            {item.title}
                                        </h3>
                                        <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shrink-0">
                                            <Button variant="secondary" onClick={() => onCreate(item.type)} icon={Wand2}>创作</Button>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-[#8E8780] flex items-center gap-2">
                      <Zap size={14} className="text-[#E86435]" /> {item.interaction}
                    </span>
                                        <button
                                            className="md:hidden text-[#E86435] text-sm font-bold"
                                            onClick={() => onCreate(item.type)}
                                        >
                                            立即创作
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    // 数据分析视图
                    <DataAnalysisView />
                )}
            </main>
        </div>
    );
};

// --- 3. 创作中心 (Menu Style) ---
const CreationHub = ({ onBack, onCreate }) => {
    return (
        <div className="min-h-screen bg-[#FDFCF8] p-6 md:p-12 pt-32 flex justify-center">
            <div className="w-full max-w-3xl">
                <div className="flex items-center justify-between mb-16">
                    <button onClick={onBack} className="flex items-center gap-2 text-[#8E8780] hover:text-[#2D2A26]">
                        <ArrowLeft size={20}/> 返回
                    </button>
                    <span className="text-sm font-bold tracking-widest uppercase text-[#E86435]">创作中心</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif text-[#2D2A26] mb-12">你想创作什么？</h1>

                <div className="border-t border-b border-[#EBE5E0]">
                    {/* 图文选项 */}
                    <div
                        onClick={() => onCreate('text')}
                        className="group py-10 flex items-center justify-between cursor-pointer hover:bg-[#F2E8E3]/30 transition-colors border-b border-[#EBE5E0] last:border-0"
                    >
                        <div className="flex items-start gap-6">
                            <div className="mt-1 text-[#E86435] opacity-50 group-hover:opacity-100 transition-opacity">
                                <PenTool size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-medium text-[#2D2A26] group-hover:text-[#E86435] transition-colors">图文笔记</h3>
                                <p className="text-[#8E8780] mt-2 font-light">包含标题、正文、配图建议。适合小红书/公众号。</p>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-[#EBE5E0] flex items-center justify-center text-[#8E8780] group-hover:border-[#E86435] group-hover:text-[#E86435] group-hover:bg-white transition-all">
                            <ArrowRight size={20} />
                        </div>
                    </div>

                    {/* 视频选项 */}
                    <div
                        onClick={() => onCreate('video')}
                        className="group py-10 flex items-center justify-between cursor-pointer hover:bg-[#F2E8E3]/30 transition-colors"
                    >
                        <div className="flex items-start gap-6">
                            <div className="mt-1 text-[#E86435] opacity-50 group-hover:opacity-100 transition-opacity">
                                <Film size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-medium text-[#2D2A26] group-hover:text-[#E86435] transition-colors">视频脚本</h3>
                                <p className="text-[#8E8780] mt-2 font-light">包含分镜、口播文案、拍摄指导。适合抖音/视频号。</p>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-[#EBE5E0] flex items-center justify-center text-[#8E8780] group-hover:border-[#E86435] group-hover:text-[#E86435] group-hover:bg-white transition-all">
                            <ArrowRight size={20} />
                        </div>
                    </div>
                </div>

                <div className="mt-16 bg-[#F2E8E3] p-8 rounded-none flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-[#E86435] mb-1 flex items-center gap-2"><Crown size={18}/> 会员权益</h4>
                        <p className="text-[#2D2A26] text-sm">¥40/月，解锁无限创作额度。</p>
                    </div>
                    <Button variant="primary" onClick={() => {}} className="text-sm px-6">立即开通</Button>
                </div>
            </div>
        </div>
    );
};

// --- 4. 编辑器 (Editor) - 修复无限加载，增加真实界面 ---
const Editor = ({ type, onBack }) => {
    const [isGenerating, setIsGenerating] = useState(true);
    const [activeTool, setActiveTool] = useState(null);

    // 模拟 AI 生成过程
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsGenerating(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (isGenerating) {
        return (
            <div className="min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#F2E8E3] border-t-[#E86435] rounded-full animate-spin mb-8"></div>
                <h2 className="text-2xl font-serif text-[#2D2A26] mb-2">正在构思...</h2>
                <p className="text-[#8E8780]">AI 正在为您的 {type === 'text' ? '图文' : '视频'} 注入灵感</p>
                <button onClick={onBack} className="mt-8 text-sm text-[#8E8780] underline hover:text-[#E86435]">取消</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCF8] flex flex-col animate-in fade-in duration-500">
            {/* 顶部工具栏 */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-[#EBE5E0] bg-[#FDFCF8]/90 backdrop-blur sticky top-0 z-10">
                <button onClick={onBack} className="flex items-center gap-2 text-[#8E8780] hover:text-[#2D2A26]">
                    <ArrowLeft size={18}/>
                    <span className="hidden md:inline">返回</span>
                </button>
                <div className="flex items-center gap-4">
                    <span className="text-xs text-[#8E8780]">自动保存于 刚刚</span>
                    <Button variant="primary" className="px-4 py-2 text-sm" icon={Download}>导出</Button>
                </div>
            </div>

            <div className="flex-1 flex">
                {/* 主编辑区 (类 Notion) */}
                <main className="flex-1 p-8 md:p-16 max-w-4xl mx-auto overflow-y-auto w-full">
                    {type === 'text' ? (
                        <div className="space-y-8">
                            {/* 标题区 */}
                            <div className="group relative">
                                <input
                                    type="text"
                                    defaultValue="这才是成年人顶级的自律：断舍离"
                                    className="w-full text-4xl md:text-5xl font-serif font-bold text-[#2D2A26] bg-transparent outline-none placeholder-[#EBE5E0]"
                                />
                                <div className="absolute right-0 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="secondary" icon={RefreshCcw} className="text-xs py-1 px-3">换标题</Button>
                                </div>
                            </div>

                            {/* 正文区 */}
                            <div className="relative group min-h-[50vh]">
                <textarea
                    className="w-full h-full min-h-[400px] resize-none bg-transparent text-lg leading-relaxed text-[#2D2A26] outline-none font-light"
                    defaultValue={`不知道从什么时候开始，我们被物品绑架了。\n\n看着堆满杂物的桌面，心情也跟着乱糟糟的。今天我决定来一场彻底的断舍离。\n\n扔掉了半年前过期的面膜，不再喜欢的旧衣服，还有那段消耗我的关系。\n\n极简不是一无所有，而是拥有的一切都是心头好。`}
                />
                                {/* 悬浮优化按钮 */}
                                <div className="absolute -right-12 top-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 rounded-full bg-[#F2E8E3] text-[#E86435] hover:bg-[#E86435] hover:text-white transition-colors" title="润色"><Wand2 size={16}/></button>
                                    <button className="p-2 rounded-full bg-[#F2E8E3] text-[#E86435] hover:bg-[#E86435] hover:text-white transition-colors" title="续写"><PenTool size={16}/></button>
                                </div>
                            </div>

                            {/* 标签 */}
                            <div className="flex gap-2 pt-8 border-t border-[#EBE5E0]">
                                {["#极简生活", "#断舍离", "#治愈系"].map(tag => (
                                    <span key={tag} className="text-sm text-[#E86435] bg-[#F2E8E3] px-2 py-1 rounded-md">{tag}</span>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* 视频脚本模式 */
                        <div className="space-y-12">
                            <div>
                                <h1 className="text-4xl font-serif font-bold text-[#2D2A26] mb-4">别让“假努力”毁了你</h1>
                                <div className="flex gap-4 text-sm text-[#8E8780]">
                                    <span>时长: 45s</span>
                                    <span>•</span>
                                    <span>风格: 治愈/口播</span>
                                </div>
                            </div>

                            <div className="space-y-0 border-l-2 border-[#EBE5E0] pl-8 relative">
                                {[
                                    { time: "0-3s", content: "场景：黑屏闪现大字\n旁白：心跳声音效", type: "Hook" },
                                    { time: "3-15s", content: "场景：快速剪辑熬夜加班、吃外卖的画面\n旁白：你每天都很忙，但你真的在成长吗？", type: "痛点" },
                                    { time: "15-45s", content: "场景：博主坐在窗边，光线柔和，看着镜头\n旁白：今天分享3个自查标准，拒绝自我感动。", type: "干货" },
                                ].map((scene, idx) => (
                                    <div key={idx} className="mb-12 relative group">
                                        <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#FDFCF8] border-4 border-[#EBE5E0] group-hover:border-[#E86435] transition-colors"></div>
                                        <div className="text-xs font-bold text-[#E86435] mb-1 uppercase tracking-wider">{scene.type} • {scene.time}</div>
                                        <div className="text-lg text-[#2D2A26] whitespace-pre-line leading-relaxed">{scene.content}</div>
                                        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-xs text-[#8E8780] hover:text-[#E86435] underline">修改分镜</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>

                {/* 右侧 AI 侧边栏 */}
                <aside className="w-80 border-l border-[#EBE5E0] p-6 hidden xl:block bg-[#FDFCF8]">
                    <h3 className="text-sm font-bold text-[#8E8780] uppercase tracking-wider mb-6">AI 助手</h3>

                    <div className="space-y-6">
                        <div>
                            <div className="text-sm font-medium text-[#2D2A26] mb-3">配图建议</div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="aspect-square bg-[#EBE5E0] rounded-lg flex items-center justify-center text-[#8E8780] text-xs">极简桌面</div>
                                <div className="aspect-square bg-[#EBE5E0] rounded-lg flex items-center justify-center text-[#8E8780] text-xs">收纳特写</div>
                            </div>
                            <Button variant="ghost" className="w-full mt-2 text-xs justify-start" icon={RefreshCcw}>生成图片</Button>
                        </div>

                        <div className="pt-6 border-t border-[#EBE5E0]">
                            <div className="text-sm font-medium text-[#2D2A26] mb-3">发布贴士</div>
                            <p className="text-xs text-[#8E8780] leading-relaxed">
                                建议在周日晚上 20:00 发布，这是你的粉丝最活跃的时间段。带上 #极简生活 话题可以增加 15% 的曝光。
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

// --- 主程序 ---

const App = () => {
    const [view, setView] = useState('landing'); // 初始视图改为 landing
    const [personas, setPersonas] = useState(INITIAL_PERSONAS);
    const [selectedPersona, setSelectedPersona] = useState(null);
    const [editorType, setEditorType] = useState('text');

    return (
        <div className="font-sans selection:bg-[#F2E8E3] selection:text-[#E86435]">
            {view === 'landing' && (
                <LandingPage
                    onStart={() => setView('personas')}
                />
            )}

            {view === 'personas' && (
                <PersonaArchives
                    personas={personas}
                    onSelect={(p) => { setSelectedPersona(p); setView('dashboard'); }}
                    onCreate={() => setView('create')}
                />
            )}

            {view === 'create' && (
                <PersonaCreator
                    onBack={() => setView('personas')}
                    onComplete={(p) => { setPersonas([...personas, p]); setSelectedPersona(p); setView('dashboard'); }}
                />
            )}

            {view === 'dashboard' && (
                <Dashboard
                    persona={selectedPersona}
                    onBack={() => setView('personas')}
                    onCreate={(type) => { setEditorType(type); setView('editor'); }}
                    onGoHub={() => setView('hub')}
                />
            )}

            {view === 'hub' && (
                <CreationHub
                    onBack={() => setView('dashboard')}
                    onCreate={(type) => { setEditorType(type); setView('editor'); }}
                />
            )}

            {view === 'editor' && (
                <Editor
                    type={editorType}
                    onBack={() => setView('hub')}
                />
            )}
        </div>
    );
};

export default App;