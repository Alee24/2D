import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/NavigationContext';
import { workspaceCategories, locations, testimonials } from '../data/coworkingData';
import { SEO } from '../components/SEO';
import { 
  ArrowRight, Check, Compass, Users, Sparkles, MapPin, 
  Wifi, Shield, Coffee, FileText, Smartphone, Calendar, 
  ChevronLeft, ChevronRight, HelpCircle, Activity, Award,
  Download
} from 'lucide-react';
import { generateBrochurePDF } from '../utils/pdfGenerator';
import { motion, AnimatePresence } from 'motion/react';

export const Home: React.FC = () => {
  const { navigate } = useRouter();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadBrochure = () => {
    setIsDownloading(true);
    setDownloadSuccess(false);
    setTimeout(() => {
      try {
        generateBrochurePDF();
        setDownloadSuccess(true);
      } catch (err) {
        console.error('Failed to generate PDF brochure', err);
      } finally {
        setIsDownloading(false);
        setTimeout(() => setDownloadSuccess(false), 4000);
      }
    }, 1200);
  };

  // Statistics counters simulation
  const [stats, setStats] = useState({
    members: 0,
    offices: 0,
    rooms: 0,
    locations: 0,
    satisfaction: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        const next = { ...prev };
        let updated = false;

        if (next.members < 500) { next.members += 10; updated = true; }
        if (next.offices < 40) { next.offices += 1; updated = true; }
        if (next.rooms < 12) { next.rooms += 1; updated = true; }
        if (next.locations < 5) { next.locations += 1; updated = true; }
        if (next.satisfaction < 98) { next.satisfaction += 2; updated = true; }

        if (!updated) clearInterval(interval);
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Why Second Desk array
  const coreAmenities = [
    { title: 'Flexible Membership', icon: Compass, desc: 'Agile month-to-month contracts designed to scale with your team.' },
    { title: '24/7 Secure Access', icon: Shield, desc: 'State-of-the-art secure biometric access to keep you creating round the clock.' },
    { title: 'High-Speed Internet', icon: Wifi, desc: '99.9% redundant fiber optic internet with dual automatic backup power.' },
    { title: 'Business Address', icon: MapPin, desc: 'A prestigious physical address for mail receiving, local registration and brand prestige.' },
    { title: 'Printing Services', icon: FileText, desc: 'Secure, high-volume document scanning and industrial black & white or color printing.' },
    { title: 'Reception Services', icon: Users, desc: 'Our front-of-house team welcomes guests, manages mail, and assists with administrative requests.' },
    { title: 'Coffee & Refreshments', icon: Coffee, desc: 'Unlimited fresh hot espresso and specialty local teas brewed by professional baristas.' },
    { title: 'Networking Events', icon: Calendar, desc: 'Curated breakfast mixers, panels, and investor roundtables tailored to Nairobi professionals.' },
    { title: 'Community Support', icon: Sparkles, desc: 'Our local managers keep operations running seamlessly so you focus on results.' },
  ];

  // Membership Benefits items (two column layout)
  const benefits = [
    { title: 'Business growth support', desc: 'Direct access to regional venture scale advisors, marketing mentors, and professional corporate services.' },
    { title: 'Professional networking', desc: 'Settle beside top founders, software engineers, and global consultants in collaborative workspaces.' },
    { title: 'Exclusive discounts & perks', desc: 'Pre-negotiated partner perks spanning premium cloud credits, legal filings, and lifestyle wellness hubs.' },
    { title: 'Priority event access', desc: 'Complimentary reserved slots at all masterclasses, founder fireside panels, and seasonal social dinners.' },
    { title: 'Reciprocal global network', desc: 'Enjoy full hot desk booking access in any Second Desk location globally during your business travel.' },
    { title: 'Premium mail handling', desc: 'Digital scanning, cataloging, and mail arrival push-text alerts handled securely by reception.' },
    { title: 'Mentorship connection', desc: 'Participate in our peer-led masterminds and connect with veteran capital leads and industry specialists.' },
    { title: 'Seamless operations', desc: 'Dedicated cleaning, high-speed power redundancy, and on-site hospitality managers handling the heavy lifting.' },
  ];

  const trustLogos = [
    'METRIC', 'LUMEN.AI', 'TECTONIC', 'APEX LABS', 'VERDANT', 'COBALT CO', 'KINETIC', 'SURAGE'
  ];

  return (
    <div className="bg-offwhite text-charcoal animate-fade-in">
      <SEO 
        title="Bespoke Coworking & Private Offices in Nairobi"
        description="Experience premier, design-led coworking spaces, executive private offices, and state-of-the-art meeting rooms across Nairobi's most prestigious districts."
      />
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-charcoal">
        {/* Parallax background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920" 
            alt="Second Desk Coworking Environment" 
            className="w-full h-full object-cover opacity-45 scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full text-center md:text-left pt-20">
          <div className="max-w-4xl">
            <span className="font-sans font-semibold text-xs tracking-[0.3em] uppercase text-sand inline-block mb-4 animate-slide-up">
              Second Desk — Nairobi, Kenya
            </span>
            <h1 className="font-display font-light text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white mb-6 leading-[1.05] animate-slide-up animate-delay-100">
              Your Best Work <br className="hidden md:block"/>
              <span className="font-serif italic font-normal text-sand">Starts Here.</span>
            </h1>
            <p className="font-sans text-white/80 text-base sm:text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed font-light animate-slide-up animate-delay-200">
              Flexible coworking spaces, private offices, meeting rooms and business services designed for ambitious professionals and growing teams.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up animate-delay-300">
              <button 
                onClick={() => navigate('/book-tour')}
                className="w-full sm:w-auto bg-sand border border-sand text-charcoal hover:bg-white hover:border-white font-sans text-xs font-bold uppercase tracking-widest px-8 py-4.5 transition-all cursor-pointer shadow-lg"
              >
                Book a Tour
              </button>
              <button 
                onClick={() => navigate('/workspace')}
                className="w-full sm:w-auto border border-white/30 text-white hover:bg-white hover:text-charcoal font-sans text-xs font-bold uppercase tracking-widest px-8 py-4.5 transition-all cursor-pointer"
              >
                Explore Spaces
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40">
          <span className="font-mono text-[9px] uppercase tracking-widest">Scroll to explore</span>
          <div className="w-1.5 h-10 border border-white/20 rounded-full p-0.5 flex justify-center">
            <div className="w-0.5 h-2 bg-sand rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* 2. TRUST LOGOS */}
      <section className="bg-white border-b border-concrete py-10 overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-6 md:gap-12 justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-charcoal/40 whitespace-nowrap">
            COMPANIES WORKING FROM SECOND DESK:
          </span>
          {/* Logo Strip ticker marquee style */}
          <div className="flex items-center space-x-12 overflow-x-auto scrollbar-none py-2 w-full md:w-auto justify-start md:justify-end">
            {trustLogos.map((logo, idx) => (
              <span 
                key={idx} 
                className="font-display font-black text-sm tracking-[0.25em] text-charcoal/30 hover:text-charcoal/70 transition-colors whitespace-nowrap"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WORKSPACE SOLUTIONS SECTION */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-12 border-b border-concrete">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-4">
          <div>
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">Our Offerings</span>
            <h2 className="font-display font-light text-3xl sm:text-5xl text-charcoal tracking-tight">
              Workspace Solutions Built <br/>for <span className="font-serif italic text-charcoal/60">Productivity.</span>
            </h2>
          </div>
          <p className="font-sans text-sm text-charcoal/60 max-w-md leading-relaxed">
            Select an environment optimized perfectly for your current rhythm of work—whether you require extreme focus, collaborative synergy, or prestigious reception.
          </p>
        </div>

        {/* 4 Large image cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workspaceCategories.slice(0, 4).map((space) => (
            <div 
              key={space.id}
              onClick={() => navigate('/workspace')}
              className="bg-white border border-concrete hover:border-sand transition-all duration-500 overflow-hidden group cursor-pointer shadow-xs"
            >
              <div className="aspect-video overflow-hidden relative bg-concrete">
                <img 
                  src={space.image} 
                  alt={space.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-charcoal text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-md">
                  Starting at {space.startingPrice}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold text-xl text-charcoal tracking-tight group-hover:text-sand transition-colors">
                    {space.name}
                  </h3>
                  <span className="font-sans text-xs text-charcoal/40 font-medium">Capacity: {space.capacity}</span>
                </div>
                <p className="font-sans text-sm text-charcoal/60 mb-6 leading-relaxed">
                  {space.description}
                </p>
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:text-sand flex items-center gap-1.5 transition-colors">
                  Learn More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY SECOND DESK SECTION */}
      <section className="py-24 bg-white border-b border-concrete">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">Why Second Desk</span>
            <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight">
              Designed for Uninterrupted Focus
            </h2>
            <p className="font-sans text-sm text-charcoal/60 mt-4 leading-relaxed">
              We focus entirely on regional operational excellence and pristine spatial design, so you and your team can focus purely on executing your mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreAmenities.map((amenity, idx) => (
              <div 
                key={idx}
                className="p-8 border border-concrete hover:border-sand bg-offwhite/30 hover:bg-white transition-all duration-300 flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-none border border-concrete flex items-center justify-center bg-white text-sand mb-6">
                  <amenity.icon className="w-5 h-5 text-charcoal" />
                </div>
                <h3 className="font-display font-medium text-lg text-charcoal mb-2 tracking-tight">
                  {amenity.title}
                </h3>
                <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
                  {amenity.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED LOCATIONS */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-12 border-b border-concrete">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-4">
          <div>
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">Our Nodes</span>
            <h2 className="font-display font-light text-3xl sm:text-5xl text-charcoal tracking-tight">
              Featured Locations across <br/><span className="font-serif italic text-charcoal/60">Nairobi.</span>
            </h2>
          </div>
          <p className="font-sans text-sm text-charcoal/60 max-w-sm leading-relaxed">
            Beautifully situated workspaces inside high-prestige commercial developments with outstanding public transit access, secure parking, and adjacent dining.
          </p>
        </div>

        {/* Location cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {locations.slice(0, 3).map((loc) => (
            <div 
              key={loc.id}
              onClick={() => navigate(`/locations/${loc.id}`)}
              className="bg-white border border-concrete hover:border-sand transition-all duration-500 overflow-hidden group cursor-pointer shadow-xs flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-concrete">
                <img 
                  src={loc.image} 
                  alt={loc.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-charcoal text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-md flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-sand" /> {loc.name}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-sand block mb-1">
                    {loc.neighborhood.split(',')[1] || loc.name}
                  </span>
                  <h3 className="font-display font-medium text-xl text-charcoal tracking-tight group-hover:text-sand transition-colors mb-3">
                    {loc.name}
                  </h3>
                  <p className="font-sans text-xs text-charcoal/60 line-clamp-2 mb-6 leading-relaxed">
                    {loc.address}
                  </p>
                  
                  {/* Spaces available indicators */}
                  <div className="mb-6">
                    <span className="text-[10px] font-bold tracking-wider text-charcoal/40 uppercase block mb-2">Available Options:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.spacesAvailable.slice(0, 3).map((space, sidx) => (
                        <span key={sidx} className="bg-offwhite text-charcoal/80 text-[10px] font-sans px-2.5 py-1 border border-concrete/50">
                          {space}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-concrete/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-charcoal/40 uppercase block">Starting from</span>
                    <span className="font-display font-semibold text-charcoal text-sm">{loc.startingPrice}</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal group-hover:text-sand inline-flex items-center gap-1 transition-colors">
                    View Details <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. MEMBER EXPERIENCE / TESTIMONIAL CAROUSEL */}
      <section className="py-24 bg-white border-b border-concrete overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Editorial Photographic Left Column */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] overflow-hidden bg-concrete border border-concrete shadow-lg relative">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800" 
                alt="Professionals in high-focus architectural lobby" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="font-serif italic text-sand text-lg block mb-2">Pristine Architecture</span>
                <p className="font-sans text-xs text-white/80 leading-relaxed">
                  Every Second Desk environment is crafted to maximize natural sunlight, acoustic isolation, and visual order.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial Core Content Column */}
          <div className="lg:col-span-7 lg:pl-12 flex flex-col justify-between h-full py-6">
            <div>
              <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">Member Experiences</span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight mb-8">
                Workspace Trust Verified
              </h2>
              
              {/* Carousel Block */}
              <div className="relative min-h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <p className="font-serif italic text-xl sm:text-2xl text-charcoal/80 leading-relaxed">
                      "{testimonials[activeTestimonial].quote}"
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                      <img 
                        src={testimonials[activeTestimonial].image} 
                        alt={testimonials[activeTestimonial].author} 
                        className="w-12 h-12 rounded-full object-cover border border-concrete"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-display font-semibold text-charcoal text-base">
                          {testimonials[activeTestimonial].author}
                        </h4>
                        <p className="font-sans text-xs text-charcoal/60">
                          {testimonials[activeTestimonial].role} at <span className="font-medium text-charcoal">{testimonials[activeTestimonial].company}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex items-center space-x-4 mt-12 pt-8 border-t border-concrete">
              <button 
                onClick={prevTestimonial}
                className="w-10 h-10 border border-concrete hover:border-sand hover:bg-offwhite flex items-center justify-center text-charcoal transition-all cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-mono text-xs text-charcoal/40">
                0{activeTestimonial + 1} &nbsp;/&nbsp; 0{testimonials.length}
              </span>
              <button 
                onClick={nextTestimonial}
                className="w-10 h-10 border border-concrete hover:border-sand hover:bg-offwhite flex items-center justify-center text-charcoal transition-all cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. COMMUNITY SECTION WITH GALLERY */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-12 border-b border-concrete">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-4">
          <div>
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">Community Hub</span>
            <h2 className="font-display font-light text-3xl sm:text-5xl text-charcoal tracking-tight">
              Dynamic Networking Ecosystem
            </h2>
          </div>
          <p className="font-sans text-sm text-charcoal/60 max-w-sm leading-relaxed">
            Professional development is built directly into our ecosystem. Engage in curated, high-value community interactions structured around real connection.
          </p>
        </div>

        {/* 2x2 Bento grid or list of programs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: 'Investor Meetups', tag: 'Closed-door VC pits', desc: 'Secure direct pipelines to regional angel networks, seed funds, and institutional corporate development leads.' },
            { title: 'Founder Panels', tag: 'Real lessons, no fluff', desc: 'Listen to seasoned operators discuss serial fundraising, cross-border compliance, and complex scaling models.' },
            { title: 'SME Workshops', tag: 'Practical optimization', desc: 'Hands-on masterclasses centering local tax filings, enterprise architecture scaling, and cloud workflow systems.' },
            { title: 'Community Dinners', tag: 'Curated 3-course mixes', desc: 'Savor gourmet catering on our rooftop gardens alongside other ambitious managing partners, founders, and directors.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 border border-concrete hover:border-sand transition-all duration-300">
              <span className="font-mono text-[9px] uppercase tracking-widest text-sand font-bold block mb-2">{item.tag}</span>
              <h3 className="font-display font-medium text-charcoal text-lg mb-3">{item.title}</h3>
              <p className="font-sans text-xs text-charcoal/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Beautiful visual gallery row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden">
          {[
            'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400'
          ].map((img, i) => (
            <div key={i} className="aspect-[4/3] bg-concrete overflow-hidden border border-concrete hover-zoom-container">
              <img 
                src={img} 
                alt="Community space detail" 
                className="w-full h-full object-cover hover-zoom-image"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 8. MEMBERSHIP BENEFITS (TWO COLUMN LAYOUT) */}
      <section className="py-24 bg-white border-b border-concrete">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">Core Perks</span>
            <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight mb-6">
              Membership Benefits
            </h2>
            <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
              Our service catalog is engineered to support professional development, simplify daily operational friction, and keep teams highly motivated.
            </p>
            <div className="mt-8">
              <button 
                onClick={() => navigate('/book-tour')}
                className="bg-charcoal text-white hover:bg-sand hover:text-charcoal text-xs font-bold uppercase tracking-widest px-6 py-4.5 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                Become a Member <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((b, idx) => (
              <div key={idx} className="border-b border-concrete pb-6 flex items-start gap-4">
                <div className="w-5 h-5 rounded-full bg-sand/10 flex items-center justify-center text-sand shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-charcoal" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-charcoal text-base mb-2">
                    {b.title}
                  </h3>
                  <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8.5 PREMIUM BROCHURE CTA SECTION */}
      <section className="py-24 bg-offwhite border-b border-concrete relative overflow-hidden">
        {/* Subtle geometric line layout */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-sand/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-10 bottom-0 w-[1px] h-32 bg-concrete"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Context & Detail */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block">
                Portfolio & Floorplans
              </span>
              <h2 className="font-display font-light text-3xl sm:text-5xl text-charcoal tracking-tight leading-[1.1]">
                Download Our <span className="font-serif italic text-charcoal/60">Premium Brochure.</span>
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed max-w-xl">
                Get an instant, high-fidelity corporate overview of SecondDesk's workspace designs and configurations. Our comprehensive A4 portfolio booklet details architectural layouts, secure fiber infrastructure setups, executive boardroom pricing packages, and customized enterprise branding models for your teams in Westlands, Kilimani, Karen, Upper Hill, and CBD.
              </p>
              
              {/* Premium Specs list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  'Architectural Floorplans & Specs',
                  'Fibre Uplink & redundant power failovers',
                  'Custom corporate layouts & branding',
                  'Premium tea & single-origin coffee menu',
                  'Workspace dimension & capacity metrics',
                  'Dedicated executive support services'
                ].map((spec, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-sand rounded-full"></div>
                    <span className="font-sans text-xs text-charcoal/80 font-light">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive CTA Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-concrete p-8 sm:p-10 shadow-sm relative">
                {/* Minimal design card border */}
                <div className="absolute top-2 left-2 right-2 bottom-2 border border-concrete/30 pointer-events-none"></div>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-concrete pb-4">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-sand font-bold block mb-1">Document Format</span>
                      <span className="font-sans text-xs font-bold text-charcoal">High-Quality Vector PDF</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-white/0 block mb-1">Pages</span>
                      <span className="font-mono text-[10px] font-bold bg-charcoal text-white px-2 py-0.5">3 PAGES</span>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
                    Designed for real estate heads, corporate directors, remote company managers, and founders looking to establish premier presences in Kenya.
                  </p>

                  {/* Dynamic feedback CTA button */}
                  <div className="pt-2">
                    <button
                      onClick={handleDownloadBrochure}
                      disabled={isDownloading}
                      className={`w-full font-sans text-xs font-bold uppercase tracking-widest px-6 py-4.5 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-md ${
                        downloadSuccess 
                          ? 'bg-emerald-600 border border-emerald-600 text-white' 
                          : isDownloading 
                            ? 'bg-concrete border border-concrete text-charcoal/40 cursor-wait' 
                            : 'bg-charcoal border border-charcoal hover:bg-sand hover:border-sand text-white hover:text-charcoal'
                      }`}
                    >
                      {isDownloading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-charcoal/20 border-t-charcoal animate-spin rounded-full"></div>
                          <span>Generating Portfolio...</span>
                        </>
                      ) : downloadSuccess ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Brochure Downloaded!</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Download Brochure</span>
                        </>
                      )}
                    </button>
                  </div>

                  {downloadSuccess && (
                    <p className="text-center font-sans text-[11px] text-emerald-600 animate-fade-in font-medium">
                      Check your download folder for "SecondDesk_Premium_Workspace_Brochure.pdf"!
                    </p>
                  )}

                  <p className="text-center font-mono text-[9px] text-charcoal/40 uppercase tracking-widest">
                    Developed by KKDES
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. STATISTICS ANIMATED/INTERACTIVE COUNTERS */}
      <section className="bg-charcoal text-white py-20 relative overflow-hidden">
        {/* Abstract design elements */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-sand/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center md:text-left">
            <div>
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sand block mb-2 font-light">
                {stats.members}+
              </span>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/50 block">
                Active Members
              </span>
            </div>
            <div>
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sand block mb-2 font-light">
                {stats.offices}+
              </span>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/50 block">
                Private Offices
              </span>
            </div>
            <div>
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sand block mb-2 font-light">
                {stats.rooms}
              </span>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/50 block">
                Meeting Rooms
              </span>
            </div>
            <div>
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sand block mb-2 font-light">
                {stats.locations}
              </span>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/50 block">
                Premium Locations
              </span>
            </div>
            <div className="col-span-2 md:col-span-1">
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sand block mb-2 font-light">
                {stats.satisfaction}%
              </span>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/50 block">
                Satisfaction Rate
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA SECTION */}
      <section className="py-24 bg-white text-center relative overflow-hidden">
        {/* Subtle geometric layout accents */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-concrete"></div>
        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-concrete/40 hidden md:block"></div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 py-12">
          <div className="max-w-2xl mx-auto">
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-4">Secure your space</span>
            <h2 className="font-display font-light text-4xl sm:text-5xl text-charcoal tracking-tight mb-6 leading-tight">
              Ready for your <span className="font-serif italic text-charcoal/60">Second Desk?</span>
            </h2>
            <p className="font-sans text-sm text-charcoal/60 mb-10 leading-relaxed max-w-lg mx-auto">
              Book a tour today and experience a workspace built from the ground up around focus, productivity, and regional business trust.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/book-tour')}
                className="w-full sm:w-auto bg-charcoal border border-charcoal hover:bg-sand hover:border-sand text-white hover:text-charcoal font-sans text-xs font-bold uppercase tracking-widest px-8 py-4.5 transition-all cursor-pointer shadow-md"
              >
                Book Tour
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto bg-white border border-concrete hover:border-charcoal text-charcoal font-sans text-xs font-bold uppercase tracking-widest px-8 py-4.5 transition-all cursor-pointer"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
