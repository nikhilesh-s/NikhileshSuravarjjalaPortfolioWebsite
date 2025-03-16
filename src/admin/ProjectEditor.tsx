import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { ArrowLeft, Plus, Trash2, Save, Edit, ExternalLink, Github } from 'lucide-react';
import { getProjects, saveProjects } from '../services/dataService';

const ProjectEditor: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(true);
  
  // Load projects from Firebase on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const firebaseProjects = await getProjects();
        
        if (firebaseProjects && firebaseProjects.length > 0) {
          setProjects(firebaseProjects);
        } else {
          // Fallback to localStorage if no data in Firebase
          const savedProjects = localStorage.getItem('portfolio-projects');
          if (savedProjects) {
            setProjects(JSON.parse(savedProjects));
          }
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Fallback to localStorage if Firebase fails
        const savedProjects = localStorage.getItem('portfolio-projects');
        if (savedProjects) {
          setProjects(JSON.parse(savedProjects));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  const handleAddNew = () => {
    const newProject: Project = {
      name: 'New Project',
      description: 'Project description goes here',
      tags: [{ name: 'New Tag', color: 'text-white' }],
      image: 'https://via.placeholder.com/500',
      source_code_link: 'https://github.com',
      live_demo_link: 'https://example.com',
    };
    setCurrentProject(newProject);
    setIsEditing(true);
  };
  
  const handleEditProject = (project: Project) => {
    setCurrentProject(JSON.parse(JSON.stringify(project)));
    setIsEditing(true);
  };
  
  const handleDeleteProject = async (project: Project) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setIsLoading(true);
      const updatedProjects = projects.filter(p => p.name !== project.name);
      
      // Save to Firebase
      try {
        const saveSuccess = await saveProjects(updatedProjects);
        if (saveSuccess) {
          setProjects(updatedProjects);
          // Also update localStorage as backup
          localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects));
          
          setMessage({ 
            text: 'Project deleted successfully from Firebase!', 
            type: 'success' 
          });
        } else {
          setMessage({
            text: 'Error deleting from Firebase. Changes saved locally only.',
            type: 'error'
          });
          // Still update local state and localStorage
          setProjects(updatedProjects);
          localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects));
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        setMessage({
          text: 'Error deleting from Firebase. Changes saved locally only.',
          type: 'error'
        });
        // Still update local state and localStorage
        setProjects(updatedProjects);
        localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects));
      } finally {
        setIsLoading(false);
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      }
    }
  };
  
  const handleCancelEdit = () => {
    setCurrentProject(null);
    setIsEditing(false);
  };
  
  const handleSaveProject = async () => {
    if (!currentProject) return;
    
    setIsLoading(true);
    // Check if it's a new project or an existing one
    const existingIndex = projects.findIndex(p => p.name === currentProject.name);
    let updatedProjects;
    
    if (existingIndex >= 0) {
      // Update existing project
      updatedProjects = [...projects];
      updatedProjects[existingIndex] = currentProject;
    } else {
      // Add new project
      updatedProjects = [...projects, currentProject];
    }
    
    // Save to Firebase
    try {
      const saveSuccess = await saveProjects(updatedProjects);
      if (saveSuccess) {
        setProjects(updatedProjects);
        // Also update localStorage as backup
        localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects));
        
        setMessage({ 
          text: 'Project saved successfully to Firebase!', 
          type: 'success' 
        });
      } else {
        setMessage({
          text: 'Error saving to Firebase. Changes saved locally only.',
          type: 'error'
        });
        // Still update local state and localStorage
        setProjects(updatedProjects);
        localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects));
      }
    } catch (error) {
      console.error("Error saving projects:", error);
      setMessage({
        text: 'Error saving to Firebase. Changes saved locally only.',
        type: 'error'
      });
      // Still update local state and localStorage
      setProjects(updatedProjects);
      localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects));
    } finally {
      setIsLoading(false);
      setCurrentProject(null);
      setIsEditing(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };
  
  const handleUpdateField = (field: string, value: any) => {
    if (!currentProject) return;
    setCurrentProject({
      ...currentProject,
      [field]: value,
    });
  };
  
  const handleAddTag = () => {
    if (!currentProject) return;
    setCurrentProject({
      ...currentProject,
      tags: [...currentProject.tags, { name: 'New Tag', color: 'text-white' }],
    });
  };
  
  // Pre-built tag options for common technologies
  const preBuiltTags = [
    { name: 'React', color: 'text-blue-400' },
    { name: 'TypeScript', color: 'text-blue-500' },
    { name: 'JavaScript', color: 'text-yellow-400' },
    { name: 'Node.js', color: 'text-green-500' },
    { name: 'MongoDB', color: 'text-green-400' },
    { name: 'PostgreSQL', color: 'text-blue-600' },
    { name: 'Firebase', color: 'text-yellow-500' },
    { name: 'AWS', color: 'text-orange-400' },
    { name: 'Docker', color: 'text-blue-400' },
    { name: 'Kubernetes', color: 'text-blue-500' },
    { name: 'CSS', color: 'text-blue-300' },
    { name: 'Tailwind', color: 'text-teal-400' },
    { name: 'HTML', color: 'text-orange-500' },
    { name: 'Next.js', color: 'text-white' },
    { name: 'GraphQL', color: 'text-pink-500' },
    { name: 'REST API', color: 'text-purple-400' },
    { name: 'Redux', color: 'text-purple-500' },
    { name: 'Python', color: 'text-yellow-300' },
    { name: 'Django', color: 'text-green-600' },
    { name: 'Flutter', color: 'text-blue-400' },
    { name: 'Swift', color: 'text-orange-500' },
    { name: 'Kotlin', color: 'text-purple-400' },
    { name: 'C#', color: 'text-green-500' },
    { name: 'Unity', color: 'text-gray-400' },
    { name: 'PHP', color: 'text-indigo-400' },
    { name: 'Laravel', color: 'text-red-500' },
    { name: 'Vue.js', color: 'text-green-400' },
    { name: 'Angular', color: 'text-red-500' },
    { name: 'Ruby', color: 'text-red-400' },
    { name: 'Rails', color: 'text-red-600' },
  ];
  
  const handleAddPreBuiltTag = (tag: {name: string, color: string}) => {
    if (!currentProject) return;
    // Check if tag already exists
    if (!currentProject.tags.some(t => t.name === tag.name)) {
      setCurrentProject({
        ...currentProject,
        tags: [...currentProject.tags, tag],
      });
    }
  };
  
  const handleUpdateTag = (index: number, field: string, value: string) => {
    if (!currentProject) return;
    const updatedTags = [...currentProject.tags];
    updatedTags[index] = { ...updatedTags[index], [field]: value };
    setCurrentProject({
      ...currentProject,
      tags: updatedTags,
    });
  };
  
  const handleRemoveTag = (index: number) => {
    if (!currentProject) return;
    const updatedTags = [...currentProject.tags];
    updatedTags.splice(index, 1);
    setCurrentProject({
      ...currentProject,
      tags: updatedTags,
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
          <h1 className="text-3xl font-bold">Projects Editor</h1>
        </div>
        
        {message.text && (
          <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>
            {message.text}
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : isEditing ? (
          <div className="bg-gray-800 rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-6">{currentProject?.name ? `Editing: ${currentProject.name}` : 'New Project'}</h2>
            
            {/* Project Editor Form */}
            <div className="space-y-6">
              {/* Project Name */}
              <div>
                <label className="block mb-2 text-sm font-medium">Project Name</label>
                <input
                  type="text"
                  value={currentProject?.name || ''}
                  onChange={(e) => handleUpdateField('name', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              
              {/* Project Description */}
              <div>
                <label className="block mb-2 text-sm font-medium">Description</label>
                <textarea
                  value={currentProject?.description || ''}
                  onChange={(e) => handleUpdateField('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              
              {/* Project Image */}
              <div>
                <label className="block mb-2 text-sm font-medium">Image URL</label>
                <input
                  type="text"
                  value={currentProject?.image || ''}
                  onChange={(e) => handleUpdateField('image', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
                {currentProject?.image && (
                  <div className="mt-2 h-32 w-full bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${currentProject.image})` }}>
                  </div>
                )}
              </div>
              
              {/* Source Code Link */}
              <div>
                <label className="block mb-2 text-sm font-medium">Source Code URL</label>
                <input
                  type="text"
                  value={currentProject?.source_code_link || ''}
                  onChange={(e) => handleUpdateField('source_code_link', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              
              {/* Live Demo Link */}
              <div>
                <label className="block mb-2 text-sm font-medium">Live Demo URL</label>
                <input
                  type="text"
                  value={currentProject?.live_demo_link || ''}
                  onChange={(e) => handleUpdateField('live_demo_link', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              
              {/* Tags */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Tags</label>
                  <button 
                    onClick={handleAddTag}
                    className="text-sm bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded-md flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Tag
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Quick Add:</div>
                  <div className="flex flex-wrap gap-2">
                    {preBuiltTags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => handleAddPreBuiltTag(tag)}
                        className={`px-2 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-xs ${tag.color}`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {currentProject?.tags.map((tag, index) => (
                  <div key={index} className="flex items-center mb-2 p-2 bg-gray-700 rounded-md">
                    <div className="flex-1 mr-2">
                      <input
                        type="text"
                        value={tag.name}
                        onChange={(e) => handleUpdateTag(index, 'name', e.target.value)}
                        className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded-md text-white text-sm"
                        placeholder="Tag name"
                      />
                    </div>
                    <div className="flex-1 mr-2">
                      <select
                        value={tag.color}
                        onChange={(e) => handleUpdateTag(index, 'color', e.target.value)}
                        className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded-md text-white text-sm"
                      >
                        <option value="text-white">White</option>
                        <option value="text-blue-400">Blue</option>
                        <option value="text-green-400">Green</option>
                        <option value="text-red-400">Red</option>
                        <option value="text-yellow-400">Yellow</option>
                        <option value="text-purple-400">Purple</option>
                        <option value="text-pink-400">Pink</option>
                        <option value="text-indigo-400">Indigo</option>
                        <option value="text-orange-400">Orange</option>
                      </select>
                    </div>
                    <button
                      onClick={() => handleRemoveTag(index)}
                      className="p-1 bg-red-600 hover:bg-red-700 rounded-md"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProject}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Save Project
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl">Manage your projects</h2>
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
                disabled={isLoading}
              >
                <Plus size={18} className="mr-2" />
                Add New Project
              </button>
            </div>
            
            {projects.length === 0 ? (
              <div className="bg-gray-800 rounded-xl p-8 text-center">
                <p className="text-gray-400">No projects yet. Add your first project!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <div key={index} className="bg-gray-800 rounded-xl overflow-hidden shadow-md">
                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }}>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                      <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className={`px-2 py-1 rounded-full bg-gray-700 text-xs ${tag.color}`}>
                            {tag.name}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        <div className="space-x-2">
                          {project.source_code_link && (
                            <a
                              href={project.source_code_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block p-2 bg-gray-700 hover:bg-gray-600 rounded-md"
                              title="Source Code"
                            >
                              <Github size={18} />
                            </a>
                          )}
                          {project.live_demo_link && (
                            <a
                              href={project.live_demo_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block p-2 bg-gray-700 hover:bg-gray-600 rounded-md"
                              title="Live Demo"
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>
                        
                        <div className="space-x-2">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                            disabled={isLoading}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project)}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded-md"
                            disabled={isLoading}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
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
  );
};

export default ProjectEditor;
