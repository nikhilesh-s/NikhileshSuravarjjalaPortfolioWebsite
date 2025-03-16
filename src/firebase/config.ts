import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAA_qhMd8ir_Rv0yi1MKGab3I0B6-BNdto",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nikhilesh-suravarjjala-port.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nikhilesh-suravarjjala-port",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nikhilesh-suravarjjala-port.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "830536262241",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:830536262241:web:2e523b7f24624c9e08c020",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-16WFGBBHYR"
};

console.log("Firebase config:", {
  apiKey: firebaseConfig.apiKey ? "Exists" : "Missing",
  authDomain: firebaseConfig.authDomain ? "Exists" : "Missing",
  projectId: firebaseConfig.projectId ? "Exists" : "Missing",
  // Log info without showing actual keys
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { db, auth, analytics };
