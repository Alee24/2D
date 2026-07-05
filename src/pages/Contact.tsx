import React, { useState } from 'react';
import { useRouter } from '../context/NavigationContext';
import { faqs, locations } from '../data/coworkingData';
import { Mail, Phone, Clock, MapPin, Check, ChevronDown, MessageSquare } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const Contact: React.FC = () => {
  const { navigate } = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    }
  };

  return (
    <div className="bg-offwhite text-charcoal pt-20 animate-fade-in min-h-screen">
      <SEO 
        title="Contact Us | Book a Consultation"
        description="Get in touch with our team to inquire about pricing, custom enterprise layouts, or general questions about our Nairobi coworking locations."
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
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">Reach Out</span>
            <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              Contact Our <span className="font-serif italic text-sand">Commercial Team.</span>
            </h1>
            <p className="font-sans text-white/75 text-base sm:text-lg leading-relaxed max-w-xl">
              Connect directly with our hospitality and sales teams to schedule corporate layouts, request custom quotes, or discuss global passes.
            </p>
          </div>
        </div>
      </section>

      {/* Main Split Layout Section */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Coordinates, Map & FAQs */}
        <div className="lg:col-span-7 space-y-16">
          {/* Company contact points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-b border-concrete pb-10">
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-charcoal">General Sales</h3>
              <div className="space-y-2 text-xs font-sans text-charcoal/70">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-sand shrink-0" /> +254 700 120 000
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-sand shrink-0" /> info@seconddesk.co
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sand shrink-0" /> Mon - Fri, 08:00 AM - 06:00 PM
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-charcoal">Locations Operations</h3>
              <div className="space-y-1 text-xs font-sans text-charcoal/60 leading-normal">
                {locations.slice(0, 3).map((loc) => (
                  <p key={loc.id}>
                    <strong>Second Desk {loc.name}:</strong> {loc.phone}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-xl text-charcoal tracking-tight">Main Nairobi Node Map</h3>
            <div className="aspect-video w-full bg-concrete border border-concrete">
              <iframe
                title="Google Map location representation of Second Desk Westlands HQ"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8413693240217!2d36.80211561533261!3d-1.2614539990800635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1741ca6cc3f1%3A0xd6891cc774fcf373!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1655112233445!5m2!1sen!2ske"
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* FAQ Accordion block */}
          <div className="space-y-6 pt-6 border-t border-concrete">
            <h3 className="font-display font-semibold text-xl text-charcoal tracking-tight">Frequently Asked Questions</h3>
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
                      <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-5 bg-white border border-concrete p-8 sm:p-10 shadow-xs space-y-6 self-start lg:sticky lg:top-28">
          <div className="border-b border-concrete pb-6 text-center lg:text-left">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-sand block mb-1">Inquiry Form</span>
            <h3 className="font-display font-semibold text-xl text-charcoal">Send Us a Message</h3>
            <p className="font-sans text-xs text-charcoal/60 mt-1">
              For general space availability, custom corporate leases, partnership pitches, or billing questions.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-center space-y-4 rounded-none">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-display font-semibold text-emerald-950 text-base">Message Sent Successfully</h4>
              <p className="font-sans text-xs text-emerald-800 leading-relaxed">
                Thank you for reaching out. A Second Desk customer success executive has received your inquiry and will follow up within 2 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 bg-charcoal text-white hover:bg-sand hover:text-charcoal text-[10px] font-bold uppercase tracking-wider px-6 py-2.5 transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name field */}
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
                  Your Full Name *
                </label>
              </div>

              {/* Email field */}
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
                  Your Professional Email *
                </label>
              </div>

              {/* Phone field */}
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  placeholder=" "
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="floating-input w-full bg-transparent border border-concrete focus:border-sand px-4 py-3.5 text-xs text-charcoal focus:outline-hidden transition-colors rounded-none placeholder-shown:placeholder-transparent"
                />
                <label className="absolute left-4 top-3.5 text-xs font-sans text-charcoal/40 pointer-events-none transition-all origin-left">
                  Phone Number
                </label>
              </div>

              {/* Company field */}
              <div className="relative">
                <input
                  type="text"
                  name="company"
                  placeholder=" "
                  value={formData.company}
                  onChange={handleInputChange}
                  className="floating-input w-full bg-transparent border border-concrete focus:border-sand px-4 py-3.5 text-xs text-charcoal focus:outline-hidden transition-colors rounded-none placeholder-shown:placeholder-transparent"
                />
                <label className="absolute left-4 top-3.5 text-xs font-sans text-charcoal/40 pointer-events-none transition-all origin-left">
                  Company Name
                </label>
              </div>

              {/* Message field */}
              <div className="relative">
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder=" "
                  value={formData.message}
                  onChange={handleInputChange}
                  className="floating-input w-full bg-transparent border border-concrete focus:border-sand px-4 py-3.5 text-xs text-charcoal focus:outline-hidden transition-colors rounded-none placeholder-shown:placeholder-transparent"
                />
                <label className="absolute left-4 top-3.5 text-xs font-sans text-charcoal/40 pointer-events-none transition-all origin-left">
                  How can we help you? *
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-charcoal border border-charcoal hover:bg-sand hover:border-sand hover:text-charcoal text-white font-sans text-xs font-bold uppercase tracking-widest py-4.5 transition-all cursor-pointer shadow-md text-center"
              >
                Send Inquiry Message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
export default Contact;
