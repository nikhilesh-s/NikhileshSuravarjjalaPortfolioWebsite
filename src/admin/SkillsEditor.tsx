import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save, X, PenSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getSkills, saveSkills } from '../services/dataService';
import { useFirebaseEditor } from './FirebaseEditorHelper';

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface Category {
  id: string;
  title: string;
}

// Sample skills data
const initialCategories: Category[] = [
  { id: '1', title: 'Frontend Development' },
  { id: '2', title: 'Backend Development' },
  { id: '3', title: 'DevOps & Tools' },
  { id: '4', title: '3D & Graphics' },
  { id: '5', title: 'Leadership & Soft Skills' }
];

const initialSkills: Skill[] = [
  { id: '1', name: 'React', category: '1' },
  { id: '2', name: 'JavaScript', category: '1' },
  { id: '3', name: 'Node.js', category: '2' },
  { id: '4', name: 'Python', category: '2' },
  { id: '5', name: 'Docker', category: '3' },
  { id: '6', name: 'Three.js', category: '4' },
  { id: '7', name: 'Team Leadership', category: '5' }
];

const SkillsEditor = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  
  // Use Firebase editor helper for skills
  const {
    items: skills,
    setItems: setSkills,
    isLoading,
    message,
    setMessage,
    fetchData,
    saveData
  } = useFirebaseEditor<Skill>(
    'portfolio-skills-data',
    getSkills,
    saveSkills,
    initialSkills
  );

  // Load skills data from Firebase or initialize with sample data
  useEffect(() => {
    fetchData();
    
    // For categories, still using localStorage for now
    const savedCategories = localStorage.getItem('portfolio-skill-categories');
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (error) {
        console.error("Failed to parse skill categories", error);
        setCategories(initialCategories);
      }
    } else {
      setCategories(initialCategories);
    }
  }, []);

  // Save all data
  const handleSaveAll = async () => {
    // Save skills to Firebase
    await saveData(skills);
    
    // Save categories to localStorage
    localStorage.setItem('portfolio-skill-categories', JSON.stringify(categories));
    
    setMessage({ text: 'All skills and categories saved successfully!', type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Handle skill form input changes
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingSkill) return;
    
    const { name, value } = e.target;
    setEditingSkill({
      ...editingSkill,
      [name]: value
    });
  };

  // Handle category form input changes
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingCategory) return;
    
    const { name, value } = e.target;
    setEditingCategory({
      ...editingCategory,
      [name]: value
    });
  };

  // Add new skill
  const addSkill = () => {
    setEditingSkill({
      id: Date.now().toString(),
      name: '',
      category: categories.length > 0 ? categories[0].id : '1'
    });
    setIsAddingSkill(true);
  };

  // Add new category
  const addCategory = () => {
    setEditingCategory({
      id: Date.now().toString(),
      title: ''
    });
    setIsAddingCategory(true);
  };

  // Edit existing skill
  const editSkill = (skill: Skill) => {
    setIsAddingSkill(false);
    setEditingSkill({ ...skill });
  };

  // Edit existing category
  const editCategory = (category: Category) => {
    setIsAddingCategory(false);
    setEditingCategory({ ...category });
  };

  // Save the current editing skill
  const saveSkill = () => {
    if (!editingSkill || !editingSkill.name.trim()) {
      setMessage({ text: 'Skill name cannot be empty', type: 'error' });
      return;
    }

    if (isAddingSkill) {
      setSkills([...skills, editingSkill]);
    } else {
      setSkills(skills.map(skill => 
        skill.id === editingSkill.id ? editingSkill : skill
      ));
    }

    setEditingSkill(null);
    setIsAddingSkill(false);
    setMessage({ text: `Skill ${isAddingSkill ? 'added' : 'updated'} successfully!`, type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Save the current editing category
  const saveCategory = () => {
    if (!editingCategory || !editingCategory.title.trim()) {
      setMessage({ text: 'Category title cannot be empty', type: 'error' });
      return;
    }

    if (isAddingCategory) {
      setCategories([...categories, editingCategory]);
    } else {
      setCategories(categories.map(category => 
        category.id === editingCategory.id ? editingCategory : category
      ));
    }

    setEditingCategory(null);
    setIsAddingCategory(false);
    setMessage({ text: `Category ${isAddingCategory ? 'added' : 'updated'} successfully!`, type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Delete a skill
  const deleteSkill = (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      setSkills(skills.filter(skill => skill.id !== id));
      setMessage({ text: 'Skill deleted successfully!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  // Delete a category
  const deleteCategory = (id: string) => {
    // Check if category is in use
    const skillsUsingCategory = skills.filter(skill => skill.category === id);
    
    if (skillsUsingCategory.length > 0) {
      setMessage({ 
        text: `Cannot delete category: ${skillsUsingCategory.length} skills are using this category`, 
        type: 'error' 
      });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      return;
    }
    
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(category => category.id !== id));
      setMessage({ text: 'Category deleted successfully!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  // Cancel editing modes
  const cancelSkillEdit = () => {
    setEditingSkill(null);
    setIsAddingSkill(false);
  };

  const cancelCategoryEdit = () => {
    setEditingCategory(null);
    setIsAddingCategory(false);
  };

  return (
    <div className="min-h-screen bg-primary text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin" className="p-2 bg-tertiary rounded-full hover:bg-purple-700 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">Skills Editor</h1>
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
          <>
            {/* Editing Skill Form */}
            {editingSkill && (
              <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    {isAddingSkill ? 'Add New Skill' : 'Edit Skill'}
                  </h3>
                  <button onClick={cancelSkillEdit} className="p-1 hover:bg-gray-700 rounded-full">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">Skill Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editingSkill.name}
                      onChange={handleSkillChange}
                      className="w-full p-3 bg-primary rounded-lg"
                      placeholder="e.g., React"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      name="category"
                      value={editingSkill.category}
                      onChange={handleSkillChange}
                      className="w-full p-3 bg-primary rounded-lg"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <button
                    onClick={cancelSkillEdit}
                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveSkill}
                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* Editing Category Form */}
            {editingCategory && (
              <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    {isAddingCategory ? 'Add New Category' : 'Edit Category'}
                  </h3>
                  <button onClick={cancelCategoryEdit} className="p-1 hover:bg-gray-700 rounded-full">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Category Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editingCategory.title}
                    onChange={handleCategoryChange}
                    className="w-full p-3 bg-primary rounded-lg"
                    placeholder="e.g., Frontend Development"
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <button
                    onClick={cancelCategoryEdit}
                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveCategory}
                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save
                  </button>
                </div>
              </div>
            )}
            
            {/* Skills List */}
            <div className="bg-tertiary p-6 rounded-xl mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">All Skills</h2>
                <div className="flex gap-2">
                  {!isAddingSkill && !isAddingCategory && (
                    <button
                      onClick={addCategory}
                      className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-2"
                      disabled={isLoading}
                    >
                      <Plus size={16} />
                      Add Category
                    </button>
                  )}
                  {!isAddingSkill && !isAddingCategory && (
                    <button
                      onClick={addSkill}
                      className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-2"
                      disabled={isLoading}
                    >
                      <Plus size={16} />
                      Add Skill
                    </button>
                  )}
                  <button
                    onClick={handleSaveAll}
                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save All
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {categories.map((category) => {
                  const categorySkills = skills.filter(skill => skill.category === category.id);
                  if (categorySkills.length === 0) return null;
                  
                  return (
                    <div key={category.id} className="mb-6">
                      <h3 className="text-lg font-medium mb-3">
                        <div className="flex items-center justify-between">
                          <span>{category.title}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => editCategory(category)}
                              className="p-1 hover:bg-gray-700 rounded-full"
                            >
                              <PenSquare size={14} />
                            </button>
                            <button
                              onClick={() => deleteCategory(category.id)}
                              className="p-1 hover:bg-red-900 rounded-full"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <div key={skill.id} className="bg-gray-800 px-3 py-2 rounded-full flex items-center gap-2">
                            <span>{skill.name}</span>
                            <div className="flex gap-1">
                              <button
                                onClick={() => editSkill(skill)}
                                className="p-1 hover:bg-gray-700 rounded-full"
                              >
                                <PenSquare size={14} />
                              </button>
                              <button
                                onClick={() => deleteSkill(skill.id)}
                                className="p-1 hover:bg-red-900 rounded-full"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                {skills.length === 0 && (
                  <div className="text-center text-gray-400 py-6">
                    No skills found. Click "Add Skill" to create one.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SkillsEditor;
