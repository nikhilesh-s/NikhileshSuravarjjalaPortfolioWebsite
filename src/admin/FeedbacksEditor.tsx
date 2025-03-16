import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Edit } from 'lucide-react';
import { getFeedbacks, saveFeedbacks } from '../services/dataService';
import { v4 as uuidv4 } from 'uuid';

interface Feedback {
  id: string;
  name: string;
  company: string;
  image: string;
  testimonial: string;
}

// Sample feedbacks data
const initialFeedbacks: Feedback[] = [
  {
    id: '1',
    name: 'John Doe',
    company: 'ABC Tech',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    testimonial: 'Nikhilesh delivered an outstanding website for our company. The design is modern and the functionality is seamless.'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    company: 'Design Studio Co.',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    testimonial: 'Working with Nikhilesh was a pleasure. He understood our needs perfectly and delivered a product that exceeded our expectations.'
  },
  {
    id: '3',
    name: 'Michael Brown',
    company: 'Startup Innovations',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    testimonial: 'The web application Nikhilesh built for us has dramatically improved our customer engagement. Highly recommended!'
  }
];

const FeedbacksEditor: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const [newName, setNewName] = useState<string>('');
  const [newCompany, setNewCompany] = useState<string>('');
  const [newImage, setNewImage] = useState<string>('https://randomuser.me/api/portraits/men/1.jpg');
  const [newTestimonial, setNewTestimonial] = useState<string>('');

  useEffect(() => {
    // Load feedbacks from Firebase
    const loadFeedbacks = async () => {
      try {
        setIsLoading(true);
        const data = await getFeedbacks();
        
        if (data && data.length > 0) {
          setFeedbacks(data);
        } else {
          // Fallback to localStorage or initial data
          const savedFeedbacks = localStorage.getItem('portfolio-feedbacks');
          if (savedFeedbacks) {
            setFeedbacks(JSON.parse(savedFeedbacks));
          } else {
            setFeedbacks(initialFeedbacks);
          }
        }
      } catch (err) {
        console.error("Error loading feedbacks:", err);
        // Fallback to localStorage
        const savedFeedbacks = localStorage.getItem('portfolio-feedbacks');
        if (savedFeedbacks) {
          setFeedbacks(JSON.parse(savedFeedbacks));
        } else {
          setFeedbacks(initialFeedbacks);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFeedbacks();
  }, []);

  const handleSave = () => {
    // In a real app, this would save to a backend server
    setIsLoading(true);
    saveFeedbacks(feedbacks).then(() => {
      setMessage({ text: 'Changes saved successfully!', type: 'success' });
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 2000);
    }).catch((err) => {
      console.error("Error saving feedbacks:", err);
      setMessage({ text: 'Error saving changes!', type: 'error' });
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 2000);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const addFeedback = () => {
    if (newName.trim() === '' || newTestimonial.trim() === '') return;
    
    const newFeedback: Feedback = {
      id: uuidv4(),
      name: newName,
      company: newCompany,
      image: newImage,
      testimonial: newTestimonial
    };
    
    setFeedbacks([...feedbacks, newFeedback]);
    
    // Reset form
    setNewName('');
    setNewCompany('');
    setNewImage('https://randomuser.me/api/portraits/men/1.jpg');
    setNewTestimonial('');
  };

  const removeFeedback = (id: string) => {
    setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
  };

  const startEditing = (feedback: Feedback) => {
    setEditingFeedback(feedback);
    setNewName(feedback.name);
    setNewCompany(feedback.company);
    setNewImage(feedback.image);
    setNewTestimonial(feedback.testimonial);
  };

  const saveEdit = () => {
    if (!editingFeedback) return;
    
    const updatedFeedbacks = feedbacks.map(feedback => {
      if (feedback.id === editingFeedback.id) {
        return {
          ...feedback,
          name: newName,
          company: newCompany,
          image: newImage,
          testimonial: newTestimonial
        };
      }
      return feedback;
    });
    
    setFeedbacks(updatedFeedbacks);
    setEditingFeedback(null);
    
    // Reset form
    setNewName('');
    setNewCompany('');
    setNewImage('https://randomuser.me/api/portraits/men/1.jpg');
    setNewTestimonial('');
  };

  const cancelEdit = () => {
    setEditingFeedback(null);
    setNewName('');
    setNewCompany('');
    setNewImage('https://randomuser.me/api/portraits/men/1.jpg');
    setNewTestimonial('');
  };

  return (
    <div className="bg-primary text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin" className="p-2 bg-tertiary rounded-full hover:bg-purple-700 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">Testimonials & Feedbacks Editor</h1>
        </div>
      
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>
            {message.text}
          </div>
        )}
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-tertiary p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-6">
              {editingFeedback ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h2>
          
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-gray-800 p-3 rounded-lg text-white"
                placeholder="John Doe"
              />
            </div>
          
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="company">
                Company
              </label>
              <input
                id="company"
                type="text"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                className="w-full bg-gray-800 p-3 rounded-lg text-white"
                placeholder="ABC Tech"
              />
            </div>
          
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="image">
                Image URL
              </label>
              <input
                id="image"
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="w-full bg-gray-800 p-3 rounded-lg text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="testimonial">
                Testimonial
              </label>
              <textarea
                id="testimonial"
                value={newTestimonial}
                onChange={(e) => setNewTestimonial(e.target.value)}
                className="w-full bg-gray-800 p-3 rounded-lg text-white min-h-32"
                placeholder="Enter the testimonial text here..."
              />
            </div>
          
            <div className="flex justify-end gap-4 mt-6">
              {editingFeedback ? (
                <>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition-colors flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={addFeedback}
                  className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Feedback
                </button>
              )}
            </div>
          </div>
        
          <div className="bg-tertiary p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-6">All Testimonials</h2>
          
            {isLoading ? (
              <div className="text-center py-12 text-gray-400">
                Loading...
              </div>
            ) : (
              feedbacks.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  No testimonials yet. Add your first testimonial.
                </div>
              ) : (
                <div className="space-y-6">
                  {feedbacks.map((feedback) => (
                    <div key={feedback.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={feedback.image}
                            alt={feedback.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-medium">{feedback.name}</h3>
                            <p className="text-indigo-400 text-sm">{feedback.company}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditing(feedback)}
                            className="text-indigo-400 hover:text-indigo-300"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => removeFeedback(feedback.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">{feedback.testimonial}</p>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition-colors flex items-center gap-2"
          >
            <Save size={16} />
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbacksEditor;
