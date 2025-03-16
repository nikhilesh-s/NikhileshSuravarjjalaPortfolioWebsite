import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Edit, Trash2 } from 'lucide-react';
import { getCertifications, saveCertifications } from '../services/dataService';
import { useFirebaseEditor } from './FirebaseEditorHelper';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  link: string;
  image?: string;
}

const CertificationsEditor: React.FC = () => {
  const [currentCertification, setCurrentCertification] = useState<Certification | null>(null);
  const [isEditingCert, setIsEditingCert] = useState(false);
  const [editingCertIndex, setEditingCertIndex] = useState<number | null>(null);
  
  // Use the Firebase editor helper
  const {
    items: certifications,
    setItems: setCertifications,
    isLoading,
    message: saveMessage,
    setMessage: setSaveMessage,
    fetchData,
    saveData
  } = useFirebaseEditor<Certification>(
    'portfolio-certifications', 
    getCertifications, 
    saveCertifications,
    []
  );
  
  // Load certifications from Firebase on component mount
  useEffect(() => {
    fetchData();
  }, []);
  
  const showSaveMessage = (text: string) => {
    setSaveMessage({ text, type: 'success' });
    setTimeout(() => {
      setSaveMessage({ text: '', type: '' });
    }, 3000);
  };
  
  const handleAddCertification = () => {
    setCurrentCertification({
      name: '',
      issuer: '',
      date: '',
      link: '',
      image: ''
    });
    setIsEditingCert(true);
    setEditingCertIndex(null);
  };
  
  const handleEditCertification = (index: number) => {
    setCurrentCertification({ ...certifications[index] });
    setIsEditingCert(true);
    setEditingCertIndex(index);
  };
  
  const handleDeleteCertification = (index: number) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      const updatedCerts = [...certifications];
      updatedCerts.splice(index, 1);
      setCertifications(updatedCerts);
      saveData(updatedCerts);
      showSaveMessage("Certification deleted");
    }
  };
  
  const handleSaveCertification = () => {
    if (!currentCertification) return;
    
    const updatedCerts = [...certifications];
    
    if (editingCertIndex !== null) {
      // Update existing certification
      updatedCerts[editingCertIndex] = currentCertification;
    } else {
      // Add new certification
      updatedCerts.push(currentCertification);
    }
    
    setCertifications(updatedCerts);
    saveData(updatedCerts);
    setIsEditingCert(false);
    setCurrentCertification(null);
    setEditingCertIndex(null);
    showSaveMessage(editingCertIndex !== null ? "Certification updated" : "Certification added");
  };
  
  const handleCancelEdit = () => {
    setIsEditingCert(false);
    setCurrentCertification(null);
    setEditingCertIndex(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentCertification) return;
    
    setCurrentCertification({
      ...currentCertification,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div className="min-h-screen bg-primary text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin" className="p-2 bg-tertiary rounded-full hover:bg-purple-700 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">Certifications</h1>
        </div>
        
        {saveMessage.text && (
          <div className={`mb-6 p-4 rounded-lg ${saveMessage.type === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>
            {saveMessage.text}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {isEditingCert && currentCertification ? (
              <div className="bg-gray-800 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-bold mb-4">
                  {editingCertIndex !== null ? 'Edit Certification' : 'Add New Certification'}
                </h3>
                
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Certification Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={currentCertification.name}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 p-3 rounded-lg text-white"
                        placeholder="https://example.com/cert-image.png"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveCertification}
                      className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Save size={16} />
                      Save Certification
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-tertiary p-6 rounded-lg">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">My Certifications</h2>
                  <button
                    onClick={handleAddCertification}
                    className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-2"
                    disabled={isLoading}
                  >
                    <Plus size={16} />
                    Add Certification
                  </button>
                </div>
                
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
                                onClick={() => handleDeleteCertification(index)}
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
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CertificationsEditor;
