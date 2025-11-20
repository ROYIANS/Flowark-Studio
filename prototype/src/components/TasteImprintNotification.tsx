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
        <div className="fixed top-8 right-8 z-50 animate-in slide-in-from-top-2 fade-in duration-500">
            <div className="bg-white px-6 py-4 flex items-center gap-4 border-l-2 border-[#E86435] shadow-sm">
                <div className="relative">
                    <Sparkles className="text-[#E86435]" size={20} strokeWidth={1.5} />
                </div>
                <div>
                    <div className="text-xs font-bold tracking-widest uppercase text-[#E86435] mb-1">
                        Taste Imprint +{points}
                    </div>
                    <div className="text-sm text-[#2D2A26] font-light">{message}</div>
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
            className="flex items-center gap-3 group"
        >
            <div className="w-8 h-8 rounded-full bg-[#F2E8E3] flex items-center justify-center text-[#E86435] group-hover:bg-[#E86435] group-hover:text-white transition-colors">
                <Sparkles size={14} strokeWidth={2} />
            </div>
            <div className="flex flex-col items-start">
                <span className="text-xs text-[#8E8780] uppercase tracking-wider font-bold">Taste Points</span>
                <span className="text-sm font-serif font-bold text-[#2D2A26]">{totalPoints}</span>
            </div>
        </button>
    );
};
