import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Heart, MessageCircle, Bookmark, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';

interface TasteDecisionReportProps {
    onBack: () => void;
}

export const TasteDecisionReport: React.FC<TasteDecisionReportProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'data' | 'decision' | 'growth'>('data');

    return (
        <div className="min-h-screen bg-[#FDFCF8] p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-12">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-[#8E8780] hover:text-[#2D2A26] transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>返回</span>
                    </button>
                </div>

                {/* 标题 */}
                <div className="mb-12 animate-in fade-in duration-500">
                    <span className="text-xs font-bold tracking-widest uppercase text-[#E86435] mb-2 block">
                        TASTE DECISION REPORT
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-[#2D2A26] mb-4">
                        品味决策复盘
                    </h1>
                    <p className="text-[#8E8780] text-lg font-light">
                        《这才是成年人顶级的自律：断舍离》
                    </p>
                    <p className="text-[#8E8780] text-sm mt-2">
                        发布于 2024-11-15 · 图文笔记
                    </p>
                </div>

                {/* 标签页 */}
                <div className="flex gap-1 mb-8 border-b border-[#EBE5E0]">
                    {[
                        { key: 'data', label: '数据镜像' },
                        { key: 'decision', label: '决策回溯' },
                        { key: 'growth', label: '成长档案' }
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`px-6 py-3 font-medium transition-colors relative
                                ${activeTab === tab.key
                                    ? 'text-[#E86435]'
                                    : 'text-[#8E8780] hover:text-[#2D2A26]'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.key && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E86435]"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* 内容区 */}
                {activeTab === 'data' && <DataMirrorView />}
                {activeTab === 'decision' && <DecisionReviewView />}
                {activeTab === 'growth' && <GrowthArchiveView />}
            </div>
        </div>
    );
};

// 第一层：数据镜像
const DataMirrorView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="border border-[#EBE5E0] p-8 mb-8">
            <h2 className="text-2xl font-serif text-[#2D2A26] mb-6">
                《断舍离那篇》vs 你的常规表现
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
                {[
                    { label: '停留时长', value: '45s', avg: '38s', trend: 'up' },
                    { label: '完读率', value: '78%', avg: '62%', trend: 'up' },
                    { label: '收藏率', value: '12%', avg: '8%', trend: 'up' },
                    { label: '评论情绪', value: '73% 正面', avg: '65%', trend: 'up' }
                ].map(metric => (
                    <div key={metric.label} className="border-b border-[#EBE5E0] pb-4">
                        <div className="text-sm text-[#8E8780] mb-2">{metric.label}</div>
                        <div className="flex items-baseline gap-3">
                            <div className="text-3xl font-serif text-[#2D2A26]">{metric.value}</div>
                            <div className="text-sm text-[#8E8780]">
                                (你的平均: {metric.avg})
                            </div>
                            {metric.trend === 'up' && (
                                <TrendingUp className="text-[#E86435]" size={18} />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Button variant="secondary" className="mt-6 w-full md:w-auto">
                查看详细分析 <ChevronRight size={16} />
            </Button>
        </div>

        {/* 互动热点 */}
        <div className="border border-[#EBE5E0] p-8">
            <h3 className="text-xl font-medium text-[#2D2A26] mb-4">互动热点分布</h3>
            <div className="space-y-4">
                {[
                    { section: '开头："不知道从什么时候开始..."', reactions: [{ icon: <Heart size={14} />, count: 245 }, { icon: <MessageCircle size={14} />, count: 67 }] },
                    { section: '转折："扔掉了...那段消耗我的关系"', reactions: [{ icon: <Heart size={14} />, count: 432 }, { icon: <Bookmark size={14} />, count: 189 }] },
                    { section: '结尾："极简不是一无所有..."', reactions: [{ icon: <Heart size={14} />, count: 356 }, { icon: <MessageCircle size={14} />, count: 94 }] }
                ].map((item, index) => (
                    <div key={index} className="pl-4 border-l-2 border-[#E86435]">
                        <div className="text-[#2D2A26] mb-2 font-light">{item.section}</div>
                        <div className="flex gap-4">
                            {item.reactions.map((reaction, idx) => (
                                <div key={idx} className="flex items-center gap-1 text-[#8E8780] text-sm">
                                    {reaction.icon}
                                    <span>{reaction.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// 第二层：决策回溯
const DecisionReviewView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8">
        {/* 意图回顾 */}
        <div className="border border-[#EBE5E0] p-8">
            <div className="text-xs font-bold tracking-widest uppercase text-[#E86435] mb-4">
                创作前，你说
            </div>
            <p className="text-lg text-[#2D2A26] font-light leading-relaxed border-l-4 border-[#F2E8E3] pl-6 py-2">
                "我想从'关系断舍离'的角度切入，因为我相信人比物更重要"
            </p>
        </div>

        {/* 决策链条 */}
        <div className="border border-[#EBE5E0] p-8">
            <h3 className="text-xl font-medium text-[#2D2A26] mb-6">你的创作决策 → 内容呈现 → 读者反馈</h3>

            <div className="space-y-8">
                {/* 决策1 */}
                <div className="relative pl-8 border-l-2 border-[#EBE5E0]">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#E86435]"></div>
                    <div className="mb-3">
                        <span className="text-xs font-bold tracking-widest uppercase text-[#E86435]">
                            创作中，你选择了
                        </span>
                    </div>
                    <ul className="space-y-2 text-[#2D2A26] mb-4">
                        <li className="flex items-start gap-2">
                            <span className="text-[#E86435]">•</span>
                            <span className="font-light">开头方式: <strong>痛点共鸣式</strong> (而非场景描述)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#E86435]">•</span>
                            <span className="font-light">关键转折: 在第3段插入了<strong>个人故事</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#E86435]">•</span>
                            <span className="font-light">结尾方式: <strong>留白式提问</strong> (而非行动号召)</span>
                        </li>
                    </ul>
                </div>

                {/* AI分析 */}
                <div className="relative pl-8 border-l-2 border-[#EBE5E0]">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#E86435]"></div>
                    <div className="mb-3">
                        <span className="text-xs font-bold tracking-widest uppercase text-[#E86435]">
                            AI 节奏分析
                        </span>
                    </div>
                    <div className="bg-[#F2E8E3] p-6 mb-4">
                        <p className="text-[#2D2A26] font-light leading-relaxed mb-4">
                            你在第3段用了具体故事("扔掉那段消耗我的关系")
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm text-[#8E8780]">情绪曲线在这里出现波峰</span>
                            <span className="text-[#E86435]">↗️ ↗️↗️</span>
                        </div>
                        <p className="text-sm text-[#8E8780] font-light">
                            读者在这里的停留时间最长(12s)，评论集中在"太真实了"、"我也是"
                        </p>
                    </div>
                </div>

                {/* 结论 */}
                <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#E86435]"></div>
                    <div className="mb-3">
                        <span className="text-xs font-bold tracking-widest uppercase text-[#E86435]">
                            关联结论
                        </span>
                    </div>
                    <div className="border-l-4 border-[#E86435] pl-6 py-4 bg-[#F2E8E3]/30">
                        <p className="text-[#2D2A26] font-light leading-relaxed mb-3">
                            你的意图"人比物重要" → 你选择用"关系故事" → 读者产生"情感共鸣"
                        </p>
                        <div className="flex items-center gap-2 text-[#E86435] font-medium">
                            <span>这个决策链条是有效的 ✓</span>
                        </div>
                    </div>
                </div>
            </div>

            <Button variant="primary" className="mt-6">
                <Sparkles size={16} />
                加入品味图谱
            </Button>
        </div>
    </div>
);

// 第三层：成长档案
const GrowthArchiveView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="border border-[#EBE5E0] p-8">
            <h2 className="text-2xl font-serif text-[#2D2A26] mb-2">你的 11月品味进化报告 🌱</h2>
            <p className="text-[#8E8780] text-sm mb-8">基于 8 篇创作 · 47 个品味印记</p>

            {/* 强化风格 */}
            <div className="mb-8 pb-8 border-b border-[#EBE5E0]">
                <h3 className="text-lg font-medium text-[#2D2A26] mb-4">你在持续强化的风格</h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                        <span className="text-[#E86435] text-xl">•</span>
                        <div>
                            <p className="text-[#2D2A26] font-light">
                                <strong>"开头用痛点共鸣"</strong> (用了6次，平均完读率比其他方式高15%)
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-[#E86435] text-xl">•</span>
                        <div>
                            <p className="text-[#2D2A26] font-light">
                                <strong>"关系类话题"</strong> (持续高互动，建议作为你的内容标签)
                            </p>
                        </div>
                    </li>
                </ul>
            </div>

            {/* 探索新方向 */}
            <div className="mb-8 pb-8 border-b border-[#EBE5E0]">
                <h3 className="text-lg font-medium text-[#2D2A26] mb-4">你在探索的新方向</h3>
                <div className="bg-[#F2E8E3] p-6">
                    <p className="text-[#2D2A26] font-light leading-relaxed">
                        11/15 那天，你第一次尝试了<strong>"数据开头"</strong>。
                        虽然点击率一般，但你在复盘中说"下次想试试把数据可视化"，期待你的实验 💡
                    </p>
                </div>
            </div>

            {/* 品味图谱变化 */}
            <div className="mb-8 pb-8 border-b border-[#EBE5E0]">
                <h3 className="text-lg font-medium text-[#2D2A26] mb-4">品味图谱变化</h3>
                <div className="space-y-3">
                    {[
                        { name: '情绪共鸣', current: 4, prev: 3 },
                        { name: '故事性', current: 5, prev: 4 }
                    ].map(item => (
                        <div key={item.name} className="flex items-center gap-4">
                            <span className="text-sm text-[#8E8780] w-20">{item.name}:</span>
                            <div className="flex items-center gap-2">
                                {'●'.repeat(item.current)}
                                {'○'.repeat(5 - item.current)}
                                <span className="text-xs text-[#8E8780] ml-2">
                                    (上月 {'●'.repeat(item.prev)}{'○'.repeat(5 - item.prev)})
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 解锁成就 */}
            <div>
                <h3 className="text-lg font-medium text-[#2D2A26] mb-4">解锁成就</h3>
                <div className="bg-[#F2E8E3] p-6">
                    <div className="flex items-start gap-4">
                        <div className="text-3xl">🏅</div>
                        <div>
                            <h4 className="font-bold text-[#E86435] mb-1">"节奏大师"</h4>
                            <p className="text-[#2D2A26] text-sm font-light leading-relaxed">
                                你的《极简生活》那篇，阅读曲线被评为"行云流水"
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 月度总结 */}
            <div className="mt-8 pt-8 border-t border-[#EBE5E0]">
                <label className="text-sm text-[#2D2A26] font-medium mb-3 block">
                    要给这个月写一句总结吗？
                </label>
                <p className="text-xs text-[#8E8780] mb-3">(这句话会出现在你的"品味时间轴"上)</p>
                <input
                    type="text"
                    placeholder="比如：这个月找到了自己的叙事节奏..."
                    className="w-full px-4 py-3 border border-[#EBE5E0] text-[#2D2A26] focus:outline-none focus:border-[#E86435] transition-colors"
                />
                <Button variant="primary" className="mt-4">
                    保存到时间轴
                </Button>
            </div>
        </div>
    </div>
);
