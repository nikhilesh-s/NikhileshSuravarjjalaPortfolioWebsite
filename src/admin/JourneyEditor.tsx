import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const [journeyItems, setJourneyItems] = useState<JourneyItem[]>([]);
  const [editingItem, setEditingItem] = useState<JourneyItem | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Load journey data from local storage or initialize with sample data
  useEffect(() => {
    const savedData = localStorage.getItem('portfolio-journey-data');
    if (savedData) {
      try {
        setJourneyItems(JSON.parse(savedData));
      } catch (error) {
        console.error("Failed to parse journey data", error);
        setJourneyItems(initialJourneyData);
      }
    } else {
      setJourneyItems(initialJourneyData);
    }
  }, []);

  // Save changes to local storage
  const saveData = () => {
    localStorage.setItem('portfolio-journey-data', JSON.stringify(journeyItems));
    setMessage({ text: 'Journey timeline saved successfully!', type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Handle edit form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingItem) return;
    
    const { name, value } = e.target;
    setEditingItem({
      ...editingItem,
      [name]: value
    });
  };

  // Add new journey item
  const addItem = () => {
    setIsAddMode(true);
    setEditingItem({
      id: Date.now().toString(),
      title: '',
      subtitle: '',
      description: '',
      date: '',
      category: 'work',
      iconBg: '#1d1836'
    });
  };

  // Edit existing journey item
  const editItem = (item: JourneyItem) => {
    setIsAddMode(false);
    setEditingItem({ ...item });
  };

  // Save the current editing item
  const saveItem = () => {
    if (!editingItem) return;

    if (isAddMode) {
      setJourneyItems([...journeyItems, editingItem]);
    } else {
      setJourneyItems(journeyItems.map(item => 
        item.id === editingItem.id ? editingItem : item
      ));
    }

    setEditingItem(null);
    setMessage({ text: `Journey item ${isAddMode ? 'added' : 'updated'} successfully!`, type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Delete a journey item
  const deleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this journey item?')) {
      setJourneyItems(journeyItems.filter(item => item.id !== id));
      setMessage({ text: 'Journey item deleted successfully!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  // Cancel editing mode
  const cancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <div className="bg-primary text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin" className="p-2 bg-tertiary rounded-full hover:bg-purple-700 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">Edit My Journey</h1>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>
            {message.text}
          </div>
        )}

        {editingItem ? (
          <div className="bg-tertiary p-6 rounded-xl mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{isAddMode ? 'Add New Journey Item' : 'Edit Journey Item'}</h2>
              <button onClick={cancelEdit} className="p-2 hover:bg-gray-700 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editingItem.title}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-primary rounded-lg"
                  placeholder="e.g., Computer Science Degree"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={editingItem.subtitle}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-primary rounded-lg"
                  placeholder="e.g., Stanford University"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="text"
                  name="date"
                  value={editingItem.date}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-primary rounded-lg"
                  placeholder="e.g., 2018 - 2022"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={editingItem.category}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-primary rounded-lg"
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={editingItem.description}
                onChange={handleInputChange}
                className="w-full p-3 bg-primary rounded-lg h-32"
                placeholder="Describe this journey milestone..."
              />
            </div>
            
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveItem}
                className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-2"
              >
                <Save size={18} />
                Save Item
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={addItem}
            className="mb-8 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Add New Journey Item
          </button>
        )}
        
        <div className="bg-tertiary p-6 rounded-xl mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Journey Timeline Items</h2>
            <button
              onClick={saveData}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
            >
              <Save size={18} />
              Save All Changes
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-3">Title</th>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {journeyItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-800">
                    <td className="p-3">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-400">{item.subtitle}</div>
                    </td>
                    <td className="p-3">{item.date}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => editItem(item)}
                          className="p-2 bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="p-2 bg-red-900 rounded-lg hover:bg-red-800 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {journeyItems.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-3 text-center text-gray-400">
                      No journey items found. Click "Add New Journey Item" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-tertiary p-6 rounded-xl mb-8">
          <h2 className="text-xl font-bold mb-4">Tips for Your Journey Timeline</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Create a chronological sequence of events that tell your story</li>
            <li>Use descriptive titles and detailed descriptions</li>
            <li>Include a mix of education, work experience, projects, and personal achievements</li>
            <li>Dates can be specific years or ranges like "2018 - 2020"</li>
            <li>All changes are saved to browser storage - they will persist on your device</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JourneyEditor;
