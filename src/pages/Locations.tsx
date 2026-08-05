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
  ExternalLink 
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
        title="SecondDesk Mombasa | Nyali Executive Hub Workspace"
        description="Explore SecondDesk's flagship location in Mombasa: Nyali Executive Hub. Featuring ocean breeze balconies, 500Mbps dual fiber, backup generators, and private office suites."
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
                SecondDesk <span className="font-serif italic text-sand">Nyali Executive Hub</span>
              </h1>

              <p className="font-sans text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                Positioned on Links Road in the heart of Nyali, our Mombasa headquarters blends high-performance corporate infrastructure with coastal serenity, ocean breeze balconies, and 24/7 power reliability.
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
                    <span className="font-semibold text-white">500Mbps Fiber</span>
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
                    <span>3rd & 4th Floor, Nyali Executive Centre</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-concrete/60">
                <span className="text-[10px] text-charcoal/50 uppercase block">All-inclusive Desk Plans From</span>
                <span className="font-display font-semibold text-2xl text-charcoal">{location.startingPrice}</span>
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
              <div className="pt-6 mt-6 border-t border-concrete/60">
                <a 
                  href="https://maps.app.goo.gl/E7pmtHixaKbRkN6D9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-wider text-charcoal hover:text-sand inline-flex items-center gap-1.5 transition-colors"
                >
                  Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Box 3: Premium Amenities */}
            <div className="bg-offwhite border border-concrete p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-sand block mb-2">Facility Highlights</span>
                <h3 className="font-display font-medium text-2xl text-charcoal mb-4">Coastal Amenities</h3>
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

      {/* Available Workspaces inside Nyali Location */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-sand block mb-3">Workspace Options</span>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight mb-4">
            Available Spaces at <span className="font-serif italic text-sand">Nyali Hub.</span>
          </h2>
          <p className="font-sans text-sm text-charcoal/60 leading-relaxed font-light">
            Whether you need a flexible hot desk for the day or a customized 20-person corporate suite, our Mombasa location offers ready-to-use professional environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Coworking Hot Desks',
              desc: 'Flexible seating in our sunlit ocean-view lounge with unlimited high-speed fiber and barista coffee.',
              price: 'KES 1,500 / day',
              features: ['Uncapped 500Mbps WiFi', 'Barista Coffee & Tea', 'Community Lounge Access', 'Power Outlets at Every Seat']
            },
            {
              title: 'Dedicated Desks',
              desc: 'Your reserved desk with lockable storage credenza, ergonomic Steelcase chair, and 24/7 access.',
              price: 'KES 17,000 / mo',
              features: ['Personal Lockable Storage', 'Ergonomic Task Seating', '24/7 Biometric Access', 'KES 2,000 Meeting Credits']
            },
            {
              title: 'Private Office Suites',
              desc: 'Acoustically soundproofed executive suites configured for 2 to 20 team members with custom signage.',
              price: 'KES 45,000 / mo',
              features: ['Acoustic Sound Masking', 'Custom Door Branding', 'Private Nest AC Controls', 'Dedicated Server Rack Option']
            },
            {
              title: 'Executive Boardrooms',
              desc: 'State-of-the-art meeting rooms with 75" 4K Polycom screens, acoustic whiteboards, and catered service.',
              price: 'KES 2,500 / hr',
              features: ['75" 4K Polycom Video Screen', 'Porcelain Whiteboards', 'Catered Refreshments', 'Acoustic Privacy Walls']
            }
          ].map((space, idx) => (
            <div 
              key={idx}
              className="bg-white border border-concrete p-7 flex flex-col justify-between hover:border-sand transition-all duration-300 group shadow-xs"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-sand block mb-2">Option {idx + 1}</span>
                <h3 className="font-display font-medium text-xl text-charcoal mb-3 group-hover:text-sand transition-colors">
                  {space.title}
                </h3>
                <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light mb-6">
                  {space.desc}
                </p>
                <div className="space-y-2.5 border-t border-concrete/40 pt-4 mb-6">
                  {space.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-[11px] font-sans text-charcoal/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-sand shrink-0"></div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="pt-4 border-t border-concrete/40 flex items-center justify-between mb-4">
                  <span className="text-[10px] text-charcoal/40 uppercase">Starting at</span>
                  <span className="font-display font-semibold text-charcoal text-sm">{space.price}</span>
                </div>
                <button
                  onClick={() => navigate('/book-tour')}
                  className="w-full bg-offwhite group-hover:bg-charcoal group-hover:text-white text-charcoal border border-concrete py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  Book Space
                </button>
              </div>
            </div>
          ))}
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
                Located on Links Road in Nyali, Mombasa. Easily accessible from Mombasa CBD, City Mall, and Nyali Golf Club.
              </p>
              <div className="space-y-3 font-sans text-xs text-charcoal/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sand shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-charcoal">Physical Address:</strong>
                    3rd & 4th Floor, Nyali Executive Centre, Links Road, Nyali, Mombasa
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-sand shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-charcoal">Front Desk Direct Line:</strong>
                    0719688992 / +254 719 688 992
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
              <div className="aspect-video w-full bg-concrete border border-concrete shadow-lg relative overflow-hidden">
                <iframe
                  title="Google Map location representation of Secondesk Nyali Hub"
                  src={location.mapEmbedUrl}
                  className="w-full h-full border-0"
                  allowFullScreen={false}
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
