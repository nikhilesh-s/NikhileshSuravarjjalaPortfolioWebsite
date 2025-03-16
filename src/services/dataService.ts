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

// Add more specific functions as needed for other data types
