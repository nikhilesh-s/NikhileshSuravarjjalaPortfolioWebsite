import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <button 
          onClick={onLogout}
          className="flex items-center bg-red-800 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          <LogOut className="mr-2" size={16} />
          Logout
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminCard 
          title="Projects" 
          description="Manage your portfolio projects"
          linkTo="/admin/projects"
        />
        <AdminCard 
          title="Experience" 
          description="Edit your work experience"
          linkTo="/admin/experience"
        />
        <AdminCard 
          title="Skills" 
          description="Manage skills and categories"
          linkTo="/admin/skills"
        />
        <AdminCard 
          title="Journey" 
          description="Edit your personal journey timeline"
          linkTo="/admin/journey"
        />
        <AdminCard 
          title="Resume" 
          description="Update your resume information"
          linkTo="/admin/resume"
        />
        <AdminCard 
          title="About Me" 
          description="Edit your about me section"
          linkTo="/admin/about"
        />
        <AdminCard 
          title="Contact" 
          description="Edit contact information and form"
          linkTo="/admin/contact"
        />
        <AdminCard 
          title="Hero Section" 
          description="Edit main hero section content"
          linkTo="/admin/hero"
        />
        <AdminCard 
          title="Feedbacks" 
          description="Manage testimonials and reviews"
          linkTo="/admin/feedbacks"
        />
        <AdminCard 
          title="Certifications" 
          description="Manage your certifications and credentials"
          linkTo="/admin/certifications"
        />
        <AdminCard 
          title="Technologies" 
          description="Add or remove technologies you work with"
          linkTo="/admin/technologies"
        />
      </div>
    </div>
  );
};

interface AdminCardProps {
  title: string;
  description: string;
  linkTo: string;
}

const AdminCard: React.FC<AdminCardProps> = ({ title, description, linkTo }) => {
  return (
    <Link to={linkTo} className="block">
      <div className="bg-tertiary rounded-lg p-6 hover:bg-opacity-80 transition-all">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </Link>
  );
};

export default AdminDashboard;
