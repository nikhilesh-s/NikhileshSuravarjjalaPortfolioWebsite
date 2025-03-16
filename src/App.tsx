import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PerformanceProvider } from "./context/PerformanceContext";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works } from './components';
import AdminDashboard from './admin/AdminDashboard';
import ProjectEditor from './admin/ProjectEditor';
import ExperienceEditor from './admin/ExperienceEditor';
import ResumeEditor from './admin/ResumeEditor';
import JourneyEditor from './admin/JourneyEditor';
import SkillsEditor from './admin/SkillsEditor';
import AboutEditor from './admin/AboutEditor';
import ContactEditor from './admin/ContactEditor';
import HeroEditor from './admin/HeroEditor';
import FeedbacksEditor from './admin/FeedbacksEditor';
import CertificationsEditor from './admin/CertificationsEditor';
import TechnologiesEditor from './admin/TechnologiesEditor';
import ResumeSimple from './pages/ResumeSimple';
import Journey from './pages/Journey';
import AdminAuth from './admin/AdminAuth';
import ProtectedRoute from './utils/ProtectedRoute';
import SetupAdmin from './admin/SetupAdmin';

const MainContent = () => (
  <div className="relative z-0 bg-primary">
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <Navbar />
      <Hero />
    </div>
    <About />
    <Experience />
    <Tech />
    <Works />
    <Feedbacks />
    <div className="relative z-0">
      <Contact />
      {/* 3D elements removed for stability */}
    </div>
  </div>
);

const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative z-0 bg-primary min-h-screen">
    <Navbar />
    {children}
  </div>
);

const App = () => {
  // Handle logout
  const handleLogout = () => {
    // Sign out from Firebase auth instead of just removing from localStorage
    import('./firebase/config').then(({ auth }) => {
      auth.signOut();
      window.location.href = '/';
    });
  };

  return (
    <PerformanceProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/resume" element={<PageLayout><ResumeSimple /></PageLayout>} />
          <Route path="/journey" element={<PageLayout><Journey /></PageLayout>} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminAuth />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard onLogout={handleLogout} /></ProtectedRoute>} />
          <Route path="/admin/projects" element={<ProtectedRoute><ProjectEditor /></ProtectedRoute>} />
          <Route path="/admin/experience" element={<ProtectedRoute><ExperienceEditor /></ProtectedRoute>} />
          <Route path="/admin/resume" element={<ProtectedRoute><ResumeEditor /></ProtectedRoute>} />
          <Route path="/admin/journey" element={<ProtectedRoute><JourneyEditor /></ProtectedRoute>} />
          <Route path="/admin/skills" element={<ProtectedRoute><SkillsEditor /></ProtectedRoute>} />
          <Route path="/admin/about" element={<ProtectedRoute><AboutEditor /></ProtectedRoute>} />
          <Route path="/admin/contact" element={<ProtectedRoute><ContactEditor /></ProtectedRoute>} />
          <Route path="/admin/hero" element={<ProtectedRoute><HeroEditor /></ProtectedRoute>} />
          <Route path="/admin/feedbacks" element={<ProtectedRoute><FeedbacksEditor /></ProtectedRoute>} />
          <Route path="/admin/certifications" element={<ProtectedRoute><CertificationsEditor /></ProtectedRoute>} />
          <Route path="/admin/technologies" element={<ProtectedRoute><TechnologiesEditor /></ProtectedRoute>} />
          
          {/* Temporary Setup Route - Remove after initial setup */}
          <Route path="/admin/setup" element={<SetupAdmin />} />
          
          {/* Redirect old admin login path to new one */}
          <Route path="/admin-login" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </BrowserRouter>
    </PerformanceProvider>
  );
}

export default App;
