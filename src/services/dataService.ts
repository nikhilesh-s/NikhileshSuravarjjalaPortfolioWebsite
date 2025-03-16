import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Projects service
const getProjects = async () => {
  console.log(`[${new Date().toISOString()}] Fetching projects from Firebase...`);
  try {
    // Force cache refresh by using a cache-busting approach
    const docRef = doc(db, "portfolioData", "projects");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().items;
      console.log(`[${new Date().toISOString()}] Projects data retrieved, count:`, data.length);
      
      // Clear any browser cache for this data
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.clear();
          localStorage.removeItem('portfolio-projects');
          console.log("Cleared browser storage to prevent stale data");
        } catch (e) {
          console.warn("Could not clear storage", e);
        }
      }
      
      return data;
    } else {
      console.log(`[${new Date().toISOString()}] No projects document found!`);
      return [];
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching projects:`, error);
    return [];
  }
};

// Generic function to save any collection data
export const saveData = async (collectionName: string, data: any[]) => {
  try {
    console.log(`[${new Date().toISOString()}] Saving ${collectionName} data to Firebase:`, data);
    // Store as a single document with an array field for simplicity
    await setDoc(doc(db, "portfolioData", collectionName), { 
      items: data,
      lastUpdated: new Date().toISOString() 
    });
    return true;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error saving ${collectionName} data to Firebase:`, error);
    return false;
  }
};

// Generic function to get collection data
export const getData = async (collectionName: string) => {
  try {
    console.log(`[${new Date().toISOString()}] Fetching ${collectionName} data from Firebase...`);
    // Force cache refresh by using a cache-busting approach
    const docRef = doc(db, "portfolioData", collectionName);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().items;
      console.log(`[${new Date().toISOString()}] ${collectionName} data retrieved, count:`, data.length);
      
      // Clear any browser cache for this data
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.clear();
          localStorage.removeItem(`portfolio-${collectionName}`);
          console.log("Cleared browser storage to prevent stale data");
        } catch (e) {
          console.warn("Could not clear storage", e);
        }
      }
      
      return data;
    } else {
      console.log(`[${new Date().toISOString()}] No ${collectionName} document found!`);
      return [];
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error getting ${collectionName} data from Firebase:`, error);
    return [];
  }
};

// Specific data service functions using the generic ones
export const saveProjects = async (projects: any[]) => saveData('projects', projects);
export const getExperiences = async () => getData('experiences');
export const saveExperiences = async (experiences: any[]) => saveData('experiences', experiences);

// More specific data functions
export const saveCertifications = async (certifications: any[]) => {
  try {
    console.log(`[${new Date().toISOString()}] Saving certifications data to Firebase:`, certifications);
    await setDoc(doc(db, "portfolioData", "certifications"), { 
      data: certifications,
      lastUpdated: new Date().toISOString() 
    });
    return true;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error saving certifications data to Firebase:`, error);
    return false;
  }
};

export const getCertifications = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Fetching certifications data from Firebase...`);
    const docRef = doc(db, "portfolioData", "certifications");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().data;
      console.log(`[${new Date().toISOString()}] Certifications data retrieved successfully:`, data);
      return data;
    } else {
      console.log(`[${new Date().toISOString()}] No certifications document exists in Firebase.`);
      return null;
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error getting certifications data from Firebase:`, error);
    return null;
  }
};

export const saveJourney = async (journey: any[]) => {
  try {
    console.log(`[${new Date().toISOString()}] Saving journey data to Firebase:`, journey);
    await setDoc(doc(db, "portfolioData", "journey"), { 
      data: journey,
      lastUpdated: new Date().toISOString() 
    });
    return true;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error saving journey data to Firebase:`, error);
    return false;
  }
};

export const getJourney = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Fetching journey data from Firebase...`);
    const docRef = doc(db, "portfolioData", "journey");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().data;
      console.log(`[${new Date().toISOString()}] Journey data retrieved successfully:`, data);
      return data;
    } else {
      console.log(`[${new Date().toISOString()}] No journey document exists in Firebase.`);
      return null;
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error getting journey data from Firebase:`, error);
    return null;
  }
};

export const saveAbout = async (about: any) => {
  try {
    console.log(`[${new Date().toISOString()}] Saving about data to Firebase:`, about);
    await setDoc(doc(db, "portfolioData", "about"), { 
      data: about,
      lastUpdated: new Date().toISOString() 
    });
    return true;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error saving about data to Firebase:`, error);
    return false;
  }
};

