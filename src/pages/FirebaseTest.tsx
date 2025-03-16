import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const FirebaseTest: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const createUser = async () => {
    if (!email || !password) {
      setMessage('Please enter email and password');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setMessage(`User created successfully: ${userCredential.user.email}`);
    } catch (error: any) {
      setMessage(`Error creating user: ${error.code} - ${error.message}`);
      console.error('Firebase error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    if (!email || !password) {
      setMessage('Please enter email and password');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setMessage(`User signed in successfully: ${userCredential.user.email}`);
    } catch (error: any) {
      setMessage(`Error signing in: ${error.code} - ${error.message}`);
      console.error('Firebase error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-6">Firebase Test</h1>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block mb-1 text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
              placeholder="Password (min 6 characters)"
            />
          </div>
        </div>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={createUser}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            {loading ? 'Creating...' : 'Create User'}
          </button>
          <button
            onClick={signIn}
            disabled={loading}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
        
        {message && (
          <div className={`p-3 rounded-md ${message.includes('Error') ? 'bg-red-900' : 'bg-green-900'}`}>
            {message}
          </div>
        )}
        
        <div className="mt-6 text-sm text-gray-400">
          <p>If you see an error about the API key, check the browser console for more details.</p>
          <p className="mt-2">Current configuration being used:</p>
          <pre className="mt-1 p-2 bg-gray-900 rounded overflow-x-auto">
            {JSON.stringify({
              apiKey: "HIDDEN FOR SECURITY", 
              projectId: "nikhilesh-suravarjjala-port"
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default FirebaseTest;
