import React from 'react';
import { ArrowLeft, Sparkles, Award } from 'lucide-react';

// --- 类型定义 ---
interface TasteDimension {
    name: string;
    value: number;
    maxValue: number;
    color: string;
}

interface TasteMapProps {
    onBack: () => void;
}

interface RadarChartProps {
    dimensions: TasteDimension[];
}

// --- SVG 雷达图组件 (核心渲染逻辑) ---
const RadarChartSVG: React.FC<RadarChartProps> = ({ dimensions }) => {
    // SVG 基础参数
    const SIZE = 400; // SVG 视口大小
    const CENTER = SIZE / 2;
    const MAX_RADIUS = CENTER * 0.75; // 最大数据半径
    const numDimensions = dimensions.length;

    // 计算单个数据点的坐标 (X, Y)
    const getCoordinates = (value: number, index: number, maxVal: number) => {
        // 角度计算：从顶部 (-90度或 -PI/2) 开始，顺时针旋转
        // + Math.PI / 2 是为了让第一个维度从顶部开始
        const angle = (index / numDimensions) * 2 * Math.PI - Math.PI / 2;

        // 半径计算：将值缩放到最大半径
        const radius = (value / maxVal) * MAX_RADIUS;

        const x = CENTER + radius * Math.cos(angle);
        const y = CENTER + radius * Math.sin(angle);
        return { x, y };
    };

    // 1. 计算数据多边形的所有顶点
    const polygonPoints = dimensions.map((d, index) => {
        const coords = getCoordinates(d.value, index, d.maxValue);
        return `${coords.x},${coords.y}`;
    }).join(' ');

    // 颜色配置
    const axisColor = "#EBE5E0"; // 极简淡色
    const dataColor = "#E86435"; // 主题色：陶土橙
    const textColor = "#2D2A26"; // 深色文字
    const auxTextColor = "#8E8780"; // 辅助文字

    return (
        <svg width="100%" viewBox={`0 0 ${SIZE} ${SIZE}`} className="max-w-md mx-auto">
            {/* 网格圈 (Grid Rings) - 保持极简风格，使用 3 个圈 */}
            {[1, 2, 3].map((_, i) => {
                const radius = ((i + 1) / 3) * MAX_RADIUS;
                return (
                    <circle
                        key={`ring-${i}`}
                        cx={CENTER} cy={CENTER}
                        r={radius}
                        fill="none"
                        stroke={axisColor}
                        strokeWidth="1"
                        strokeDasharray="2 2"
                    />
                );
            })}

            {/* 维度轴线 (Axis Lines) */}
            {dimensions.map((d, index) => {
                const maxCoords = getCoordinates(d.maxValue, index, d.maxValue);

                return (
                    <line
                        key={`axis-${d.name}`}
                        x1={CENTER} y1={CENTER}
                        x2={maxCoords.x} y2={maxCoords.y}
                        stroke={axisColor}
                        strokeWidth="1"
                    />
                );
            })}

            {/* 核心：数据多边形 (Data Polygon) - 填充主题色并半透明 */}
            <polygon
                points={polygonPoints}
                fill={dataColor}
                fillOpacity="0.4"
                stroke={dataColor}
                strokeWidth="2"
                className="transition-all duration-1000 ease-out"
            />

            {/* 数据点和标签 */}
            {dimensions.map((d, index) => {
                const coords = getCoordinates(d.value, index, d.maxValue);

                // 标签位置 (略微超出 MAX_RADIUS，提升视觉美观)
                const labelRadius = MAX_RADIUS * 1.15;
                const angle = (index / numDimensions) * 2 * Math.PI - Math.PI / 2;
                const labelX = CENTER + labelRadius * Math.cos(angle);
                const labelY = CENTER + labelRadius * Math.sin(angle);

                // 确定文本锚点，使标签在四周居中对齐
                let textAnchor: "middle" | "start" | "end" | "inherit" | undefined = 'middle';
                if (angle > 0.1 * Math.PI && angle < 0.9 * Math.PI) {
                    textAnchor = 'start';
                } else if (angle > 1.1 * Math.PI && angle < 1.9 * Math.PI) {
                    textAnchor = 'end';
                }

                return (
                    <g key={`label-${d.name}`}>
                        {/* 数据点圆圈 */}
                        <circle
                            cx={coords.x} cy={coords.y}
                            r="4"
                            fill={textColor}
                            stroke="#FDFCF8"
                            strokeWidth="1.5"
                        />

                        {/* 标签文本：维度名称 */}
                        <text
                            x={labelX}
                            y={labelY}
                            fontSize="14"
                            fill={textColor}
                            fontWeight="500"
                            textAnchor={textAnchor}
                            dominantBaseline="central"
                            className='font-serif'
                        >
                            {d.name}
                        </text>
                        {/* 标签文本：印记分数 */}
                        <text
                            x={labelX}
                            y={labelY + 18}
                            fontSize="12"
                            fill={auxTextColor}
                            fontWeight="300"
                            textAnchor={textAnchor}
                            dominantBaseline="central"
                        >
                            ({d.value} 印记)
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

// --- 主 TasteMap 组件 ---
export const TasteMap: React.FC<TasteMapProps> = ({ onBack }) => {
    // 保持用户原有数据结构，在组件内部定义
    const dimensions: TasteDimension[] = [
        { name: '情绪共鸣', value: 45, maxValue: 100, color: '#E86435' },
        { name: '故事性', value: 68, maxValue: 100, color: '#E86435' },
        { name: '结构化', value: 32, maxValue: 100, color: '#E86435' },
        { name: '视觉美学', value: 55, maxValue: 100, color: '#E86435' }
    ];

    const totalImprints = dimensions.reduce((sum, d) => sum + d.value, 0);

    const achievements = [
        { id: 1, name: '风格冒险家', description: '尝试了3种完全不同的写作结构，成功拓宽了人设的可能性。', icon: '✨' },
        { id: 2, name: '节奏大师', description: '创作了一篇阅读曲线极其平滑的内容，用户平均停留时间提升20%。', icon: '🎧' }
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
                        <span>返回仪表盘</span>
                    </button>
                    <div className="flex items-center gap-2 text-[#E86435]">
                        <Sparkles size={20} />
                        <span className="font-bold text-2xl font-serif">{totalImprints}</span>
                        <span className="text-sm text-[#8E8780]">品味印记总值</span>
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
                        这是你创作风格的可视化呈现，每个维度都在随着你的创作选择而进化。
                    </p>
                </div>

                {/* 品味图谱 - 雷达图区域 - 使用修正后的 SVG 组件 */}
                <div className="mb-24 animate-in slide-in-from-bottom-4 duration-500">
                    <RadarChartSVG dimensions={dimensions} />
                </div>

                {/* 维度详情 */}
                <div className="mb-16 animate-in slide-in-from-bottom-4 duration-700">
                    <h2 className="text-2xl font-serif text-[#2D2A26] mb-6">品味维度详情与建议</h2>
                    <div className="space-y-6">
                        {dimensions.map((dimension) => (
                            <div key={dimension.name} className="border-b border-[#EBE5E0] pb-6 last:border-0">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-medium text-[#2D2A26]">{dimension.name}</h3>
                                    <span className="text-sm text-[#E86435] font-bold">
                                        {dimension.value} / {dimension.maxValue}
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-[#EBE5E0] overflow-hidden rounded-full">
                                    <div
                                        className="h-full bg-[#E86435] transition-all duration-1000 rounded-full"
                                        style={{ width: `${(dimension.value / dimension.maxValue) * 100}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-[#8E8780] mt-2 font-light">
                                    {dimension.value >= 60
                                        ? `你的 ${dimension.name} 品味成熟，已形成个人独特风格。`
                                        : `建议增加探索，多尝试利用 AI 的“爆款结构”助手，强化内容的骨架。`}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 成就系统 - 灵感激励 */}
                <div className="animate-in slide-in-from-bottom-4 duration-900">
                    <h2 className="text-2xl font-serif text-[#2D2A26] mb-8 flex items-center gap-3">
                        <Award className="text-[#E86435]" size={24} strokeWidth={1.5} />
                        解锁的成就
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {achievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className="group"
                            >
                                <div className="text-4xl mb-4 opacity-80 group-hover:scale-110 transition-transform duration-300 origin-left">{achievement.icon}</div>
                                <h3 className="font-bold text-[#2D2A26] mb-2 group-hover:text-[#E86435] transition-colors text-lg">
                                    {achievement.name}
                                </h3>
                                <p className="text-sm text-[#8E8780] font-light leading-relaxed">
                                    {achievement.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 pt-8 border-t border-[#EBE5E0] flex items-start gap-4">
                        <Sparkles className="text-[#E86435] shrink-0 mt-1" size={20} strokeWidth={1.5} />
                        <div>
                            <h4 className="font-bold text-[#E86435] mb-2">继续成长</h4>
                            <p className="text-[#2D2A26] text-base font-light leading-relaxed">
                                你的"结构化"维度还有很大提升空间。尝试在下次创作中使用"总分总"结构，会让内容更有条理。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
