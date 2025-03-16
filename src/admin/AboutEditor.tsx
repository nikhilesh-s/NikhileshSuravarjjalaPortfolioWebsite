import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { getAbout, saveAbout } from '../services/dataService';
import { useFirebaseSingleItemEditor } from './FirebaseEditorHelper';

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
  // Use Firebase editor helper for single item
  const {
    item: aboutData,
    isLoading,
    message,
    fetchData,
    saveData
  } = useFirebaseSingleItemEditor<AboutContent>(
    'portfolio-about-data',
    getAbout,
    saveAbout,
    initialAboutData
  );

  const [editDescription, setEditDescription] = useState<string>('');
  const [editTitle, setEditTitle] = useState<string>('');

  // Initialize form data when aboutData changes
  useEffect(() => {
    setEditDescription(aboutData.description.join('\n\n'));
    setEditTitle(aboutData.title);
  }, [aboutData]);

  // Load about data from Firebase
  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    const newDescription = editDescription.split('\n\n').filter(para => para.trim() !== '');

    const updatedAbout = {
      ...aboutData,
      title: editTitle,
      description: newDescription
    };

    await saveData(updatedAbout);
  };

  return (
    <div className="min-h-screen bg-primary text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin" className="p-2 bg-tertiary rounded-full hover:bg-purple-700 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">About Me Editor</h1>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>
            {message.text}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-tertiary p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-6">About Content</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" htmlFor="about-title">
                  Section Title
                </label>
                <input
                  id="about-title"
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
                  className="w-full bg-gray-800 p-3 rounded-lg text-white min-h-[200px]"
                />
                <p className="text-gray-400 text-xs mt-2">Use double line breaks to create new paragraphs.</p>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
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
                      target.src = "https://via.placeholder.com/150?text=Image+Not+Found";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutEditor;
