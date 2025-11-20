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
        <div className="fixed inset-0 bg-[#FDFCF8]/90 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-[#FDFCF8] w-full max-w-lg mx-4 p-12 shadow-2xl border border-[#EBE5E0] animate-in slide-in-from-bottom-4 duration-500">
                {/* 标题区 */}
                <div className="flex items-start justify-between mb-12">
                    <div>
                        <div className="text-xs font-bold tracking-widest uppercase text-[#E86435] mb-2">Before we start</div>
                        <h3 className="text-3xl font-serif text-[#2D2A26]">花 3 秒，说说你的想法</h3>
                    </div>
                    <button
                        onClick={onSkip}
                        className="text-[#8E8780] hover:text-[#2D2A26] transition-colors"
                    >
                        <X size={24} strokeWidth={1.5} />
                    </button>
                </div>

                {/* 问题1：创作类型 */}
                <div className="mb-12">
                    <label className="text-lg text-[#2D2A26] font-medium mb-6 block">
                        我想写/拍...
                    </label>
                    <div className="space-y-4">
                        {[
                            { value: 'experience', label: '我自己的真实经历' },
                            { value: 'observation', label: '我观察到的现象' },
                            { value: 'methodology', label: '我想分享的方法论' },
                            { value: 'custom', label: '其他' }
                        ].map(option => (
                            <label
                                key={option.value}
                                className={`flex items-center gap-4 p-4 cursor-pointer transition-all group
                                    ${selectedType === option.value ? 'bg-[#F2E8E3]' : 'hover:bg-[#F2E8E3]/30'}`}
                            >
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors
                                    ${selectedType === option.value ? 'border-[#E86435]' : 'border-[#EBE5E0] group-hover:border-[#E86435]'}`}>
                                    {selectedType === option.value && <div className="w-2 h-2 rounded-full bg-[#E86435]" />}
                                </div>
                                <input
                                    type="radio"
                                    name="type"
                                    value={option.value}
                                    checked={selectedType === option.value}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="hidden"
                                />
                                <span className={`text-lg ${selectedType === option.value ? 'text-[#E86435]' : 'text-[#2D2A26]'}`}>{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 问题2：开头方式（可选） */}
                <div className="mb-12">
                    <label className="text-lg text-[#2D2A26] font-medium mb-6 block">
                        这次我想试试... <span className="text-[#8E8780] text-sm font-normal">(可选)</span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { value: 'story', label: '用故事开头' },
                            { value: 'data', label: '用数据开头' },
                            { value: 'question', label: '用提问开头' }
                        ].map(option => (
                            <button
                                key={option.value}
                                onClick={() => setSelectedApproach(option.value === selectedApproach ? '' : option.value)}
                                className={`px-6 py-3 text-base transition-all rounded-full
                                    ${selectedApproach === option.value
                                        ? 'bg-[#2D2A26] text-white'
                                        : 'bg-white border border-[#EBE5E0] text-[#8E8780] hover:border-[#E86435] hover:text-[#E86435]'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 底部按钮 */}
                <div className="flex items-center justify-between pt-8 border-t border-[#EBE5E0]">
                    <button
                        onClick={onSkip}
                        className="text-[#8E8780] hover:text-[#2D2A26] transition-colors text-sm underline decoration-1 underline-offset-4"
                    >
                        跳过
                    </button>
                    <Button
                        variant="primary"
                        onClick={handleContinue}
                        disabled={!selectedType}
                        className="px-8"
                    >
                        开始创作
                    </Button>
                </div>
            </div>
        </div>
    );
};