export const getAbout = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Fetching about data from Firebase...`);
    const docRef = doc(db, "portfolioData", "about");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().data;
      console.log(`[${new Date().toISOString()}] About data retrieved successfully:`, data);
      return data;
    } else {
      console.log(`[${new Date().toISOString()}] No about document exists in Firebase.`);
      return null;
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error getting about data from Firebase:`, error);
    return null;
  }
};

export const saveContact = async (contact: any) => {
  try {
    console.log(`[${new Date().toISOString()}] Saving contact data to Firebase:`, contact);
    await setDoc(doc(db, "portfolioData", "contact"), { 
      data: contact,
      lastUpdated: new Date().toISOString() 
    });
    return true;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error saving contact data to Firebase:`, error);
    return false;
  }
};

export const getContact = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Fetching contact data from Firebase...`);
    const docRef = doc(db, "portfolioData", "contact");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().data;
      console.log(`[${new Date().toISOString()}] Contact data retrieved successfully:`, data);
      return data;
    } else {
      console.log(`[${new Date().toISOString()}] No contact document exists in Firebase.`);
      return null;
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error getting contact data from Firebase:`, error);
    return null;
  }
};

export const saveHero = async (hero: any) => {
  try {
    console.log(`[${new Date().toISOString()}] Saving hero data to Firebase:`, hero);
    await setDoc(doc(db, "portfolioData", "hero"), { 
      data: hero,
      lastUpdated: new Date().toISOString() 
    });
    return true;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error saving hero data to Firebase:`, error);
    return false;
  }
};

export const getHero = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Fetching hero data from Firebase...`);
    const docRef = doc(db, "portfolioData", "hero");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().data;
      console.log(`[${new Date().toISOString()}] Hero data retrieved successfully:`, data);
      return data;
    } else {
      console.log(`[${new Date().toISOString()}] No hero document exists in Firebase.`);
      return null;
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error getting hero data from Firebase:`, error);
    return null;
  }
};

export const saveFeedbacks = async (feedbacks: any[]) => {
  try {
    console.log(`[${new Date().toISOString()}] Saving feedbacks data to Firebase:`, feedbacks);
    await setDoc(doc(db, "portfolioData", "feedbacks"), { 
      data: feedbacks,
      lastUpdated: new Date().toISOString() 
    });
    return true;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error saving feedbacks data to Firebase:`, error);
    return false;
  }
};

export const getFeedbacks = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Fetching feedbacks data from Firebase...`);
    const docRef = doc(db, "portfolioData", "feedbacks");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().data;
      console.log(`[${new Date().toISOString()}] Feedbacks data retrieved successfully:`, data);
      return data;
    } else {
      console.log(`[${new Date().toISOString()}] No feedbacks document exists in Firebase.`);
      return [];
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error getting feedbacks data from Firebase:`, error);
    return [];
  }
};

export const saveResume = async (resume: any) => {
  try {
    console.log(`[${new Date().toISOString()}] Saving resume data to Firebase:`, resume);
    await setDoc(doc(db, "portfolioData", "resume"), { 
      data: resume,
      lastUpdated: new Date().toISOString() 
    });
    return true;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error saving resume data to Firebase:`, error);
    return false;
  }
};

export const getResume = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Fetching resume data from Firebase...`);
    const docRef = doc(db, "portfolioData", "resume");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().data;
      console.log(`[${new Date().toISOString()}] Resume data retrieved successfully:`, data);
      return data;
    } else {
      console.log(`[${new Date().toISOString()}] No resume document exists in Firebase.`);
      return null;
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error getting resume data from Firebase:`, error);
    return null;
  }
};

export {
  getProjects,
  db,
  auth,
  storage
};
