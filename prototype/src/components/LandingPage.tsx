import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2, ArrowRight, LayoutGrid, TrendingUp, PenTool, Check, Sparkles, LucideIcon } from 'lucide-react';
import { Button } from './ui/Button';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    color?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, color = '#E86435' }) => (
    <div className="py-6 flex flex-col items-start text-left group border-t border-[#EBE5E0] pt-8">
        <Icon size={32} className="mb-6" style={{ color: color }} strokeWidth={1.5} />
        <h3 className="text-2xl font-serif text-[#2D2A26] mb-4 group-hover:text-[#E86435] transition-colors">{title}</h3>
        <p className="text-[#8E8780] text-base leading-relaxed">{description}</p>
    </div>
);

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const handleStart = () => navigate('/personas');

    return (
        <div className="bg-[#FDFCF8] min-h-screen flex flex-col items-center">

            {/* 导航栏 (Minimal Header) */}
            <header className="w-full max-w-7xl px-6 md:px-8 py-6 flex justify-between items-center sticky top-0 bg-[#FDFCF8]/90 z-20 border-b border-[#EBE5E0]/50 backdrop-blur-sm">
                <div className="text-xl font-serif text-[#E86435] flex items-center gap-2">
                    <Wand2 size={24} strokeWidth={2.5}/> 浮光手记
                </div>
                <Button variant="secondary" onClick={handleStart} className="px-5 py-2 text-base">
                    免费体验
                </Button>
            </header>

            {/* 1. 英雄区域 (Hero Section) */}
            <section className="text-center py-24 md:py-32 w-full max-w-4xl px-6">
                <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#2D2A26] mb-8 leading-tight">
                    抛弃工具，<br/>只关注创作
                </h1>
                <p className="text-xl text-[#8E8780] mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                    「浮光手记」是一款为内容创作者量身定制的工具。我们去掉了多余的边框和干扰，为您还原纸笔时代的纯粹创作。
                </p>
                <div className="flex justify-center">
                    <Button
                        variant="primary"
                        onClick={handleStart}
                        icon={ArrowRight}
                        className="text-lg px-8 py-4"
                    >
                        立即开始 (无需注册)
                    </Button>
                </div>
                <p className="mt-4 text-xs text-[#8E8780]">已获得 4.8k 创作者推荐，无需下载</p>
            </section>

            {/* 2. 核心价值展示 (Core Value Section) */}
            <section className="w-full max-w-7xl px-6 md:px-8 py-24">
                <h2 className="text-4xl font-serif text-[#2D2A26] mb-20 text-center">告别低效，迎接高质内容</h2>
                <div className="grid md:grid-cols-3 gap-12">
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
                    <div className="bg-[#FDFCF8] p-8 md:p-12 border-l border-[#EBE5E0] h-96 overflow-hidden relative">
                        <div className="text-4xl font-serif font-bold text-[#2D2A26] mb-6">今天的我，只想写字</div>
                        <p className="text-[#2D2A26] text-lg leading-relaxed font-light">
                            这里是模拟的沉浸式编辑界面。没有侧边栏，没有工具箱，只有您的文字和灵感在流淌。
                            <br/><br/>
                            我们相信，最强大的工具，是让你忘记工具本身。每一次输入都像在温暖的纸张上留下墨迹，让创作成为一种享受。
                        </p>
                        {/* 模拟滚动条效果 */}
                        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#FDFCF8] to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* 4. 底部 CTA (Final Call to Action) */}
            <section className="w-full bg-[#2D2A26] text-white py-32 text-center">
                <h2 className="text-5xl font-serif font-bold mb-8">下一篇爆款，从这里开始</h2>
                <p className="text-xl text-[#8E8780] mb-12 font-light">
                    加入数千名创作者的行列，让您的内容创作真正高效且充满乐趣。
                </p>
                <div className="flex justify-center">
                    <Button
                        variant="primary"
                        onClick={handleStart}
                        icon={Sparkles}
                        className="text-lg px-10 py-5 bg-[#E86435] text-white hover:bg-[#F2E8E3] hover:text-[#E86435]"
                    >
                        即刻开启「浮光手记」
                    </Button>
                </div>
            </section>

            {/* 5. 极简页脚 (Footer) */}
            <footer className="w-full max-w-7xl px-8 py-10 text-center border-t border-[#EBE5E0] text-sm text-[#8E8780]">
                <p>© {new Date().getFullYear()} 浮光手记. All Rights Reserved. | 温暖杂志极简主义设计.</p>
            </footer>
        </div>
    );
};