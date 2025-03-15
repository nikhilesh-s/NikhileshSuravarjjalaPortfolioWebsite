import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import ProjectEditor from './ProjectEditor';
import ExperienceEditor from './ExperienceEditor';
import ResumeEditor from './ResumeEditor';
import JourneyEditor from './JourneyEditor';
// Import SkillsEditor directly from its file path to fix the module resolution issue
import SkillsEditor from '/Users/niks/CascadeProjects/nikhileshportfolio-v2/src/admin/SkillsEditor';

// Simple authentication hook
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('portfolio-admin-token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('portfolio-admin-token');
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  return { isAuthenticated, logout };
};

const AdminPanel = () => {
  const { isAuthenticated, logout } = useAuth();
  
  useEffect(() => {
    console.log("Admin panel auth state:", isAuthenticated);
  }, [isAuthenticated]);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated 
              ? <AdminDashboard onLogout={logout} /> 
              : <Navigate to="/admin/login" />
          } 
        />
        <Route path="/login" element={<AdminLogin />} />
        <Route 
          path="/projects" 
          element={
            isAuthenticated 
              ? <ProjectEditor /> 
              : <Navigate to="/admin/login" />
          } 
        />
        <Route 
          path="/experience" 
          element={
            isAuthenticated 
              ? <ExperienceEditor /> 
              : <Navigate to="/admin/login" />
          } 
        />
        <Route 
          path="/resume" 
          element={
            isAuthenticated 
              ? <ResumeEditor /> 
              : <Navigate to="/admin/login" />
          } 
        />
        <Route 
          path="/journey" 
          element={
            isAuthenticated 
              ? <JourneyEditor /> 
              : <Navigate to="/admin/login" />
          } 
        />
        <Route 
          path="/skills" 
          element={
            isAuthenticated 
              ? <SkillsEditor /> 
              : <Navigate to="/admin/login" />
          } 
        />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </div>
  );
};

export default AdminPanel;
