import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import TestPage from './pages/TestPage'
import ResultPage from './pages/ResultPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import CreatePage from './pages/CreatePage'
import ProfilePage from './pages/ProfilePage'
import AnalyticsPage from './pages/AnalyticsPage'
import InspirationPage from './pages/InspirationPage'
import ReportPage from './pages/ReportPage'
import GalleryPage from './pages/GalleryPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-canvas text-text-primary font-sans selection:bg-terracotta/20">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Stage 1: Attraction & Exploration */}
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
          
          {/* Stage 2: Creation & Confirmation */}
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Stage 4: Sedimentation & Continuation */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/inspiration" element={<InspirationPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          
          {/* Stage 3: Guidance & Implementation */}
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App