import React, { createContext, useContext, useState } from 'react';

interface PerformanceContextType {
  is3DEnabled: boolean;
  disable3D: () => void;
  enable3D: () => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [is3DEnabled, setIs3DEnabled] = useState(true);

  const disable3D = () => setIs3DEnabled(false);
  const enable3D = () => setIs3DEnabled(true);

  return (
    <PerformanceContext.Provider value={{ is3DEnabled, disable3D, enable3D }}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};
