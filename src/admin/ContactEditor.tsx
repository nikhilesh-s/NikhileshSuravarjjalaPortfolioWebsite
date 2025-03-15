import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

interface ContactContent {
  title: string;
  subtitle: string;
  form: {
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    buttonText: string;
  };
}

const initialContactData: ContactContent = {
  title: "Contact",
  subtitle: "Get in touch",
  form: {
    nameLabel: "Your Name",
    emailLabel: "Your Email",
    messageLabel: "Your Message",
    buttonText: "Send Message"
  }
};

const ContactEditor: React.FC = () => {
  const [contactData, setContactData] = useState<ContactContent>(initialContactData);
  const [editTitle, setEditTitle] = useState<string>(contactData.title);
  const [editSubtitle, setEditSubtitle] = useState<string>(contactData.subtitle);
  const [editNameLabel, setEditNameLabel] = useState<string>(contactData.form.nameLabel);
  const [editEmailLabel, setEditEmailLabel] = useState<string>(contactData.form.emailLabel);
  const [editMessageLabel, setEditMessageLabel] = useState<string>(contactData.form.messageLabel);
  const [editButtonText, setEditButtonText] = useState<string>(contactData.form.buttonText);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSave = () => {
    setContactData({
      title: editTitle,
      subtitle: editSubtitle,
      form: {
        nameLabel: editNameLabel,
        emailLabel: editEmailLabel,
        messageLabel: editMessageLabel,
        buttonText: editButtonText
      }
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
          <h1 className="text-3xl font-bold">Contact Page Editor</h1>
        </div>
        
        {isSaved && (
          <div className="mb-6 p-4 rounded-lg bg-green-800">
            Changes saved successfully!
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-tertiary p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-6">Contact Content</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="contact-title">
                Section Title
              </label>
              <input
                id="contact-title"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-gray-800 p-3 rounded-lg text-white"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="contact-subtitle">
                Section Subtitle
              </label>
              <input
                id="contact-subtitle"
                type="text"
                value={editSubtitle}
                onChange={(e) => setEditSubtitle(e.target.value)}
                className="w-full bg-gray-800 p-3 rounded-lg text-white"
              />
            </div>
            
            <h3 className="text-lg font-bold mb-4 mt-6">Form Labels</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="name-label">
                Name Field Label
              </label>
              <input
                id="name-label"
                type="text"
                value={editNameLabel}
                onChange={(e) => setEditNameLabel(e.target.value)}
                className="w-full bg-gray-800 p-3 rounded-lg text-white"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email-label">
                Email Field Label
              </label>
              <input
                id="email-label"
                type="text"
                value={editEmailLabel}
                onChange={(e) => setEditEmailLabel(e.target.value)}
                className="w-full bg-gray-800 p-3 rounded-lg text-white"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="message-label">
                Message Field Label
              </label>
              <input
                id="message-label"
                type="text"
                value={editMessageLabel}
                onChange={(e) => setEditMessageLabel(e.target.value)}
                className="w-full bg-gray-800 p-3 rounded-lg text-white"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="button-text">
                Button Text
              </label>
              <input
                id="button-text"
                type="text"
                value={editButtonText}
                onChange={(e) => setEditButtonText(e.target.value)}
                className="w-full bg-gray-800 p-3 rounded-lg text-white"
              />
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
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-2">{contactData.title}</h3>
              <p className="text-gray-400 mb-6">{contactData.subtitle}</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    {contactData.form.nameLabel}
                  </label>
                  <input
                    type="text"
                    disabled
                    placeholder="John Doe"
                    className="w-full bg-gray-700 border border-gray-600 text-gray-400 p-3 rounded-lg focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    {contactData.form.emailLabel}
                  </label>
                  <input
                    type="email"
                    disabled
                    placeholder="john@example.com"
                    className="w-full bg-gray-700 border border-gray-600 text-gray-400 p-3 rounded-lg focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    {contactData.form.messageLabel}
                  </label>
                  <textarea
                    disabled
                    placeholder="Your message here..."
                    className="w-full bg-gray-700 border border-gray-600 text-gray-400 p-3 rounded-lg h-32 focus:outline-none"
                  ></textarea>
                </div>
                
                <div className="mt-4">
                  <button
                    disabled
                    className="px-4 py-2 bg-purple-600 opacity-75 rounded-lg text-white"
                  >
                    {contactData.form.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactEditor;
