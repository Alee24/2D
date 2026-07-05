import React, { createContext, useContext, useState, useEffect } from 'react';

interface NavigationContextType {
  currentPath: string;
  navigate: (path: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial path, stripping query strings or hashes for cleaner routing
  const getInitialPath = () => {
    const path = window.location.pathname;
    return path === '' ? '/' : path;
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath());
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
      setCurrentPath(path);
      // Premium smooth scroll behavior on navigation
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPath, navigate, searchQuery, setSearchQuery }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useRouter must be used within a NavigationProvider');
  }
  return context;
};
