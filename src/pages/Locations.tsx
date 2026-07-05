import React, { useState } from 'react';
import { useRouter } from '../context/NavigationContext';
import { locations } from '../data/coworkingData';
import { MapPin, ArrowRight, Layers, DollarSign, Phone, Mail, Navigation } from 'lucide-react';

export const Locations: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedZone, setSelectedZone] = useState<string>('all');

  const filteredLocations = selectedZone === 'all'
    ? locations
    : locations.filter(loc => loc.id === selectedZone);

  return (
    <div className="bg-offwhite text-charcoal pt-20 animate-fade-in">
      {/* Editorial Hero */}
      <section className="bg-charcoal text-white py-24 lg:py-32 relative overflow-hidden">
        {/* Subtle background graphics */}
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
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">Nairobi Commercial Network</span>
            <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              Our Premium <span className="font-serif italic text-sand">Locations.</span>
            </h1>
            <p className="font-sans text-white/75 text-base sm:text-lg leading-relaxed max-w-xl">
              Establish your professional business footprint in Nairobi’s highly sought-after, central, secure developments. 
            </p>
          </div>
        </div>
      </section>

      {/* Conceptual Map Area */}
      <section className="py-16 bg-white border-b border-concrete">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Map Info Panel */}
            <div className="lg:col-span-4 space-y-6">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-sand">Spatial Coverage</span>
              <h2 className="font-display font-light text-3xl text-charcoal tracking-tight">
                Nairobi Hub Map
              </h2>
              <p className="font-sans text-sm text-charcoal/60 leading-relaxed font-light">
                Our locations are selected purely based on commercial prestige, power-redundancy integrity, and easy highway connections.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setSelectedZone('all')}
                  className={`px-4 py-2 text-xs font-sans border transition-all cursor-pointer ${
                    selectedZone === 'all'
                      ? 'bg-charcoal border-charcoal text-white'
                      : 'bg-white border-concrete text-charcoal hover:border-sand'
                  }`}
                >
                  All Districts ({locations.length})
                </button>
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedZone(loc.id)}
                    className={`px-4 py-2 text-xs font-sans border transition-all cursor-pointer ${
                      selectedZone === loc.id
                        ? 'bg-charcoal border-charcoal text-white'
                        : 'bg-white border-concrete text-charcoal hover:border-sand'
                    }`}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Visual Map Box */}
            <div className="lg:col-span-8 bg-offwhite border border-concrete p-8 rounded-none relative overflow-hidden min-h-[350px] flex items-center justify-center">
              {/* Map grid layout */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-25 pointer-events-none">
                {[...Array(64)].map((_, i) => (
                  <div key={i} className="border-r border-b border-concrete"></div>
                ))}
              </div>

              {/* Central Map Graphic (Minimalist SVG/CSS representing Nairobi nodes) */}
              <div className="relative w-full max-w-lg aspect-video flex items-center justify-center">
                {/* Simulated Roads/Accents */}
                <div className="absolute w-[120%] h-[2px] bg-concrete rotate-12 -translate-y-8 pointer-events-none"></div>
                <div className="absolute w-[2px] h-[120%] bg-concrete -rotate-45 translate-x-12 pointer-events-none"></div>
                <div className="absolute w-[120%] h-[1px] bg-sand/30 -rotate-12 translate-y-12 pointer-events-none"></div>

                {/* Interactive Pins on map */}
                {locations.map((loc, idx) => {
                  // Coordinate positions on container
                  const positions = [
                    { top: '35%', left: '42%', color: 'bg-sand border-charcoal' }, // Westlands
                    { top: '55%', left: '32%', color: 'bg-forest border-white' }, // Kilimani
                    { top: '75%', left: '15%', color: 'bg-charcoal border-sand' }, // Karen
                    { top: '58%', left: '55%', color: 'bg-sand border-charcoal' }, // Upper Hill
                    { top: '48%', left: '65%', color: 'bg-forest border-white' }  // CBD
                  ];
                  const pos = positions[idx] || { top: '50%', left: '50%', color: 'bg-sand' };
                  const isSelected = selectedZone === 'all' || selectedZone === loc.id;

                  return (
                    <div
                      key={loc.id}
                      style={{ top: pos.top, left: pos.left }}
                      onClick={() => setSelectedZone(loc.id)}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300 z-10 ${
                        isSelected ? 'scale-110 opacity-100' : 'scale-90 opacity-40 hover:opacity-80'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 transition-all ${pos.color} ${isSelected ? 'ring-4 ring-sand/30' : ''}`}>
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div className="mt-1 bg-charcoal text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 whitespace-nowrap shadow-md">
                        {loc.name}
                      </div>
                    </div>
                  );
                })}

                <div className="absolute bottom-4 right-4 bg-white/95 px-3 py-1.5 border border-concrete text-[9px] font-sans text-charcoal/60 flex items-center gap-1.5 backdrop-blur-xs">
                  <Navigation className="w-3 h-3 text-sand" /> Conceptual Nairobi Network Overlay
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Cards List */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLocations.map((loc) => (
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
                    {loc.neighborhood}
                  </span>
                  <h3 className="font-display font-medium text-xl text-charcoal tracking-tight group-hover:text-sand transition-colors mb-3">
                    {loc.name}
                  </h3>
                  <p className="font-sans text-xs text-charcoal/60 line-clamp-2 mb-6 leading-relaxed">
                    {loc.address}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-concrete/40">
                    <div className="flex items-center gap-2 text-xs text-charcoal/70">
                      <Phone className="w-3.5 h-3.5 text-sand" />
                      <span>{loc.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-charcoal/70">
                      <Mail className="w-3.5 h-3.5 text-sand" />
                      <span>{loc.email}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-concrete/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-charcoal/40 uppercase block">Starting from</span>
                    <span className="font-display font-semibold text-charcoal text-sm">{loc.startingPrice}</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal group-hover:text-sand inline-flex items-center gap-1 transition-colors">
                    View Office details <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Locations;
