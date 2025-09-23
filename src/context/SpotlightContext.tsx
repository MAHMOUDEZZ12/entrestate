
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Feature } from '@/lib/tools-client';

interface SpotlightContextType {
  spotlightedApp: Feature | null;
  setSpotlight: (app: Feature) => void;
  clearSpotlight: () => void;
}

const SpotlightContext = createContext<SpotlightContextType | undefined>(undefined);

export const SpotlightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [spotlightedApp, setSpotlightedApp] = useState<Feature | null>(null);

  const setSpotlight = (app: Feature) => {
    setSpotlightedApp(app);
  };

  const clearSpotlight = () => {
    setSpotlightedApp(null);
  };

  const value = {
    spotlightedApp,
    setSpotlight,
    clearSpotlight,
  };

  return (
    <SpotlightContext.Provider value={value}>
      {children}
    </SpotlightContext.Provider>
  );
};

export const useSpotlight = () => {
  const context = useContext(SpotlightContext);
  if (context === undefined) {
    throw new Error('useSpotlight must be used within a SpotlightProvider');
  }
  return context;
};
