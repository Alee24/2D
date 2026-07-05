import React from 'react';
import { useRouter } from '../context/NavigationContext';
import { workspaceCategories } from '../data/coworkingData';
import { Check, ArrowRight, Sparkles, Sliders, Users, DollarSign } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const Workspace: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="bg-offwhite text-charcoal pt-20 animate-fade-in">
      <SEO 
        title="Workspace Solutions & Private Offices"
        description="From flexible hot desks and dedicated workstations to premium private offices and enterprise suites tailored for your business."
      />
      <Breadcrumbs />
      {/* Editorial Hero */}
      <section className="bg-charcoal text-white py-24 lg:py-32 relative overflow-hidden">
        {/* Subtle grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="max-w-[1440px] mx-auto h-full grid grid-cols-4 px-12">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-full border-r border-white/10 last:border-r-0"></div>
            ))}
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">Portfolio of Spaces</span>
            <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              Find Your Ideal <span className="font-serif italic text-sand">Workspace.</span>
            </h1>
            <p className="font-sans text-white/75 text-base sm:text-lg leading-relaxed max-w-xl">
              From plug-and-play hot desks for independent remote creators to secure, customizable multi-floor headquarters for global enterprises.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Listing - Editorial Alternating Split Layout */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-12 space-y-28">
        {workspaceCategories.map((category, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div 
              key={category.id}
              id={category.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
            >
              {/* Image Column */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'} hover-zoom-container bg-concrete border border-concrete/40 shadow-sm`}>
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover hover-zoom-image"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-6 left-6 bg-charcoal text-white px-4 py-2 font-display text-xs font-bold uppercase tracking-widest">
                    Starting from {category.startingPrice}
                  </div>
                </div>
              </div>

              {/* Text Column */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-sand block">
                  {category.tagline}
                </span>
                <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight">
                  {category.name}
                </h2>
                <p className="font-sans text-sm text-charcoal/70 leading-relaxed font-light">
                  {category.longDescription}
                </p>

                {/* Capacity & Core Specs */}
                <div className="py-4 border-t border-b border-concrete flex flex-wrap items-center gap-8 text-xs font-sans text-charcoal/80">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-sand" />
                    <span><strong>Capacity:</strong> {category.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-sand" />
                    <span><strong>Access:</strong> Flexible Terms</span>
                  </div>
                </div>

                {/* Features & Amenities Bullet Grids */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest text-charcoal/40 uppercase mb-3">Included Amenities:</h4>
                    <ul className="space-y-2">
                      {category.amenities.map((amenity, aidx) => (
                        <li key={aidx} className="flex items-start gap-2 text-xs font-sans text-charcoal/70">
                          <Check className="w-3.5 h-3.5 text-sand shrink-0 mt-0.5" />
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest text-charcoal/40 uppercase mb-3">Key Membership Benefits:</h4>
                    <ul className="space-y-2">
                      {category.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start gap-2 text-xs font-sans text-charcoal/70">
                          <Check className="w-3.5 h-3.5 text-charcoal shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                  <button 
                    onClick={() => navigate('/book-tour')}
                    className="w-full sm:w-auto bg-charcoal border border-charcoal text-white hover:bg-sand hover:border-sand hover:text-charcoal font-sans text-xs font-bold uppercase tracking-widest px-8 py-4 transition-all cursor-pointer shadow-md"
                  >
                    Book a Tour
                  </button>
                  <button 
                    onClick={() => navigate('/contact')}
                    className="w-full sm:w-auto bg-transparent border border-concrete hover:border-charcoal text-charcoal font-sans text-xs font-bold uppercase tracking-widest px-8 py-4 transition-all cursor-pointer"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Global Amenities Grid */}
      <section className="bg-white border-t border-concrete py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">World Class Standards</span>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight mb-4">
            Included in Every Agreement
          </h2>
          <p className="font-sans text-sm text-charcoal/60 max-w-xl mx-auto mb-16 leading-relaxed">
            We operate fully serviced environments designed to let you plug and play from day one with absolutely zero setup friction.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-left">
            {[
              { title: 'Redundant Power Backups', desc: 'Auto-transfer diesel generators activate within 3 seconds of grid disruption.' },
              { title: 'Secure Enterprise Fiber', desc: 'Symmetrical high-speed bandwidth from separate top tier ISPs.' },
              { title: 'Mail Handling', desc: 'Secure sorting, scanning, and reception pickup alerts.' },
              { title: 'Barista Service', desc: 'Unlimited specialty espresso, teas, and mineral water.' },
              { title: 'Premium Cleaning', desc: 'Daily dedicated sanitation of all shared facilities, desks, and suites.' },
              { title: 'Community Events', desc: 'Monthly investor breakfasts, networking mixers, and masterclasses.' },
              { title: 'Dedicated App', desc: 'Instantly reserve meeting rooms, print files, or register guests.' },
              { title: '24/7 Security Controls', desc: 'CCTV networks, physical security guards, and biometric access keys.' }
            ].map((amen, idx) => (
              <div key={idx} className="border-l border-sand pl-4 py-2">
                <h4 className="font-display font-semibold text-charcoal text-sm mb-1">{amen.title}</h4>
                <p className="font-sans text-xs text-charcoal/60 leading-relaxed">{amen.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Workspace;
