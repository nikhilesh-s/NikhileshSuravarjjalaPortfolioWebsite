import React, { useState } from 'react';
import { createAdminUser } from '../utils/createAdminUser';
import { saveTechnologies } from '../services/dataService';
import { technologies as defaultTechnologies } from '../constants';

const SetupAdmin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      const user = await createAdminUser(email, password);
      setMessage(`Admin user created successfully! User ID: ${user.uid}`);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleInitializeData = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      // Initialize technologies
      await saveTechnologies(defaultTechnologies);
      
      // Initialize projects (if you have default projects)
      // await saveProjects(defaultProjects);
      
      // Initialize experiences (if you have default experiences)
      // await saveExperiences(defaultExperiences);
      
      setMessage('Firebase data initialized successfully!');
    } catch (error: any) {
      setMessage(`Error initializing data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-6">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md mb-6">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Admin Setup</h1>
        
        {message && (
          <div className={`${
            message.includes('Error') ? 'bg-red-500/20 border-red-500' : 'bg-green-500/20 border-green-500'
          } border px-4 py-3 rounded mb-4 text-white`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleCreateAdmin}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Password (min 6 characters)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              minLength={6}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition duration-200 disabled:opacity-50 mb-4"
          >
            {loading ? 'Processing...' : 'Create Admin User'}
          </button>
        </form>
        
        <button
          onClick={handleInitializeData}
          disabled={loading}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Initialize Firebase Data'}
        </button>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-white text-xl font-bold mb-4">Instructions</h2>
        <ol className="text-gray-300 space-y-2 list-decimal pl-5">
          <li>Create your admin user with email and password</li>
          <li>Click "Initialize Firebase Data" to set up default data</li>
          <li>Go to the <a href="/admin/login" className="text-indigo-400 hover:underline">Admin Login</a> page to access your dashboard</li>
          <li>After setup, remove this component from your app</li>
        </ol>
        <p className="mt-4 text-amber-400 text-sm">Important: For security, this setup page should only be used during initial configuration!</p>
      </div>
    </div>
  );
};

export default SetupAdmin;
