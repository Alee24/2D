import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  canonicalPath?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = 'coworking Nairobi, shared offices Westlands, private office Karen, meeting rooms Kilimani, business lounge Nairobi, virtual office Kenya, SecondDesk',
  ogType = 'website',
  ogImage = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
  canonicalPath,
}) => {
  useEffect(() => {
    // 1. Update document title
    const fullTitle = `${title} | SecondDesk`;
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (name: string, value: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // 2. Update standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // 3. Update Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);
    
    const currentUrl = window.location.origin + (canonicalPath || window.location.pathname);
    updateMetaTag('og:url', currentUrl, true);

    // 4. Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // 5. Update canonical link tag
    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

  }, [title, description, keywords, ogType, ogImage, canonicalPath]);

  return null; // This component doesn't render any visible UI
};

export default SEO;
