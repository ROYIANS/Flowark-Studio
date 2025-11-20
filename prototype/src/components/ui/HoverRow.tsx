import React from 'react';

interface HoverRowProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export const HoverRow: React.FC<HoverRowProps> = ({ children, onClick, className = "" }) => (
    <div
        onClick={onClick}
        className={`group w-full transition-all duration-500 border-b border-[#EBE5E0] last:border-0 cursor-pointer hover:bg-[#F2E8E3]/30 hover:pl-4 ${className}`}
    >
        {children}
    </div>
);