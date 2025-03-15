import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { ArrowLeft, Plus, Trash2, Save, Edit, ExternalLink } from 'lucide-react';

const ProjectEditor: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio-projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);
  
  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolio-projects', JSON.stringify(projects));
  }, [projects]);
  
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
  
  const handleDeleteProject = (project: Project) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.name !== project.name);
      setProjects(updatedProjects);
      
      setMessage({ 
        text: 'Project deleted successfully!', 
        type: 'success' 
      });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };
  
  const handleCancelEdit = () => {
    setCurrentProject(null);
    setIsEditing(false);
  };
  
  const handleSaveProject = () => {
    if (!currentProject) return;
    
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
    
    setProjects(updatedProjects);
    setCurrentProject(null);
    setIsEditing(false);
    
    setMessage({ 
      text: 'Project saved successfully!', 
      type: 'success' 
    });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
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
    <div className="bg-primary text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin" className="p-2 bg-tertiary rounded-full hover:bg-purple-700 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">Manage Projects</h1>
        </div>
        
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>
            {message.text}
          </div>
        )}
        
        {!isEditing ? (
          <div className="bg-tertiary p-6 rounded-xl mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">All Projects</h2>
              <button 
                onClick={handleAddNew}
                className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-2"
              >
                <Plus size={16} />
                Add New Project
              </button>
            </div>
            
            {projects.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                No projects yet. Click "Add New Project" to get started.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="text-indigo-400 hover:text-indigo-300"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={`px-2 py-1 rounded-full text-xs ${tag.color} bg-black`}>
                          {tag.name}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      {project.source_code_link && (
                        <a href={project.source_code_link} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
                          <ExternalLink size={12} />
                          Source Code
                        </a>
                      )}
                      {project.live_demo_link && (
                        <a href={project.live_demo_link} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
                          <ExternalLink size={12} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-tertiary p-6 rounded-xl mb-8">
            <h2 className="text-xl font-bold mb-6">{currentProject?.name ? 'Edit Project' : 'New Project'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Project Name</label>
                  <input
                    type="text"
                    value={currentProject?.name || ''}
                    onChange={(e) => handleUpdateField('name', e.target.value)}
                    className="w-full bg-gray-800 p-3 rounded-lg text-white"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={currentProject?.description || ''}
                    onChange={(e) => handleUpdateField('description', e.target.value)}
                    className="w-full bg-gray-800 p-3 rounded-lg text-white h-32 resize-none"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="text"
                    value={currentProject?.image || ''}
                    onChange={(e) => handleUpdateField('image', e.target.value)}
                    className="w-full bg-gray-800 p-3 rounded-lg text-white"
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Source Code Link</label>
                  <input
                    type="text"
                    value={currentProject?.source_code_link || ''}
                    onChange={(e) => handleUpdateField('source_code_link', e.target.value)}
                    className="w-full bg-gray-800 p-3 rounded-lg text-white"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Live Demo Link</label>
                  <input
                    type="text"
                    value={currentProject?.live_demo_link || ''}
                    onChange={(e) => handleUpdateField('live_demo_link', e.target.value)}
                    className="w-full bg-gray-800 p-3 rounded-lg text-white"
                  />
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Tags</label>
                    <button
                      onClick={handleAddTag}
                      className="px-2 py-1 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-1 text-xs"
                    >
                      <Plus size={12} />
                      Add Tag
                    </button>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-3">
                    {currentProject?.tags.map((tag, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={tag.name}
                          onChange={(e) => handleUpdateTag(index, 'name', e.target.value)}
                          className="flex-1 bg-gray-700 p-2 rounded text-white text-sm"
                          placeholder="Tag name"
                        />
                        <select
                          value={tag.color}
                          onChange={(e) => handleUpdateTag(index, 'color', e.target.value)}
                          className="bg-gray-700 p-2 rounded text-white text-sm"
                        >
                          <option value="text-white">White</option>
                          <option value="text-blue-500">Blue</option>
                          <option value="text-green-500">Green</option>
                          <option value="text-red-500">Red</option>
                          <option value="text-yellow-500">Yellow</option>
                          <option value="text-purple-500">Purple</option>
                          <option value="text-pink-500">Pink</option>
                        </select>
                        <button
                          onClick={() => handleRemoveTag(index)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    {currentProject?.tags.length === 0 && (
                      <p className="text-gray-500 text-sm p-2">No tags added yet.</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Pre-built Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {preBuiltTags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => handleAddPreBuiltTag(tag)}
                        className={`px-2 py-1 rounded-full text-xs ${tag.color} bg-black`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
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
                onClick={handleSaveProject}
                className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition-colors flex items-center gap-2"
              >
                <Save size={16} />
                Save Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectEditor;
