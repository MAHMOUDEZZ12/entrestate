
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SensitiveAreaContextType {
  activeHint: string;
  isHintActive: boolean;
  setActiveHint: (hint: string) => void;
  clearActiveHint: () => void;
}

const SensitiveAreaContext = createContext<SensitiveAreaContextType | undefined>(undefined);

export const SensitiveAreaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeHint, setActiveHint] = useState<string>('');
  const [isHintActive, setIsHintActive] = useState(false);

  const setActiveHintHandler = (hint: string) => {
    setActiveHint(hint);
    setIsHintActive(true);
  };

  const clearActiveHintHandler = () => {
    setIsHintActive(false);
    // We don't clear the hint immediately to avoid placeholder text flicker
  };

  const value = {
    activeHint,
    isHintActive,
    setActiveHint: setActiveHintHandler,
    clearActiveHint: clearActiveHintHandler,
  };

  return (
    <SensitiveAreaContext.Provider value={value}>
      {children}
    </SensitiveAreaContext.Provider>
  );
};

export const useSensitiveArea = () => {
  const context = useContext(SensitiveAreaContext);
  if (context === undefined) {
    throw new Error('useSensitiveArea must be used within a SensitiveAreaProvider');
  }
  return context;
};
