import React, { useState } from 'react';
import { Lightbulb, X } from 'lucide-react';

interface AIPromptHelperProps {
    onSelect: (type: string) => void;
    onDismiss: () => void;
}

export const AIPromptHelper: React.FC<AIPromptHelperProps> = ({ onSelect, onDismiss }) => {
    return (
        <div className="animate-in slide-in-from-bottom-2 fade-in duration-300">
            <div className="bg-white shadow-xl border border-[#EBE5E0] p-6 max-w-sm rounded-none">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Lightbulb className="text-[#E86435]" size={20} strokeWidth={1.5} />
                        <span className="text-base font-medium text-[#2D2A26] font-serif">
                            需要一点灵感吗?
                        </span>
                    </div>
                    <button
                        onClick={onDismiss}
                        className="text-[#8E8780] hover:text-[#2D2A26]"
                    >
                        <X size={18} strokeWidth={1.5} />
                    </button>
                </div>

                <div className="space-y-1">
                    {[
                        { value: 'example', label: '补充一个具体例子' },
                        { value: 'transition', label: '过渡到下一个观点' },
                        { value: 'summary', label: '总结一下前面说的' },
                        { value: 'none', label: '我自己想，不用帮忙', special: true }
                    ].map(option => (
                        <div
                            key={option.value}
                            className={`flex items-center gap-3 p-3 cursor-pointer transition-all hover:bg-[#F2E8E3] group
                                ${option.special ? 'text-[#8E8780] hover:text-[#2D2A26] mt-2 border-t border-[#EBE5E0]' : 'text-[#2D2A26]'}`}
                            onClick={() => {
                                onSelect(option.value);
                                if (option.value === 'none') onDismiss();
                            }}
                        >
                            {!option.special && <div className="w-1.5 h-1.5 rounded-full bg-[#EBE5E0] group-hover:bg-[#E86435] transition-colors" />}
                            <span className="text-sm">
                                {option.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface PromptFillBlankProps {
    type: string;
    onComplete: (content: string) => void;
    onCancel: () => void;
}

export const PromptFillBlank: React.FC<PromptFillBlankProps> = ({ type, onComplete, onCancel }) => {
    const [blanks, setBlanks] = useState<{ [key: string]: string }>({});

    const templates: { [key: string]: string } = {
        example: '就拿_____(事件)来说，当时我_____(细节)，结果_____(转折)...',
        transition: '说完这个，我们再来看看_____(新话题)。其实_____(关联点)...',
        summary: '总结一下前面提到的几点：第一_____(要点1)，第二_____(要点2)，最后_____(要点3)...'
    };

    const template = templates[type] || '';
    const blankMatches = Array.from(template.matchAll(/___\(([^)]+)\)/g));

    const handleBlankChange = (key: string, value: string) => {
        setBlanks({ ...blanks, [key]: value });
    };

    const handleComplete = () => {
        let result = template;
        blankMatches.forEach((match) => {
            const key = match[1];
            const value = blanks[key] || '';
            result = result.replace(match[0], value);
        });
        onComplete(result);
    };

    return (
        <div className="animate-in slide-in-from-bottom-2 fade-in duration-300 my-8">
            <div className="pl-6 border-l border-[#E86435]">
                <div className="text-xs font-bold tracking-widest uppercase text-[#E86435] mb-4">
                    AI Suggestion
                </div>
                <div className="text-[#2D2A26] text-xl leading-loose font-serif italic mb-6">
                    {template.split(/___\([^)]+\)/).map((part, index) => (
                        <React.Fragment key={`part-${index}`}>
                            {part}
                            {index < blankMatches.length && (
                                <span className="relative inline-block mx-1">
                                    <input
                                        type="text"
                                        placeholder={blankMatches[index][1]}
                                        value={blanks[blankMatches[index][1]] || ''}
                                        onChange={(e) => handleBlankChange(blankMatches[index][1], e.target.value)}
                                        className="inline-block px-1 bg-transparent border-b border-[#8E8780] outline-none min-w-[100px] text-[#E86435] placeholder-[#EBE5E0] focus:border-[#E86435] transition-colors text-center"
                                        autoFocus={index === 0}
                                    />
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div className="flex gap-6">
                    <button
                        onClick={handleComplete}
                        className="text-[#E86435] text-sm font-bold hover:text-[#2D2A26] transition-colors uppercase tracking-wider"
                    >
                        插入内容
                    </button>
                    <button
                        onClick={onCancel}
                        className="text-[#8E8780] text-sm hover:text-[#2D2A26] transition-colors"
                    >
                        取消
                    </button>
                </div>
            </div>
        </div>
    );
};
