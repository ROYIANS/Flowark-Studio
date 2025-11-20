import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';

interface IntentCaptureProps {
    onComplete: (intent: IntentData) => void;
    onSkip: () => void;
}

export interface IntentData {
    type: string;
    approach?: string;
    timestamp: number;
}

export const IntentCapture: React.FC<IntentCaptureProps> = ({ onComplete, onSkip }) => {
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedApproach, setSelectedApproach] = useState<string>('');

    const handleContinue = () => {
        onComplete({
            type: selectedType,
            approach: selectedApproach || undefined,
            timestamp: Date.now()
        });
    };

    return (
        <div className="fixed inset-0 bg-[#2D2A26]/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-[#FDFCF8] w-full max-w-lg mx-4 p-8 rounded-none animate-in slide-in-from-bottom-4 duration-500">
                {/* 标题区 */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="text-xs font-bold tracking-widest uppercase text-[#E86435] mb-2">花 3 秒</div>
                        <h3 className="text-2xl font-serif text-[#2D2A26]">说说你的想法 👇</h3>
                    </div>
                    <button
                        onClick={onSkip}
                        className="text-[#8E8780] hover:text-[#2D2A26] transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* 问题1：创作类型 */}
                <div className="mb-8">
                    <label className="text-sm text-[#2D2A26] font-medium mb-3 block">
                        我想写/拍: <span className="text-[#8E8780] text-xs">(选一个)</span>
                    </label>
                    <div className="space-y-2">
                        {[
                            { value: 'experience', label: '我自己的真实经历' },
                            { value: 'observation', label: '我观察到的现象' },
                            { value: 'methodology', label: '我想分享的方法论' },
                            { value: 'custom', label: '其他' }
                        ].map(option => (
                            <label
                                key={option.value}
                                className={`flex items-center gap-3 p-3 border border-[#EBE5E0] cursor-pointer transition-all hover:border-[#E86435]
                                    ${selectedType === option.value ? 'border-[#E86435] bg-[#F2E8E3]' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name="type"
                                    value={option.value}
                                    checked={selectedType === option.value}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="accent-[#E86435]"
                                />
                                <span className="text-[#2D2A26]">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 问题2：开头方式（可选） */}
                <div className="mb-8">
                    <label className="text-sm text-[#2D2A26] font-medium mb-3 block">
                        这次我想试试: <span className="text-[#8E8780] text-xs">(选一个或跳过)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { value: 'story', label: '用故事开头' },
                            { value: 'data', label: '用数据开头' },
                            { value: 'question', label: '用提问开头' }
                        ].map(option => (
                            <button
                                key={option.value}
                                onClick={() => setSelectedApproach(option.value === selectedApproach ? '' : option.value)}
                                className={`px-4 py-2 border border-[#EBE5E0] text-sm transition-all
                                    ${selectedApproach === option.value
                                        ? 'border-[#E86435] bg-[#F2E8E3] text-[#E86435]'
                                        : 'text-[#8E8780] hover:border-[#8E8780]'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 底部按钮 */}
                <div className="flex items-center justify-between pt-6 border-t border-[#EBE5E0]">
                    <button
                        onClick={onSkip}
                        className="text-[#8E8780] hover:text-[#2D2A26] transition-colors text-sm"
                    >
                        跳过
                    </button>
                    <Button
                        variant="primary"
                        onClick={handleContinue}
                        disabled={!selectedType}
                    >
                        3秒说完了，开始创作
                    </Button>
                </div>
            </div>
        </div>
    );
};
