import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";

const EnvDebug: React.FC = () => {
  const [envInfo, setEnvInfo] = useState<Record<string, string>>({});
  const [appInitialized, setAppInitialized] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Get all environment variables with VITE prefix
    const envVars = Object.keys(import.meta.env)
      .filter(key => key.startsWith('VITE_'))
      .reduce((obj, key) => {
        // Just show if the variable exists, not its value for security
        obj[key] = import.meta.env[key] ? 'exists' : 'missing';
        return obj;
      }, {} as Record<string, string>);
    
    setEnvInfo(envVars);

    // Try to initialize Firebase with the environment variables
    try {
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
      };
      
      // Check if we have the minimum required config
      if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
        setError('Missing required Firebase configuration. Check environment variables.');
      } else {
        // Only try to initialize if we have the minimum config
        initializeApp(firebaseConfig); // We don't need to use the app variable
        setAppInitialized(true);
      }
    } catch (error: any) {
      setError(error.message);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Environment Variables Debug</h1>
      
      <div className="bg-gray-800 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Firebase Initialization Status</h2>
        {error ? (
          <div className="text-red-400 mb-4">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        ) : (
          <p className={appInitialized ? "text-green-400" : "text-yellow-400"}>
            {appInitialized ? "✅ Firebase initialized successfully" : "⚠️ Firebase not initialized"}
          </p>
        )}
      </div>
      
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
        <div className="grid grid-cols-1 gap-2">
          {Object.keys(envInfo).length === 0 ? (
            <p className="text-yellow-400">No VITE_ environment variables found</p>
          ) : (
            Object.entries(envInfo).map(([key, value]) => (
              <div key={key} className="flex items-start border-b border-gray-700 py-2">
                <div className="font-mono text-blue-400 mr-4">{key}:</div>
                <div className={value === 'exists' ? 'text-green-400' : 'text-red-400'}>
                  {value}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-800 rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Troubleshooting Steps</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Verify that all environment variables are set in Vercel</li>
          <li>Check for typos in the variable names</li>
          <li>Make sure the API key is valid and has not been revoked</li>
          <li>Try refreshing your Firebase configuration in Firebase Console</li>
          <li>Check browser console for more detailed error messages</li>
        </ol>
      </div>
    </div>
  );
};

export default EnvDebug;
