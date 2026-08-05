import React from 'react';
import { useRouter } from '../context/NavigationContext';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import mombasaOffice1 from '../assets/images/mombasa_office_1.jpg';

export const About: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="bg-offwhite text-charcoal pt-20 animate-fade-in">
      <SEO 
        title="About Us | Premium Workspaces in Mombasa"
        description="Learn about SecondDesk's mission to redefine professional workspaces in Mombasa, Kenya. Merging high-end hospitality, pristine design, and seamless technology."
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
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">About Second Desk</span>
            <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              Our Mission & <span className="font-serif italic text-sand">Origin Story.</span>
            </h1>
            <p className="font-sans text-white/75 text-base sm:text-lg leading-relaxed max-w-xl">
              We build premium, design-led, fully managed environments where ambitious businesses can scale operations without the friction of commercial real estate.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 hover-zoom-container bg-concrete border border-concrete shadow-sm">
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src={mombasaOffice1} 
              alt="SecondDesk Mombasa physical workspace" 
              className="w-full h-full object-cover hover-zoom-image"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 lg:pl-8">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-sand">The Origin</span>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight">
            Demolishing Rigid Office Leases
          </h2>
          <div className="space-y-4 font-sans text-sm text-charcoal/70 leading-relaxed font-light">
            <p>
              Second Desk was conceived inside a breezy coastal coffee shop in Mombasa. Our founders, Wainaina and Elena, were trying to finalize design blueprints for a new commercial block. They realized that Mombasa’s ambitious startups, remote tech units, and maritime agencies faced a binary choice: sign rigid, cash-draining 5-year commercial leases and manage cleanups, security, and power setups themselves; or work out of chaotic cafes or low-prestige shared structures that fail to signal trust.
            </p>
            <p>
              They believed there had to be a better container for focus. They resolved to combine <strong>world-class modular architecture</strong>, rock-solid infrastructure (generators and fiber optic networks), and premium executive hospitality under a streamlined monthly pass. 
            </p>
            <p>
              Today, Second Desk hosts over 500 active professional members across Mombasa. We handle everything—operation, security, reception, and coffee—so creators can focus fully on doing what they do best.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-concrete">
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-sand font-bold mb-1">Our Mission</h4>
              <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
                To build fully serviced, design-led physical environments that elevate focus, productivity, and regional business trust.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-sand font-bold mb-1">Our Vision</h4>
              <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
                To become the central physical network hub for ambitious enterprise teams and startups expanding operations across East Africa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default About;
