import React, { createContext, useContext, useState } from 'react';

type HealthDataContextType = {
  healthData: any;
  setHealthData: React.Dispatch<React.SetStateAction<any>>;
};

const HealthDataContext = createContext<HealthDataContextType | undefined>(undefined);

export const HealthDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [healthData, setHealthData] = useState({});

  return (
    <HealthDataContext.Provider value={{ healthData, setHealthData }}>
      {children}
    </HealthDataContext.Provider>
  );
};

export const useHealthData = () => {
  const context = useContext(HealthDataContext);
  if (!context) {
    throw new Error('useHealthData must be used within a HealthDataProvider');
  }
  return context;
};
