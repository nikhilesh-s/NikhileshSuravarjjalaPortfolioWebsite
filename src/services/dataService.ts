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

export const saveCertifications = (certifications: any[]) => saveData("certifications", certifications);
export const getCertifications = () => getData("certifications");

export const saveJourney = (journey: any[]) => saveData("journey", journey);
export const getJourney = () => getData("journey");

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

export const saveContact = (contact: any) => saveData("contact", [contact]).then(success => success);
export const getContact = async () => {
  const data = await getData("contact");
  return data && data.length > 0 ? data[0] : null;
};

export const saveHero = (hero: any) => saveData("hero", [hero]).then(success => success);
export const getHero = async () => {
  const data = await getData("hero");
  return data && data.length > 0 ? data[0] : null;
};

export const saveFeedbacks = (feedbacks: any[]) => saveData("feedbacks", feedbacks);
export const getFeedbacks = () => getData("feedbacks");

export const saveResume = (resume: any) => saveData("resume", [resume]).then(success => success);
export const getResume = async () => {
  const data = await getData("resume");
  return data && data.length > 0 ? data[0] : null;
};
