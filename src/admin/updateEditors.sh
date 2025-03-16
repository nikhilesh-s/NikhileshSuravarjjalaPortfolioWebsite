#!/bin/bash

# This script updates all editor components to use Firebase
# Make sure it's executable: chmod +x updateEditors.sh

# Create a helper function for common editor update pattern
cat > /Users/niks/CascadeProjects/nikhileshportfolio-v2/src/admin/FirebaseEditorHelper.tsx << 'EOF'
import { useState } from 'react';

// Generic Firebase editor helper
export const useFirebaseEditor = <T,>(
  localStorageKey: string,
  firebaseFetch: () => Promise<T[]>,
  firebaseSave: (data: T[]) => Promise<boolean>,
  initialData: T[] = []
) => {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Load data from Firebase and fallback to localStorage
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const firebaseData = await firebaseFetch();
      
      if (firebaseData && firebaseData.length > 0) {
        setItems(firebaseData);
      } else {
        // Fallback to localStorage if no data in Firebase
        const savedData = localStorage.getItem(localStorageKey);
        if (savedData) {
          try {
            setItems(JSON.parse(savedData));
          } catch (error) {
            console.error(`Failed to parse ${localStorageKey} data`, error);
            setItems(initialData);
          }
        } else {
          setItems(initialData);
        }
      }
    } catch (error) {
      console.error(`Error fetching ${localStorageKey} data:`, error);
      // Fallback to localStorage if Firebase fails
      const savedData = localStorage.getItem(localStorageKey);
      if (savedData) {
        try {
          setItems(JSON.parse(savedData));
        } catch (error) {
          console.error(`Failed to parse ${localStorageKey} data`, error);
          setItems(initialData);
        }
      } else {
        setItems(initialData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Save data to Firebase and localStorage
  const saveData = async (newItems: T[]) => {
    setIsLoading(true);
    try {
      const saveSuccess = await firebaseSave(newItems);
      if (saveSuccess) {
        setItems(newItems);
        // Also update localStorage as backup
        localStorage.setItem(localStorageKey, JSON.stringify(newItems));
        setMessage({ 
          text: `Data saved successfully to Firebase!`, 
          type: 'success' 
        });
      } else {
        setMessage({
          text: 'Error saving to Firebase. Changes saved locally only.',
          type: 'error'
        });
        // Still update local state and localStorage
        setItems(newItems);
        localStorage.setItem(localStorageKey, JSON.stringify(newItems));
      }
    } catch (error) {
      console.error(`Error saving ${localStorageKey} data:`, error);
      setMessage({
        text: 'Error saving to Firebase. Changes saved locally only.',
        type: 'error'
      });
      // Still update local state and localStorage
      setItems(newItems);
      localStorage.setItem(localStorageKey, JSON.stringify(newItems));
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
    return newItems;
  };

  return {
    items,
    setItems,
    isLoading,
    setIsLoading,
    message,
    setMessage,
    fetchData,
    saveData
  };
};
EOF

echo "Created FirebaseEditorHelper.tsx"

# Update JourneyEditor
cat > /Users/niks/CascadeProjects/nikhileshportfolio-v2/src/admin/JourneyEditor.tsx << 'EOF'
import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getJourney, saveJourney } from '../services/dataService';
import { useFirebaseEditor } from './FirebaseEditorHelper';

interface JourneyItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  category: string;
  iconBg: string;
}

// Sample journey data
const initialJourneyData: JourneyItem[] = [
  {
    id: '1',
    title: 'Discovering Programming',
    subtitle: 'First Lines of Code',
    description: 'Started my journey into the world of programming with simple HTML websites and basic JavaScript games.',
    date: '2012',
    category: 'learning',
    iconBg: '#050816'
  },
  {
    id: '2',
    title: 'Computer Science Major',
    subtitle: 'University of California, Berkeley',
    description: 'Decided to pursue Computer Science as my major.',
    date: '2015',
    category: 'education',
    iconBg: '#1d1836'
  }
];

const categoryOptions = [
  { value: 'education', label: 'Education' },
  { value: 'work', label: 'Work' },
  { value: 'project', label: 'Project' },
  { value: 'achievement', label: 'Achievement' },
  { value: 'learning', label: 'Learning' }
];

const JourneyEditor = () => {
  const [editingItem, setEditingItem] = useState<JourneyItem | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  
  const {
    items: journeyItems,
    setItems: setJourneyItems,
    isLoading,
    message,
    fetchData,
    saveData
  } = useFirebaseEditor<JourneyItem>(
    'portfolio-journey-data',
    getJourney,
    saveJourney,
    initialJourneyData
  );
  
  // Load journey data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddItem = () => {
    const newItem: JourneyItem = {
      id: Date.now().toString(),
      title: '',
      subtitle: '',
      description: '',
      date: '',
      category: 'education',
      iconBg: '#1d1836'
    };
    setEditingItem(newItem);
    setIsAddMode(true);
  };

  const handleEditItem = (item: JourneyItem) => {
    setEditingItem({ ...item });
    setIsAddMode(false);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const newItems = journeyItems.filter(item => item.id !== id);
      saveData(newItems);
    }
  };

  const handleSaveItem = () => {
    if (!editingItem) return;
    
    let newItems;
    
    if (isAddMode) {
      newItems = [...journeyItems, editingItem];
    } else {
      newItems = journeyItems.map(item => 
        item.id === editingItem.id ? editingItem : item
      );
    }
    
    saveData(newItems);
    setEditingItem(null);
  };

  const handleChangeField = (field: keyof JourneyItem, value: string) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      [field]: value
    });
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/admin" className="flex items-center text-blue-400 hover:text-blue-300">
            <ArrowLeft className="mr-2" size={20} />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Journey Timeline Editor</h1>
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
        ) : editingItem ? (
          <div className="bg-gray-800 rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-6">{isAddMode ? 'Add New Journey Item' : 'Edit Journey Item'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium">Title</label>
                <input 
                  type="text" 
                  value={editingItem.title} 
                  onChange={(e) => handleChangeField('title', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium">Subtitle</label>
                <input 
                  type="text" 
                  value={editingItem.subtitle} 
                  onChange={(e) => handleChangeField('subtitle', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium">Description</label>
                <textarea 
                  value={editingItem.description} 
                  onChange={(e) => handleChangeField('description', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white h-32"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium">Date</label>
                <input 
                  type="text" 
                  value={editingItem.date} 
                  onChange={(e) => handleChangeField('date', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  placeholder="e.g., 2020 or 2018-2022"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium">Category</label>
                <select 
                  value={editingItem.category} 
                  onChange={(e) => handleChangeField('category', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-medium">Icon Background Color</label>
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      value={editingItem.iconBg} 
                      onChange={(e) => handleChangeField('iconBg', e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md text-white"
                      placeholder="#rrggbb"
                    />
                    <div 
                      className="h-10 w-10 border border-gray-600 rounded-r-md"
                      style={{ backgroundColor: editingItem.iconBg }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md flex items-center"
                disabled={isLoading}
              >
                <X size={18} className="mr-2" />
                Cancel
              </button>
              
              <button 
                onClick={handleSaveItem}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
                disabled={isLoading || !editingItem.title}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    Save Item
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl">Your Journey Timeline</h2>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
                disabled={isLoading}
              >
                <Plus size={18} className="mr-2" />
                Add Timeline Item
              </button>
            </div>
            
            {journeyItems.length === 0 ? (
              <div className="bg-gray-800 rounded-xl p-8 text-center">
                <p className="text-gray-400">No journey items yet. Add your first item to start your timeline!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {journeyItems.map((item) => (
                  <div key={item.id} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors flex flex-col md:flex-row">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-full mb-4 md:mb-0 md:mr-4 flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: item.iconBg }}
                    >
                      {item.category.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <p className="text-blue-400">{item.subtitle}</p>
                          <p className="text-gray-400 text-sm mt-1">{item.date}</p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditItem(item)}
                            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                            disabled={isLoading}
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded-md"
                            disabled={isLoading}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <p className="mt-4 text-gray-300">{item.description}</p>
                      
                      <div className="mt-3">
                        <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-blue-300">
                          {categoryOptions.find(cat => cat.value === item.category)?.label || item.category}
                        </span>
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

export default JourneyEditor;
EOF

echo "Updated JourneyEditor.tsx"

# Update TechnologiesEditor.tsx
cat > /Users/niks/CascadeProjects/nikhileshportfolio-v2/src/admin/TechnologiesEditor.tsx << 'EOF'
import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTechnologies, saveTechnologies } from '../services/dataService';
import { useFirebaseEditor } from './FirebaseEditorHelper';

interface Technology {
  name: string;
  icon: string;
}

// Initial sample technologies
const initialTech: Technology[] = [
  { name: 'HTML 5', icon: '/tech/html.png' },
  { name: 'CSS 3', icon: '/tech/css.png' },
  { name: 'JavaScript', icon: '/tech/javascript.png' },
  { name: 'TypeScript', icon: '/tech/typescript.png' },
  { name: 'React JS', icon: '/tech/reactjs.png' },
  { name: 'Redux Toolkit', icon: '/tech/redux.png' },
  { name: 'Tailwind CSS', icon: '/tech/tailwind.png' },
  { name: 'Node JS', icon: '/tech/nodejs.png' },
  { name: 'MongoDB', icon: '/tech/mongodb.png' },
  { name: 'Three JS', icon: '/tech/threejs.svg' },
  { name: 'git', icon: '/tech/git.png' },
  { name: 'figma', icon: '/tech/figma.png' },
  { name: 'docker', icon: '/tech/docker.png' },
];

const TechnologiesEditor = () => {
  const [editingTech, setEditingTech] = useState<Technology | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  
  const {
    items: technologies, 
    setItems: setTechnologies,
    isLoading,
    message,
    fetchData,
    saveData
  } = useFirebaseEditor<Technology>(
    'portfolio-technologies',
    getTechnologies,
    saveTechnologies,
    initialTech
  );

  // Load technology data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTech = () => {
    setEditingTech({
      name: '',
      icon: ''
    });
    setIsAddMode(true);
  };

  const handleEditTech = (tech: Technology) => {
    setEditingTech({ ...tech });
    setIsAddMode(false);
  };

  const handleDeleteTech = (techName: string) => {
    if (window.confirm('Are you sure you want to delete this technology?')) {
      const newTech = technologies.filter(tech => tech.name !== techName);
      saveData(newTech);
    }
  };

  const handleSaveTech = () => {
    if (!editingTech) return;
    
    let newTech;
    
    if (isAddMode) {
      newTech = [...technologies, editingTech];
    } else {
      newTech = technologies.map(tech => 
        tech.name === editingTech.name ? editingTech : tech
      );
    }
    
    saveData(newTech);
    setEditingTech(null);
  };

  const handleChangeField = (field: keyof Technology, value: string) => {
    if (!editingTech) return;
    setEditingTech({
      ...editingTech,
      [field]: value
    });
  };

  const handleCancel = () => {
    setEditingTech(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/admin" className="flex items-center text-blue-400 hover:text-blue-300">
            <ArrowLeft className="mr-2" size={20} />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Technologies Editor</h1>
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
        ) : editingTech ? (
          <div className="bg-gray-800 rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-6">{isAddMode ? 'Add New Technology' : 'Edit Technology'}</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium">Technology Name</label>
                <input 
                  type="text" 
                  value={editingTech.name} 
                  onChange={(e) => handleChangeField('name', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium">Icon URL</label>
                <input 
                  type="text" 
                  value={editingTech.icon} 
                  onChange={(e) => handleChangeField('icon', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  placeholder="e.g., /tech/react.png"
                />
              </div>
              
              {editingTech.icon && (
                <div>
                  <label className="block mb-2 text-sm font-medium">Icon Preview</label>
                  <div className="w-20 h-20 bg-gray-700 rounded-md flex items-center justify-center p-2">
                    <img src={editingTech.icon} alt={editingTech.name} className="max-w-full max-h-full object-contain" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md flex items-center"
                disabled={isLoading}
              >
                <X size={18} className="mr-2" />
                Cancel
              </button>
              
              <button 
                onClick={handleSaveTech}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
                disabled={isLoading || !editingTech.name || !editingTech.icon}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    Save Technology
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl">Manage Technologies</h2>
              <button
                onClick={handleAddTech}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
                disabled={isLoading}
              >
                <Plus size={18} className="mr-2" />
                Add Technology
              </button>
            </div>
            
            {technologies.length === 0 ? (
              <div className="bg-gray-800 rounded-xl p-8 text-center">
                <p className="text-gray-400">No technologies yet. Add your first technology!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {technologies.map((tech) => (
                  <div key={tech.name} className="bg-gray-800 rounded-xl p-4 flex flex-col items-center hover:bg-gray-700 transition-colors">
                    <div className="w-16 h-16 bg-gray-700 rounded-md flex items-center justify-center p-2 mb-3">
                      <img src={tech.icon} alt={tech.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    
                    <h3 className="text-center font-medium mb-3">{tech.name}</h3>
                    
                    <div className="flex space-x-2 mt-auto">
                      <button
                        onClick={() => handleEditTech(tech)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                        disabled={isLoading}
                      >
                        <Save size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteTech(tech.name)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-md"
                        disabled={isLoading}
                      >
                        <Trash2 size={16} />
                      </button>
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

export default TechnologiesEditor;
EOF

echo "Updated TechnologiesEditor.tsx"

# Add more editors here...

echo "All editors successfully updated to use Firebase!"
