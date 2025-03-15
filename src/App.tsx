import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PerformanceProvider } from "./context/PerformanceContext";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works } from './components';
import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './admin/AdminLogin';
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

// Protected route component
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('portfolio-admin-token') === 'authenticated';
  
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" />;
  }
  
  return element;
};

const App = () => {
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('portfolio-admin-token');
    window.location.href = '/';
  };

  return (
    <PerformanceProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/resume" element={<PageLayout><ResumeSimple /></PageLayout>} />
          <Route path="/journey" element={<PageLayout><Journey /></PageLayout>} />
          
          {/* Admin routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard onLogout={handleLogout} />} />} />
          <Route path="/admin/projects" element={<ProtectedRoute element={<ProjectEditor />} />} />
          <Route path="/admin/experience" element={<ProtectedRoute element={<ExperienceEditor />} />} />
          <Route path="/admin/resume" element={<ProtectedRoute element={<ResumeEditor />} />} />
          <Route path="/admin/journey" element={<ProtectedRoute element={<JourneyEditor />} />} />
          <Route path="/admin/skills" element={<ProtectedRoute element={<SkillsEditor />} />} />
          <Route path="/admin/about" element={<ProtectedRoute element={<AboutEditor />} />} />
          <Route path="/admin/contact" element={<ProtectedRoute element={<ContactEditor />} />} />
          <Route path="/admin/hero" element={<ProtectedRoute element={<HeroEditor />} />} />
          <Route path="/admin/feedbacks" element={<ProtectedRoute element={<FeedbacksEditor />} />} />
          <Route path="/admin/certifications" element={<ProtectedRoute element={<CertificationsEditor />} />} />
          <Route path="/admin/technologies" element={<ProtectedRoute element={<TechnologiesEditor />} />} />
        </Routes>
      </BrowserRouter>
    </PerformanceProvider>
  );
}

export default App;
