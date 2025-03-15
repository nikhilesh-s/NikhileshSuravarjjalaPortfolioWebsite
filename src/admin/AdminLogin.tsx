import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle key press for Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLoginClick();
    }
  };
  
  // Handle login button click
  const handleLoginClick = () => {
    console.log("Login clicked with password:", password);
    
    if (password === 'admin123') {
      console.log("Password is correct, setting token");
      // Set token and force redirect with page reload
      localStorage.setItem('portfolio-admin-token', 'authenticated');
      window.location.href = '/admin';
    } else {
      console.log("Password is incorrect");
      setError('Invalid password. Use "admin123"');
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md">
        <div className="bg-tertiary rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-white mb-8">Admin Login</h2>
          
          {error && (
            <div className="bg-red-800 text-white p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-primary border border-gray-700 text-white p-3 rounded focus:outline-none focus:border-purple-500"
              placeholder="Enter admin password"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              onClick={handleLoginClick}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Sign In
            </button>
          </div>
          
          <div className="text-center mt-6">
            <Link to="/" className="text-purple-400 hover:text-purple-300 text-sm">
              ← Return to Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
