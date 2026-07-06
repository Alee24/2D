import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  canonicalPath?: string;
  schemaType?: 'CoworkingSpace' | 'BlogPosting' | 'FAQPage' | 'Organization';
  schemaData?: any;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = 'coworking Nairobi, shared offices Westlands, private office Karen, meeting rooms Kilimani, business lounge Nairobi, virtual office Kenya, SecondDesk, boutique workspace East Africa',
  ogType = 'website',
  ogImage = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
  canonicalPath,
  schemaType,
  schemaData,
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

    // 6. Generate and Inject Dynamic JSON-LD Structured Data
    let jsonLdScript = document.head.querySelector('script[id="seconddesk-jsonld"]') as HTMLScriptElement;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'seconddesk-jsonld';
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }

    let resolvedSchema: any = null;

    // Decide what schema to render
    if (schemaType && schemaData) {
      resolvedSchema = schemaData;
    } else {
      // Auto-detect schema based on URL / page context
      const path = window.location.pathname;

      if (path.includes('/insights') && (title !== 'Workspace Insights & Business Trends' && title !== 'Insights & Journal')) {
        // Looks like an individual blog post detail
        resolvedSchema = {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          'headline': title,
          'description': description,
          'image': ogImage,
          'author': {
            '@type': 'Organization',
            'name': 'SecondDesk Team',
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'SecondDesk',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200',
            },
          },
          'datePublished': new Date().toISOString().split('T')[0], // Fallback date
          'mainEntityOfPage': currentUrl,
        };
      } else if (path.includes('/locations/') || title.includes('SecondDesk ') || (title.includes('Location') && title !== 'Premium Coworking & Private Office Locations in Nairobi')) {
        // Looks like an individual location detail page
        resolvedSchema = {
          '@context': 'https://schema.org',
          '@type': 'CoworkingSpace',
          'name': `${title} | SecondDesk`,
          'description': description,
          'image': ogImage,
          'url': currentUrl,
          'telephone': '+254 700 120 003', // general office phone
          'priceRange': '$$$',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': title.includes('Westlands') ? 'Westlands Road' : title.includes('Karen') ? 'Ngong Road' : 'Nairobi',
            'addressLocality': 'Nairobi',
            'addressCountry': 'KE',
          },
        };
      } else {
        // Fallback to standard Corporate CoworkingSpace schema for the brand
        resolvedSchema = {
          '@context': 'https://schema.org',
          '@type': 'CoworkingSpace',
          '@id': 'https://seconddesk.co/#organization',
          'name': 'SecondDesk',
          'url': 'https://seconddesk.co',
          'logo': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200',
          'image': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
          'description': description,
          'telephone': '+254 700 120 003',
          'priceRange': '$$$',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Nairobi Commercial Hubs',
            'addressLocality': 'Nairobi',
            'addressCountry': 'KE',
          },
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': '-1.2921',
            'longitude': '36.8219',
          },
          'openingHoursSpecification': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
            ],
            'opens': '07:30',
            'closes': '19:00',
          },
        };
      }
    }

    if (resolvedSchema) {
      jsonLdScript.textContent = JSON.stringify(resolvedSchema, null, 2);
    }

  }, [title, description, keywords, ogType, ogImage, canonicalPath, schemaType, schemaData]);

  return null; // This component doesn't render any visible UI
};

export default SEO;
