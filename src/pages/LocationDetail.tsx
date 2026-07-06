import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/NavigationContext';
import { locations, faqs } from '../data/coworkingData';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  MapPin, Phone, Mail, Check, Compass, Sliders, Users, 
  ArrowLeft, ArrowRight, ShieldCheck, Heart, Map, HelpCircle, ChevronDown,
  PenTool, Tv, Presentation, Coffee, Wifi, Utensils, Armchair, Lock, Fingerprint, Wind,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  PenTool,
  Tv,
  Presentation,
  Coffee,
  Wifi,
  Utensils,
  Armchair,
  Lock,
  Fingerprint,
  Wind,
  Users,
  Sliders,
};

export const LocationDetail: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  // Extract location ID from current path (e.g. /locations/westlands -> westlands)
  const pathParts = currentPath.split('/');
  const locationId = pathParts[pathParts.length - 1] || 'westlands';

  const location = locations.find((l) => l.id === locationId) || locations[0];

  // Gallery viewer state
  const [activeImage, setActiveImage] = useState(location.image);

  // Sync active image when location changes
  useEffect(() => {
    setActiveImage(location.image);
  }, [location.image]);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const scrollToAvailability = () => {
    const element = document.getElementById('availability-table');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-offwhite text-charcoal pt-20 animate-fade-in">
      <SEO 
        title={`${location.name} Coworking & Private Offices`}
        description={`Explore SecondDesk ${location.name} in Nairobi. Premium boutique workspace featuring flexible hot desks, dedicated permanent desks, private office suites, and state-of-the-art meeting rooms. Rates starting from ${location.startingPrice}.`}
        ogImage={location.image}
        schemaType="CoworkingSpace"
        schemaData={{
          '@context': 'https://schema.org',
          '@type': 'CoworkingSpace',
          'name': `SecondDesk ${location.name}`,
          'description': `Premium boutique workspace in ${location.name}, Nairobi featuring flexible hot desks, dedicated permanent desks, private office suites, and state-of-the-art meeting rooms.`,
          'image': location.image,
          'url': window.location.origin + window.location.pathname,
          'telephone': location.phone || '+254 700 120 003',
          'email': location.email || 'info@seconddesk.co',
          'priceRange': '$$$',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': location.address,
            'addressLocality': 'Nairobi',
            'addressRegion': 'Nairobi County',
            'addressCountry': 'KE'
          },
          'amenityFeature': location.amenities.map(amenity => ({
            '@type': 'LocationFeatureSpecification',
            'name': amenity,
            'value': true
          }))
        }}
      />
      <Breadcrumbs />

      {/* Hero Header */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end bg-charcoal">
        <div className="absolute inset-0 z-0">
          <img 
            src={location.image} 
            alt={location.name} 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full pb-16">
          <div className="max-w-2xl">
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-2">
              {location.neighborhood}
            </span>
            <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none mb-4">
              Second Desk <span className="font-serif italic text-sand">{location.name}</span>
            </h1>
            <p className="font-sans text-white/80 text-sm sm:text-base max-w-xl">
              {location.address}
            </p>
          </div>
        </div>
      </section>

      {/* Main split grid layout: Core content vs Sticky Booking Card */}
      <section className="py-20 max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side Content Area */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* 1. Availability Table */}
          <div id="availability-table" className="space-y-6 scroll-mt-24">
            <h2 className="font-display font-light text-2xl sm:text-3xl tracking-tight text-charcoal">
              Workspace Availability
            </h2>
            <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">
              Current space availability indices at Second Desk {location.name}. Reach out to lock in standard pricing before seasonal volume caps are triggered.
            </p>
            
            <div className="border border-concrete divide-y divide-concrete bg-white">
              {[
                { name: 'Coworking Hot Pass', capacity: 'Flexible / Hot Desks', rate: 'KES 25,000 / mo', status: 'Immediate Opening' },
                { name: 'Dedicated Desk Room', capacity: 'Permanent Seat', rate: 'KES 38,000 / mo', status: '2 Desks Remaining' },
                { name: 'Private Office Suite', capacity: '2-12 seaters', rate: 'From KES 95,000 / mo', status: 'Low Availability' },
                { name: 'Enterprise Corporate Suite', capacity: '20-100 seats', rate: 'Custom Quote', status: 'Booking Required' },
                { name: 'Meeting & Boardrooms', capacity: '4-20 boardrooms', rate: 'KES 2,500 / hr', status: 'Reserve on App' },
              ].map((row, idx) => (
                <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-offwhite/50 transition-colors">
                  <div>
                    <h4 className="font-display font-semibold text-charcoal text-sm">{row.name}</h4>
                    <span className="font-sans text-xs text-charcoal/40">Ideal for: {row.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-right">
                      <span className="font-mono text-[10px] text-charcoal/40 block uppercase">Standard Rate</span>
                      <span className="font-display font-medium text-xs text-charcoal">{row.rate}</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="text-right">
                        <span className="font-mono text-[10px] text-charcoal/40 block uppercase">Status</span>
                        <span className={`inline-block text-[10px] font-sans px-2.5 py-0.5 font-semibold ${
                          row.status.includes('Remaining') || row.status.includes('Low') 
                            ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}>
                          {row.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions designed for all your needs */}
          <div className="space-y-12 pt-8 border-t border-concrete">
            <div className="max-w-xl">
              <span className="font-sans font-bold text-[10px] tracking-widest uppercase text-sand block mb-2">Bespoke Workspace Environments</span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight leading-tight">
                Solutions designed for all your needs
              </h2>
            </div>

            <div className="space-y-20">
              {/* Meeting Rooms Showcase */}
              {location.meetingRoomDetails && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Left: Image */}
                  <div className="md:col-span-6 aspect-4/3 overflow-hidden border border-concrete hover-zoom-container h-full max-h-[350px]">
                    <img 
                      src={location.meetingRoomDetails.image} 
                      alt="Meeting Room" 
                      className="w-full h-full object-cover hover-zoom-image"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Right: Details */}
                  <div className="md:col-span-6 space-y-6">
                    <h3 className="font-display font-semibold text-2xl text-charcoal">
                      {location.meetingRoomDetails.title}
                    </h3>
                    <div className="space-y-3.5">
                      {location.meetingRoomDetails.features.map((feat, idx) => {
                        const IconComp = iconMap[feat.iconName] || Check;
                        return (
                          <div key={idx} className="flex items-center gap-3 text-charcoal/85">
                            <IconComp className="w-5 h-5 text-charcoal/70 shrink-0" />
                            <span className="font-sans text-xs sm:text-sm font-light leading-snug">{feat.text}</span>
                          </div>
                        );
                      })}
                    </div>
                    <button 
                      onClick={scrollToAvailability}
                      className="bg-sand border border-sand hover:bg-charcoal hover:border-charcoal hover:text-white text-charcoal font-sans text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 transition-all cursor-pointer shadow-sm text-center inline-block"
                    >
                      See Available Options
                    </button>
                  </div>
                </div>
              )}

              {/* Private Offices Showcase */}
              {location.privateOfficeDetails && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
                  {/* Left: Details */}
                  <div className="md:col-span-6 order-2 md:order-1 space-y-6">
                    <h3 className="font-display font-semibold text-2xl text-charcoal">
                      {location.privateOfficeDetails.title}
                    </h3>
                    <div className="space-y-3.5">
                      {location.privateOfficeDetails.features.map((feat, idx) => {
                        const IconComp = iconMap[feat.iconName] || Check;
                        return (
                          <div key={idx} className="flex items-center gap-3 text-charcoal/85">
                            <IconComp className="w-5 h-5 text-charcoal/70 shrink-0" />
                            <span className="font-sans text-xs sm:text-sm font-light leading-snug">{feat.text}</span>
                          </div>
                        );
                      })}
                    </div>
                    <button 
                      onClick={scrollToAvailability}
                      className="bg-sand border border-sand hover:bg-charcoal hover:border-charcoal hover:text-white text-charcoal font-sans text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 transition-all cursor-pointer shadow-sm text-center inline-block"
                    >
                      See Available Options
                    </button>
                  </div>
                  {/* Right: Image */}
                  <div className="md:col-span-6 order-1 md:order-2 aspect-4/3 overflow-hidden border border-concrete hover-zoom-container h-full max-h-[350px]">
                    <img 
                      src={location.privateOfficeDetails.image} 
                      alt="Private Office" 
                      className="w-full h-full object-cover hover-zoom-image"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. Interactive Google Map Embed */}
          <div className="space-y-6">
            <h2 className="font-display font-light text-2xl sm:text-3xl tracking-tight text-charcoal">
              Interactive Google Map
            </h2>
            <div className="aspect-video w-full bg-concrete border border-concrete relative">
              <iframe
                title={`Map layout of Second Desk ${location.name}`}
                src={location.mapEmbedUrl}
                className="w-full h-full"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* 3. Nearby Landmarks & Dining */}
          <div className="space-y-6">
            <h2 className="font-display font-light text-2xl sm:text-3xl tracking-tight text-charcoal">
              Neighborhood & Landmarks
            </h2>
            <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">
              Situated in Nairobi's prime districts, our office footprints are immediately adjacent to high-end dining, shopping centers, hotels, and central transport access.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {location.nearbyLandmarks.map((landmark, idx) => (
                <div key={idx} className="p-4 border border-concrete bg-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-sand/10 flex items-center justify-center text-sand shrink-0">
                    <MapPin className="w-4 h-4 text-charcoal" />
                  </div>
                  <span className="font-sans text-xs text-charcoal/80 font-medium">{landmark}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Modular Amenities Showcase */}
          <div className="space-y-6">
            <h2 className="font-display font-light text-2xl sm:text-3xl tracking-tight text-charcoal">
              Site Amenities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {location.amenities.map((amen, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-sand shrink-0 mt-0.5" />
                  <span className="font-sans text-xs text-charcoal/80 leading-normal">{amen}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Custom Gallery Viewer */}
          <div className="space-y-6">
            <h2 className="font-display font-light text-2xl sm:text-3xl tracking-tight text-charcoal">
              Workspace Gallery
            </h2>
            <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">
              Actual architectural photography of shared spaces, boardrooms, private wings, and social cafes inside {location.name}.
            </p>
            <div className="space-y-4">
              {/* Large Selected View */}
              <div className="aspect-video w-full bg-concrete overflow-hidden border border-concrete/40">
                <img 
                  src={activeImage} 
                  alt="Selected interior view" 
                  className="w-full h-full object-cover transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Thumbnails Row */}
              <div className="grid grid-cols-3 gap-4">
                {location.gallery.map((imgUrl, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`aspect-[4/3] bg-concrete overflow-hidden cursor-pointer border transition-all ${
                      activeImage === imgUrl ? 'border-sand ring-2 ring-sand/20' : 'border-concrete hover:border-sand'
                    }`}
                  >
                    <img 
                      src={imgUrl} 
                      alt={`Interior thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. Local FAQs */}
          <div className="space-y-6">
            <h2 className="font-display font-light text-2xl sm:text-3xl tracking-tight text-charcoal">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 divide-y divide-concrete">
              {faqs.map((faq, idx) => (
                <div key={idx} className="pt-4 first:pt-0">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left py-2 font-display font-semibold text-charcoal text-sm hover:text-sand transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-sand transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="p-4 bg-white/40 border-l border-sand mt-2">
                      <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side Sticky Booking Card */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start bg-white border border-concrete p-8 shadow-xs space-y-6">
          <div className="border-b border-concrete pb-4 text-center lg:text-left">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-sand block mb-1">Schedule a Visit</span>
            <h3 className="font-display font-semibold text-xl text-charcoal">Book an Architectural Tour</h3>
            <p className="font-sans text-xs text-charcoal/60 mt-1 leading-normal">
              Tour our modern interiors, check desk setups, test high-speed fiber internet, and consult on custom layouts.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Selected Node</span>
              <span className="font-display font-semibold text-charcoal text-sm bg-offwhite px-3 py-2 border border-concrete flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sand" /> Second Desk {location.name}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Includes</span>
              <ul className="space-y-2 text-xs font-sans text-charcoal/70 pt-1">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-sand" /> 1-on-1 space consultation
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-sand" /> Complementary Day Pass
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-sand" /> Artisanal Barista espresso flight
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => navigate('/book-tour')}
            className="w-full bg-charcoal border border-charcoal hover:bg-sand hover:border-sand hover:text-charcoal text-white font-sans text-xs font-bold uppercase tracking-widest py-4 transition-all cursor-pointer shadow-md text-center inline-block uppercase"
          >
            Schedule Tour Now
          </button>

          <div className="pt-4 border-t border-concrete/60 text-center">
            <span className="text-[10px] text-charcoal/40 font-sans block mb-1">Direct Location Inquiries</span>
            <span className="text-xs font-mono text-charcoal font-semibold block">{location.phone}</span>
            <span className="text-xs font-sans text-charcoal/60 block">{location.email}</span>
          </div>
        </div>

      </section>
    </div>
  );
};
export default LocationDetail;
