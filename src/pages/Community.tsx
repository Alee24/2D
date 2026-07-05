import React, { useState } from 'react';
import { useRouter } from '../context/NavigationContext';
import { communityEvents } from '../data/coworkingData';
import { Calendar, Users, MapPin, Download, BookOpen, Clock, Heart, Award, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const Community: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [notification, setNotification] = useState<string | null>(null);

  const triggerDownload = (title: string) => {
    setNotification(`Initiated download: ${title}`);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const filteredEvents = selectedType === 'all'
    ? communityEvents
    : communityEvents.filter(e => e.type.toLowerCase().replace(' ', '-') === selectedType);

  const eventTypes = [
    { label: 'All Programs', value: 'all' },
    { label: 'Founder Talks', value: 'founder-talks' },
    { label: 'Investor Meetups', value: 'investor-meetups' },
    { label: 'Workshops', value: 'workshops' },
    { label: 'Community Dinners', value: 'community-dinners' },
  ];

  // Mock download files for business resources
  const businessResources = [
    { title: 'Series Seed Pitch Blueprint', type: 'PDF Template', size: '2.4 MB', desc: 'Pre-vetted pitch slide outline utilized by our scaling startups to secure over $20M in seed funding.' },
    { title: 'Nairobi Corporate Tax Checklist', type: 'KRA Compliance', size: '1.1 MB', desc: 'A complete seasonal breakdown of domestic corporate filings, tax rules, and local VAT updates.' },
    { title: 'Hybrid Team Work Policy Framework', type: 'HR Document', size: '840 KB', desc: 'Modular employee handbook guidelines covering remote workspace safety, legal hours, and data protection.' },
    { title: 'Regional Intellectual Property Guide', type: 'IP Protection', size: '1.8 MB', desc: 'SME instructions for registering trademarks, software patents, and brand assets in East Africa.' },
  ];

  const partners = [
    'AWS Active', 'Stripe Partners', 'Safaricom Spark', 'Antler EA', 'Endeavor Africa', 'Amani Institute', 'Niko Labs'
  ];

  return (
    <div className="bg-offwhite text-charcoal pt-20 animate-fade-in">
      <SEO 
        title="Our Coworking Community & Events"
        description="Join a vibrant community of innovators, founders, and creators in Nairobi. Browse our calendar of weekly networking events, workshops, and business growth resources."
      />
      <Breadcrumbs />
      {/* Editorial Hero */}
      <section className="bg-charcoal text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="max-w-[1440px] mx-auto h-full grid grid-cols-4 px-12">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-full border-r border-white/10 last:border-r-0"></div>
            ))}
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">The Ecosystem</span>
            <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              Our Collaborative <span className="font-serif italic text-sand">Community.</span>
            </h1>
            <p className="font-sans text-white/75 text-base sm:text-lg leading-relaxed max-w-xl">
              Professional development is built directly into our ecosystem. Settle alongside founders, tech executives, and regional creators at curated mixers.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Marquee */}
      <section className="bg-white border-b border-concrete py-8 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-6 justify-between">
          <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal/40 whitespace-nowrap">
            PRE-VETTED ECOSYSTEM ACCELERATOR PARTNERS:
          </span>
          <div className="flex items-center space-x-10 overflow-x-auto scrollbar-none py-1">
            {partners.map((partner, idx) => (
              <span 
                key={idx} 
                className="font-display font-black text-xs tracking-widest text-charcoal/30 hover:text-charcoal/70 transition-colors whitespace-nowrap uppercase"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">The Program</span>
            <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight">
              Professional Events Calendar
            </h2>
            <p className="font-sans text-xs text-charcoal/60 mt-3 leading-relaxed max-w-md">
              We coordinate monthly firesides, networking breakfasts, technical masterclasses, and closed-door corporate dinners designed to spur collaboration.
            </p>
          </div>

          {/* Interactive filter buttons */}
          <div className="flex flex-wrap gap-1.5 bg-white border border-concrete p-1">
            {eventTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-4 py-2 text-xs font-sans transition-all cursor-pointer ${
                  selectedType === type.value
                    ? 'bg-charcoal text-white font-semibold'
                    : 'bg-transparent text-charcoal hover:bg-offwhite/50'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredEvents.map((event) => (
            <div 
              key={event.id}
              className="bg-white border border-concrete hover:border-sand transition-all duration-300 flex flex-col md:flex-row shadow-xs"
            >
              <div className="aspect-square md:w-48 overflow-hidden bg-concrete relative shrink-0">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-charcoal/95 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
                  {event.type}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-charcoal/50 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sand" /> {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sand" /> {event.time}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-charcoal tracking-tight mb-2">
                    {event.title}
                  </h3>
                  <p className="font-sans text-xs text-charcoal/60 line-clamp-3 leading-relaxed mb-4">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-concrete flex items-center justify-between">
                  {event.speaker && (
                    <span className="text-[10px] font-sans text-charcoal/70">
                      <strong>Speaker:</strong> {event.speaker}
                    </span>
                  )}
                  <button 
                    onClick={() => navigate('/book-tour')}
                    className="text-xs font-bold uppercase tracking-wider text-charcoal hover:text-sand inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    Reserve Pass <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Mix Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden mb-16">
          {[
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400'
          ].map((imgUrl, idx) => (
            <div key={idx} className="aspect-[4/3] bg-concrete border border-concrete/40 overflow-hidden hover-zoom-container">
              <img 
                src={imgUrl} 
                alt="Community life" 
                className="w-full h-full object-cover hover-zoom-image"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Member Success Stories */}
      <section className="py-24 bg-white border-t border-b border-concrete">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">Vouched Results</span>
            <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight">
              Member Success Stories
            </h2>
            <p className="font-sans text-xs text-charcoal/60 mt-3 leading-relaxed">
              Read how East African startups, remote engineering cells, and corporate consultants have utilized our premium, managed workspaces to accelerate milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                quote: "Second Desk CBD has been instrumental in our regional deployment. As a financial consultancy, we need secure boardrooms, lightning-fast document printing, and a quiet executive study pod. We got all that under a single, simplified invoice without the operational headache.",
                author: "Muthoni Gathecha",
                role: "Managing Partner",
                company: "Gathecha & Co Legal Advisors",
                image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150"
              },
              {
                quote: "We scaled our remote product engineering squad from 4 to 18 members in six months at Second Desk Westlands. The ability to increase office sizes overnight, without signing multi-year leases or doing complex fitouts, let us preserve precious seed runway and keep engineers fully focused.",
                author: "Tariq Mahmood",
                role: "Co-Founder & CTO",
                company: "LipaByte Fintech",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
              }
            ].map((story, idx) => (
              <div key={idx} className="space-y-6 p-8 border border-concrete bg-offwhite/30 hover:bg-offwhite/50 transition-all">
                <p className="font-serif italic text-base sm:text-lg text-charcoal/85 leading-relaxed">
                  "{story.quote}"
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-concrete">
                  <img 
                    src={story.image} 
                    alt={story.author} 
                    className="w-11 h-11 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display font-semibold text-charcoal text-sm">{story.author}</h4>
                    <p className="font-sans text-[11px] text-charcoal/50">
                      {story.role} at <span className="font-semibold text-charcoal">{story.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Resources Dashboard */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-16">
          <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">Resource Vault</span>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight">
            Corporate Resources & Blueprints
          </h2>
          <p className="font-sans text-xs text-charcoal/60 mt-3 leading-relaxed">
            Exclusive legal agreements, operational checklists, and design blueprints pre-negotiated or compiled by Second Desk advisory managers for members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {businessResources.map((res, idx) => (
            <div key={idx} className="bg-white p-8 border border-concrete hover:border-sand transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-sand/10 border border-sand/30 text-[9px] font-mono font-bold text-charcoal px-2.5 py-1 uppercase tracking-wider">
                    {res.type}
                  </span>
                  <span className="font-mono text-[10px] text-charcoal/40">{res.size}</span>
                </div>
                <h3 className="font-display font-semibold text-charcoal text-base mb-2">{res.title}</h3>
                <p className="font-sans text-xs text-charcoal/60 leading-relaxed mb-6">{res.desc}</p>
              </div>

              <button 
                onClick={() => triggerDownload(res.title)}
                className="w-full bg-offwhite border border-concrete text-charcoal hover:bg-charcoal hover:text-white hover:border-charcoal text-[10px] font-bold uppercase tracking-wider py-3 text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download Document package
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-8 right-8 z-50 bg-white border border-charcoal/10 shadow-lg p-4 max-w-sm flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-forest animate-pulse" />
            <span className="font-sans text-xs text-charcoal font-medium">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Community;
