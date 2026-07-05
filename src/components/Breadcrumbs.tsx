import React from 'react';
import { useRouter } from '../context/NavigationContext';
import { locations, workspaceCategories } from '../data/coworkingData';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  activeSubItem?: string; // Optional suffix, e.g. active blog post title
  onClearSubItem?: () => void; // Callback when subitem is dismissed or cleared
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ activeSubItem, onClearSubItem }) => {
  const { currentPath, navigate } = useRouter();

  // If we are on the Home page, don't show breadcrumbs to keep the hero clean
  if (currentPath === '/' || currentPath === '') {
    return null;
  }

  // Parse path segments
  const segments = currentPath.split('/').filter(Boolean);

  // Helper to get friendly names for workspace categories
  const getCategoryName = (slug: string) => {
    const category = workspaceCategories.find(c => c.slug === slug || c.id === slug);
    return category ? category.name : slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  };

  // Helper to get friendly name for locations
  const getLocationName = (id: string) => {
    const loc = locations.find(l => l.id === id);
    return loc ? loc.name : id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' ');
  };

  // Map segment to human-friendly display label and navigate path
  const breadcrumbsList = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`;
    let label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

    // Specific routing replacements
    if (segment === 'workspace') {
      label = 'Workspaces';
    } else if (segment === 'solutions') {
      label = 'Solutions';
    } else if (segment === 'locations') {
      label = 'Locations';
    } else if (segment === 'insights') {
      label = 'Insights & Journal';
    } else if (segment === 'about') {
      label = 'About Us';
    } else if (segment === 'community') {
      label = 'Community Events';
    } else if (segment === 'contact') {
      label = 'Contact';
    } else if (segment === 'book-tour') {
      label = 'Book a Tour';
    } else if (segment === 'privacy') {
      label = 'Privacy Policy';
    } else if (segment === 'terms') {
      label = 'Terms of Service';
    }

    // Dynamic IDs / Slugs parsing
    if (segments[index - 1] === 'locations') {
      label = getLocationName(segment);
    } else if (segments[index - 1] === 'workspace') {
      label = getCategoryName(segment);
    }

    return { label, path, isLast: index === segments.length - 1 && !activeSubItem };
  });

  return (
    <div className="bg-white dark:bg-neutral-900 border-b border-concrete dark:border-neutral-800 py-3 px-6 lg:px-12 w-full transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
        
        {/* Breadcrumb Trail */}
        <nav className="flex items-center flex-wrap gap-1.5 text-charcoal/50 dark:text-neutral-400">
          {/* Home Node */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 hover:text-sand dark:hover:text-sand/90 transition-colors cursor-pointer text-charcoal/70 dark:text-neutral-300"
            aria-label="Home"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">Home</span>
          </button>

          {/* Path Nodes */}
          {breadcrumbsList.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              <ChevronRight className="w-3.5 h-3.5 text-charcoal/30 dark:text-neutral-600 shrink-0" />
              {crumb.isLast ? (
                <span className="text-charcoal dark:text-white font-semibold">
                  {crumb.label}
                </span>
              ) : (
                <button
                  onClick={() => {
                    navigate(crumb.path);
                    if (onClearSubItem) onClearSubItem();
                  }}
                  className="hover:text-sand dark:hover:text-sand/90 transition-colors cursor-pointer font-medium"
                >
                  {crumb.label}
                </button>
              )}
            </React.Fragment>
          ))}

          {/* Active Sub Item (e.g. active post in Insights) */}
          {activeSubItem && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-charcoal/30 dark:text-neutral-600 shrink-0" />
              <span className="text-charcoal dark:text-white font-semibold max-w-[200px] sm:max-w-[350px] truncate" title={activeSubItem}>
                {activeSubItem}
              </span>
            </>
          )}
        </nav>

        {/* Back Link or Action (Optional contextual aid) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (activeSubItem && onClearSubItem) {
                onClearSubItem();
              } else if (segments.length > 1) {
                const parentPath = `/${segments.slice(0, segments.length - 1).join('/')}`;
                navigate(parentPath);
              } else {
                navigate('/');
              }
            }}
            className="text-[10px] font-mono font-bold tracking-widest text-charcoal/40 dark:text-neutral-500 hover:text-sand dark:hover:text-sand/95 uppercase transition-colors flex items-center gap-1 cursor-pointer"
          >
            ← Quick Return
          </button>
        </div>

      </div>
    </div>
  );
};

export default Breadcrumbs;
