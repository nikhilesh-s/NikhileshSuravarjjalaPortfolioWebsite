import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { getHero, saveHero } from '../services/dataService';
import { useFirebaseSingleItemEditor } from './FirebaseEditorHelper';

interface HeroContent {
  greeting: string;
  name: string;
  typedTexts: string[];
  description: string;
}

const initialHeroData: HeroContent = {
  greeting: "Hi, I'm",
  name: "Nikhilesh",
  typedTexts: [
    "Software Developer",
    "Full Stack Developer",
    "Student"
  ],
  description: "I develop web applications, user interfaces, and everything in between."
};

const HeroEditor: React.FC = () => {
  // Use Firebase editor helper for single item
  const {
    item: heroData,
    isLoading,
    message,
    fetchData,
    saveData
  } = useFirebaseSingleItemEditor<HeroContent>(
    'portfolio-hero-data',
    getHero,
    saveHero,
    initialHeroData
  );
  
  const [typingSpeed, setTypingSpeed] = useState<number>(() => {
    const savedSpeed = localStorage.getItem('portfolio-typing-speed');
    return savedSpeed ? parseInt(savedSpeed) : 100;
  });
  
  const [newTypedText, setNewTypedText] = useState('');
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedHero = { ...heroData, [name]: value };
    saveData(updatedHero);
  };
  
  const handleAddTypedText = () => {
    if (newTypedText.trim()) {
      const updatedHero = { ...heroData, typedTexts: [...heroData.typedTexts, newTypedText.trim()] };
      saveData(updatedHero);
      setNewTypedText('');
    }
  };
  
  const handleRemoveTypedText = (index: number) => {
    const updatedHero = { ...heroData, typedTexts: heroData.typedTexts.filter((_, i) => i !== index) };
    saveData(updatedHero);
  };
  
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypingSpeed(parseInt(e.target.value));
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="bg-primary text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin" className="p-2 bg-tertiary rounded-full hover:bg-purple-700 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">Hero Section Editor</h1>
        </div>
        
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>
            {message.text}
          </div>
        )}
        
        <div className="bg-tertiary p-6 rounded-xl mb-8">
          <h2 className="text-xl font-bold mb-4">Hero Content</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Greeting</label>
                <input
                  type="text"
                  name="greeting"
                  value={heroData.greeting}
                  onChange={handleChange}
                  className="w-full bg-gray-800 p-3 rounded-lg text-white"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={heroData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-800 p-3 rounded-lg text-white"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={heroData.description}
                  onChange={handleChange}
                  className="w-full bg-gray-800 p-3 rounded-lg text-white h-24 resize-none"
                ></textarea>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Typing Animation Speed (ms)</label>
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={typingSpeed}
                  onChange={handleSpeedChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs mt-1">
                  <span>Fast ({typingSpeed}ms)</span>
                  <span>Slow</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Typed Texts</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTypedText}
                    onChange={(e) => setNewTypedText(e.target.value)}
                    className="flex-1 bg-gray-800 p-3 rounded-lg text-white"
                    placeholder="Add a new role or title"
                  />
                  <button
                    onClick={handleAddTypedText}
                    className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-2">
                  {heroData.typedTexts.map((text, index) => (
                    <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-700 rounded">
                      <span>{text}</span>
                      <button
                        onClick={() => handleRemoveTypedText(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {heroData.typedTexts.length === 0 && (
                    <p className="text-gray-400 p-2">No typed texts added yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              onClick={() => saveData(heroData)}
              className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition-colors flex items-center gap-2"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>
        
        <div className="bg-tertiary p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="mb-2 text-gray-400">{heroData.greeting}</div>
            <div className="text-3xl font-bold mb-2">{heroData.name}</div>
            <div className="text-xl text-purple-400 mb-2">
              {heroData.typedTexts.length > 0 ? heroData.typedTexts[0] : 'No typed texts'}
            </div>
            <div className="text-gray-300 max-w-md">{heroData.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;
