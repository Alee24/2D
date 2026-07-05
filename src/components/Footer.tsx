import React, { useState } from 'react';
import { useRouter } from '../context/NavigationContext';
import { Mail, ArrowUp, Linkedin, Instagram, Facebook, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
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
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 flex items-center justify-center border border-sand bg-sand text-charcoal font-display font-extrabold text-sm tracking-wider">
                SD
              </div>
              <span className="font-display font-semibold tracking-[0.2em] text-lg uppercase text-white">
                Second Desk
              </span>
            </div>
            <p className="font-sans text-sm text-white/60 mb-8 max-w-sm leading-relaxed">
              Where Great Work Finds Its Place. Premium flexible workspaces designed for ambitious professionals and remote teams.
            </p>
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
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full border border-white/10 hover:border-sand flex items-center justify-center text-white/60 hover:text-sand transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full border border-white/10 hover:border-sand flex items-center justify-center text-white/60 hover:text-sand transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-xs font-semibold uppercase tracking-widest text-sand mb-6">Workspace</h4>
            <ul className="space-y-3">
              {[
                { name: 'Hot Desks', slug: 'coworking' },
                { name: 'Dedicated Desk', slug: 'dedicated-desks' },
                { name: 'Private Offices', slug: 'private-offices' },
                { name: 'Meeting Rooms', slug: 'meeting-rooms' },
                { name: 'Virtual Office', slug: 'virtual-offices' },
                { name: 'Event Space', slug: 'event-spaces' },
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
            <h4 className="font-display text-xs font-semibold uppercase tracking-widest text-sand mb-6">Locations</h4>
            <ul className="space-y-3">
              {[
                { name: 'Westlands', id: 'westlands' },
                { name: 'Kilimani', id: 'kilimani' },
                { name: 'Karen', id: 'karen' },
                { name: 'Upper Hill', id: 'upper-hill' },
                { name: 'CBD', id: 'cbd' },
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
                { name: 'Community Hub', path: '/community' },
                { name: 'Insights & Blog', path: '/insights' },
                { name: 'Careers', path: '/about' },
                { name: 'Book a Tour', path: '/book-tour' },
                { name: 'Contact Sales', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate(link.path)}
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
              © {new Date().getFullYear()} Second Desk Ltd. All Rights Reserved.
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
