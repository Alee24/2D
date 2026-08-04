import React from 'react';
import { useRouter } from '../context/NavigationContext';
import { locations } from '../data/coworkingData';
import { MapPin, ArrowRight, Phone, Mail, Clock, Wifi, Shield, Coffee } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const Locations: React.FC = () => {
  const { navigate } = useRouter();
  const location = locations[0]; // Single Mombasa location

  return (
    <div className="bg-offwhite text-charcoal pt-20 animate-fade-in">
      <SEO
        title="Our Location | SecondDesk Mombasa"
        description="SecondDesk Mombasa — Premium coworking spaces, private offices, and meeting rooms in Mombasa, Kenya."
      />
      <Breadcrumbs />

      {/* Hero */}
      <section className="bg-charcoal text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-sand/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="max-w-[1440px] mx-auto h-full grid grid-cols-12 px-12">
            {[...Array(13)].map((_, i) => (
              <div key={i} className="h-full border-r border-white/20 last:border-r-0"></div>
            ))}
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">Our Location</span>
            <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              SecondDesk <span className="font-serif italic text-sand">Mombasa.</span>
            </h1>
            <p className="font-sans text-white/75 text-base sm:text-lg leading-relaxed max-w-xl">
              Premium boutique workspaces in the heart of Mombasa — designed for ambitious professionals and growing teams.
            </p>
          </div>
        </div>
      </section>

      {/* Main Location Feature */}
      <section className="py-20 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden bg-concrete border border-concrete shadow-lg">
              <img
                src={location.image}
                alt="SecondDesk Mombasa"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Gallery strip */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              {location.gallery.slice(1).map((img, i) => (
                <div key={i} className="aspect-video overflow-hidden bg-concrete border border-concrete">
                  <img src={img} alt={`SecondDesk Mombasa ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-sand block mb-2">Mombasa, Kenya</span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight mb-4">
                Our Flagship Workspace
              </h2>
              <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
                SecondDesk Mombasa is a premium, design-forward coworking space offering flexible hot desks, dedicated private offices, executive boardrooms, and virtual office packages — all fully managed so you focus on what matters.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 pt-2 border-t border-concrete">
              <div className="flex items-center gap-3 text-sm text-charcoal/70 pt-4">
                <MapPin className="w-4 h-4 text-sand shrink-0" />
                <span>{location.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-charcoal/70">
                <Phone className="w-4 h-4 text-sand shrink-0" />
                <span>{location.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-charcoal/70">
                <Mail className="w-4 h-4 text-sand shrink-0" />
                <span>{location.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-charcoal/70">
                <Clock className="w-4 h-4 text-sand shrink-0" />
                <span>Mon–Fri: 8:00 AM – 8:00 PM &nbsp;|&nbsp; Sat: 9:00 AM – 1:00 PM</span>
              </div>
            </div>

            {/* Spaces Available */}
            <div>
              <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-charcoal mb-3">Spaces Available</h3>
              <div className="flex flex-wrap gap-2">
                {location.spacesAvailable.map((space, i) => (
                  <span key={i} className="font-sans text-xs px-3 py-1.5 border border-concrete bg-white text-charcoal/70">
                    {space}
                  </span>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-charcoal mb-3">Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {location.amenities.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-charcoal/70">
                    <div className="w-1.5 h-1.5 bg-sand rounded-full shrink-0"></div>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="pt-4 border-t border-concrete flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-sans text-[10px] text-charcoal/40 uppercase block">Starting from</span>
                <span className="font-display font-semibold text-charcoal text-lg">{location.startingPrice}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/locations/${location.id}`)}
                  className="bg-charcoal border border-charcoal hover:bg-sand hover:border-sand text-white hover:text-charcoal font-sans text-xs font-bold uppercase tracking-widest px-6 py-3.5 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  View Full Details <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/book-tour')}
                  className="border border-concrete hover:border-sand bg-white text-charcoal font-sans text-xs font-bold uppercase tracking-widest px-6 py-3.5 transition-all cursor-pointer"
                >
                  Book a Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white border-t border-concrete">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-8">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-sand block mb-2">Find Us</span>
            <h2 className="font-display font-light text-2xl sm:text-3xl text-charcoal tracking-tight">Mombasa Location Map</h2>
          </div>
          <div className="border border-concrete overflow-hidden shadow-sm" style={{ height: '420px' }}>
            <iframe
              src={location.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SecondDesk Mombasa Map"
            />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 max-w-[1440px] mx-auto px-6 lg:px-12 border-t border-concrete">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-sand block mb-3">Why SecondDesk Mombasa</span>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight">
            Everything You Need to <span className="font-serif italic text-charcoal/60">Do Your Best Work.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Wifi, title: 'Uncapped Fiber Internet', desc: '500Mbps redundant fiber with 4G automatic failover. Zero downtime, ever.' },
            { icon: Shield, title: 'Biometric Security', desc: 'Keyless biometric fingerprint entry with 24/7 CCTV and on-site security team.' },
            { icon: Coffee, title: 'Artisanal Coffee Bar', desc: 'Unlimited specialty espresso, single-origin pour-overs, and fresh herbal teas.' },
          ].map((item, i) => (
            <div key={i} className="p-8 border border-concrete hover:border-sand bg-white transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center border border-concrete bg-offwhite mb-6">
                <item.icon className="w-5 h-5 text-charcoal" />
              </div>
              <h3 className="font-display font-semibold text-lg text-charcoal mb-2">{item.title}</h3>
              <p className="font-sans text-xs text-charcoal/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Locations;
