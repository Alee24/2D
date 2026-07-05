import React from 'react';
import { useRouter } from '../context/NavigationContext';
import { ShieldCheck, Heart, Sparkles, Award, Star, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const About: React.FC = () => {
  const { navigate } = useRouter();

  const values = [
    { title: 'Quality', icon: Award, desc: 'Every architectural finish, acoustic insulation, and barista bean must meet the highest global design standard.' },
    { title: 'Community', icon: Heart, desc: 'We foster deep, collaborative, professional ecosystems based on mutual respect, trust, and business development.' },
    { title: 'Innovation', icon: Sparkles, desc: 'Utilizing robust technical power backups, premium IT fiber networks, and continuous workspace custom modifications.' },
    { title: 'Professionalism', icon: ShieldCheck, desc: 'We run a tight ship. Our operational managers ensure your day-to-day workspace experience runs with flawless execution.' },
    { title: 'Flexibility', icon: Star, desc: 'Agile scale-friendly workspace solutions designed to align with dynamic business models and team fluctuations.' }
  ];

  const milestones = [
    { year: '2022', title: 'Founding Concept', desc: 'Second Desk is established in Westlands, Nairobi with a singular mission—shattering rigid commercial office leases with architectural coworking wings.' },
    { year: '2023', title: 'Ecosystem Launch', desc: 'Opening of Westlands Almont Towers and Kilimani Pavilion nodes, onboarding 200+ active freelancers, startups, and consulting firms.' },
    { year: '2024', title: 'Corporate Expansion', desc: 'Unveiling of high-end Private Suites inside Upper Hill Altitude Corporate Tower, establishing dedicated server infrastructures and corporate wings.' },
    { year: '2025', title: 'Karen Greenery & CBD Legacy', desc: 'Securing two highly premium properties in Karen and Nairobi CBD, expanding physical footprint to 5 premium multi-point nodes.' },
    { year: '2026', title: 'Global Reciprocal Node', desc: 'Launching the unified regional workspace pass, allowing enterprise members to book spaces across all locations in East Africa instantly.' }
  ];

  const leadership = [
    {
      name: 'Wainaina Gitau',
      role: 'Co-Founder & Chief Executive Officer',
      bio: 'Former commercial real estate director with 15+ years of experience structuring regional development investments across East Africa.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Architectural Design',
      bio: 'Award-winning spatial architect dedicated to formulating high-acoustic modular privacy structures and warm, minimalist interiors.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300'
    },
    {
      name: 'Muna Abdi',
      role: 'Director of Community & Operations',
      bio: 'Venture scale coordinator specializing in launching professional hospitality ecosystems, corporate accelerators, and peer masterminds.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
    }
  ];

  return (
    <div className="bg-offwhite text-charcoal pt-20 animate-fade-in">
      <SEO 
        title="About Us | Premium Workspaces in Nairobi"
        description="Learn about SecondDesk's mission to redefine professional workspaces in Kenya. Merging high-end hospitality, pristine design, and seamless technology."
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
              Our Mission, Story & <span className="font-serif italic text-sand">Values.</span>
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
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" 
              alt="Architectural boardroom interior" 
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
              Second Desk was conceived inside a noisy, cramped coffee shop in Nairobi. Our founders, Wainaina and Elena, were trying to finalize design blueprints for a new commercial block. They realized that Nairobi’s ambitious startups, remote tech units, and agencies faced a binary choice: sign rigid, cash-draining 5-year commercial leases and manage cleanups, security, and power setups themselves; or work out of chaotic cafes or low-prestige shared structures that fail to signal trust.
            </p>
            <p>
              They believed there had to be a better container for focus. They resolved to combine <strong>world-class modular architecture</strong>, rock-solid infrastructure (generators and fiber optic networks), and premium executive hospitality under a streamlined monthly pass. 
            </p>
            <p>
              Today, Second Desk hosts over 500 active professional members across Nairobi. We handle everything—operation, security, reception, and coffee—so creators can focus fully on doing what they do best.
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

      {/* Brand Values Section */}
      <section className="py-24 bg-white border-t border-b border-concrete">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-16">
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">Our DNA</span>
            <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight">
              Values That Guide Us
            </h2>
            <p className="font-sans text-xs text-charcoal/60 mt-3 leading-relaxed">
              We do not just rent physical desks; we manage a comprehensive service layer engineered to maintain extreme high-prestige consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="p-6 border border-concrete bg-offwhite/25 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center text-sand mb-6">
                    <v.icon className="w-4 h-4 text-charcoal" />
                  </div>
                  <h3 className="font-display font-semibold text-charcoal text-base mb-2">{v.title}</h3>
                  <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Timeline Section */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-12 border-b border-concrete">
        <div className="max-w-xl mb-16">
          <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">The Journey</span>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight">
            Our Timeline & Milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 border-t border-concrete pt-12 relative">
          {milestones.map((ms, idx) => (
            <div key={idx} className="space-y-4 relative">
              <span className="font-display font-bold text-3xl text-sand block leading-none">{ms.year}</span>
              <div className="w-2.5 h-2.5 rounded-full bg-charcoal absolute -top-14 left-0 border-2 border-white ring-4 ring-sand/20 hidden md:block"></div>
              <h3 className="font-display font-semibold text-charcoal text-sm">{ms.title}</h3>
              <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">{ms.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-16">
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">Our Core Team</span>
            <h2 className="font-display font-light text-3xl sm:text-4xl text-charcoal tracking-tight">
              The Leadership Group
            </h2>
            <p className="font-sans text-xs text-charcoal/60 mt-3 leading-relaxed">
              Meet the spatial architects, operational directors, and real estate specialists committed to executing our pristine brand experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {leadership.map((member, idx) => (
              <div key={idx} className="bg-offwhite border border-concrete hover:border-sand transition-all duration-300 overflow-hidden flex flex-col">
                <div className="aspect-square overflow-hidden bg-concrete">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-sand block mb-1">
                      {member.role}
                    </span>
                    <h3 className="font-display font-semibold text-charcoal text-base mb-3">{member.name}</h3>
                    <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light mb-6">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default About;
