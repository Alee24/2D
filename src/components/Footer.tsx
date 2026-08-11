import React, { useState } from 'react';
import { useRouter } from '../context/NavigationContext';
import { Mail, ArrowUp, Linkedin, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { generateBrochurePDF } from '../utils/pdfGenerator';
import { dispatchEmail } from '../utils/emailService';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      try {
        await dispatchEmail({
          subject: `SECONDESK — New Newsletter Subscription: ${email}`,
          fields: {
            'Subscriber Email': email,
            'Subscription Type': 'Monthly Insights Dispatch',
          },
        });
      } catch (err) {
        console.error('Failed to subscribe', err);
      } finally {
        setIsSubmitting(false);
        setSubscribed(true);
        setEmail('');
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-white pt-24 pb-12 border-t border-concrete/10 relative overflow-hidden">
      {/* Subtle architectural grid lines in background */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="max-w-[1440px] mx-auto h-full grid grid-cols-12 px-12">
          {[...Array(13)].map((_, i) => (
            <div key={i} className="h-full border-r border-white/20 last:border-r-0"></div>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-2.5 mb-6 cursor-pointer bg-white px-4 py-2 rounded-xl shadow-xs border border-white/20" onClick={() => navigate('/')}>
              <Logo size={36} light={false} />
              <span className="font-display text-xl uppercase flex items-center tracking-[0.12em] font-black" style={{ fontWeight: 900 }}>
                <span className="text-charcoal">SECON</span>
                <span className="text-[#E31B23]">DESK</span>
              </span>
            </div>
            <p className="font-sans text-sm text-white/60 mb-6 max-w-sm leading-relaxed">
              Where Great Work Finds Its Place. Premium flexible workspaces, private office suites, and meeting facilities in Mombasa.
            </p>
            <div className="space-y-2 mb-6 text-xs text-white/80 font-sans border-l-2 border-[#E31B23] pl-3 py-1 bg-white/5 rounded-r">
              <p className="font-medium text-white flex items-center gap-2">
                <span className="text-[#E31B23] font-bold">Call:</span> 0719688992 / +254 719 688 992
              </p>
              <p className="text-white/70">
                <span className="text-white font-medium">Mon - Fri:</span> 8:00 AM - 8:00 PM
              </p>
              <p className="text-white/70">
                <span className="text-white font-medium">Saturday:</span> 9:00 AM - 1:00 PM | <span className="text-white/50">Sunday: Closed</span>
              </p>
              <p className="text-white/70">
                <span className="text-white font-medium">Email:</span> info@secondesk.ke
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full border border-white/10 hover:border-sand flex items-center justify-center text-white/60 hover:text-sand transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/secondesknyali" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full border border-white/10 hover:border-sand flex items-center justify-center text-white/60 hover:text-sand transition-all"
                aria-label="Instagram (@secondesknyali)"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@secondesknyali" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full border border-white/10 hover:border-sand flex items-center justify-center text-white/60 hover:text-sand transition-all"
                aria-label="TikTok (@secondesknyali)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.8a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 12a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.05a8.21 8.21 0 0 0 4.91 1.62v-3.48a4.85 4.85 0 0 1-1-.5z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-xs font-semibold uppercase tracking-widest text-sand mb-6">Workspace</h4>
            <ul className="space-y-3">
              {[
                { name: 'Shared Co-Working Space', slug: 'coworking' },
                { name: 'Private Office Suites', slug: 'private-offices' },
                { name: 'Meeting Room (Max 4)', slug: 'meeting-room' },
                { name: 'Executive Boardroom (Max 10)', slug: 'boardroom' },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate('/workspace')}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Column */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-xs font-semibold uppercase tracking-widest text-sand mb-6">Location</h4>
            <ul className="space-y-3">
              {[
                { name: 'Nyali Executive Hub', id: 'nyali' },
              ].map((loc) => (
                <li key={loc.id}>
                  <button
                    onClick={() => navigate(`/locations/${loc.id}`)}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {loc.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-xs font-semibold uppercase tracking-widest text-sand mb-6">Company</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Official Price List', path: '/pricing' },
                { name: 'Book a Tour', path: '/book-tour' },
                { name: 'Contact Sales', path: '/contact' },
                { name: 'Download Brochure', path: 'download_pdf_brochure' },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      if (link.path === 'download_pdf_brochure') {
                        generateBrochurePDF();
                      } else {
                        navigate(link.path);
                      }
                    }}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter signup */}
          <div className="lg:col-span-2 flex flex-col justify-start">
            <h4 className="font-display text-xs font-semibold uppercase tracking-widest text-sand mb-6">Insights Dispatch</h4>
            <p className="font-sans text-xs text-white/60 mb-4 leading-relaxed">
              Receive architectural insights, local entrepreneur profiles, and regional networking schedules monthly.
            </p>
            {subscribed ? (
              <div className="p-4 bg-white/5 border border-sand/30 rounded-lg text-xs text-sand">
                Thank you for subscribing. We will keep you updated.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative mt-2">
                <input
                  type="email"
                  required
                  placeholder="Your professional email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-sand rounded-none px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-hidden transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-white/60 hover:text-sand transition-colors cursor-pointer"
                  aria-label="Submit newsletter"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Divider and bottom footer section */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <span className="font-sans text-xs text-white/40">
              © {new Date().getFullYear()} Secondesk Ltd. All Rights Reserved.
            </span>
            <span className="font-sans text-xs text-white/40">
              Developed by <a href="https://wa.me/254724454757" target="_blank" rel="noreferrer" className="text-sand/90 underline hover:text-white transition-colors">KKDES</a>
            </span>
            <button
              onClick={() => navigate('/privacy')}
              className="font-sans text-xs text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('/terms')}
              className="font-sans text-xs text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-display font-medium text-white/40 hover:text-sand transition-all group cursor-pointer"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-sand flex items-center justify-center transition-all">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
