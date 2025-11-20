import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'text' | 'icon' | 'ghost';
    icon?: LucideIcon;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick, className = '', icon: Icon, disabled = false, ...props }) => {
    const variants = {
        primary: "bg-[#2D2A26] text-white hover:bg-[#E86435] transition-colors rounded-full px-6 py-3 font-medium",
        secondary: "bg-[#F2E8E3] text-[#E86435] hover:bg-[#E86435] hover:text-white transition-colors rounded-full px-5 py-2 font-medium text-sm",
        text: "text-[#2D2A26] hover:text-[#E86435] font-medium px-0 underline decoration-1 decoration-[#EBE5E0] hover:decoration-[#E86435] underline-offset-4 transition-all",
        icon: "w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F2E8E3] text-[#2D2A26] transition-colors",
        ghost: "text-[#8E8780] hover:text-[#2D2A26] transition-colors flex items-center gap-2"
    };

    return (
        <button onClick={onClick} disabled={disabled} className={`flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-50 ${variants[variant]} ${className}`} {...props}>
            {Icon && <Icon size={18} strokeWidth={2} />}
            {children}
        </button>
    );
};