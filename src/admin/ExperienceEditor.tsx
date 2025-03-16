import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Experience } from '../types';
import { ArrowLeft, Plus, Trash2, Save, Edit } from 'lucide-react';
import { getExperiences, saveExperiences } from '../services/dataService';

const ExperienceEditor: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [currentExperience, setCurrentExperience] = useState<Experience | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(true);
  
  // Load experiences from Firebase on component mount
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setIsLoading(true);
        const firebaseExperiences = await getExperiences();
        
        if (firebaseExperiences && firebaseExperiences.length > 0) {
          setExperiences(firebaseExperiences);
        } else {
          // Fallback to localStorage if no data in Firebase
          const savedExperiences = localStorage.getItem('portfolio-experiences');
          if (savedExperiences) {
            setExperiences(JSON.parse(savedExperiences));
          }
        }
      } catch (error) {
        console.error("Error fetching experiences:", error);
        // Fallback to localStorage if Firebase fails
        const savedExperiences = localStorage.getItem('portfolio-experiences');
        if (savedExperiences) {
          setExperiences(JSON.parse(savedExperiences));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExperiences();
  }, []);
  
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
  
  const handleDeleteExperience = async (experience: Experience) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      setIsLoading(true);
      const updatedExperiences = experiences.filter(e => e.title !== experience.title);
      
      // Save to Firebase
      try {
        const saveSuccess = await saveExperiences(updatedExperiences);
        if (saveSuccess) {
          setExperiences(updatedExperiences);
          // Also update localStorage as backup
          localStorage.setItem('portfolio-experiences', JSON.stringify(updatedExperiences));
          
          setMessage({ 
            text: 'Experience deleted successfully from Firebase!', 
            type: 'success' 
          });
        } else {
          setMessage({
            text: 'Error deleting from Firebase. Changes saved locally only.',
            type: 'error'
          });
          // Still update local state and localStorage
          setExperiences(updatedExperiences);
          localStorage.setItem('portfolio-experiences', JSON.stringify(updatedExperiences));
        }
      } catch (error) {
        console.error("Error deleting experience:", error);
        setMessage({
          text: 'Error deleting from Firebase. Changes saved locally only.',
          type: 'error'
        });
        // Still update local state and localStorage
        setExperiences(updatedExperiences);
        localStorage.setItem('portfolio-experiences', JSON.stringify(updatedExperiences));
      } finally {
        setIsLoading(false);
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      }
    }
  };
  
  const handleCancelEdit = () => {
    setCurrentExperience(null);
    setIsEditing(false);
  };
  
  const handleSaveExperience = async () => {
    if (!currentExperience) return;
    
    setIsLoading(true);
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
    
    // Save to Firebase
    try {
      const saveSuccess = await saveExperiences(updatedExperiences);
      if (saveSuccess) {
        setExperiences(updatedExperiences);
        // Also update localStorage as backup
        localStorage.setItem('portfolio-experiences', JSON.stringify(updatedExperiences));
        
        setMessage({ 
          text: 'Experience saved successfully to Firebase!', 
          type: 'success' 
        });
      } else {
        setMessage({
          text: 'Error saving to Firebase. Changes saved locally only.',
          type: 'error'
        });
        // Still update local state and localStorage
        setExperiences(updatedExperiences);
        localStorage.setItem('portfolio-experiences', JSON.stringify(updatedExperiences));
      }
    } catch (error) {
      console.error("Error saving experiences:", error);
      setMessage({
        text: 'Error saving to Firebase. Changes saved locally only.',
        type: 'error'
      });
      // Still update local state and localStorage
      setExperiences(updatedExperiences);
      localStorage.setItem('portfolio-experiences', JSON.stringify(updatedExperiences));
    } finally {
      setIsLoading(false);
      setCurrentExperience(null);
      setIsEditing(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
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
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/admin" className="flex items-center text-blue-400 hover:text-blue-300">
            <ArrowLeft className="mr-2" size={20} />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Experiences Editor</h1>
        </div>
        
        {message.text && (
          <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>
            {message.text}
          </div>
        )}
        
        {isLoading && !isEditing ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : isEditing ? (
          <div className="bg-gray-800 p-6 rounded-xl mb-8">
            <h2 className="text-xl font-bold mb-6">{currentExperience?.title === 'New Position' ? 'Add New Experience' : 'Edit Experience'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Position/Title</label>
                  <input
                    type="text"
                    value={currentExperience?.title || ''}
                    onChange={(e) => handleUpdateField('title', e.target.value)}
                    className="w-full bg-gray-700 p-3 rounded-lg text-white"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Company/Organization</label>
                  <input
                    type="text"
                    value={currentExperience?.company_name || ''}
                    onChange={(e) => handleUpdateField('company_name', e.target.value)}
                    className="w-full bg-gray-700 p-3 rounded-lg text-white"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Date Range</label>
                  <input
                    type="text"
                    value={currentExperience?.date || ''}
                    onChange={(e) => handleUpdateField('date', e.target.value)}
                    className="w-full bg-gray-700 p-3 rounded-lg text-white"
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
                    className="w-full bg-gray-700 p-3 rounded-lg text-white"
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
                      className="flex-1 bg-gray-700 p-3 rounded-lg text-white"
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
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center gap-1 text-xs"
                >
                  <Plus size={12} />
                  Add Point
                </button>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-3">
                {currentExperience?.points.map((point, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handleUpdatePoint(index, e.target.value)}
                      className="flex-1 bg-gray-600 p-2 rounded text-white text-sm"
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
                className="px-4 py-2 bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveExperience}
                className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 flex items-center gap-2"
              >
                <Save size={16} />
                Save Experience
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl">Manage your work experiences</h2>
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
                disabled={isLoading}
              >
                <Plus size={18} className="mr-2" />
                Add New Experience
              </button>
            </div>
            
            {experiences.length === 0 ? (
              <div className="bg-gray-800 rounded-xl p-8 text-center">
                <p className="text-gray-400">No work experiences yet. Add your first experience!</p>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ExperienceEditor;
