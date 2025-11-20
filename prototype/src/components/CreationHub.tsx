import React from 'react';
import { ArrowLeft, PenTool, ArrowRight, Film, Crown } from 'lucide-react';
import { Button } from './ui/Button';

interface CreationHubProps {
    onBack: () => void;
    onCreate: (type: string) => void;
}

export const CreationHub: React.FC<CreationHubProps> = ({ onBack, onCreate }) => {
    return (
        <div className="min-h-screen bg-[#FDFCF8] p-6 md:p-12 pt-32 flex justify-center">
            <div className="w-full max-w-3xl">
                <div className="flex items-center justify-between mb-16">
                    <button onClick={onBack} className="flex items-center gap-2 text-[#8E8780] hover:text-[#2D2A26]">
                        <ArrowLeft size={20}/> 返回
                    </button>
                    <span className="text-sm font-bold tracking-widest uppercase text-[#E86435]">创作中心</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif text-[#2D2A26] mb-12">你想创作什么？</h1>

                <div className="border-t border-b border-[#EBE5E0]">
                    {/* 图文选项 */}
                    <div
                        onClick={() => onCreate('text')}
                        className="group py-10 flex items-center justify-between cursor-pointer hover:bg-[#F2E8E3]/30 transition-colors border-b border-[#EBE5E0] last:border-0"
                    >
                        <div className="flex items-start gap-6">
                            <div className="mt-1 text-[#E86435] opacity-50 group-hover:opacity-100 transition-opacity">
                                <PenTool size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-medium text-[#2D2A26] group-hover:text-[#E86435] transition-colors">图文笔记</h3>
                                <p className="text-[#8E8780] mt-2 font-light">包含标题、正文、配图建议。适合小红书/公众号。</p>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-[#EBE5E0] flex items-center justify-center text-[#8E8780] group-hover:border-[#E86435] group-hover:text-[#E86435] group-hover:bg-white transition-all">
                            <ArrowRight size={20} />
                        </div>
                    </div>

                    {/* 视频选项 */}
                    <div
                        onClick={() => onCreate('video')}
                        className="group py-10 flex items-center justify-between cursor-pointer hover:bg-[#F2E8E3]/30 transition-colors"
                    >
                        <div className="flex items-start gap-6">
                            <div className="mt-1 text-[#E86435] opacity-50 group-hover:opacity-100 transition-opacity">
                                <Film size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-medium text-[#2D2A26] group-hover:text-[#E86435] transition-colors">视频脚本</h3>
                                <p className="text-[#8E8780] mt-2 font-light">包含分镜、口播文案、拍摄指导。适合抖音/视频号。</p>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-[#EBE5E0] flex items-center justify-center text-[#8E8780] group-hover:border-[#E86435] group-hover:text-[#E86435] group-hover:bg-white transition-all">
                            <ArrowRight size={20} />
                        </div>
                    </div>
                </div>

                <div className="mt-16 bg-[#F2E8E3] p-8 rounded-none flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-[#E86435] mb-1 flex items-center gap-2"><Crown size={18}/> 会员权益</h4>
                        <p className="text-[#2D2A26] text-sm">¥40/月，解锁无限创作额度。</p>
                    </div>
                    <Button variant="primary" onClick={() => {}} className="text-sm px-6">立即开通</Button>
                </div>
            </div>
        </div>
    );
};