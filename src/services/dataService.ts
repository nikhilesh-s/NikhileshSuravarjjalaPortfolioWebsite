import { db } from '../firebase/config';
import { doc, setDoc, getDoc } from "firebase/firestore";

// Generic function to save any collection data
export const saveData = async (collectionName: string, data: any[]) => {
  try {
    // Store as a single document with an array field for simplicity
    await setDoc(doc(db, "portfolioData", collectionName), { items: data });
    return true;
  } catch (error) {
    console.error("Error saving data:", error);
    return false;
  }
};

// Generic function to get collection data
export const getData = async (collectionName: string) => {
  try {
    const docRef = doc(db, "portfolioData", collectionName);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().items;
    } else {
      // Document doesn't exist, return empty array
      return [];
    }
  } catch (error) {
    console.error("Error getting data:", error);
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
    await setDoc(doc(db, "portfolioData", "certifications"), { data: certifications });
    return true;
  } catch (error) {
    console.error("Error saving certifications data:", error);
    return false;
  }
};

export const getCertifications = async () => {
  try {
    const docRef = doc(db, "portfolioData", "certifications");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting certifications data:", error);
    return null;
  }
};

export const saveJourney = async (journey: any[]) => {
  try {
    await setDoc(doc(db, "portfolioData", "journey"), { data: journey });
    return true;
  } catch (error) {
    console.error("Error saving journey data:", error);
    return false;
  }
};

export const getJourney = async () => {
  try {
    const docRef = doc(db, "portfolioData", "journey");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting journey data:", error);
    return null;
  }
};

export const saveSkills = (skills: any[]) => saveData("skills", skills);
export const getSkills = () => getData("skills");

export const saveAbout = async (about: any) => {
  try {
    await setDoc(doc(db, "portfolioData", "about"), { data: about });
    return true;
  } catch (error) {
    console.error("Error saving about data:", error);
    return false;
  }
};

export const getAbout = async () => {
  try {
    const docRef = doc(db, "portfolioData", "about");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting about data:", error);
    return null;
  }
};

export const saveContact = async (contact: any) => {
  try {
    await setDoc(doc(db, "portfolioData", "contact"), { data: contact });
    return true;
  } catch (error) {
    console.error("Error saving contact data:", error);
    return false;
  }
};

export const getContact = async () => {
  try {
    const docRef = doc(db, "portfolioData", "contact");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting contact data:", error);
    return null;
  }
};

export const saveHero = async (hero: any) => {
  try {
    await setDoc(doc(db, "portfolioData", "hero"), { data: hero });
    return true;
  } catch (error) {
    console.error("Error saving hero data:", error);
    return false;
  }
};

export const getHero = async () => {
  try {
    const docRef = doc(db, "portfolioData", "hero");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting hero data:", error);
    return null;
  }
};

export const saveFeedbacks = async (feedbacks: any[]) => {
  try {
    await setDoc(doc(db, "portfolioData", "feedbacks"), { data: feedbacks });
    return true;
  } catch (error) {
    console.error("Error saving feedbacks data:", error);
    return false;
  }
};

export const getFeedbacks = async () => {
  try {
    const docRef = doc(db, "portfolioData", "feedbacks");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error getting feedbacks data:", error);
    return [];
  }
};

export const saveResume = async (resume: any) => {
  try {
    await setDoc(doc(db, "portfolioData", "resume"), { data: resume });
    return true;
  } catch (error) {
    console.error("Error saving resume data:", error);
    return false;
  }
};

export const getResume = async () => {
  try {
    const docRef = doc(db, "portfolioData", "resume");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting resume data:", error);
    return null;
  }
};
