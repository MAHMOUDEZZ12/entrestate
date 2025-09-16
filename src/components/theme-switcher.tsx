
'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Laptop, Bot } from 'lucide-react';

export const themes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Laptop },
  { value: 'theme-pinkpurple', label: 'Pink/Purple', icon: Bot },
];

export function useTheme() {
  const [theme, setThemeState] = useState('system');

  // Effect to set the initial theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes.some(t => t.value === savedTheme)) {
      setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: string) => {
    localStorage.setItem('theme', newTheme);
    setThemeState(newTheme);
  };
  
  // Effect to apply the theme class to the <html> element
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all possible theme classes
    themes.forEach(t => {
      if (t.value !== 'system') {
        root.classList.remove(t.value);
      }
    });
    root.classList.remove('light', 'dark');

    let activeTheme = theme;
    if (theme === 'system') {
      activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    root.classList.add(activeTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (localStorage.getItem('theme') === 'system') {
        const newActiveTheme = mediaQuery.matches ? 'dark' : 'light';
        root.classList.remove('light', 'dark');
        root.classList.add(newActiveTheme);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);

  }, [theme]);

  return { theme, setTheme, themes };
}
