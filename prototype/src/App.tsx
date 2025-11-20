import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { PersonaArchives, Persona } from './components/PersonaArchives';
import { PersonaCreator } from './components/PersonaCreator';
import { Dashboard } from './components/Dashboard';
import { CreationHub } from './components/CreationHub';
import { Editor } from './components/Editor';
import { TasteMap } from './components/TasteMap';
import { TasteDecisionReport } from './components/TasteDecisionReport';

const INITIAL_PERSONAS: Persona[] = [
    { id: 1, name: "健身博主小王", niche: "居家健身 | 减脂餐", stats: "2小时前活跃" },
    { id: 2, name: "职场里的小美", niche: "职场穿搭 | 办公好物", stats: "刚刚活跃" },
];

type ViewType = 'landing' | 'personas' | 'create' | 'dashboard' | 'hub' | 'editor' | 'tasteMap' | 'report';

const App = () => {
    const [view, setView] = useState<ViewType>('landing');
    const [personas, setPersonas] = useState<Persona[]>(INITIAL_PERSONAS);
    const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
    const [editorType, setEditorType] = useState('text');

    return (
        <div className="font-sans selection:bg-[#F2E8E3] selection:text-[#E86435]">
            {view === 'landing' && (
                <LandingPage
                    onStart={() => setView('personas')}
                />
            )}

            {view === 'personas' && (
                <PersonaArchives
                    personas={personas}
                    onSelect={(p) => { setSelectedPersona(p); setView('dashboard'); }}
                    onCreate={() => setView('create')}
                />
            )}

            {view === 'create' && (
                <PersonaCreator
                    onBack={() => setView('personas')}
                    onComplete={(p) => { setPersonas([...personas, p]); setSelectedPersona(p); setView('dashboard'); }}
                />
            )}

            {view === 'dashboard' && selectedPersona && (
                <Dashboard
                    persona={selectedPersona}
                    onBack={() => setView('personas')}
                    onCreate={(type) => { setEditorType(type); setView('editor'); }}
                    onGoHub={() => setView('hub')}
                    onViewTasteMap={() => setView('tasteMap')}
                    onViewReport={() => setView('report')}
                />
            )}

            {view === 'hub' && (
                <CreationHub
                    onBack={() => setView('dashboard')}
                    onCreate={(type) => { setEditorType(type); setView('editor'); }}
                />
            )}

            {view === 'editor' && (
                <Editor
                    type={editorType}
                    onBack={() => setView('dashboard')}
                    onViewReport={() => setView('report')}
                />
            )}

            {view === 'tasteMap' && (
                <TasteMap onBack={() => setView('dashboard')} />
            )}

            {view === 'report' && (
                <TasteDecisionReport onBack={() => setView('dashboard')} />
            )}
        </div>
    );
};

export default App;