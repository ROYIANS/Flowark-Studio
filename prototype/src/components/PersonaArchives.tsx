import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import { HoverRow } from './ui/HoverRow';
import { Avatar } from './ui/Avatar';
import { useApp } from '../contexts/AppContext';

export interface Persona {
    id: number;
    name: string;
    niche: string;
    stats: string;
}

export const PersonaArchives: React.FC = () => {
    const navigate = useNavigate();
    const { personas, setSelectedPersona } = useApp();

    const handleSelect = (persona: Persona) => {
        setSelectedPersona(persona);
        navigate(`/personas/${persona.id}/dashboard`);
    };

    const handleCreate = () => {
        navigate('/personas/create');
    };
    return (
        <div className="min-h-screen bg-[#FDFCF8] flex flex-col items-center pt-32 px-6">
            <div className="max-w-2xl w-full">
                <div className="mb-16 text-left">
                    <h1 className="text-4xl font-serif font-medium text-[#2D2A26] mb-4">人设档案</h1>
                    <p className="text-[#8E8780]">选择一个身份，开始书写。</p>
                </div>

                <div className="space-y-0 border-t border-[#EBE5E0]">
                    {personas.map(persona => (
                        <HoverRow key={persona.id} onClick={() => handleSelect(persona)} className="py-6 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <Avatar name={persona.name} size="md" />
                                <div>
                                    <h3 className="text-xl font-medium text-[#2D2A26] mb-1 group-hover:text-[#E86435] transition-colors">{persona.name}</h3>
                                    <p className="text-sm text-[#8E8780] font-light">{persona.niche}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                <span className="text-xs text-[#8E8780]">{persona.stats}</span>
                                <ArrowRight size={20} className="text-[#E86435]" />
                            </div>
                        </HoverRow>
                    ))}

                    <HoverRow onClick={handleCreate} className="py-6 flex items-center gap-6 text-[#8E8780] hover:text-[#E86435]">
                        <div className="w-12 h-12 rounded-full border border-dashed border-[#8E8780] flex items-center justify-center group-hover:border-[#E86435] transition-colors">
                            <Plus size={20} />
                        </div>
                        <span className="text-lg font-medium">创建新人设</span>
                    </HoverRow>
                </div>
            </div>
        </div>
    );
};