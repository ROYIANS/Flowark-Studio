import { createContext, useContext, useState, ReactNode } from 'react';

export interface Persona {
  id: number;
  name: string;
  niche: string;
  stats: string;
}

interface AppContextType {
  personas: Persona[];
  selectedPersona: Persona | null;
  editorType: string;
  setPersonas: (personas: Persona[]) => void;
  addPersona: (persona: Persona) => void;
  setSelectedPersona: (persona: Persona | null) => void;
  setEditorType: (type: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_PERSONAS: Persona[] = [
  { id: 1, name: "健身博主小王", niche: "居家健身 | 减脂餐", stats: "2小时前活跃" },
  { id: 2, name: "职场里的小美", niche: "职场穿搭 | 办公好物", stats: "刚刚活跃" },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [personas, setPersonas] = useState<Persona[]>(INITIAL_PERSONAS);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [editorType, setEditorType] = useState('text');

  const addPersona = (persona: Persona) => {
    setPersonas([...personas, persona]);
  };

  return (
    <AppContext.Provider
      value={{
        personas,
        selectedPersona,
        editorType,
        setPersonas,
        addPersona,
        setSelectedPersona,
        setEditorType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
