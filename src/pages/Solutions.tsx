import React, { useState } from 'react';
import { useRouter } from '../context/NavigationContext';
import { Check, HelpCircle, Lightbulb, Compass, Award, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';

interface SolutionDetails {
  title: string;
  challenges: string;
  solution: string;
  recommendation: string;
  benefits: string[];
  image: string;
  quote: string;
}

export const Solutions: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedSolution, setSelectedSolution] = useState<string>('freelancers');

  const solutionsData: Record<string, SolutionDetails> = {
    freelancers: {
      title: 'Freelancers & Solopreneurs',
      challenges: 'Working from home often triggers deep professional isolation, inconsistent internet connectivity, lack of a prestigious meeting location for high-ticket client pitches, and domestic distractions.',
      solution: 'Second Desk provides a premium community ecosystem. Here, freelancers work alongside top developers, creators, and consultants. You get access to professional boardrooms, high-volume secure printers, and our artisanal coffee bars.',
      recommendation: 'Coworking Hot Desk or dedicated permanent desk setups on month-to-month terms.',
      benefits: [
        'Dynamic community networking with regional creators',
        'Use of prestigious address on corporate paperwork',
        'Complimentary included monthly meeting room credits',
        'Professional administrative receptionist support'
      ],
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
      quote: "Shattered my home office isolation. The energy here keeps my projects moving faster."
    },
    'remote-teams': {
      title: 'Remote & Distributed Teams',
      challenges: 'Fragmentation in team alignment, high technical overhead in coordinating hybrid workers, lack of reliable secure firewalls, and struggles in maintaining a cohesive shared corporate culture.',
      solution: 'Establish a central workspace node where team members can gather on-demand. Use our fully secure internet backbones and glass-enclosed collaboration rooms to hold sprints, brainstorms, or client presentations.',
      recommendation: 'Custom multi-pass packages or flexible Hybrid Private Offices.',
      benefits: [
        'Enterprise-grade secure fiber with dual backup redundancy',
        'A central physical hub to align hybrid employees',
        'On-site administrative and operational support',
        'Aesthetic workspaces that attract and retain top talent'
      ],
      image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=800',
      quote: "Gives our distributed engineering team a spectacular base to collaborate and sprint."
    },
    startups: {
      title: 'Startups & Scaleups',
      challenges: 'High capital expenditure in commercial fit-outs, long-term lease lock-ins that limit cash flexibility, and team size changing unpredictably after funding rounds.',
      solution: 'Ditch the heavy setup costs. We provide fully furnished, move-in-ready private office suites equipped with corporate-grade utilities, allowing you to focus 100% of capital on your core product or service growth.',
      recommendation: 'Private Office Suites with scale-friendly month-to-month billing terms.',
      benefits: [
        'Instantly add or subtract desks as team requirements evolve',
        'All utilities, cleaning, and security packaged in one invoice',
        'Direct pipeline connections to leading regional VCs and advisors',
        'Access to our closed-door pitching breakfasts'
      ],
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
      quote: "Bypassing a 5-year lease saved our capital for engineering hires."
    },
    smes: {
      title: 'Established SMEs',
      challenges: 'High cost of managing operational details, recruiting cleaning and reception staff, and setting up secure server-room networks or redundant power generators.',
      solution: 'Second Desk handles everything—executive receptionist services, cleaning, power backups, and mail processing—packaged neatly under a predictable, premium pricing line.',
      recommendation: 'Private Corporate Suites (10 to 30 desks).',
      benefits: [
        'Zero setup friction or capital outlay for office design',
        'Dedicated secure server rack space upon request',
        'Branded lobby signage and directory listing',
        'Full executive hospitality support for visiting board members'
      ],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      quote: "Reduced our office management overhead to zero so we can focus on core growth."
    },
    enterprise: {
      title: 'Enterprise & Corporations',
      challenges: 'Rigid commercial real estate portfolios, compliance with localized labor and safety standards, data security requirements, and high operational risk in scaling new regions.',
      solution: 'Establish a secure regional headquarters in custom-built corporate wings. We customize security systems, configure dedicated network firewall protocols, and provide localized compliance consulting.',
      recommendation: 'Bespoke Corporate Wings or Dedicated Floors.',
      benefits: [
        'Bank-grade network security and private server rooms',
        'Fully dedicated biometric entry points and security lines',
        'Compliant with regional real estate and labor practices',
        'Reciprocal premium network access globally'
      ],
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800',
      quote: "The highest levels of physical security and premium executive amenities."
    },
    agencies: {
      title: 'Agencies & Creative Studios',
      challenges: 'The need to impress demanding clients, high volume file transfer and printing needs, and an environment that fosters active collaborative brainstorming.',
      solution: 'Our design-centric lounges, magnetic whiteboards, and high-spec video presentation screens signal premium capability to your creative clients. Use high-speed color plotters and enjoy professional client hospitality.',
      recommendation: 'Glass-Partitioned Creative Office Suites.',
      benefits: [
        'Symmetrical high-volume file transfer internet speeds',
        'Aesthetic editorial interiors that inspire creative directors',
        'Fully serviced boardrooms for design presentations',
        'Barista support for client welcoming'
      ],
      image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=800',
      quote: "Clients are immediately impressed. The design details signal high capability."
    },
    consultants: {
      title: 'Consultants & Advisors',
      challenges: 'Inconsistent client meeting locations, variable schedules, needing private spaces for confidential reviews, and needing a prestigious central business mailing presence.',
      solution: 'Use our high-end private study pods, professional meeting boardrooms, and prestigious commercial address to signal corporate credibility and run audits or consultations securely.',
      recommendation: 'Virtual Office with Boardroom access credits.',
      benefits: [
        'Prestigious commercial street address for registrations',
        'Highly private acoustic study pods for quiet client audits',
        'Professional receptionist welcoming visiting corporate guests',
        'Secure scanning and digitizing of corporate mail'
      ],
      image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=800',
      quote: "The perfect corporate appearance with absolute privacy on-demand."
    },
    'law-firms': {
      title: 'Law Firms & Legal Advisors',
      challenges: 'Acoustic containment, high volume scanning and document secure filing, professional address requirements, and hosting high-stakes negotiations.',
      solution: 'We configure sound-masked, heavy-insulated private suites featuring locking physical files, secure network portals, and high-spec boardrooms tailored for contract reviews and arbitration.',
      recommendation: 'Insulated Private Office Suites or dedicated meeting rooms.',
      benefits: [
        'Sound-masked architectural walls for total conversation privacy',
        'Lockable office drawers and physical file cabinets',
        'Heavy-volume secure printers with secure badge release',
        'Prestige locations next to central courts and financial centers'
      ],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      quote: "Acoustically soundproofed, highly professional negotiation boardrooms."
    }
  };

  return (
    <div className="bg-offwhite text-charcoal pt-20 animate-fade-in">
      {/* Editorial Hero */}
      <section className="bg-charcoal text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="max-w-[1440px] mx-auto h-full grid grid-cols-12 px-12">
            {[...Array(13)].map((_, i) => (
              <div key={i} className="h-full border-r border-white/20 last:border-r-0"></div>
            ))}
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">Tailored Strategies</span>
            <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              Solutions for Every <br/><span className="font-serif italic text-sand">Workspace Strategy.</span>
            </h1>
            <p className="font-sans text-white/75 text-base sm:text-lg leading-relaxed max-w-xl">
              We calibrate physical layout, IT security infrastructure, and premium hospitality around the unique demands of your specific industry and team footprint.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Solutions Presentation */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Navigation: Audience Buttons */}
          <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-28 self-start">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-charcoal/40 block mb-4">Select Your Segment:</span>
            {Object.entries(solutionsData).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedSolution(key)}
                className={`w-full text-left font-display text-sm font-medium px-6 py-4.5 transition-all duration-300 border cursor-pointer flex items-center justify-between ${
                  selectedSolution === key
                    ? 'bg-charcoal border-charcoal text-white pl-8'
                    : 'bg-white border-concrete text-charcoal hover:border-sand hover:bg-offwhite'
                }`}
              >
                <span>{value.title}</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${selectedSolution === key ? 'translate-x-0 text-sand' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
              </button>
            ))}
          </div>

          {/* Right Presentation Panel */}
          <div className="lg:col-span-8 bg-white border border-concrete p-8 sm:p-12 shadow-xs space-y-10">
            {/* Heading and Image Preview */}
            <div className="space-y-6">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-sand">Bespoke Workspace Strategy</span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight">
                For {solutionsData[selectedSolution].title}
              </h2>
              
              <div className="aspect-video overflow-hidden bg-concrete border border-concrete/30 hover-zoom-container">
                <img 
                  src={solutionsData[selectedSolution].image} 
                  alt={solutionsData[selectedSolution].title}
                  className="w-full h-full object-cover hover-zoom-image"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Split layout: Challenge vs Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-concrete">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-charcoal/40">
                  <HelpCircle className="w-5 h-5 text-sand shrink-0" />
                  <span className="font-sans text-xs font-bold uppercase tracking-widest">The Challenge</span>
                </div>
                <p className="font-sans text-xs text-charcoal/70 leading-relaxed font-light">
                  {solutionsData[selectedSolution].challenges}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-charcoal/40">
                  <Lightbulb className="w-5 h-5 text-forest shrink-0" />
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-forest">The Solution</span>
                </div>
                <p className="font-sans text-xs text-charcoal/70 leading-relaxed font-light">
                  {solutionsData[selectedSolution].solution}
                </p>
              </div>
            </div>

            {/* Recomended configuration */}
            <div className="p-6 bg-offwhite border-l-4 border-sand space-y-2">
              <h4 className="font-display font-semibold text-charcoal text-sm flex items-center gap-2">
                <Compass className="w-4 h-4 text-charcoal" /> Recommended Setup:
              </h4>
              <p className="font-sans text-xs text-charcoal/80">
                {solutionsData[selectedSolution].recommendation}
              </p>
            </div>

            {/* Benefits Checklists */}
            <div className="space-y-4 pt-6 border-t border-concrete">
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal/40">Expected Core Benefits</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {solutionsData[selectedSolution].benefits.map((benefit, bidx) => (
                  <div key={bidx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-sand shrink-0 mt-0.5" />
                    <span className="font-sans text-xs text-charcoal/80 leading-normal">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial Quote */}
            <div className="pt-8 border-t border-concrete/60 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center text-charcoal shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <p className="font-serif italic text-sm text-charcoal/60">
                "{solutionsData[selectedSolution].quote}"
              </p>
            </div>

            {/* Premium CTA Panel */}
            <div className="pt-8 flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => navigate('/book-tour')}
                className="w-full sm:w-auto bg-charcoal border border-charcoal hover:bg-sand hover:border-sand hover:text-charcoal text-white font-sans text-xs font-bold uppercase tracking-widest px-8 py-4.5 transition-all cursor-pointer shadow-md text-center"
              >
                Book Tour for this Setup
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto border border-concrete hover:border-charcoal text-charcoal font-sans text-xs font-bold uppercase tracking-widest px-8 py-4.5 transition-all cursor-pointer text-center"
              >
                Request Custom Strategy
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Solutions;
