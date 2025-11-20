import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LandingPage } from '../components/LandingPage';
import { PersonaArchives } from '../components/PersonaArchives';
import { PersonaCreator } from '../components/PersonaCreator';
import { Dashboard } from '../components/Dashboard';
import { CreationHub } from '../components/CreationHub';
import { Editor } from '../components/Editor';
import { TasteMap } from '../components/TasteMap';
import { TasteDecisionReport } from '../components/TasteDecisionReport';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/personas',
    element: <PersonaArchives />,
  },
  {
    path: '/personas/create',
    element: <PersonaCreator />,
  },
  {
    path: '/personas/:personaId/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/personas/:personaId/hub',
    element: <CreationHub />,
  },
  {
    path: '/personas/:personaId/editor',
    element: <Editor />,
  },
  {
    path: '/personas/:personaId/taste-map',
    element: <TasteMap />,
  },
  {
    path: '/personas/:personaId/report',
    element: <TasteDecisionReport />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
