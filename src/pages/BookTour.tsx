import React, { useState } from 'react';
import { useRouter } from '../context/NavigationContext';
import { locations } from '../data/coworkingData';
import { MapPin, Calendar, Users, Check, Clock, Phone, Mail, Award, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const BookTour: React.FC = () => {
  const { navigate } = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    location: 'westlands',
    teamSize: '1-5',
    date: '',
    message: ''
  });
  const [booked, setBooked] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.date) {
      setBooked(true);
    }
  };

  const selectedLocDetails = locations.find(l => l.id === formData.location) || locations[0];

  return (
    <div className="bg-offwhite text-charcoal pt-20 animate-fade-in min-h-screen">
      <SEO 
        title="Schedule a Private Tour | SecondDesk Nairobi"
        description="Book a personalized tour of our boutique coworking and office spaces in Westlands, Karen, Kilimani, Upper Hill, or CBD."
      />
      <Breadcrumbs />
      {/* Editorial Hero */}
      <section className="bg-charcoal text-white py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="max-w-[1440px] mx-auto h-full grid grid-cols-12 px-12">
            {[...Array(13)].map((_, i) => (
              <div key={i} className="h-full border-r border-white/20 last:border-r-0"></div>
            ))}
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-2xl">
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-2">Schedule Visit</span>
            <h1 className="font-display font-light text-4xl sm:text-5xl tracking-tight mb-4">
              Book Your <span className="font-serif italic text-sand">Spatial Tour.</span>
            </h1>
            <p className="font-sans text-white/70 text-sm leading-relaxed font-light">
              We look forward to hosting you for a bespoke spatial walkthrough, continuous high-speed internet diagnostics, and premium coffee tastings.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Layout */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-12">
        {booked ? (
          /* SUCCESS CONFIRMATION VIEW (Visual high-contrast ticket format) */
          <div className="max-w-2xl mx-auto space-y-12 animate-scale-up">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 mx-auto border-2 border-emerald-50 shadow-md">
                <Check className="w-6 h-6 animate-pulse" />
              </div>
              <h2 className="font-display font-light text-3xl text-charcoal tracking-tight">Your Tour is Confirmed</h2>
              <p className="font-sans text-xs text-charcoal/60 max-w-sm mx-auto">
                Thank you, {formData.name}. We have secured your private spatial walkthrough schedule.
              </p>
            </div>

            {/* Print-Receipt-Style Visual Ticket */}
            <div className="bg-white border border-concrete shadow-xl relative overflow-hidden">
              {/* Ticket jagged edge graphics */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-sand"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-offwhite border-r border-concrete rounded-r-full z-10"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-offwhite border-l border-concrete rounded-l-full z-10"></div>

              <div className="p-8 sm:p-12 space-y-8">
                {/* Brand and Ticket Header */}
                <div className="flex items-center justify-between border-b border-concrete pb-6">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 border border-charcoal bg-charcoal text-white font-display font-extrabold text-[10px] flex items-center justify-center tracking-widest">
                      SD
                    </div>
                    <span className="font-display font-bold tracking-widest text-xs uppercase">Second Desk</span>
                  </div>
                  <span className="font-mono text-[9px] text-charcoal/40 uppercase tracking-widest">Itinerary Pass</span>
                </div>

                {/* Ticket Body Itinerary details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans text-xs">
                  <div className="space-y-1">
                    <span className="text-charcoal/40 uppercase block text-[9px] font-bold tracking-widest">Host Node</span>
                    <span className="font-display font-semibold text-charcoal text-sm">
                      Second Desk {selectedLocDetails.name}
                    </span>
                    <span className="text-charcoal/60 block leading-relaxed pr-4">
                      {selectedLocDetails.address}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-charcoal/40 uppercase block text-[9px] font-bold tracking-widest">Preferred Date</span>
                      <span className="font-display font-semibold text-charcoal text-sm flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-sand" /> {formData.date}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-charcoal/40 uppercase block text-[9px] font-bold tracking-widest">Team Footprint</span>
                      <span className="font-display font-semibold text-charcoal text-sm flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-sand" /> {formData.teamSize} Persons
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checklist of what to expect */}
                <div className="pt-6 border-t border-concrete space-y-3 bg-offwhite/50 p-6 border-l-4 border-sand">
                  <h4 className="font-display font-bold text-xs text-charcoal uppercase tracking-widest">Tour Checklist:</h4>
                  <ul className="space-y-2 text-xs font-sans text-charcoal/70">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-sand" /> Individual 1-on-1 corporate strategy review
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-sand" /> Complimentary Day Pass credentials issued on arrival
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-sand" /> Complete speed diagnostics of secure redundancy fiber
                    </li>
                  </ul>
                </div>

                {/* Footnote */}
                <div className="pt-6 border-t border-concrete/60 text-center font-sans text-[10px] text-charcoal/40 space-y-1">
                  <p>Please present this digital pass at the reception desk upon arrival.</p>
                  <p>Inquiries or rescheduled visits: <strong>{selectedLocDetails.phone}</strong></p>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal hover:text-sand cursor-pointer transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Return to Homepage
              </button>
            </div>
          </div>
        ) : (
          /* BOOKING FORM VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Visual Perks & Details */}
            <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-28">
              <div className="space-y-4">
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-sand">Spatial Onboarding</span>
                <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight">
                  What Happens Next?
                </h2>
                <p className="font-sans text-sm text-charcoal/60 leading-relaxed font-light">
                  We schedule 1-on-1 tours to ensure you experience our actual day-to-day work environment, verify internet stability, and view exact space scales prior to choosing any membership.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { title: 'Personalized Workspace Tour', desc: 'Walkthrough all shared areas, dedicated desk zones, private suits, and local server setups.' },
                  { title: 'Redundant Power & Fiber Audits', desc: 'See our high-redundant Tier-1 symmetrical fiber routing, biometric gates, and auto generators.' },
                  { title: '1-on-1 Spatial Consultation', desc: 'Discuss custom team scaling layouts, branding rules, corporate invoice pipelines, and event reservations.' },
                  { title: 'Complimentary Day Pass', desc: 'Remain in our coworking areas after your tour to fully experience actual workspace focus and our barista cafes.' }
                ].map((perk, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full border border-concrete bg-white flex items-center justify-center text-sand shrink-0 mt-0.5">
                      <span className="font-mono text-xs text-charcoal font-bold">0{idx + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-charcoal text-sm mb-1">{perk.title}</h4>
                      <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">{perk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Premium Form */}
            <div className="lg:col-span-7 bg-white border border-concrete p-8 sm:p-12 shadow-xs space-y-8">
              <div className="border-b border-concrete pb-6 text-center lg:text-left">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-sand block mb-1">Itinerary Entry</span>
                <h3 className="font-display font-semibold text-xl text-charcoal">Secure Tour Date</h3>
                <p className="font-sans text-xs text-charcoal/60 mt-1">
                  Complete the fields below to trigger an automated print itinerary pass and book your local manager walkthrough.
                </p>
              </div>

              <form onSubmit={handleBook} className="space-y-6">
                {/* Row 1: Name and Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder=" "
                      value={formData.name}
                      onChange={handleInputChange}
                      className="floating-input w-full bg-transparent border border-concrete focus:border-sand px-4 py-3.5 text-xs text-charcoal focus:outline-hidden transition-colors rounded-none placeholder-shown:placeholder-transparent"
                    />
                    <label className="absolute left-4 top-3.5 text-xs font-sans text-charcoal/40 pointer-events-none transition-all origin-left">
                      Full Name *
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="company"
                      required
                      placeholder=" "
                      value={formData.company}
                      onChange={handleInputChange}
                      className="floating-input w-full bg-transparent border border-concrete focus:border-sand px-4 py-3.5 text-xs text-charcoal focus:outline-hidden transition-colors rounded-none placeholder-shown:placeholder-transparent"
                    />
                    <label className="absolute left-4 top-3.5 text-xs font-sans text-charcoal/40 pointer-events-none transition-all origin-left">
                      Company *
                    </label>
                  </div>
                </div>

                {/* Row 2: Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder=" "
                      value={formData.email}
                      onChange={handleInputChange}
                      className="floating-input w-full bg-transparent border border-concrete focus:border-sand px-4 py-3.5 text-xs text-charcoal focus:outline-hidden transition-colors rounded-none placeholder-shown:placeholder-transparent"
                    />
                    <label className="absolute left-4 top-3.5 text-xs font-sans text-charcoal/40 pointer-events-none transition-all origin-left">
                      Business Email *
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder=" "
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="floating-input w-full bg-transparent border border-concrete focus:border-sand px-4 py-3.5 text-xs text-charcoal focus:outline-hidden transition-colors rounded-none placeholder-shown:placeholder-transparent"
                    />
                    <label className="absolute left-4 top-3.5 text-xs font-sans text-charcoal/40 pointer-events-none transition-all origin-left">
                      Phone Number *
                    </label>
                  </div>
                </div>

                {/* Row 3: Dropdowns for Location & Team size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Preferred Node</span>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-concrete focus:border-sand px-4 py-3.5 text-xs text-charcoal focus:outline-hidden rounded-none"
                    >
                      {locations.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          Second Desk {loc.name} ({loc.neighborhood.split(',')[1] || loc.name})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Team Footprint</span>
                    <select
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-concrete focus:border-sand px-4 py-3.5 text-xs text-charcoal focus:outline-hidden rounded-none"
                    >
                      <option value="1">1 Person (Freelancer/Solopreneur)</option>
                      <option value="2-5">2 to 5 Persons (Startups/Studios)</option>
                      <option value="6-15">6 to 15 Persons (SMEs/Hybrid Units)</option>
                      <option value="16-40">16 to 40 Persons (Scaleups/Agencies)</option>
                      <option value="40+">40+ Persons (Enterprise/Headquarters)</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Preferred Date */}
                <div className="flex flex-col gap-1.5">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Preferred Tour Date *</span>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border border-concrete focus:border-sand px-4 py-3.5 text-xs text-charcoal focus:outline-hidden rounded-none"
                  />
                </div>

                {/* Row 5: Custom Message */}
                <div className="relative">
                  <textarea
                    name="message"
                    rows={3}
                    placeholder=" "
                    value={formData.message}
                    onChange={handleInputChange}
                    className="floating-input w-full bg-transparent border border-concrete focus:border-sand px-4 py-3.5 text-xs text-charcoal focus:outline-hidden transition-colors rounded-none placeholder-shown:placeholder-transparent"
                  />
                  <label className="absolute left-4 top-3.5 text-xs font-sans text-charcoal/40 pointer-events-none transition-all origin-left">
                    Any specific spatial configurations or notes? (Optional)
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-charcoal border border-charcoal hover:bg-sand hover:border-sand hover:text-charcoal text-white font-sans text-xs font-bold uppercase tracking-widest py-4.5 transition-all cursor-pointer shadow-md text-center"
                >
                  Generate Confirmed Tour Pass
                </button>
              </form>
            </div>

          </div>
        )}
      </section>
    </div>
  );
};
export default BookTour;
