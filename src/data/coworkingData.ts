import {
  WorkspaceCategory,
  LocationData,
  BlogPost,
  CommunityEvent,
  FAQItem,
  Testimonial,
  WorkspaceSolution,
} from '../types';

export const workspaceCategories: WorkspaceCategory[] = [
  {
    id: 'coworking',
    name: 'Coworking',
    tagline: 'Flexible Hot Desks',
    description: 'Flexible desks for freelancers, remote workers, and entrepreneurs who value community and adaptability.',
    longDescription: 'Our open-plan coworking spaces are designed to inspire focus and collaboration. Step into a dynamic ecosystem of like-minded professionals, where hot desking allows you to choose your ideal spot every single day. Framed by expansive floor-to-ceiling windows, bespoke ergonomic seating, and vibrant greenery, it is the ultimate environment for deep work or creative brainstorming.',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200',
    capacity: 'Single Desk (Flexible)',
    startingPrice: 'KES 25,000 / mo',
    amenities: ['24/7 Secure Access', 'High-Speed Wi-Fi 6', 'Premium Coffee & Teas', 'Phone Booth Access', 'Daily Cleaning'],
    features: ['Access to shared lounge areas', 'Credits for meeting rooms', 'Invitations to networking events', 'Flexible day-to-day seat selection'],
    slug: 'coworking',
  },
  {
    id: 'dedicated-desk',
    name: 'Dedicated Desk',
    tagline: 'Your Permanent Desk',
    description: 'A permanent workspace with secure storage and premium access in a shared professional environment.',
    longDescription: 'Establish your professional base with a desk that is yours and yours alone. Located in a secured, quieter zone of the building, each dedicated desk features premium ergonomic setups, locking storage drawer cabinets, and personalized power strips. You get all the benefits of our active community with the stability of a permanent, quiet, and consistent daily workstation.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
    capacity: '1 Person',
    startingPrice: 'KES 38,000 / mo',
    amenities: ['Permanent Desk & Ergonomic Chair', 'Lockable Storage Cabinet', 'Business Address Registration', '24/7 Premium Access', 'Free B&W Printing'],
    features: ['Personalized mail handling', 'Higher monthly meeting room credits', 'Permanent Ethernet/Wi-Fi connection', 'Dedicated storage safety'],
    slug: 'dedicated-desks',
  },
  {
    id: 'private-office',
    name: 'Private Offices',
    tagline: 'Move-In-Ready Office Suites',
    description: 'Enclosed, fully furnished offices for teams of every size with customized layouts and high security.',
    longDescription: 'Designed for startups, established businesses, and remote corporate hubs who require privacy, security, and prestige. Our private office suites are premium glass-enclosed structures that offer physical confidentiality without isolating you from the energy of the wider community. Fully furnished with modular desks and premium task chairs, they can be customized to match your company branding.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    capacity: '2 to 50+ People',
    startingPrice: 'KES 95,000 / mo',
    amenities: ['Fully Furnished Lockable Suite', 'Customizable Layout & Branding', 'Dedicated Ethernet Line', 'Executive Reception Services', 'Daily Dedicated Office Cleaning'],
    features: ['High-volume meeting room credits', 'Individual Climate Control (AC)', 'Logo on office door and directory board', 'Access to premium boardrooms'],
    slug: 'private-offices',
  },
  {
    id: 'meeting-rooms',
    name: 'Meeting Rooms',
    tagline: 'Design-Led Collaborative Spaces',
    description: 'Professional boardrooms and meeting spaces equipped for presentations, interviews, and client pitches.',
    longDescription: 'Leave a lasting impression on clients, investors, or your own team with our professionally curated conference and meeting rooms. Outfitted with high-resolution video conferencing bars, dynamic acoustic panels, whiteboards, and high-speed presentations screens. Fully supported by our hospitality staff, refreshments and printing needs are handled seamlessly.',
    image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=1200',
    capacity: '4 to 20 People',
    startingPrice: 'KES 2,500 / hr',
    amenities: ['4K Interactive Presentation Screens', 'Studio-Grade Video Bars', 'Magnetic Whiteboards', 'Premium Mineral Water', 'High-Speed Fiber Connectivity'],
    features: ['Comfortable task seating', 'Catering service available upon request', 'Dimmable mood lighting', 'Soundproof architectural glass'],
    slug: 'meeting-rooms',
  },
  {
    id: 'virtual-office',
    name: 'Virtual Office',
    tagline: 'Prestigious Business Presence',
    description: 'Professional business address, secure mail handling, and on-demand access to physical workspaces.',
    longDescription: 'Establish a powerful local presence in premium commercial centers without the cost of full-time office rental. Ideal for remote companies, consultants, and international firms entering the Kenyan market. Our Virtual Office package provides a prestigious commercial street address, secure mail receiving and digital scanning, local phone answering, and on-demand hot desk access.',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=1200',
    capacity: 'Flexible Remote',
    startingPrice: 'KES 10,000 / mo',
    amenities: ['Prestigious Business Address', 'Digital Mail Scanning & Forwarding', 'Local Phone Number (Optional)', 'Lobby Directory Listing', 'Discounts on Daily Passes'],
    features: ['Use of address for legal & tax filings', 'Mail arrival text notifications', 'Secure cloud storage for digital scans', 'Professional reception presence'],
    slug: 'virtual-offices',
  },
  {
    id: 'event-space',
    name: 'Event Space',
    tagline: 'Elegant Architectural Venues',
    description: 'Spacious, high-end venues designed for panel talks, product launches, workshops, and cocktail mixers.',
    longDescription: 'Elevate your next event with our visually stunning, fully customizable corporate venues. Host networking mixers, educational workshops, design showcases, or formal presentations in an architectural setting that commands attention. Equipped with cutting-edge sound systems, stage lighting, versatile seating arrangements, and a fully serviced espresso bar and kitchen.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
    capacity: 'Up to 120 People',
    startingPrice: 'KES 15,000 / hr',
    amenities: ['Pro-Grade Audio System & Mics', 'Full-Scale HD Projectors', 'Serviced Coffee & Wine Bar', 'Versatile Seating & Podiums', 'Dedicated Event Coordinator'],
    features: ['Flexible layout configurations', 'Pre-event setup and post-event cleanup', 'Assistance with external caterers', 'Warm minimalist ambient lighting'],
    slug: 'event-spaces',
  }
];

