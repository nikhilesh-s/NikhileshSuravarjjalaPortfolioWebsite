import { useState } from 'react';

// Generic Firebase editor helper
export const useFirebaseEditor = <T,>(
  localStorageKey: string,
  firebaseFetch: () => Promise<T[]>,
  firebaseSave: (data: T[]) => Promise<boolean>,
  initialData: T[] = []
) => {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Load data from Firebase and fallback to localStorage
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const firebaseData = await firebaseFetch();
      
      if (firebaseData && firebaseData.length > 0) {
        setItems(firebaseData);
      } else {
        // Fallback to localStorage if no data in Firebase
        const savedData = localStorage.getItem(localStorageKey);
        if (savedData) {
          try {
            setItems(JSON.parse(savedData));
          } catch (error) {
            console.error(`Failed to parse ${localStorageKey} data`, error);
            setItems(initialData);
          }
        } else {
          setItems(initialData);
        }
      }
    } catch (error) {
      console.error(`Error fetching ${localStorageKey} data:`, error);
      // Fallback to localStorage if Firebase fails
      const savedData = localStorage.getItem(localStorageKey);
      if (savedData) {
        try {
          setItems(JSON.parse(savedData));
        } catch (error) {
          console.error(`Failed to parse ${localStorageKey} data`, error);
          setItems(initialData);
        }
      } else {
        setItems(initialData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Save data to Firebase and localStorage
  const saveData = async (newItems: T[]) => {
    setIsLoading(true);
    try {
      const saveSuccess = await firebaseSave(newItems);
      if (saveSuccess) {
        setItems(newItems);
        // Also update localStorage as backup
        localStorage.setItem(localStorageKey, JSON.stringify(newItems));
        setMessage({ 
          text: `Data saved successfully to Firebase!`, 
          type: 'success' 
        });
      } else {
        setMessage({
          text: 'Error saving to Firebase. Changes saved locally only.',
          type: 'error'
        });
        // Still update local state and localStorage
        setItems(newItems);
        localStorage.setItem(localStorageKey, JSON.stringify(newItems));
      }
    } catch (error) {
      console.error(`Error saving ${localStorageKey} data:`, error);
      setMessage({
        text: 'Error saving to Firebase. Changes saved locally only.',
        type: 'error'
      });
      // Still update local state and localStorage
      setItems(newItems);
      localStorage.setItem(localStorageKey, JSON.stringify(newItems));
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
    return newItems;
  };

  return {
    items,
    setItems,
    isLoading,
    setIsLoading,
    message,
    setMessage,
    fetchData,
    saveData
  };
};

// For single item editors (not arrays)
export const useFirebaseSingleItemEditor = <T,>(
  localStorageKey: string,
  firebaseFetch: () => Promise<T | null>,
  firebaseSave: (data: T) => Promise<boolean>,
  initialData: T
) => {
  const [item, setItem] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Load data from Firebase and fallback to localStorage
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const firebaseData = await firebaseFetch();
      
      if (firebaseData) {
        setItem(firebaseData);
      } else {
        // Fallback to localStorage if no data in Firebase
        const savedData = localStorage.getItem(localStorageKey);
        if (savedData) {
          try {
            setItem(JSON.parse(savedData));
          } catch (error) {
            console.error(`Failed to parse ${localStorageKey} data`, error);
            setItem(initialData);
          }
        } else {
          setItem(initialData);
        }
      }
    } catch (error) {
      console.error(`Error fetching ${localStorageKey} data:`, error);
      // Fallback to localStorage if Firebase fails
      const savedData = localStorage.getItem(localStorageKey);
      if (savedData) {
        try {
          setItem(JSON.parse(savedData));
        } catch (error) {
          console.error(`Failed to parse ${localStorageKey} data`, error);
          setItem(initialData);
        }
      } else {
        setItem(initialData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Save data to Firebase and localStorage
  const saveData = async (newItem: T) => {
    setIsLoading(true);
    try {
      const saveSuccess = await firebaseSave(newItem);
      if (saveSuccess) {
        setItem(newItem);
        // Also update localStorage as backup
        localStorage.setItem(localStorageKey, JSON.stringify(newItem));
        setMessage({ 
          text: `Data saved successfully to Firebase!`, 
          type: 'success' 
        });
      } else {
        setMessage({
          text: 'Error saving to Firebase. Changes saved locally only.',
          type: 'error'
        });
        // Still update local state and localStorage
        setItem(newItem);
        localStorage.setItem(localStorageKey, JSON.stringify(newItem));
      }
    } catch (error) {
      console.error(`Error saving ${localStorageKey} data:`, error);
      setMessage({
        text: 'Error saving to Firebase. Changes saved locally only.',
        type: 'error'
      });
      // Still update local state and localStorage
      setItem(newItem);
      localStorage.setItem(localStorageKey, JSON.stringify(newItem));
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
    return newItem;
  };

  return {
    item,
    setItem,
    isLoading,
    setIsLoading,
    message,
    setMessage,
    fetchData,
    saveData
  };
};
