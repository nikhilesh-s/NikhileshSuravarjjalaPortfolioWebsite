import { db } from '../firebase/config';
import { doc, setDoc, getDoc } from "firebase/firestore";

// Generic function to save any collection data
export const saveData = async (collectionName: string, data: any[]) => {
  try {
    console.log(`Saving ${collectionName} data:`, data);
    // Store as a single document with an array field for simplicity
    await setDoc(doc(db, "portfolioData", collectionName), { items: data });
    // Save to localStorage as well for backup
    localStorage.setItem(`portfolio-${collectionName}`, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${collectionName} data:`, error);
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
      console.log(`Firebase ${collectionName} data:`, data);
      
      // Save to localStorage as backup
      if (data && Array.isArray(data)) {
        localStorage.setItem(`portfolio-${collectionName}`, JSON.stringify(data));
      }
      
      return data;
    } else {
      console.log(`No ${collectionName} document exists in Firebase, checking localStorage...`);
      // Try to get from localStorage
      const localData = localStorage.getItem(`portfolio-${collectionName}`);
      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          console.log(`Using ${collectionName} data from localStorage:`, parsedData);
          return parsedData;
        } catch (e) {
          console.error(`Error parsing ${collectionName} data from localStorage:`, e);
        }
      }
      // Document doesn't exist, return empty array
      return [];
    }
  } catch (error) {
    console.error(`Error getting ${collectionName} data:`, error);
    
    // Try to get from localStorage on error
    console.log(`Trying to get ${collectionName} data from localStorage after Firebase error...`);
    const localData = localStorage.getItem(`portfolio-${collectionName}`);
    if (localData) {
      try {
        const parsedData = JSON.parse(localData);
        console.log(`Using ${collectionName} data from localStorage after Firebase error:`, parsedData);
        return parsedData;
      } catch (e) {
        console.error(`Error parsing ${collectionName} data from localStorage:`, e);
      }
    }
    
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
    console.log("Saving certifications data:", certifications);
    await setDoc(doc(db, "portfolioData", "certifications"), { data: certifications });
    // Save to localStorage as well for backup
    localStorage.setItem('portfolio-certifications', JSON.stringify(certifications));
    return true;
  } catch (error) {
    console.error("Error saving certifications data:", error);
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
      console.log("Firebase certifications data:", data);
      
      // Save to localStorage as backup
      if (data && Array.isArray(data)) {
        localStorage.setItem('portfolio-certifications', JSON.stringify(data));
      }
      
      return data;
    } else {
      console.log("No certifications document exists in Firebase, checking localStorage...");
      // Try to get from localStorage
      const localData = localStorage.getItem('portfolio-certifications');
      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          console.log("Using certifications data from localStorage:", parsedData);
          return parsedData;
        } catch (e) {
          console.error("Error parsing certifications data from localStorage:", e);
        }
      }
      // Document doesn't exist, return null
      return null;
    }
  } catch (error) {
    console.error("Error getting certifications data:", error);
    
    // Try to get from localStorage on error
    console.log("Trying to get certifications data from localStorage after Firebase error...");
    const localData = localStorage.getItem('portfolio-certifications');
    if (localData) {
      try {
        const parsedData = JSON.parse(localData);
        console.log("Using certifications data from localStorage after Firebase error:", parsedData);
        return parsedData;
      } catch (e) {
        console.error("Error parsing certifications data from localStorage:", e);
      }
    }
    
    return null;
  }
};

export const saveJourney = async (journey: any[]) => {
  try {
    console.log("Saving journey data:", journey);
    await setDoc(doc(db, "portfolioData", "journey"), { data: journey });
    // Save to localStorage as well for backup
    localStorage.setItem('portfolio-journey', JSON.stringify(journey));
    return true;
  } catch (error) {
    console.error("Error saving journey data:", error);
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
      console.log("Firebase journey data:", data);
      
      // Save to localStorage as backup
      if (data && Array.isArray(data)) {
        localStorage.setItem('portfolio-journey', JSON.stringify(data));
      }
      
      return data;
    } else {
      console.log("No journey document exists in Firebase, checking localStorage...");
      // Try to get from localStorage
      const localData = localStorage.getItem('portfolio-journey');
      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          console.log("Using journey data from localStorage:", parsedData);
          return parsedData;
        } catch (e) {
          console.error("Error parsing journey data from localStorage:", e);
        }
      }
      // Document doesn't exist, return null
      return null;
    }
  } catch (error) {
    console.error("Error getting journey data:", error);
    
    // Try to get from localStorage on error
    console.log("Trying to get journey data from localStorage after Firebase error...");
    const localData = localStorage.getItem('portfolio-journey');
    if (localData) {
      try {
        const parsedData = JSON.parse(localData);
        console.log("Using journey data from localStorage after Firebase error:", parsedData);
        return parsedData;
      } catch (e) {
        console.error("Error parsing journey data from localStorage:", e);
      }
    }
    
    return null;
  }
};

export const saveSkills = (skills: any[]) => saveData("skills", skills);
export const getSkills = () => getData("skills");

export const saveAbout = async (about: any) => {
  try {
    console.log("Saving about data:", about);
    await setDoc(doc(db, "portfolioData", "about"), { data: about });
    // Save to localStorage as well for backup
    localStorage.setItem('portfolio-about', JSON.stringify(about));
    return true;
  } catch (error) {
    console.error("Error saving about data:", error);
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
      console.log("Firebase about data:", data);
      
      // Save to localStorage as backup
      if (data) {
        localStorage.setItem('portfolio-about', JSON.stringify(data));
      }
      
      return data;
    } else {
      console.log("No about document exists in Firebase, checking localStorage...");
      // Try to get from localStorage
      const localData = localStorage.getItem('portfolio-about');
      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          console.log("Using about data from localStorage:", parsedData);
          return parsedData;
        } catch (e) {
          console.error("Error parsing about data from localStorage:", e);
        }
      }
      // Document doesn't exist, return null
      return null;
    }
  } catch (error) {
    console.error("Error getting about data:", error);
    
    // Try to get from localStorage on error
    console.log("Trying to get about data from localStorage after Firebase error...");
    const localData = localStorage.getItem('portfolio-about');
    if (localData) {
      try {
        const parsedData = JSON.parse(localData);
        console.log("Using about data from localStorage after Firebase error:", parsedData);
        return parsedData;
      } catch (e) {
        console.error("Error parsing about data from localStorage:", e);
      }
    }
    
    return null;
  }
};

export const saveContact = async (contact: any) => {
  try {
    console.log("Saving contact data:", contact);
    await setDoc(doc(db, "portfolioData", "contact"), { data: contact });
    // Save to localStorage as well for backup
    localStorage.setItem('portfolio-contact', JSON.stringify(contact));
    return true;
  } catch (error) {
    console.error("Error saving contact data:", error);
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
      console.log("Firebase contact data:", data);
      
      // Save to localStorage as backup
      if (data) {
        localStorage.setItem('portfolio-contact', JSON.stringify(data));
      }
      
      return data;
    } else {
      console.log("No contact document exists in Firebase, checking localStorage...");
      // Try to get from localStorage
      const localData = localStorage.getItem('portfolio-contact');
      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          console.log("Using contact data from localStorage:", parsedData);
          return parsedData;
        } catch (e) {
          console.error("Error parsing contact data from localStorage:", e);
        }
      }
      // Document doesn't exist, return null
      return null;
    }
  } catch (error) {
    console.error("Error getting contact data:", error);
    
    // Try to get from localStorage on error
    console.log("Trying to get contact data from localStorage after Firebase error...");
    const localData = localStorage.getItem('portfolio-contact');
    if (localData) {
      try {
        const parsedData = JSON.parse(localData);
        console.log("Using contact data from localStorage after Firebase error:", parsedData);
        return parsedData;
      } catch (e) {
        console.error("Error parsing contact data from localStorage:", e);
      }
    }
    
    return null;
  }
};

export const saveHero = async (hero: any) => {
  try {
    console.log("Saving hero data:", hero);
    await setDoc(doc(db, "portfolioData", "hero"), { data: hero });
    // Save to localStorage as well for backup
    localStorage.setItem('portfolio-hero', JSON.stringify(hero));
    return true;
  } catch (error) {
    console.error("Error saving hero data:", error);
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
      console.log("Firebase hero data:", data);
      
      // Save to localStorage as backup
      if (data) {
        localStorage.setItem('portfolio-hero', JSON.stringify(data));
      }
      
      return data;
    } else {
      console.log("No hero document exists in Firebase, checking localStorage...");
      // Try to get from localStorage
      const localData = localStorage.getItem('portfolio-hero');
      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          console.log("Using hero data from localStorage:", parsedData);
          return parsedData;
        } catch (e) {
          console.error("Error parsing hero data from localStorage:", e);
        }
      }
      // Document doesn't exist, return null
      return null;
    }
  } catch (error) {
    console.error("Error getting hero data:", error);
    
    // Try to get from localStorage on error
    console.log("Trying to get hero data from localStorage after Firebase error...");
    const localData = localStorage.getItem('portfolio-hero');
    if (localData) {
      try {
        const parsedData = JSON.parse(localData);
        console.log("Using hero data from localStorage after Firebase error:", parsedData);
        return parsedData;
      } catch (e) {
        console.error("Error parsing hero data from localStorage:", e);
      }
    }
    
    return null;
  }
};

export const saveFeedbacks = async (feedbacks: any[]) => {
  try {
    console.log("Saving feedbacks data:", feedbacks);
    await setDoc(doc(db, "portfolioData", "feedbacks"), { data: feedbacks });
    // Save to localStorage as well for backup
    localStorage.setItem('portfolio-feedbacks', JSON.stringify(feedbacks));
    return true;
  } catch (error) {
    console.error("Error saving feedbacks data:", error);
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
      console.log("Firebase feedbacks data:", data);
      
      // Save to localStorage as backup
      if (data && Array.isArray(data)) {
        localStorage.setItem('portfolio-feedbacks', JSON.stringify(data));
      }
      
      return data;
    } else {
      console.log("No feedbacks document exists in Firebase, checking localStorage...");
      // Try to get from localStorage
      const localData = localStorage.getItem('portfolio-feedbacks');
      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          console.log("Using feedbacks data from localStorage:", parsedData);
          return parsedData;
        } catch (e) {
          console.error("Error parsing feedbacks data from localStorage:", e);
        }
      }
      // Document doesn't exist, return empty array
      return [];
    }
  } catch (error) {
    console.error("Error getting feedbacks data:", error);
    
    // Try to get from localStorage on error
    console.log("Trying to get feedbacks data from localStorage after Firebase error...");
    const localData = localStorage.getItem('portfolio-feedbacks');
    if (localData) {
      try {
        const parsedData = JSON.parse(localData);
        console.log("Using feedbacks data from localStorage after Firebase error:", parsedData);
        return parsedData;
      } catch (e) {
        console.error("Error parsing feedbacks data from localStorage:", e);
      }
    }
    
    return [];
  }
};

export const saveResume = async (resume: any) => {
  try {
    console.log("Saving resume data:", resume);
    await setDoc(doc(db, "portfolioData", "resume"), { data: resume });
    // Save to localStorage as well for backup
    localStorage.setItem('portfolio-resume', JSON.stringify(resume));
    return true;
  } catch (error) {
    console.error("Error saving resume data:", error);
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
      console.log("Firebase resume data:", data);
      
      // Save to localStorage as backup
      if (data) {
        localStorage.setItem('portfolio-resume', JSON.stringify(data));
      }
      
      return data;
    } else {
      console.log("No resume document exists in Firebase, checking localStorage...");
      // Try to get from localStorage
      const localData = localStorage.getItem('portfolio-resume');
      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          console.log("Using resume data from localStorage:", parsedData);
          return parsedData;
        } catch (e) {
          console.error("Error parsing resume data from localStorage:", e);
        }
      }
      // Document doesn't exist, return null
      return null;
    }
  } catch (error) {
    console.error("Error getting resume data:", error);
    
    // Try to get from localStorage on error
    console.log("Trying to get resume data from localStorage after Firebase error...");
    const localData = localStorage.getItem('portfolio-resume');
    if (localData) {
      try {
        const parsedData = JSON.parse(localData);
        console.log("Using resume data from localStorage after Firebase error:", parsedData);
        return parsedData;
      } catch (e) {
        console.error("Error parsing resume data from localStorage:", e);
      }
    }
    
    return null;
  }
};
