import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

interface AboutContent {
  title: string;
  description: string[];
  image: string;
}

const initialAboutData: AboutContent = {
  title: "Introduction",
  description: [
    "I'm a skilled software developer with experience in TypeScript and JavaScript, expertise in frameworks like React, Node.js, and Three.js.",
    "I'm a quick learner and collaborate closely with clients to create efficient, scalable, and user-friendly solutions that solve real-world problems.",
    "Let's work together to bring your ideas to life!"
  ],
  image: "/src/assets/my-photo.jpg"
};

const AboutEditor: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutContent>(initialAboutData);
  const [editDescription, setEditDescription] = useState<string>(aboutData.description.join('\n\n'));
  const [editTitle, setEditTitle] = useState<string>(aboutData.title);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSave = () => {
    const newDescription = editDescription.split('\n\n').filter(para => para.trim() !== '');
    
    setAboutData({
      ...aboutData,
      title: editTitle,
      description: newDescription
    });
    
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  return (
    <div className="bg-primary text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin" className="p-2 bg-tertiary rounded-full hover:bg-purple-700 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">About Me Editor</h1>
        </div>
        
        {isSaved && (
          <div className="mb-6 p-4 rounded-lg bg-green-800">
            Changes saved successfully!
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-tertiary p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-6">About Content</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="about-title">
                Section Title
              </label>
              <input
                id="about-title"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-gray-800 p-3 rounded-lg text-white"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="about-description">
                About Description
              </label>
              <textarea
                id="about-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full bg-gray-800 p-3 rounded-lg text-white min-h-[300px]"
                placeholder="Enter your about text. Use double line breaks to separate paragraphs."
              />
              <p className="text-gray-400 text-xs mt-2">Use double line breaks to create new paragraphs.</p>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition-colors flex items-center gap-2"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
          
          <div className="bg-tertiary p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-6">Preview</h2>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">{aboutData.title}</h3>
              
              {aboutData.description.map((paragraph, index) => (
                <p key={index} className="text-gray-300 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-4">Image Preview</h3>
              <div className="bg-gray-800 p-4 rounded-lg flex justify-center">
                <img 
                  src={aboutData.image} 
                  alt="Profile" 
                  className="w-64 h-auto rounded-lg object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/300x400?text=Image+Not+Found";
                  }}
                />
              </div>
              <p className="text-gray-400 text-xs mt-2">
                To update the image, replace src/assets/my-photo.jpg with your new image.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutEditor;
