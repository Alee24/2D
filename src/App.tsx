import React, { Component, ErrorInfo, ReactNode } from 'react';
import { NavigationProvider, useRouter } from './context/NavigationContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Workspace from './pages/Workspace';
import Locations from './pages/Locations';
import LocationDetail from './pages/LocationDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import BookTour from './pages/BookTour';
import PrivacyTerms from './pages/PrivacyTerms';
import Pricing from './pages/Pricing';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Secondesk App:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAFAF8] text-[#1D1D1D] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white border border-[#E7E7E7] p-8 rounded-xl shadow-lg space-y-4">
            <h2 className="font-display font-bold text-2xl text-[#00468b]">Secondesk Workspace</h2>
            <p className="font-sans text-sm text-charcoal/70">
              An unexpected issue occurred while rendering this page.
            </p>
            {this.state.error && (
              <pre className="text-[11px] bg-stone-100 p-3 rounded text-left overflow-x-auto text-red-600 font-mono">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="bg-[#00468b] hover:bg-[#E31B23] text-white font-sans text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-all cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

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
    if (currentPath === '/pricing' || currentPath === '/price-list') {
      return <Pricing />;
    }
    if (currentPath === '/locations') {
      return <Locations />;
    }
    if (currentPath.startsWith('/locations/')) {
      return <LocationDetail />;
    }
    if (currentPath === '/about') {
      return <About />;
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
    <ErrorBoundary>
      <NavigationProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </NavigationProvider>
    </ErrorBoundary>
  );
}
