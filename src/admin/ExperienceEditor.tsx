import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Experience } from '../types';
import { ArrowLeft, Plus, Trash2, Save, Edit } from 'lucide-react';

const ExperienceEditor: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [currentExperience, setCurrentExperience] = useState<Experience | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Load experiences from localStorage on component mount
  useEffect(() => {
    const savedExperiences = localStorage.getItem('portfolio-experiences');
    if (savedExperiences) {
      setExperiences(JSON.parse(savedExperiences));
    }
  }, []);
  
  // Save experiences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolio-experiences', JSON.stringify(experiences));
  }, [experiences]);
  
  const handleAddNew = () => {
    const newExperience: Experience = {
      title: 'New Position',
      company_name: 'Company Name',
      icon: '',
      iconBg: '#383E56',
      date: 'Month Year - Month Year',
      points: ['Responsibility 1', 'Responsibility 2'],
    };
    setCurrentExperience(newExperience);
    setIsEditing(true);
  };
  
  const handleEditExperience = (experience: Experience) => {
    setCurrentExperience(JSON.parse(JSON.stringify(experience)));
    setIsEditing(true);
  };
  
  const handleDeleteExperience = (experience: Experience) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      const updatedExperiences = experiences.filter(e => e.title !== experience.title);
      setExperiences(updatedExperiences);
      
      setMessage({ 
        text: 'Experience deleted successfully!', 
        type: 'success' 
      });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };
  
  const handleCancelEdit = () => {
    setCurrentExperience(null);
    setIsEditing(false);
  };
  
  const handleSaveExperience = () => {
    if (!currentExperience) return;
    
    // Check if it's a new experience or an existing one
    const existingIndex = experiences.findIndex(e => e.title === currentExperience.title);
    let updatedExperiences;
    
    if (existingIndex >= 0) {
      // Update existing experience
      updatedExperiences = [...experiences];
      updatedExperiences[existingIndex] = currentExperience;
    } else {
      // Add new experience
      updatedExperiences = [...experiences, currentExperience];
    }
    
    setExperiences(updatedExperiences);
    setCurrentExperience(null);
    setIsEditing(false);
    
    setMessage({ 
      text: 'Experience saved successfully!', 
      type: 'success' 
    });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };
  
  const handleUpdateField = (field: string, value: any) => {
    if (!currentExperience) return;
    setCurrentExperience({
      ...currentExperience,
      [field]: value,
    });
  };
  
  const handleAddPoint = () => {
    if (!currentExperience) return;
    setCurrentExperience({
      ...currentExperience,
      points: [...currentExperience.points, 'New responsibility'],
    });
  };
  
  const handleUpdatePoint = (index: number, value: string) => {
    if (!currentExperience) return;
    const updatedPoints = [...currentExperience.points];
    updatedPoints[index] = value;
    setCurrentExperience({
      ...currentExperience,
      points: updatedPoints,
    });
  };
  
  const handleRemovePoint = (index: number) => {
    if (!currentExperience) return;
    const updatedPoints = [...currentExperience.points];
    updatedPoints.splice(index, 1);
    setCurrentExperience({
      ...currentExperience,
      points: updatedPoints,
    });
  };
  
  return (
    <div className="bg-primary text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin" className="p-2 bg-tertiary rounded-full hover:bg-purple-700 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">Manage Experience</h1>
        </div>
        
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>
            {message.text}
          </div>
        )}
        
        {!isEditing ? (
          <div className="bg-tertiary p-6 rounded-xl mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">All Experiences</h2>
              <button 
                onClick={handleAddNew}
                className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-2"
              >
                <Plus size={16} />
                Add New Experience
              </button>
            </div>
            
            {experiences.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                No experiences yet. Click "Add New Experience" to get started.
              </div>
            ) : (
              <div className="space-y-6">
                {experiences.map((experience, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{experience.title}</h3>
                        <p className="text-indigo-400">{experience.company_name}</p>
                        <p className="text-gray-400 text-sm">{experience.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditExperience(experience)}
                          className="text-indigo-400 hover:text-indigo-300"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteExperience(experience)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <ul className="list-disc list-inside text-gray-300 space-y-1 pl-2">
                      {experience.points.map((point, i) => (
                        <li key={i} className="text-sm">{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-tertiary p-6 rounded-xl mb-8">
            <h2 className="text-xl font-bold mb-6">{currentExperience?.title === 'New Position' ? 'Add New Experience' : 'Edit Experience'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Position/Title</label>
                  <input
                    type="text"
                    value={currentExperience?.title || ''}
                    onChange={(e) => handleUpdateField('title', e.target.value)}
                    className="w-full bg-gray-800 p-3 rounded-lg text-white"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Company/Organization</label>
                  <input
                    type="text"
                    value={currentExperience?.company_name || ''}
                    onChange={(e) => handleUpdateField('company_name', e.target.value)}
                    className="w-full bg-gray-800 p-3 rounded-lg text-white"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Date Range</label>
                  <input
                    type="text"
                    value={currentExperience?.date || ''}
                    onChange={(e) => handleUpdateField('date', e.target.value)}
                    className="w-full bg-gray-800 p-3 rounded-lg text-white"
                    placeholder="E.g., Jan 2020 - Present"
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Icon URL (Optional)</label>
                  <input
                    type="text"
                    value={currentExperience?.icon || ''}
                    onChange={(e) => handleUpdateField('icon', e.target.value)}
                    className="w-full bg-gray-800 p-3 rounded-lg text-white"
                    placeholder="URL to company logo"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Icon Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentExperience?.iconBg || ''}
                      onChange={(e) => handleUpdateField('iconBg', e.target.value)}
                      className="flex-1 bg-gray-800 p-3 rounded-lg text-white"
                      placeholder="#RRGGBB"
                    />
                    <input
                      type="color"
                      value={currentExperience?.iconBg || '#383E56'}
                      onChange={(e) => handleUpdateField('iconBg', e.target.value)}
                      className="h-10 w-10 rounded overflow-hidden bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Responsibilities/Achievements</label>
                <button
                  onClick={handleAddPoint}
                  className="px-2 py-1 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-1 text-xs"
                >
                  <Plus size={12} />
                  Add Point
                </button>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-3">
                {currentExperience?.points.map((point, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handleUpdatePoint(index, e.target.value)}
                      className="flex-1 bg-gray-700 p-2 rounded text-white text-sm"
                    />
                    <button
                      onClick={() => handleRemovePoint(index)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {currentExperience?.points.length === 0 && (
                  <p className="text-gray-500 text-sm p-2">No points added yet.</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveExperience}
                className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition-colors flex items-center gap-2"
              >
                <Save size={16} />
                Save Experience
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceEditor;
