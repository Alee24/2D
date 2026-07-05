import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'offwhite' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem('seconddesk-theme');
      if (stored === 'dark' || stored === 'offwhite') {
        return stored as Theme;
      }
    } catch (e) {
      // Ignore localStorage read errors
    }
    return 'offwhite';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    
    try {
      localStorage.setItem('seconddesk-theme', theme);
    } catch (e) {
      // Ignore localStorage write errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'offwhite' ? 'dark' : 'offwhite'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
