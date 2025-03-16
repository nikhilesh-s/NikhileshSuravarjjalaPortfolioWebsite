import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, X, Check, Edit, Trash } from 'lucide-react';
import { Technology } from '../types';
import { technologies as defaultTechnologies } from '../constants';
import { saveTechnologies as saveTechnologiesToFirebase, getTechnologies as getTechnologiesFromFirebase } from '../services/dataService';

const TechnologiesEditor: React.FC = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTech, setCurrentTech] = useState<Technology | null>(null);
  const [newTech, setNewTech] = useState<{ name: string; icon: string }>({ name: '', icon: '' });
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load technologies from Firebase or use defaults
  useEffect(() => {
    const fetchTechnologies = async () => {
      setIsLoading(true);
      try {
        const data = await getTechnologiesFromFirebase();
        if (data && data.length > 0) {
          setTechnologies(data);
        } else {
          // If no data in Firebase, try localStorage as fallback
          const savedTechnologies = localStorage.getItem('portfolio-technologies');
          if (savedTechnologies) {
            const parsedTechnologies = JSON.parse(savedTechnologies);
            setTechnologies(parsedTechnologies);
            // Save localStorage data to Firebase
            await saveTechnologiesToFirebase(parsedTechnologies);
          } else {
            setTechnologies(defaultTechnologies);
          }
        }
      } catch (error) {
        console.error("Error loading technologies:", error);
        setTechnologies(defaultTechnologies);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTechnologies();
  }, []);

  // Save changes to Firebase and localStorage for backup
  const saveTechnologies = async (updatedTechnologies: Technology[]) => {
    try {
      // Save to Firebase
      const result = await saveTechnologiesToFirebase(updatedTechnologies);
      // Also save to localStorage as backup
      localStorage.setItem('portfolio-technologies', JSON.stringify(updatedTechnologies));
      
      if (result) {
        setTechnologies(updatedTechnologies);
        return true;
      } else {
        console.error("Failed to save to Firebase");
        return false;
      }
    } catch (error) {
      console.error("Error saving technologies:", error);
      return false;
    }
  };

  // Add new technology
  const handleAddTechnology = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTech.name && newTech.icon) {
      const updatedTechnologies = [...technologies, newTech];
      const success = await saveTechnologies(updatedTechnologies);
      
      if (success) {
        setNewTech({ name: '', icon: '' });
        setSuccessMessage('Technology added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setSuccessMessage('Failed to add technology. Please try again.');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    }
  };

  // Edit existing technology
  const handleEditTechnology = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTech && currentTech.name && currentTech.icon) {
      const updatedTechnologies = technologies.map(tech => 
        tech === technologies.find(t => t.name === currentTech.name && t.icon === currentTech.icon) 
          ? currentTech 
          : tech
      );
      
      const success = await saveTechnologies(updatedTechnologies);
      
      if (success) {
        setCurrentTech(null);
        setIsEditing(false);
        setSuccessMessage('Technology updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setSuccessMessage('Failed to update technology. Please try again.');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    }
  };

  // Start editing a technology
  const startEdit = (tech: Technology) => {
    setCurrentTech(tech);
    setIsEditing(true);
  };

  // Delete a technology
  const handleDeleteTechnology = async (techToDelete: Technology) => {
    const updatedTechnologies = technologies.filter(tech => 
      tech.name !== techToDelete.name || tech.icon !== techToDelete.icon
    );
    
    const success = await saveTechnologies(updatedTechnologies);
    
    if (success) {
      setSuccessMessage('Technology removed successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setSuccessMessage('Failed to remove technology. Please try again.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/admin" className="flex items-center text-indigo-400 hover:text-indigo-300">
            <ArrowLeft className="mr-2" size={20} />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Technologies Editor</h1>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-500 text-white p-4 mb-6 rounded-md flex items-center">
            <Check className="mr-2" size={20} />
            {successMessage}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Loading...</h2>
          </div>
        )}

        {/* Technologies List */}
        {!isLoading && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Current Technologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {technologies.map((tech, index) => (
                <div 
                  key={index} 
                  className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-600 rounded-md flex items-center justify-center mr-3">
                      {tech.icon && (
                        <img src={tech.icon} alt={tech.name} className="w-6 h-6 object-contain" />
                      )}
                    </div>
                    <span>{tech.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => startEdit(tech)}
                      className="p-1.5 rounded-md bg-blue-500 hover:bg-blue-600"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteTechnology(tech)}
                      className="p-1.5 rounded-md bg-red-500 hover:bg-red-600"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add/Edit Technology Form */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Technology' : 'Add New Technology'}
          </h2>
          <form onSubmit={isEditing ? handleEditTechnology : handleAddTechnology}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 mb-2">Technology Name</label>
                <input
                  type="text"
                  value={isEditing ? currentTech?.name || '' : newTech.name}
                  onChange={(e) => isEditing 
                    ? setCurrentTech({...currentTech!, name: e.target.value}) 
                    : setNewTech({...newTech, name: e.target.value})
                  }
                  className="w-full p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., React.js"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Icon URL</label>
                <input
                  type="text"
                  value={isEditing ? currentTech?.icon || '' : newTech.icon}
                  onChange={(e) => isEditing 
                    ? setCurrentTech({...currentTech!, icon: e.target.value}) 
                    : setNewTech({...newTech, icon: e.target.value})
                  }
                  className="w-full p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="URL to technology icon"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentTech(null);
                  }}
                  className="px-6 py-2.5 bg-gray-600 hover:bg-gray-700 rounded-md flex items-center"
                >
                  <X size={18} className="mr-2" />
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-md flex items-center"
              >
                {isEditing ? (
                  <>
                    <Check size={18} className="mr-2" />
                    Update Technology
                  </>
                ) : (
                  <>
                    <Plus size={18} className="mr-2" />
                    Add Technology
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TechnologiesEditor;
