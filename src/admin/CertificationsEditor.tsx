import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Edit, Trash2 } from 'lucide-react';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  link: string;
  image?: string;
}

const CertificationsEditor: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [currentCertification, setCurrentCertification] = useState<Certification | null>(null);
  const [isEditingCert, setIsEditingCert] = useState(false);
  const [editingCertIndex, setEditingCertIndex] = useState<number | null>(null);
  const [saveMessage, setSaveMessage] = useState({ show: false, text: '' });
  
  // Load certifications from localStorage on component mount
  useEffect(() => {
    const savedCertifications = localStorage.getItem('portfolio-certifications');
    if (savedCertifications) {
      setCertifications(JSON.parse(savedCertifications));
    } else {
      // Initialize with empty array if no certifications exist
      setCertifications([]);
    }
  }, []);
  
  // Save certifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolio-certifications', JSON.stringify(certifications));
    if (certifications.length > 0) {
      showSaveMessage("Changes saved automatically");
    }
  }, [certifications]);
  
  const showSaveMessage = (text: string) => {
    setSaveMessage({ show: true, text });
    setTimeout(() => {
      setSaveMessage({ show: false, text: '' });
    }, 3000);
  };
  
  const handleAddCertification = () => {
    setCurrentCertification({
      name: '',
      issuer: '',
      date: '',
      link: '',
      image: 'https://via.placeholder.com/100'
    });
    setIsEditingCert(true);
    setEditingCertIndex(null);
  };
  
  const handleEditCertification = (index: number) => {
    setCurrentCertification({...certifications[index]});
    setIsEditingCert(true);
    setEditingCertIndex(index);
  };
  
  const handleRemoveCertification = (index: number) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      const updatedCertifications = [...certifications];
      updatedCertifications.splice(index, 1);
      setCertifications(updatedCertifications);
      showSaveMessage("Certification deleted successfully");
    }
  };
  
  const handleCertificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentCertification) return;
    
    const { name, value } = e.target;
    setCurrentCertification({
      ...currentCertification,
      [name]: value
    });
  };
  
  const handleSaveCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCertification) return;
    
    if (editingCertIndex !== null) {
      // Update existing certification
      const updatedCertifications = [...certifications];
      updatedCertifications[editingCertIndex] = currentCertification;
      
      setCertifications(updatedCertifications);
      showSaveMessage("Certification updated successfully");
    } else {
      // Add new certification
      setCertifications([...certifications, currentCertification]);
      showSaveMessage("New certification added successfully");
    }
    
    setCurrentCertification(null);
    setIsEditingCert(false);
    setEditingCertIndex(null);
  };
  
  const handleCancelCertification = () => {
    setCurrentCertification(null);
    setIsEditingCert(false);
    setEditingCertIndex(null);
  };
  
  return (
    <div className="bg-primary text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin" className="p-2 bg-tertiary rounded-full hover:bg-purple-700 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">Certifications</h1>
        </div>
        
        {saveMessage.show && (
          <div className="mb-6 p-4 rounded-lg bg-green-800">
            {saveMessage.text}
          </div>
        )}
        
        <div className="bg-tertiary rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">My Certifications</h2>
            
            {!isEditingCert && (
              <button
                onClick={handleAddCertification}
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus size={16} />
                Add Certification
              </button>
            )}
          </div>
          
          {isEditingCert && currentCertification ? (
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-bold mb-4">
                {editingCertIndex !== null ? 'Edit Certification' : 'Add New Certification'}
              </h3>
              
              <form onSubmit={handleSaveCertification}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Certification Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={currentCertification.name}
                      onChange={handleCertificationChange}
                      className="w-full bg-gray-700 p-3 rounded-lg text-white"
                      placeholder="AWS Certified Developer"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Issuing Organization
                    </label>
                    <input
                      type="text"
                      name="issuer"
                      value={currentCertification.issuer}
                      onChange={handleCertificationChange}
                      className="w-full bg-gray-700 p-3 rounded-lg text-white"
                      placeholder="Amazon Web Services"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Date Achieved
                    </label>
                    <input
                      type="text"
                      name="date"
                      value={currentCertification.date}
                      onChange={handleCertificationChange}
                      className="w-full bg-gray-700 p-3 rounded-lg text-white"
                      placeholder="Jan 2023"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Certificate Link (Optional)
                    </label>
                    <input
                      type="text"
                      name="link"
                      value={currentCertification.link}
                      onChange={handleCertificationChange}
                      className="w-full bg-gray-700 p-3 rounded-lg text-white"
                      placeholder="https://example.com/certification"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Certificate Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={currentCertification.image}
                      onChange={handleCertificationChange}
                      className="w-full bg-gray-700 p-3 rounded-lg text-white"
                      placeholder="https://example.com/cert-image.png"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleCancelCertification}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save Certification
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {certifications.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  No certifications added yet. Click "Add Certification" to get started.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center">
                            {cert.image ? (
                              <img 
                                src={cert.image} 
                                alt={cert.name} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-gray-600 text-xs text-center p-2">No Image</div>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditCertification(index)}
                              className="text-indigo-400 hover:text-indigo-300"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleRemoveCertification(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <h3 className="font-bold text-lg mb-1">{cert.name}</h3>
                        <p className="text-indigo-400 text-sm mb-1">{cert.issuer}</p>
                        <p className="text-gray-400 text-sm mb-2">{cert.date}</p>
                        
                        {cert.link && (
                          <a 
                            href={cert.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 text-sm mt-auto inline-block"
                          >
                            View Certificate
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationsEditor;
