import React from 'react';
import { NavigationProvider, useRouter } from './context/NavigationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Workspace from './pages/Workspace';
import Solutions from './pages/Solutions';
import Locations from './pages/Locations';
import LocationDetail from './pages/LocationDetail';
import Community from './pages/Community';
import About from './pages/About';
import Insights from './pages/Insights';
import Contact from './pages/Contact';
import BookTour from './pages/BookTour';
import PrivacyTerms from './pages/PrivacyTerms';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  // Route matcher for premium SEO urls
  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <Home />;
    }
    if (currentPath === '/workspace') {
      return <Workspace />;
    }
    if (currentPath === '/solutions') {
      return <Solutions />;
    }
    if (currentPath === '/locations') {
      return <Locations />;
    }
    if (currentPath.startsWith('/locations/')) {
      return <LocationDetail />;
    }
    if (currentPath === '/community') {
      return <Community />;
    }
    if (currentPath === '/about') {
      return <About />;
    }
    if (currentPath === '/insights') {
      return <Insights />;
    }
    if (currentPath === '/contact') {
      return <Contact />;
    }
    if (currentPath === '/book-tour') {
      return <BookTour />;
    }
    if (currentPath === '/privacy' || currentPath === '/terms') {
      return <PrivacyTerms />;
    }

    // Default graceful fallback to Home dashboard
    return <Home />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-offwhite selection:bg-sand selection:text-charcoal antialiased">
      <Header />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
