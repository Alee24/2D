import React, { useState } from 'react';
import { useRouter } from '../context/NavigationContext';
import { locations } from '../data/coworkingData';
import { 
  MapPin, 
  ArrowRight, 
  Phone, 
  Mail, 
  Wifi, 
  Coffee, 
  Zap, 
  ShieldCheck, 
  Car, 
  Wind, 
  Calendar, 
  Users, 
  Building2, 
  CheckCircle2, 
  ExternalLink,
  Compass
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const Locations: React.FC = () => {
  const { navigate } = useRouter();
  const location = locations[0]; // Flagship single Mombasa location
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="bg-offwhite text-charcoal pt-20 animate-fade-in min-h-screen">
      <SEO 
        title="SECONDESK Mombasa | Nyali Executive Hub Workspace"
        description="Explore SECONDESK's flagship location in Mombasa: Nyali Executive Hub. Featuring fast dedicated internet, backup generators, and private office suites."
      />
      <Breadcrumbs />

      {/* Hero Section - Single Location Showcase */}
      <section className="bg-charcoal text-white py-20 lg:py-28 relative overflow-hidden">
        {/* Decorative background grid & glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sand/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="max-w-[1440px] mx-auto h-full grid grid-cols-12 px-12">
            {[...Array(13)].map((_, i) => (
              <div key={i} className="h-full border-r border-white/20 last:border-r-0"></div>
            ))}
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-sand/20 border border-sand/30 text-sand px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded-full">
                <MapPin className="w-3.5 h-3.5" /> Flagship Mombasa Location
              </div>

              <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
                SECONDESK <span className="font-serif italic text-sand">Nyali Executive Hub</span>
              </h1>

              <p className="font-sans text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                Positioned on Links Road in the heart of Nyali, our Mombasa headquarters blends high-performance corporate infrastructure with fast dedicated internet and dual generator power reliability.
              </p>

              {/* Key Quick Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs font-sans text-white/90">
                <div className="bg-white/5 border border-white/10 p-3 flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-sand shrink-0" />
                  <div>
                    <span className="block text-white/40 text-[10px] uppercase">Address</span>
                    <span className="font-semibold text-white">Links Road, Nyali</span>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-sand shrink-0" />
                  <div>
                    <span className="block text-white/40 text-[10px] uppercase">Power</span>
                    <span className="font-semibold text-white">Dual Backup Gen</span>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 flex items-center gap-2.5">
                  <Wifi className="w-4 h-4 text-sand shrink-0" />
                  <div>
                    <span className="block text-white/40 text-[10px] uppercase">Connectivity</span>
                    <span className="font-semibold text-white">Fast Dedicated Internet</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => navigate('/book-tour')}
                  className="bg-sand hover:bg-sand/90 text-charcoal px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer inline-flex items-center gap-2 shadow-lg hover:shadow-sand/20"
                >
                  <Calendar className="w-4 h-4" /> Book a Private Tour
                </button>
                <button
                  onClick={() => navigate(`/locations/${location.id}`)}
                  className="border border-white/30 hover:border-sand text-white hover:text-sand px-6 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  Explore Space Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Interactive Image Hero */}
            <div className="lg:col-span-5">
              <div className="bg-charcoal border border-white/10 p-3 shadow-2xl relative">
                <div className="aspect-[4/3] overflow-hidden relative bg-concrete">
                  <img
                    src={location.gallery[activeImageIndex] || location.image}
                    alt={location.name}
                    className="w-full h-full object-cover transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-charcoal/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 backdrop-blur-xs border border-white/10">
                    Nyali Coastal Hub — Photo {activeImageIndex + 1} of {location.gallery.length}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {location.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`aspect-video overflow-hidden border transition-all cursor-pointer ${
                        activeImageIndex === idx ? 'border-sand ring-2 ring-sand/30' : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Overview & Contact Box */}
      <section className="py-16 bg-white border-b border-concrete">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Box 1: Location & Specs */}
            <div className="bg-offwhite border border-concrete p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-sand block mb-2">Location Specs</span>
                <h3 className="font-display font-medium text-2xl text-charcoal mb-4">Prime Location in Mombasa</h3>
                <p className="font-sans text-xs text-charcoal/70 leading-relaxed font-light mb-6">
                  {location.address}
                </p>
                <div className="space-y-3 border-t border-concrete/60 pt-4 text-xs font-sans text-charcoal/80">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-sand shrink-0" />
                    <span className="font-medium">{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-sand shrink-0" />
                    <span className="font-medium">{location.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-sand shrink-0" />
                    <span>2nd Floor, Links Road, Nyali</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Nearby Landmarks */}
            <div className="bg-offwhite border border-concrete p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-sand block mb-2">Neighborhood & Access</span>
                <h3 className="font-display font-medium text-2xl text-charcoal mb-4">Nearby Landmarks</h3>
                <p className="font-sans text-xs text-charcoal/70 leading-relaxed font-light mb-6">
                  Conveniently surrounded by Mombasa's top commercial amenities, fine dining, and coastal resorts.
                </p>
                <ul className="space-y-2.5">
                  {location.nearbyLandmarks.map((landmark, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs font-sans text-charcoal/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sand shrink-0" />
                      <span>{landmark}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Box 3: Premium Amenities */}
            <div className="bg-offwhite border border-concrete p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-sand block mb-2">Facility Highlights</span>
                <h3 className="font-display font-medium text-2xl text-charcoal mb-4">Premium Amenities</h3>
                <ul className="space-y-3">
                  {location.amenities.map((amenity, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs font-sans text-charcoal/80">
                      <div className="w-2 h-2 rounded-full bg-sand shrink-0"></div>
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-concrete/60">
                <button
                  onClick={() => navigate('/book-tour')}
                  className="w-full bg-charcoal hover:bg-sand hover:text-charcoal text-white py-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer text-center"
                >
                  Schedule Site Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Google Map Section */}
      <section className="py-16 bg-white border-t border-b border-concrete">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-sand">Interactive Navigation</span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight">
                Visit Nyali Executive Hub
              </h2>
              <p className="font-sans text-sm text-charcoal/60 leading-relaxed font-light">
                Located on Links Road in Nyali, Mombasa (above Second Cup Cafe on 2nd Floor). Easily accessible from Mombasa CBD, City Mall, and Nyali Golf Club.
              </p>
              <div className="space-y-3 font-sans text-xs text-charcoal/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sand shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-charcoal">Physical Address:</strong>
                    2nd Floor, Links Road, Nyali (located above Second Cup Cafe), Mombasa
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-sand shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-charcoal">Front Desk Direct Line:</strong>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-sans mt-0.5">
                      <a href="tel:+254719688992" className="text-charcoal font-bold hover:text-sand transition-colors">+254 719 688 992</a>
                      <span className="text-charcoal/30">|</span>
                      <a href="tel:+254719688992" className="text-charcoal/80 hover:text-charcoal underline transition-colors">Call</a>
                      <span className="text-charcoal/30">•</span>
                      <a href="sms:+254719688992" className="text-charcoal/80 hover:text-charcoal underline transition-colors">Text</a>
                      <span className="text-charcoal/30">•</span>
                      <a href="https://wa.me/254719688992" target="_blank" rel="noreferrer" className="text-emerald-700 dark:text-emerald-400 font-medium underline transition-colors">WhatsApp</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => navigate('/book-tour')}
                  className="bg-charcoal text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-sand hover:text-charcoal transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  Schedule Tour Visit <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="aspect-video w-full bg-concrete border border-concrete shadow-lg relative overflow-hidden group">
                <a 
                  href="https://maps.app.goo.gl/im6FDmYiXpf1Hwy77?g_st=iw" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="absolute top-4 right-4 bg-charcoal/90 hover:bg-sand text-white hover:text-charcoal text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-lg flex items-center gap-2 transition-all cursor-pointer z-10 backdrop-blur-xs"
                >
                  <Compass className="w-4 h-4" /> Open Directions in Google Maps
                </a>
                <iframe
                  title="Google Map location representation of SECONDESK Nyali Hub"
                  src={location.mapEmbedUrl}
                  className="w-full h-full border-0"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Locations;
