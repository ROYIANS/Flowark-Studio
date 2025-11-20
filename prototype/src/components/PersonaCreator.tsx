import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import { Persona } from './PersonaArchives';

interface PersonaCreatorProps {
    onBack: () => void;
    onComplete: (persona: Persona) => void;
}

export const PersonaCreator: React.FC<PersonaCreatorProps> = ({ onBack, onComplete }) => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [niche, setNiche] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            onComplete({ id: Date.now(), name, niche, stats: "刚刚创建" });
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#FDFCF8] flex flex-col pt-32 px-6 items-center">
            <div className="max-w-xl w-full">
                <button onClick={onBack} className="mb-12 text-[#8E8780] hover:text-[#2D2A26] flex items-center gap-2">
                    <ArrowLeft size={18} /> 取消
                </button>

                {isGenerating ? (
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 w-48 bg-[#F2E8E3] rounded"></div>
                        <div className="h-4 w-64 bg-[#F2E8E3] rounded"></div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div>
                            <span className="text-[#E86435] font-bold mb-4 block text-sm tracking-widest uppercase">Step {step} / 2</span>
                            <h2 className="text-3xl md:text-4xl font-serif text-[#2D2A26] mb-4 leading-tight">
                                {step === 1 ? "首先，你想成为谁？" : "在这个身份下，你想专注什么领域？"}
                            </h2>
                        </div>

                        {step === 1 ? (
                            <input
                                autoFocus
                                type="text"
                                className="w-full bg-transparent border-b-2 border-[#EBE5E0] py-4 text-2xl md:text-3xl text-[#2D2A26] focus:outline-none focus:border-[#E86435] placeholder-[#EBE5E0] transition-colors"
                                placeholder="输入人设名称..."
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && name && setStep(2)}
                            />
                        ) : (
                            <div className="flex flex-wrap gap-3">
                                {["极简生活", "职场干货", "美妆护肤", "美食探店"].map(item => (
                                    <button
                                        key={item}
                                        onClick={() => setNiche(item)}
                                        className={`px-6 py-3 rounded-full border transition-all text-lg
                      ${niche === item ? 'border-[#E86435] text-[#E86435] bg-[#F2E8E3]' : 'border-[#EBE5E0] text-[#8E8780] hover:border-[#8E8780]'}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="pt-8 flex items-center justify-between">
                            {step === 2 && <button onClick={() => setStep(1)} className="text-[#8E8780]">上一步</button>}
                            <div className="flex-1"></div>
                            <Button
                                variant="primary"
                                onClick={() => step === 1 ? setStep(2) : handleGenerate()}
                                disabled={step === 1 ? !name : !niche}
                                icon={step === 1 ? ArrowRight : Sparkles}
                            >
                                {step === 1 ? "继续" : "生成档案"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};