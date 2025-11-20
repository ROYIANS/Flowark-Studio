import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface TasteImprintNotificationProps {
    points: number;
    message: string;
}

export const TasteImprintNotification: React.FC<TasteImprintNotificationProps> = ({ points, message }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
            <div className="bg-[#FDFCF8] border-2 border-[#E86435] px-6 py-4 flex items-center gap-3 shadow-lg">
                <div className="relative">
                    <Sparkles className="text-[#E86435]" size={24} />
                    <div className="absolute -top-1 -right-1 bg-[#E86435] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-in zoom-in duration-200">
                        +{points}
                    </div>
                </div>
                <div>
                    <div className="text-xs font-bold tracking-wider uppercase text-[#E86435] mb-1">
                        品味印记 +{points}
                    </div>
                    <div className="text-sm text-[#2D2A26]">{message}</div>
                </div>
            </div>
        </div>
    );
};

interface TasteImprintBadgeProps {
    totalPoints: number;
    onClick: () => void;
}

export const TasteImprintBadge: React.FC<TasteImprintBadgeProps> = ({ totalPoints, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-3 py-2 bg-[#F2E8E3] hover:bg-[#E86435] text-[#E86435] hover:text-white transition-all rounded-full group"
        >
            <Sparkles size={16} />
            <span className="font-bold text-sm">{totalPoints}</span>
            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity max-w-0 group-hover:max-w-xs overflow-hidden whitespace-nowrap">
                查看品味图谱
            </span>
        </button>
    );
};
