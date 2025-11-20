import React from 'react';

interface AvatarProps {
    name: string;
    size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = "md" }) => {
    const sizes = { sm: "w-8 h-8 text-xs", md: "w-12 h-12 text-lg", lg: "w-16 h-16 text-xl" };
    return (
        <div className={`${sizes[size]} rounded-full bg-[#EBE5E0] text-[#8E8780] flex items-center justify-center font-serif font-bold shrink-0`}>
            {name[0]}
        </div>
    );
};