import React, { useState } from 'react';
import { Lightbulb, X } from 'lucide-react';

interface AIPromptHelperProps {
    onSelect: (type: string) => void;
    onDismiss: () => void;
}

export const AIPromptHelper: React.FC<AIPromptHelperProps> = ({ onSelect, onDismiss }) => {
    return (
        <div className="animate-in slide-in-from-bottom-2 fade-in duration-300">
            <div className="bg-[#FDFCF8] border-2 border-[#EBE5E0] p-5 max-w-sm">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Lightbulb className="text-[#E86435]" size={18} />
                        <span className="text-sm font-medium text-[#2D2A26]">
                            我注意到你停下来了，需要帮忙吗?
                        </span>
                    </div>
                    <button
                        onClick={onDismiss}
                        className="text-[#8E8780] hover:text-[#2D2A26]"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="text-sm text-[#2D2A26] mb-3">接下来你想:</div>

                <div className="space-y-2">
                    {[
                        { value: 'example', label: '补充一个具体例子' },
                        { value: 'transition', label: '过渡到下一个观点' },
                        { value: 'summary', label: '总结一下前面说的' },
                        { value: 'none', label: '我自己想，不用帮忙', special: true }
                    ].map(option => (
                        <label
                            key={option.value}
                            className={`flex items-center gap-3 p-3 border border-[#EBE5E0] cursor-pointer transition-all hover:border-[#E86435] hover:bg-[#F2E8E3]/30
                                ${option.special ? 'border-dashed' : ''}`}
                            onClick={() => {
                                onSelect(option.value);
                                if (option.value === 'none') onDismiss();
                            }}
                        >
                            <input
                                type="radio"
                                name="prompt-type"
                                value={option.value}
                                className="accent-[#E86435]"
                            />
                            <span className={`text-sm ${option.special ? 'text-[#8E8780]' : 'text-[#2D2A26]'}`}>
                                {option.label}
                            </span>
                        </label>
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
        <div className="animate-in slide-in-from-bottom-2 fade-in duration-300">
            <div className="bg-[#F2E8E3] border-l-4 border-[#E86435] p-5 mb-4">
                <div className="text-xs font-bold tracking-wider uppercase text-[#E86435] mb-3">
                    AI 提示句
                </div>
                <div className="text-[#2D2A26] text-lg leading-relaxed font-light mb-4">
                    {template.split(/___\([^)]+\)/).map((part, index) => (
                        <React.Fragment key={`part-${index}`}>
                            {part}
                            {index < blankMatches.length && (
                                <input
                                    type="text"
                                    placeholder={blankMatches[index][1]}
                                    value={blanks[blankMatches[index][1]] || ''}
                                    onChange={(e) => handleBlankChange(blankMatches[index][1], e.target.value)}
                                    className="inline-block mx-1 px-2 py-1 bg-white border-b-2 border-[#E86435] outline-none min-w-[120px] focus:bg-[#FDFCF8]"
                                    autoFocus={index === 0}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleComplete}
                        className="px-4 py-2 bg-[#E86435] text-white text-sm font-medium hover:bg-[#2D2A26] transition-colors"
                    >
                        插入到编辑器
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-[#8E8780] text-sm hover:text-[#2D2A26] transition-colors"
                    >
                        取消
                    </button>
                </div>
            </div>
        </div>
    );
};
