import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Important: Firebase API keys are meant to be public
// They are restricted by domain in the Firebase Console
// Direct configuration for immediate use
const firebaseConfig = {
  apiKey: "AIzaSyAA_qhMd8ir_Rv0yi1MKGab3I0B6-BNdto",
  authDomain: "nikhilesh-suravarjjala-port.firebaseapp.com",
  projectId: "nikhilesh-suravarjjala-port",
  storageBucket: "nikhilesh-suravarjjala-port.firebasestorage.app",
  messagingSenderId: "830536262241",
  appId: "1:830536262241:web:2e523b7f24624c9e08c020",
  measurementId: "G-16WFGBBHYR"
};

console.log("Firebase initialization with hardcoded config");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { db, auth, analytics };
