// NOTE: This file is kept for reference but is no longer in use
// The website now uses hardcoded data instead of Firebase

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X, Edit, Trash2 } from 'lucide-react';
// Comment out Firebase imports as we've moved to hardcoded data
// These were previously imported from "../services/dataService"
// import { getResume, saveResume } from "../services/dataService";

interface ResumeData {
  resumeLink: string;
  skills: string[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
    link: string;
  }[];
}

const ResumeEditor: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    resumeLink: '',
    skills: [],
    certifications: []
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [currentCertification, setCurrentCertification] = useState<{
    name: string;
    issuer: string;
    date: string;
    link: string;
  } | null>(null);
  const [isEditingCert, setIsEditingCert] = useState(false);
  const [editingCertIndex, setEditingCertIndex] = useState<number | null>(null);
  const [saveMessage, setSaveMessage] = useState({ show: false, text: '' });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // This component is no longer in use
    // Data is now hardcoded in dataService.ts
    setIsLoading(false);
    setSaveMessage({ show: true, text: 'ADMIN FUNCTIONALITY DISABLED - Using hardcoded data instead' });
  }, []);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeData({
      ...resumeData,
      resumeLink: e.target.value
    });
    // Original functionality (now disabled):
    // saveResumeData();
  };
  
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() === '') return;
    
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, newSkill]
    });
    setNewSkill('');
    // Original functionality (now disabled):
    // saveResumeData();
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter(skill => skill !== skillToRemove)
    });
    // Original functionality (now disabled):
    // saveResumeData();
  };
  
  const handleAddCertification = () => {
    setCurrentCertification({
      name: '',
      issuer: '',
      date: '',
      link: ''
    });
    setIsEditingCert(true);
    setEditingCertIndex(null);
  };
  
  const handleEditCertification = (index: number) => {
    setCurrentCertification({...resumeData.certifications[index]});
    setIsEditingCert(true);
    setEditingCertIndex(index);
  };
  
  const handleRemoveCertification = (index: number) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      const updatedCertifications = [...resumeData.certifications];
      updatedCertifications.splice(index, 1);
      setResumeData({
        ...resumeData,
        certifications: updatedCertifications
      });
      // Original functionality (now disabled):
      // saveResumeData();
    }
  };
  
  const handleCertificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentCertification) return;
    
    const { name, value } = e.target;
    setCurrentCertification({
      ...currentCertification,
      [name]: value
    });
  };
  
  const handleSaveCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCertification) return;
    
    if (editingCertIndex !== null) {
      // Update existing certification
      const updatedCertifications = [...resumeData.certifications];
      updatedCertifications[editingCertIndex] = currentCertification;
      
      setResumeData({
        ...resumeData,
        certifications: updatedCertifications
      });
    } else {
      // Add new certification
      setResumeData({
        ...resumeData,
        certifications: [...resumeData.certifications, currentCertification]
      });
    }
    
    setCurrentCertification(null);
    setIsEditingCert(false);
    setEditingCertIndex(null);
    // Original functionality (now disabled):
    // saveResumeData();
  };
  
  const handleCancelCertification = () => {
    setCurrentCertification(null);
    setIsEditingCert(false);
    setEditingCertIndex(null);
  };
  
  return (
    <div className="bg-primary text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/admin" className="text-white hover:text-purple-300 transition-colors flex items-center gap-2">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Resume Editor</h1>
        </div>
        
        {saveMessage.show && (
          <div className="mb-6 p-4 rounded-lg bg-green-800">
            {saveMessage.text}
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Resume Link Section */}
            <div className="bg-tertiary rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Resume Link</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Link to your PDF resume</label>
                <input
                  type="text"
                  value={resumeData.resumeLink}
                  onChange={handleResumeChange}
                  className="w-full bg-gray-800 p-3 rounded-lg text-white"
                  placeholder="https://example.com/your-resume.pdf"
                  disabled={true}
                />
              </div>
            </div>
            
            {/* Skills Section */}
            <div className="bg-tertiary rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Skills</h2>
              
              <form onSubmit={handleAddSkill} className="mb-6 flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-grow bg-gray-800 p-3 rounded-lg text-white"
                  placeholder="Add a new skill"
                  disabled={true}
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  disabled={true}
                >
                  <Plus size={16} />
                  Add
                </button>
              </form>
              
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="bg-gray-800 px-3 py-1 rounded-full flex items-center">
                    <span className="mr-2">{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-red-400 hover:text-red-300"
                      disabled={true}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                {resumeData.skills.length === 0 && (
                  <p className="text-gray-400 text-sm">No skills added yet. Add some skills to showcase your expertise.</p>
                )}
              </div>
            </div>
            
            {/* Certifications Section */}
            <div className="bg-tertiary rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Certifications</h2>
                
                {!isEditingCert && (
                  <button
                    onClick={handleAddCertification}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    disabled={true}
                  >
                    <Plus size={16} />
                    Add Certification
                  </button>
                )}
              </div>
              
              {isEditingCert && currentCertification ? (
                <div className="bg-gray-800 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-bold mb-4">
                    {editingCertIndex !== null ? 'Edit Certification' : 'Add New Certification'}
                  </h3>
                  
                  <form onSubmit={handleSaveCertification}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Certification Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={currentCertification.name}
                          onChange={handleCertificationChange}
                          className="w-full bg-gray-700 p-3 rounded-lg text-white"
                          placeholder="AWS Certified Developer"
                          required
                          disabled={true}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Issuing Organization
                        </label>
                        <input
                          type="text"
                          name="issuer"
                          value={currentCertification.issuer}
                          onChange={handleCertificationChange}
                          className="w-full bg-gray-700 p-3 rounded-lg text-white"
                          placeholder="Amazon Web Services"
                          required
                          disabled={true}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Date Achieved
                        </label>
                        <input
                          type="text"
                          name="date"
                          value={currentCertification.date}
                          onChange={handleCertificationChange}
                          className="w-full bg-gray-700 p-3 rounded-lg text-white"
                          placeholder="Jan 2023"
                          required
                          disabled={true}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Certificate Link (Optional)
                        </label>
                        <input
                          type="text"
                          name="link"
                          value={currentCertification.link}
                          onChange={handleCertificationChange}
                          className="w-full bg-gray-700 p-3 rounded-lg text-white"
                          placeholder="https://example.com/certification"
                          disabled={true}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={handleCancelCertification}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                        disabled={true}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        disabled={true}
                      >
                        <Save size={16} />
                        Save Certification
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  {resumeData.certifications.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      No certifications added yet. Click "Add Certification" to get started.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {resumeData.certifications.map((cert, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-bold">{cert.name}</h3>
                              <p className="text-indigo-400">{cert.issuer}</p>
                              <p className="text-gray-400 text-sm">{cert.date}</p>
                              {cert.link && (
                                <a 
                                  href={cert.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-purple-400 hover:text-purple-300 text-sm mt-1 inline-block"
                                >
                                  View Certificate
                                </a>
                              )}
                            </div>
                            
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditCertification(index)}
                                className="text-indigo-400 hover:text-indigo-300"
                                disabled={true}
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleRemoveCertification(index)}
                                className="text-red-400 hover:text-red-300"
                                disabled={true}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeEditor;
