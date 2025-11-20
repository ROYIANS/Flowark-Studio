import React from 'react';
import { ArrowLeft, Sparkles, Award } from 'lucide-react';

interface TasteMapProps {
    onBack: () => void;
}

interface TasteDimension {
    name: string;
    value: number;
    maxValue: number;
    color: string;
}

export const TasteMap: React.FC<TasteMapProps> = ({ onBack }) => {
    const dimensions: TasteDimension[] = [
        { name: '情绪共鸣', value: 45, maxValue: 100, color: '#E86435' },
        { name: '故事性', value: 68, maxValue: 100, color: '#E86435' },
        { name: '结构化', value: 32, maxValue: 100, color: '#E86435' },
        { name: '视觉美学', value: 55, maxValue: 100, color: '#E86435' }
    ];

    const totalImprints = dimensions.reduce((sum, d) => sum + d.value, 0);

    const achievements = [
        { id: 1, name: '风格冒险家', description: '尝试了3种完全不同的写作结构', icon: '🎨' },
        { id: 2, name: '节奏大师', description: '创作了一篇阅读曲线极其平滑的内容', icon: '🎵' }
    ];

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
                    <div className="flex items-center gap-2 text-[#E86435]">
                        <Sparkles size={20} />
                        <span className="font-bold text-2xl">{totalImprints}</span>
                        <span className="text-sm text-[#8E8780]">品味印记</span>
                    </div>
                </div>

                {/* 标题 */}
                <div className="mb-12 animate-in fade-in duration-500">
                    <span className="text-xs font-bold tracking-widest uppercase text-[#E86435] mb-2 block">
                        YOUR TASTE MAP
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-[#2D2A26]">
                        你的品味图谱
                    </h1>
                    <p className="text-[#8E8780] mt-4 text-lg font-light">
                        这是你创作风格的可视化呈现，每个维度都在随着你的选择而进化
                    </p>
                </div>

                {/* 品味图谱 - 雷达图风格 */}
                <div className="mb-16 p-12 border border-[#EBE5E0] animate-in slide-in-from-bottom-4 duration-500">
                    <div className="relative aspect-square max-w-md mx-auto">
                        {/* 中心圆 */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-[#E86435]"></div>
                        </div>

                        {/* 维度线 */}
                        {dimensions.map((dimension, index) => {
                            const angle = (index * 360) / dimensions.length - 90;
                            const radians = (angle * Math.PI) / 180;
                            const percentage = dimension.value / dimension.maxValue;
                            const distance = 45 * percentage; // 最大半径45%

                            return (
                                <div key={dimension.name}>
                                    {/* 引导线 */}
                                    <div
                                        className="absolute top-1/2 left-1/2 origin-left"
                                        style={{
                                            width: '45%',
                                            height: '1px',
                                            backgroundColor: '#EBE5E0',
                                            transform: `rotate(${angle}deg)`
                                        }}
                                    />

                                    {/* 数据点 */}
                                    <div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                                        style={{
                                            transform: `translate(${Math.cos(radians) * distance}%, ${Math.sin(radians) * distance}%) translate(-50%, -50%)`
                                        }}
                                    >
                                        <div className="w-3 h-3 rounded-full bg-[#E86435] shadow-lg"></div>
                                    </div>

                                    {/* 标签 */}
                                    <div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                                        style={{
                                            transform: `translate(${Math.cos(radians) * 55}%, ${Math.sin(radians) * 55}%) translate(-50%, -50%)`
                                        }}
                                    >
                                        <div className="text-sm font-medium text-[#2D2A26] mb-1 whitespace-nowrap">
                                            {dimension.name}
                                        </div>
                                        <div className="text-xs text-[#E86435] font-bold">
                                            {dimension.value}/{dimension.maxValue}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 维度详情 */}
                <div className="mb-16 animate-in slide-in-from-bottom-4 duration-700">
                    <h2 className="text-2xl font-serif text-[#2D2A26] mb-6">品味维度详情</h2>
                    <div className="space-y-6">
                        {dimensions.map((dimension) => (
                            <div key={dimension.name} className="border-b border-[#EBE5E0] pb-6 last:border-0">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-medium text-[#2D2A26]">{dimension.name}</h3>
                                    <span className="text-sm text-[#E86435] font-bold">
                                        {dimension.value} 印记
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-[#EBE5E0] overflow-hidden">
                                    <div
                                        className="h-full bg-[#E86435] transition-all duration-1000"
                                        style={{ width: `${(dimension.value / dimension.maxValue) * 100}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-[#8E8780] mt-2 font-light">
                                    {dimension.value >= 50
                                        ? '你在这个维度表现突出，继续保持！'
                                        : '继续探索这个维度，会有更多发现'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 成就系统 */}
                <div className="animate-in slide-in-from-bottom-4 duration-900">
                    <h2 className="text-2xl font-serif text-[#2D2A26] mb-6 flex items-center gap-3">
                        <Award className="text-[#E86435]" size={28} />
                        解锁的成就
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {achievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className="border border-[#EBE5E0] p-6 hover:border-[#E86435] transition-colors group"
                            >
                                <div className="text-4xl mb-3">{achievement.icon}</div>
                                <h3 className="font-bold text-[#2D2A26] mb-2 group-hover:text-[#E86435] transition-colors">
                                    {achievement.name}
                                </h3>
                                <p className="text-sm text-[#8E8780] font-light leading-relaxed">
                                    {achievement.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-6 bg-[#F2E8E3] flex items-start gap-4">
                        <Sparkles className="text-[#E86435] shrink-0 mt-1" size={20} />
                        <div>
                            <h4 className="font-bold text-[#E86435] mb-1">继续成长</h4>
                            <p className="text-[#2D2A26] text-sm font-light leading-relaxed">
                                你的"结构化"维度还有很大提升空间。尝试在下次创作中使用"总分总"结构，会让内容更有条理。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
