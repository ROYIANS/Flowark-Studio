import React, { useState } from 'react';
import { ArrowLeft, Download, RefreshCcw, Wand2, PenTool, Smile, Meh, Sparkles, Lightbulb } from 'lucide-react';
import { Button } from './ui/Button';
import { IntentCapture, IntentData } from './IntentCapture';
import { AIPromptHelper, PromptFillBlank } from './AIPromptHelper';
import { TasteImprintNotification } from './TasteImprintNotification';

interface EditorProps {
    type: string;
    onBack: () => void;
}

export const Editor: React.FC<EditorProps> = ({ type, onBack }) => {
    const [showIntentCapture, setShowIntentCapture] = useState(true);
    const [intent, setIntent] = useState<IntentData | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showAIHelper, setShowAIHelper] = useState(false);
    const [selectedPromptType, setSelectedPromptType] = useState<string | null>(null);
    const [showCompletion, setShowCompletion] = useState(false);
    const [showImprintNotification, setShowImprintNotification] = useState(false);
    const [imprintMessage, setImprintMessage] = useState('');
    const [content, setContent] = useState('');
    const [feeling, setFeeling] = useState<string | null>(null);

    const handleIntentComplete = (intentData: IntentData) => {
        setIntent(intentData);
        setShowIntentCapture(false);
        setIsGenerating(true);
        setImprintMessage('记录了你的创作意图');
        setShowImprintNotification(true);
        setTimeout(() => setShowImprintNotification(false), 3000);

        setTimeout(() => {
            setIsGenerating(false);
            setContent(`不知道从什么时候开始，我们被物品绑架了。\n\n看着堆满杂物的桌面，心情也跟着乱糟糟的。今天我决定来一场彻底的断舍离。\n\n扔掉了半年前过期的面膜，不再喜欢的旧衣服，还有那段消耗我的关系。\n\n极简不是一无所有，而是拥有的一切都是心头好。`);
        }, 2000);
    };

    const handleIntentSkip = () => {
        setShowIntentCapture(false);
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setContent(`不知道从什么时候开始，我们被物品绑架了。\n\n看着堆满杂物的桌面，心情也跟着乱糟糟的。今天我决定来一场彻底的断舍离。\n\n扔掉了半年前过期的面膜，不再喜欢的旧衣服，还有那段消耗我的关系。\n\n极简不是一无所有，而是拥有的一切都是心头好。`);
        }, 2000);
    };

    const handlePromptSelect = (promptType: string) => {
        if (promptType !== 'none') {
            setSelectedPromptType(promptType);
        }
        setShowAIHelper(false);
    };

    const handlePromptComplete = (promptContent: string) => {
        setContent(content + '\n\n' + promptContent);
        setSelectedPromptType(null);
        setImprintMessage('AI学习了你的表达偏好');
        setShowImprintNotification(true);
        setTimeout(() => setShowImprintNotification(false), 3000);
    };

    const handleFeelingSelect = (feelingType: string) => {
        setFeeling(feelingType);
        setImprintMessage('记录了你的创作感受');
        setShowImprintNotification(true);
        setTimeout(() => {
            setShowImprintNotification(false);
            setShowCompletion(true);
        }, 2000);
    };

    // 意图捕捉弹窗
    if (showIntentCapture && !isGenerating) {
        return <IntentCapture onComplete={handleIntentComplete} onSkip={handleIntentSkip} />;
    }

    // 生成中
    if (isGenerating) {
        return (
            <div className="min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#F2E8E3] border-t-[#E86435] rounded-full animate-spin mb-8"></div>
                <h2 className="text-2xl font-serif text-[#2D2A26] mb-2">正在构思...</h2>
                <p className="text-[#8E8780]">AI 正在为您的 {type === 'text' ? '图文' : '视频'} 注入灵感</p>
            </div>
        );
    }

    // 创作完成反思
    if (showCompletion) {
        return (
            <div className="min-h-screen bg-[#FDFCF8] p-6 md:p-12 flex items-center justify-center">
                <div className="max-w-lg w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="border border-[#EBE5E0] p-8">
                        <div className="text-3xl mb-6 text-center">🎉</div>
                        <h2 className="text-2xl font-serif text-[#2D2A26] mb-4 text-center">
                            完成了！
                        </h2>
                        <p className="text-[#8E8780] mb-8 text-center">
                            在归档前，记录一下这次的感受
                        </p>

                        <div className="mb-6">
                            <label className="text-sm text-[#2D2A26] font-medium mb-3 block">
                                这次创作的感觉是: <span className="text-[#8E8780] text-xs">(点击一个)</span>
                            </label>
                            <div className="flex justify-center gap-4">
                                {[
                                    { value: 'smooth', icon: <Smile size={32} />, label: '很顺畅' },
                                    { value: 'stuck', icon: <Meh size={32} />, label: '有点卡' },
                                    { value: 'breakthrough', icon: <Sparkles size={32} />, label: '有突破' }
                                ].map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleFeelingSelect(option.value)}
                                        className={`flex flex-col items-center gap-2 p-6 border transition-all
                                            ${feeling === option.value
                                                ? 'border-[#E86435] bg-[#F2E8E3]'
                                                : 'border-[#EBE5E0] hover:border-[#E86435]'
                                            }`}
                                    >
                                        <div className="text-[#E86435]">{option.icon}</div>
                                        <span className="text-sm text-[#2D2A26]">{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={onBack}
                                className="flex-1 px-4 py-3 bg-[#E86435] text-white font-medium hover:bg-[#2D2A26] transition-colors"
                            >
                                记录完成 +3 品味印记
                            </button>
                            <button
                                onClick={onBack}
                                className="px-4 py-3 text-[#8E8780] hover:text-[#2D2A26] transition-colors"
                            >
                                暂时不想说
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 主编辑器
    return (
        <div className="min-h-screen bg-[#FDFCF8] flex flex-col animate-in fade-in duration-500">
            {showImprintNotification && (
                <TasteImprintNotification points={2} message={imprintMessage} />
            )}

            {/* 顶部工具栏 */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-[#EBE5E0] bg-[#FDFCF8]/90 backdrop-blur sticky top-0 z-10">
                <button onClick={onBack} className="flex items-center gap-2 text-[#8E8780] hover:text-[#2D2A26]">
                    <ArrowLeft size={18}/>
                    <span className="hidden md:inline">返回</span>
                </button>
                <div className="flex items-center gap-4">
                    <span className="text-xs text-[#8E8780]">自动保存于 刚刚</span>
                    <Button variant="primary" className="px-4 py-2 text-sm" onClick={() => setShowCompletion(true)}>
                        <Download size={16} />
                        完成创作
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex">
                {/* 主编辑区 */}
                <main className="flex-1 p-8 md:p-16 max-w-4xl mx-auto overflow-y-auto w-full">
                    {type === 'text' ? (
                        <div className="space-y-8">
                            {/* 意图回显（如果有） - 极简风格 */}
                            {intent && (
                                <div className="mb-12 animate-in slide-in-from-top-2 fade-in flex items-baseline gap-4 text-[#8E8780]">
                                    <span className="text-xs font-bold tracking-wider uppercase text-[#E86435]">Intent</span>
                                    <p className="text-sm font-light italic">
                                        "{intent.type === 'experience' ? '我想写写我的真实经历' : intent.type === 'observation' ? '我想聊聊观察到的现象' : '我想分享一套方法论'}，
                                        {intent.approach && `并尝试用${intent.approach === 'story' ? '故事' : intent.approach === 'data' ? '数据' : '提问'}来开头`}"
                                    </p>
                                </div>
                            )}

                            {/* 标题区 */}
                            <div className="group relative mb-8">
                                <input
                                    type="text"
                                    defaultValue="这才是成年人顶级的自律：断舍离"
                                    className="w-full text-4xl md:text-5xl font-serif font-bold text-[#2D2A26] bg-transparent outline-none placeholder-[#EBE5E0] border-b border-transparent focus:border-[#EBE5E0] transition-colors pb-2"
                                />
                                <div className="absolute -right-4 top-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-full">
                                    <Button variant="ghost" icon={RefreshCcw} className="text-xs">换标题</Button>
                                </div>
                            </div>

                            {/* 正文区 */}
                            <div className="relative group min-h-[60vh]">
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full h-full min-h-[500px] resize-none bg-transparent text-lg leading-loose text-[#2D2A26] outline-none font-light selection:bg-[#F2E8E3] selection:text-[#E86435]"
                                    placeholder="开始写作..."
                                />
                                {/* 悬浮工具按钮 - 仅在 focus 或 hover 时显示 */}
                                <div className="absolute -right-16 top-0 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button
                                        onClick={() => setShowAIHelper(true)}
                                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-[#EBE5E0] text-[#E86435] hover:border-[#E86435] hover:shadow-md transition-all"
                                        title="AI帮助"
                                    >
                                        <Lightbulb size={18} strokeWidth={1.5}/>
                                    </button>
                                    <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-[#EBE5E0] text-[#8E8780] hover:text-[#E86435] hover:border-[#E86435] hover:shadow-md transition-all" title="润色">
                                        <Wand2 size={18} strokeWidth={1.5}/>
                                    </button>
                                    <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-[#EBE5E0] text-[#8E8780] hover:text-[#E86435] hover:border-[#E86435] hover:shadow-md transition-all" title="续写">
                                        <PenTool size={18} strokeWidth={1.5}/>
                                    </button>
                                </div>

                                {/* AI 帮助面板 */}
                                {showAIHelper && (
                                    <div className="mt-4">
                                        <AIPromptHelper
                                            onSelect={handlePromptSelect}
                                            onDismiss={() => setShowAIHelper(false)}
                                        />
                                    </div>
                                )}

                                {/* 提示句填空 */}
                                {selectedPromptType && (
                                    <div className="mt-4">
                                        <PromptFillBlank
                                            type={selectedPromptType}
                                            onComplete={handlePromptComplete}
                                            onCancel={() => setSelectedPromptType(null)}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* 标签 - 极简风格 */}
                            <div className="flex gap-4 pt-12 mt-12 border-t border-[#EBE5E0]/50">
                                {["#极简生活", "#断舍离", "#治愈系"].map(tag => (
                                    <span key={tag} className="text-sm text-[#8E8780] hover:text-[#E86435] cursor-pointer transition-colors">{tag}</span>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* 视频脚本模式 - 保持原样 */
                        <div className="space-y-12">
                            <div>
                                <h1 className="text-4xl font-serif font-bold text-[#2D2A26] mb-4">别让"假努力"毁了你</h1>
                                <div className="flex gap-4 text-sm text-[#8E8780]">
                                    <span>时长: 45s</span>
                                    <span>•</span>
                                    <span>风格: 治愈/口播</span>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                {/* 右侧 AI 侧边栏 - 更加隐形 */}
                <aside className="w-72 border-l border-[#EBE5E0] p-8 hidden xl:block bg-[#FDFCF8]">
                    <div className="sticky top-24 space-y-12">
                        <div>
                            <h3 className="text-xs font-bold text-[#E86435] uppercase tracking-widest mb-4">Visuals</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="aspect-square bg-[#F2E8E3] flex items-center justify-center text-[#8E8780] text-xs hover:bg-[#E86435] hover:text-white transition-colors cursor-pointer">极简桌面</div>
                                <div className="aspect-square bg-[#F2E8E3] flex items-center justify-center text-[#8E8780] text-xs hover:bg-[#E86435] hover:text-white transition-colors cursor-pointer">收纳特写</div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-[#E86435] uppercase tracking-widest mb-4">Tips</h3>
                            <p className="text-sm text-[#8E8780] leading-relaxed font-light">
                                建议在 <span className="text-[#2D2A26] font-medium">周日 20:00</span> 发布。
                                <br/><br/>
                                你的粉丝在这个时间段最活跃。
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
