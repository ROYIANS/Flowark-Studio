import React, { useState } from 'react';
import { TrendingUp, Eye, MessageCircle, Sparkles, RefreshCcw, Zap, Wand2, ArrowRight, Plus, Crown, Heart, Lightbulb } from 'lucide-react';
import { Button } from './ui/Button';
import { Avatar } from './ui/Avatar';
import { Persona } from './PersonaArchives';
import { TasteImprintNotification, TasteImprintBadge } from './TasteImprintNotification';

const INSPIRATIONS = [
    { id: 1, type: 'text', title: '普通人如何靠“不精致”生活圈粉？', tag: '潜力热点', interaction: '8.2k 互动' },
    { id: 2, type: 'video', title: '沉浸式回家：独居女生的治愈夜', tag: '视觉系', interaction: '1.5w 完播' },
    { id: 3, type: 'text', title: '30岁裸辞，我后悔了吗？', tag: '争议话题', interaction: '999+ 评论' },
    { id: 4, type: 'video', title: '便利店调酒：10元搞定微醺快乐', tag: '创意', interaction: '5k 收藏' },
];

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

interface DashboardProps {
    persona: Persona;
    onBack: () => void;
    onCreate: (type: string) => void;
    onGoHub: () => void;
    onViewTasteMap?: () => void;
    onViewReport?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ persona, onBack, onCreate, onGoHub, onViewTasteMap }) => {
    const [tab, setTab] = useState<'inspiration' | 'analysis'>('inspiration');
    const [likedInspirations, setLikedInspirations] = useState<number[]>([]);
    const [interestedInspirations, setInterestedInspirations] = useState<number[]>([]);
    const [showImprintNotification, setShowImprintNotification] = useState<{show: boolean, points: number, message: string}>({
        show: false,
        points: 0,
        message: ''
    });
    const [totalImprints, setTotalImprints] = useState(47);

    const handleLike = (id: number) => {
        if (!likedInspirations.includes(id)) {
            setLikedInspirations([...likedInspirations, id]);
            setTotalImprints(totalImprints + 1);
            setShowImprintNotification({
                show: true,
                points: 1,
                message: 'AI记录了你的偏好'
            });
            setTimeout(() => setShowImprintNotification({show: false, points: 0, message: ''}), 3000);
        }
    };

    const handleInterested = (id: number) => {
        if (!interestedInspirations.includes(id)) {
            setInterestedInspirations([...interestedInspirations, id]);
            setTotalImprints(totalImprints + 1);
            setShowImprintNotification({
                show: true,
                points: 1,
                message: '已添加到你的兴趣图谱'
            });
            setTimeout(() => setShowImprintNotification({show: false, points: 0, message: ''}), 3000);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#FDFCF8]">
            {/* 品味印记通知 */}
            {showImprintNotification.show && (
                <TasteImprintNotification
                    points={showImprintNotification.points}
                    message={showImprintNotification.message}
                />
            )}

            {/* 左侧导航 */}
            <aside className="w-64 hidden md:flex flex-col p-8 border-r border-[#EBE5E0] sticky top-0 h-screen">
                <div onClick={onBack} className="cursor-pointer flex items-center gap-3 mb-12 group">
                    <Avatar name={persona.name} size="sm" />
                    <span className="font-medium text-[#2D2A26] group-hover:text-[#E86435] transition-colors">{persona.name}</span>
                </div>

                {/* 品味印记徽章 */}
                <div className="mb-8">
                    <TasteImprintBadge
                        totalPoints={totalImprints}
                        onClick={() => onViewTasteMap && onViewTasteMap()}
                    />
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

                                    <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
                                        <span className="text-sm text-[#8E8780] flex items-center gap-2">
                                            <Zap size={14} className="text-[#E86435]" /> {item.interaction}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleLike(item.id)}
                                                className={`flex items-center gap-1 px-3 py-1 border transition-all text-xs
                                                    ${likedInspirations.includes(item.id)
                                                        ? 'border-[#E86435] bg-[#F2E8E3] text-[#E86435]'
                                                        : 'border-[#EBE5E0] text-[#8E8780] hover:border-[#E86435] hover:text-[#E86435]'
                                                    }`}
                                            >
                                                <Heart size={14} fill={likedInspirations.includes(item.id) ? '#E86435' : 'none'} />
                                                <span className="hidden sm:inline">这个打动我</span>
                                            </button>
                                            <button
                                                onClick={() => handleInterested(item.id)}
                                                className={`flex items-center gap-1 px-3 py-1 border transition-all text-xs
                                                    ${interestedInspirations.includes(item.id)
                                                        ? 'border-[#E86435] bg-[#F2E8E3] text-[#E86435]'
                                                        : 'border-[#EBE5E0] text-[#8E8780] hover:border-[#E86435] hover:text-[#E86435]'
                                                    }`}
                                            >
                                                <Lightbulb size={14} fill={interestedInspirations.includes(item.id) ? '#E86435' : 'none'} />
                                                <span className="hidden sm:inline">这个有意思</span>
                                            </button>
                                        </div>
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