import { db } from '../firebase/config';
import { doc, setDoc, getDoc } from "firebase/firestore";

// Generic function to save any collection data
export const saveData = async (collectionName: string, data: any[]) => {
  try {
    console.log(`Saving ${collectionName} data to Firebase:`, data);
    // Store as a single document with an array field for simplicity
    await setDoc(doc(db, "portfolioData", collectionName), { items: data });
    return true;
  } catch (error) {
    console.error(`Error saving ${collectionName} data to Firebase:`, error);
    return false;
  }
};

// Generic function to get collection data
export const getData = async (collectionName: string) => {
  try {
    console.log(`Fetching ${collectionName} data from Firebase...`);
    const docRef = doc(db, "portfolioData", collectionName);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().items;
      console.log(`Firebase ${collectionName} data retrieved successfully:`, data);
      return data;
    } else {
      console.log(`No ${collectionName} document exists in Firebase.`);
      // Document doesn't exist, return empty array
      return [];
    }
  } catch (error) {
    console.error(`Error getting ${collectionName} data from Firebase:`, error);
    return [];
  }
};

// Specific functions for each data type
export const saveTechnologies = (technologies: any[]) => saveData("technologies", technologies);
export const getTechnologies = () => getData("technologies");

export const saveProjects = (projects: any[]) => saveData("projects", projects);
export const getProjects = () => getData("projects");

export const saveExperiences = (experiences: any[]) => saveData("experiences", experiences);
export const getExperiences = () => getData("experiences");

export const saveCertifications = async (certifications: any[]) => {
  try {
    console.log("Saving certifications data to Firebase:", certifications);
    await setDoc(doc(db, "portfolioData", "certifications"), { data: certifications });
    return true;
  } catch (error) {
    console.error("Error saving certifications data to Firebase:", error);
    return false;
  }
};

export const getCertifications = async () => {
  try {
    console.log("Fetching certifications data from Firebase...");
    const docRef = doc(db, "portfolioData", "certifications");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().data;
      console.log("Firebase certifications data retrieved successfully:", data);
      return data;
    } else {
      console.log("No certifications document exists in Firebase.");
      return null;
    }
  } catch (error) {
    console.error("Error getting certifications data from Firebase:", error);
    return null;
  }
};

export const saveJourney = async (journey: any[]) => {
  try {
    console.log("Saving journey data to Firebase:", journey);
    await setDoc(doc(db, "portfolioData", "journey"), { data: journey });
    return true;
  } catch (error) {
    console.error("Error saving journey data to Firebase:", error);
    return false;
  }
};

export const getJourney = async () => {
  try {
    console.log("Fetching journey data from Firebase...");
    const docRef = doc(db, "portfolioData", "journey");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().data;
      console.log("Firebase journey data retrieved successfully:", data);
      return data;
    } else {
      console.log("No journey document exists in Firebase.");
      return null;
    }
  } catch (error) {
    console.error("Error getting journey data from Firebase:", error);
    return null;
  }
};

export const saveSkills = (skills: any[]) => saveData("skills", skills);
export const getSkills = () => getData("skills");

export const saveAbout = async (about: any) => {
  try {
    console.log("Saving about data to Firebase:", about);
    await setDoc(doc(db, "portfolioData", "about"), { data: about });
    return true;
  } catch (error) {
    console.error("Error saving about data to Firebase:", error);
    return false;
  }
};

export const getAbout = async () => {
  try {
    console.log("Fetching about data from Firebase...");
    const docRef = doc(db, "portfolioData", "about");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().data;
      console.log("Firebase about data retrieved successfully:", data);
      return data;
    } else {
      console.log("No about document exists in Firebase.");
      return null;
    }
  } catch (error) {
    console.error("Error getting about data from Firebase:", error);
    return null;
  }
};

export const saveContact = async (contact: any) => {
  try {
    console.log("Saving contact data to Firebase:", contact);
    await setDoc(doc(db, "portfolioData", "contact"), { data: contact });
    return true;
  } catch (error) {
    console.error("Error saving contact data to Firebase:", error);
    return false;
  }
};

export const getContact = async () => {
  try {
    console.log("Fetching contact data from Firebase...");
    const docRef = doc(db, "portfolioData", "contact");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().data;
      console.log("Firebase contact data retrieved successfully:", data);
      return data;
    } else {
      console.log("No contact document exists in Firebase.");
      return null;
    }
  } catch (error) {
    console.error("Error getting contact data from Firebase:", error);
    return null;
  }
};

export const saveHero = async (hero: any) => {
  try {
    console.log("Saving hero data to Firebase:", hero);
    await setDoc(doc(db, "portfolioData", "hero"), { data: hero });
    return true;
  } catch (error) {
    console.error("Error saving hero data to Firebase:", error);
    return false;
  }
};

export const getHero = async () => {
  try {
    console.log("Fetching hero data from Firebase...");
    const docRef = doc(db, "portfolioData", "hero");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().data;
      console.log("Firebase hero data retrieved successfully:", data);
      return data;
    } else {
      console.log("No hero document exists in Firebase.");
      return null;
    }
  } catch (error) {
    console.error("Error getting hero data from Firebase:", error);
    return null;
  }
};

export const saveFeedbacks = async (feedbacks: any[]) => {
  try {
    console.log("Saving feedbacks data to Firebase:", feedbacks);
    await setDoc(doc(db, "portfolioData", "feedbacks"), { data: feedbacks });
    return true;
  } catch (error) {
    console.error("Error saving feedbacks data to Firebase:", error);
    return false;
  }
};

export const getFeedbacks = async () => {
  try {
    console.log("Fetching feedbacks data from Firebase...");
    const docRef = doc(db, "portfolioData", "feedbacks");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().data;
      console.log("Firebase feedbacks data retrieved successfully:", data);
      return data;
    } else {
      console.log("No feedbacks document exists in Firebase.");
      return [];
    }
  } catch (error) {
    console.error("Error getting feedbacks data from Firebase:", error);
    return [];
  }
};

export const saveResume = async (resume: any) => {
  try {
    console.log("Saving resume data to Firebase:", resume);
    await setDoc(doc(db, "portfolioData", "resume"), { data: resume });
    return true;
  } catch (error) {
    console.error("Error saving resume data to Firebase:", error);
    return false;
  }
};

export const getResume = async () => {
  try {
    console.log("Fetching resume data from Firebase...");
    const docRef = doc(db, "portfolioData", "resume");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data().data;
      console.log("Firebase resume data retrieved successfully:", data);
      return data;
    } else {
      console.log("No resume document exists in Firebase.");
      return null;
    }
  } catch (error) {
    console.error("Error getting resume data from Firebase:", error);
    return null;
  }
};