export const workspaceSolutions: WorkspaceSolution[] = [
  {
    id: 'freelancers',
    targetAudience: 'Freelancers & Solopreneurs',
    challenge: 'Isolation, inconsistent internet, lack of a formal client meeting setting, and home office distractions.',
    solution: 'We offer an inspiring, community-driven hot desking network that provides standard-setting enterprise facilities, premium printing, and beautiful open lounges.',
    recommendation: 'Coworking Hot Desk or Dedicated Desk with flexible monthly commitments.',
    benefits: ['Collaborative networking', 'Premium coffee & espresso bar', 'Professional presentation environments', 'Low overhead expenses'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'startups',
    targetAudience: 'Startups & Scaleups',
    challenge: 'Unpredictable team growth, lack of capital for long-term commercial leases, and time wasted managing operations.',
    solution: 'Second Desk handles everything—high-speed internet, security, printing, cleaning, and guest reception—so you can focus 100% on building your product.',
    recommendation: 'Private Office Suites with flexible month-to-month contracts.',
    benefits: ['Ultra-flexible scaling', 'Full operational support', 'Access to investor and mentorship meetups', 'Talent-attracting architectural design'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'remote-teams',
    targetAudience: 'Remote & Hybrid Teams',
    challenge: 'Team fragmentation, maintaining shared culture, and ensuring secure connection environments.',
    solution: 'Establish a central workspace hub where remote team members can gather, conduct whiteboarding sessions, and work together in beautiful glass-enclosed spaces.',
    recommendation: 'Hybrid Private Office or Team Coworking Passes.',
    benefits: ['Dedicated secure Ethernet lines', 'Boosted collaboration and synergy', 'Prestigious business physical base', 'Access to high-spec meeting rooms'],
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'smes-agencies',
    targetAudience: 'SMEs & Agencies',
    challenge: 'High cost of commercial fit-outs, maintenance staff recruitment, and utility backup solutions.',
    solution: 'Second Desk provides ready-to-use, premium glass-fronted offices supported by 100% stable generator power, modern server rooms, and client-facing reception services.',
    recommendation: 'Premium Office Suites (5 to 15 person layouts).',
    benefits: ['Zero capital expenditure for office buildout', 'Uninterrupted power and water backup', 'Receptionists greeting your clients', 'Branded directory placement'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'enterprise',
    targetAudience: 'Enterprise & Multinational Companies',
    challenge: 'Establishing a premium regional headquarters, high regulatory hurdles, and localized operational risks.',
    solution: 'We customize high-security corporate wings with dedicated executive suites, separate printing stations, and priority access to boardroom facilities.',
    recommendation: 'Custom Enterprise Wings or Full-Floor Corporate Suites.',
    benefits: ['Enterprise-grade IT firewalls', 'Dedicated receptionist & custom secure access control', 'Pre-vetted regional team compliance', 'Global reciprocal network access'],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600'
  }
];

export const locations: LocationData[] = [
  {
    id: 'westlands',
    name: 'Westlands',
    neighborhood: 'Almont Towers, Westlands',
    address: '8th & 9th Floor, Almont Towers, Church Road, Westlands, Nairobi',
    phone: '+254 700 120 001',
    email: 'westlands@seconddesk.co',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8413693240217!2d36.80211561533261!3d-1.2614539990800635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1741ca6cc3f1%3A0xd6891cc774fcf373!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1655112233445!5m2!1sen!2ske',
    startingPrice: 'KES 25,000 / mo',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    nearbyLandmarks: ['Sarit Centre Mall', 'Westgate Shopping Mall', 'GTC Tower', 'Mövenpick Hotel'],
    spacesAvailable: ['Coworking Hot Desks', 'Dedicated Desks', 'Private Offices', 'Meeting Rooms', 'Event Spaces'],
    amenities: ['Artisanal Espresso Bar', 'Dual backup generators', 'Valet parking options', 'Rooftop garden terrace', 'Lactation & wellness room'],
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'kilimani',
    name: 'Kilimani',
    neighborhood: 'The Pavilion, Kilimani',
    address: '4th & 5th Floor, The Pavilion, Lenana Road, Kilimani, Nairobi',
    phone: '+254 700 120 002',
    email: 'kilimani@seconddesk.co',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8188173426095!2d36.79092491533261!3d-1.2882199990605156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17218b08cd63%3A0xe54b9f2b8ba3737b!2sKilimani%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1655112255445!5m2!1sen!2ske',
    startingPrice: 'KES 22,000 / mo',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200',
    nearbyLandmarks: ['Yaya Centre Mall', 'Adlife Plaza', 'Hurlingham Commercial Center', 'French Cultural Center'],
    spacesAvailable: ['Coworking Hot Desks', 'Dedicated Desks', 'Private Offices', 'Meeting Rooms'],
    amenities: ['Quiet study library', 'Lush interior plants & air purifiers', 'Dedicated bike racks', 'Organic juice & tea station', 'Outdoor sun deck'],
    gallery: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'karen',
    name: 'Karen',
    neighborhood: 'The Greenery, Karen',
    address: 'Ground & 1st Floor, The Greenery, Ngong Road, Karen, Nairobi',
    phone: '+254 700 120 003',
    email: 'karen@seconddesk.co',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.751333791053!2d36.70295241533261!3d-1.3256039990326463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1bc2cc724a87%3A0xe54b9f2b8ba3737b!2sKaren%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1655112277445!5m2!1sen!2ske',
    startingPrice: 'KES 30,000 / mo',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200',
    nearbyLandmarks: ['The Hub Karen Mall', 'Karen Country Club', 'Waterfront Mall Karen', 'Karen Blixen Museum'],
    spacesAvailable: ['Coworking Hot Desks', 'Dedicated Desks', 'Premium Private Suites', 'Boardrooms', 'Event Spaces'],
    amenities: ['Extensive private park & gardens', 'On-site premium fitness gym', 'Artistic lounge with fireplace', 'Tesla charging stations', 'Gourmet restaurant partnership'],
    gallery: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'upper-hill',
    name: 'Upper Hill',
    neighborhood: 'Altitude Corporate Tower, Upper Hill',
    address: '15th & 16th Floor, Altitude Corporate Tower, Hospital Road, Upper Hill, Nairobi',
    phone: '+254 700 120 004',
    email: 'upperhill@seconddesk.co',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8091823426095!2d36.81592491533261!3d-1.2982199990605156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17218b08cd63%3A0xe54b9f2b8ba3737b!2sUpper%20Hill%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1655112299445!5m2!1sen!2ske',
    startingPrice: 'KES 28,000 / mo',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
    nearbyLandmarks: ['Britam Tower', 'KCB Towers', 'Radisson Blu Hotel Upper Hill', 'Nairobi Club'],
    spacesAvailable: ['Executive Offices', 'Enterprise Suites', 'Boardrooms', 'Private Desks'],
    amenities: ['Skyline panorama business lounge', 'Dedicated server-room racks', 'Secured fingerprint biometric access', 'Helipad accessibility', 'Premium leather boardroom interiors'],
    gallery: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'cbd',
    name: 'CBD',
    neighborhood: 'Legacy Plaza, CBD',
    address: '3rd & 4th Floor, Legacy Plaza, Kenyatta Avenue, Nairobi',
    phone: '+254 700 120 005',
    email: 'cbd@seconddesk.co',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8188173426095!2d36.82292491533261!3d-1.2882199990605156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17218b08cd63%3A0xe54b9f2b8ba3737b!2sNairobi%20CBD!5e0!3m2!1sen!2ske!4v1655112311445!5m2!1sen!2ske',
    startingPrice: 'KES 20,000 / mo',
    image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=1200',
    nearbyLandmarks: ['Nairobi Gallery', 'General Post Office (GPO)', 'Central Park', 'Sarova Stanley Hotel'],
    spacesAvailable: ['Coworking Hot Desks', 'Dedicated Desks', 'Private Offices', 'Meeting Rooms'],
    amenities: ['Soundproof interview pods', 'Expansive business address service', 'Central secure public transit access', 'Premium postal mailboxes', 'Daily catering cafeteria'],
    gallery: [
      'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=600'
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: "Second Desk completely elevated our agency. The beautiful, architectural environment signals trust and high capability to every client we host here, and the facilities are flawlessly managed.",
    author: "Wanjiku Njoroge",
    role: "Founder & Creative Director",
    company: "Sura Creative",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 't2',
    quote: "With a growing distributed remote team, maintaining a sense of culture is hard. The hybrid office suites we rent at Second Desk Westlands give us an incredible base to connect and align.",
    author: "Amir Osei",
    role: "VP of Engineering",
    company: "FintechOne East Africa",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 't3',
    quote: "The quiet dedicated desks and premium coffee are what keep me focused. But the true game-changer is the robust community—investor meetups here connected me to our seed-round lead.",
    author: "Sarah Welime",
    role: "Co-Founder",
    company: "SokoFlow",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Future of Shared Workspaces: Designing for Privacy & Collaboration',
    excerpt: 'Explore how top-tier spatial designers are blending open lounge acoustics with private office modularity to boost productivity.',
    content: 'The workspace landscape is undergoing a silent revolution. Long gone are the days of fluorescent-lit rows of identical cubicles, but so are the days of the chaotic open-plan startup playroom. Today, ambitious businesses require architectural integrity. They need spaces that foster quiet focus when desired, and structured collaboration when teams need to align.\n\nAt Second Desk, our architectural team spends months studying spatial density. We have found that the optimal layout utilizes a 60/40 design rule: 60% of square footage dedicated to enclosed, high-acoustic privacy suites and dedicated desks, and 40% curated as beautiful public lobbies, libraries, coffee stations, and garden terraces. This dualism allows professionals to transition smoothly from head-down work to high-energy community events.',
    category: 'Workspace Design',
    author: {
      name: 'Elena Rostova',
      role: 'Head of Architectural Design',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
    },
    date: 'June 28, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
    featured: true
  },
  {
    id: 'b2',
    title: 'How Startups Can Utilize Hybrid Office Models to Minimize Runways',
    excerpt: 'Commercial real estate commitments shouldn’t kill your startup. Discover how flexible monthly office models are helping scale-ups survive.',
    content: 'One of the largest liabilities on a growing startup balance sheet is long-term commercial lease commitments. When you commit to a 5-year office lease, you are gambling on your growth rate being linear. If you grow faster, you outgrow the space and pay breaking fees. If you scale back, you pay for empty desks.\n\nOur startup members utilize Private Office Suites as an operational strategy. Under a single monthly billing line, they receive a fully configured, high-security glass office that can scale from 5 to 20 seats overnight. Operational overhead like water, security, electricity, and premium reception are completely managed, allowing founders to run lean and redirect core capital into active product R&D.',
    category: 'Startups',
    author: {
      name: 'David Mwangi',
      role: 'Business Strategy Advisor',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100'
    },
    date: 'June 14, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b3',
    title: 'Solitude vs. Focus: Cultivating Mental Clarity in Modern Workflows',
    excerpt: 'The psychological toll of home isolation can sap creative juices. How micro-interactions in architectural spaces restore mental stamina.',
    content: 'Work from home was sold as a perfect utopia of pajamas and zero commute. However, four years into the mass remote work experiment, the cracks are widening. Solitary work at home often leads to cognitive fatigue, blurred lines between work and life, and deep professional isolation.\n\nHuman brains are wired to perform better under low-stakes social presence. Known as "social facilitation", working alongside other focused individuals—even if you are not actively speaking to them—naturally boosts motivation and attention span. A curated, aesthetic environment like Second Desk acts as an outer container for focus. The gentle low hum of the espresso bar, the sight of others creating, and the physical transition of "going to work" restore a crisp psychological structure to your daily workflow.',
    category: 'Productivity',
    author: {
      name: 'Dr. Clara Patel',
      role: 'Occupational Psychologist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
    },
    date: 'May 29, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b4',
    title: 'The Digital Nomad Trend in East Africa: Nairobi as the Central Hub',
    excerpt: 'Why international tech leaders, creators, and entrepreneurs are selecting Nairobi as their central headquarters.',
    content: 'Nairobi has earned its title as the "Silicon Savannah" through continuous tech innovation and business leadership. In recent years, a new wave of international creators, digital nomads, and global tech executives are migrating to the city. Nairobi offers unparalleled access to dynamic talent, a central geographical time zone for European and US markets, and incredible natural lifestyle features.\n\nSecond Desk acts as a physical landing pad for this global cohort. With multi-point locations across Westlands, Kilimani, and Karen, international teams can deploy high-spec secure nodes instantly, connecting directly to the local business elite via our structured investor breakfasts and workshop sessions.',
    category: 'Remote Work',
    author: {
      name: 'Kamau Gicheru',
      role: 'East Africa Technology Reporter',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
    },
    date: 'May 10, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600'
  }
];

export const communityEvents: CommunityEvent[] = [
  {
    id: 'e1',
    title: 'Founder Talk: Navigating Seed-to-Series-A in Africa',
    description: 'An intimate fireside chat with two of Nairobi’s prominent tech founders sharing hard-won lessons on scaling, market expansion, and regional venture fundraising.',
    date: 'July 15, 2026',
    time: '08:30 AM - 10:30 AM',
    type: 'Founder Talks',
    speaker: 'Nelly Nduta & Patrick Korir',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'e2',
    title: 'Monthly Investor Pitch Breakfast',
    description: 'A closed-door, curated pitch session connecting three high-growth startups from the Second Desk ecosystem with leading regional angel networks and VC funds.',
    date: 'July 22, 2026',
    time: '08:00 AM - 11:00 AM',
    type: 'Investor Meetups',
    speaker: 'Featured VC Panelists',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'e3',
    title: 'Spatial Architecture & Product Design Masterclass',
    description: 'Delve into the psychology of physical spaces and modern digital interface aesthetics. A masterclass tailored for design agencies, UI/UX researchers, and architects.',
    date: 'August 05, 2026',
    time: '02:00 PM - 05:00 PM',
    type: 'Workshops',
    speaker: 'Elena Rostova & Guest Designers',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'e4',
    title: 'Executive Community Dinner',
    description: 'An elegant, curated 3-course networking dinner on the outdoor terrace for our SME and Enterprise office members to foster inter-industry collaborations.',
    date: 'August 12, 2026',
    time: '07:00 PM - 10:00 PM',
    type: 'Community Dinners',
    speaker: 'Invite Only',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600'
  }
];

export const faqs: FAQItem[] = [
  {
    question: "What is included in a Coworking Hot Desk membership?",
    answer: "Our Hot Desk membership includes 24/7 access to all open-plan workspaces, ultra-fast Wi-Fi, premium coffee/tea and refreshments, use of private phone booths for confidential calls, full utility backups, and access to all standard community networking events. You also receive 10 complimentary meeting room credits per month."
  },
  {
    question: "Can I try out the space before committing to a membership?",
    answer: "Absolutely. We encourage you to book a personal architectural tour with our community team. Following your tour, we are happy to provide a complimentary Day Pass so you can fully experience our amenities, seat comfort, high-speed fiber internet, and espresso bar before signing up."
  },
  {
    question: "How do flexible monthly workspace commitments work?",
    answer: "Most of our memberships—including Hot Desks, Dedicated Desks, and select Private Office configurations—are billed on a convenient month-to-month basis. There are no heavy lock-in commitments. If your team needs change, simply provide us with a 30-day notice prior to your next billing cycle."
  },
  {
    question: "How do you guarantee power and internet stability?",
    answer: "We understand that constant connectivity is non-negotiable for business. All Second Desk locations are fully equipped with automatic dual-diesel generators that kick in within 3 seconds of a power disruption. Additionally, we use redundant high-speed fiber internet backbones from separate Tier-1 service providers to ensure 99.9% uptime."
  },
  {
    question: "Are meeting rooms accessible to non-members?",
    answer: "Yes, our high-spec meeting rooms, boardrooms, and event spaces are open for external booking by non-members on an hourly or daily rate. Members enjoy significant discounts and priority reservation via the Second Desk platform using their monthly included credits."
  },
  {
    question: "Is there secure parking available at Second Desk locations?",
    answer: "Yes. All our host properties (such as Almont Towers and Legacy Plaza) feature multi-level secure parking garages with 24/7 CCTV monitoring, automated ticketing, and dedicated security guards. We offer both casual visitor parking and discounted monthly parking passes for members."
  }
];
