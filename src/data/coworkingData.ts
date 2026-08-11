import {
  WorkspaceCategory,
  LocationData,
  BlogPost,
  CommunityEvent,
  FAQItem,
  Testimonial,
  WorkspaceSolution,
} from '../types';

import westlandsImg from '../assets/images/nairobi_westlands_coworking_1783253639262.jpg';
import kilimaniImg from '../assets/images/nairobi_kilimani_workspace_1783253654765.jpg';
import karenImg from '../assets/images/nairobi_karen_greenery_1783253669175.jpg';
import upperHillImg from '../assets/images/nairobi_upper_hill_office_1783253682757.jpg';
import cbdImg from '../assets/images/nairobi_cbd_coworking_1783253697927.jpg';
import boardroomImg from '../assets/images/secondesk_boardroom.jpg';
import reception1Img from '../assets/images/secondesk_reception_1.jpg';
import reception2Img from '../assets/images/secondesk_reception_2.jpg';
import workspaceMainImg from '../assets/images/secondesk_workspace_main.jpg';
import pinpoint6Img from '../assets/images/pinpoint_studios_6.jpg';
import pinpoint17Img from '../assets/images/pinpoint_studios_17.jpg';
import pinpoint5Img from '../assets/images/pinpoint_studios_5.jpg';
import pinpoint15Img from '../assets/images/pinpoint_studios_15.jpg';

export const companyInfo = {
  name: 'SECONDESK',
  phone: '0719688992',
  phoneFormatted: '+254 719 688 992',
  email: 'info@secondesk.ke',
  website: 'www.secondesk.ke',
  hours: {
    weekdays: 'Mon - Fri: 8:00 AM - 8:00 PM',
    saturday: 'Saturday: 9:00 AM - 1:00 PM',
    sunday: 'Sunday: Closed'
  }
};

export const officialPriceList = {
  title: 'PRICE LIST',
  subtitle: 'CO-WORKING SPACES | OFFICE SUITES | MEETING FACILITIES',
  vatNotice: 'ALL RATES EXCLUDE 16% VAT',
  contact: {
    phone: '0719688992',
    email: 'info@secondesk.ke',
    website: 'www.secondesk.ke'
  },
  sections: [
    {
      id: 'office-suites',
      title: 'OFFICE SUITES (PRIVATE)',
      rates: [
        { name: 'Small Suite (11 sqm)', period: 'MONTHLY', price: 'KES 45,000' },
        { name: 'Medium Suite (14 sqm)', period: 'MONTHLY', price: 'KES 55,000' },
        { name: 'Large Suite (25 sqm)', period: 'MONTHLY', price: 'KES 65,000' },
      ]
    },
    {
      id: 'boardroom',
      title: 'BOARDROOM (MAX 10 GUESTS)',
      rates: [
        { name: 'Full Day', period: 'DAY', price: 'KES 12,000' },
        { name: 'Half Day', period: 'HALF DAY', price: 'KES 8,000' },
        { name: 'Hourly', period: 'HOURLY', price: 'KES 2,000' },
      ]
    },
    {
      id: 'shared-desks',
      title: 'SHARED CO-WORKING SPACE',
      rates: [
        { name: 'Monthly Seat', period: 'MONTHLY', price: 'KES 17,000' },
        { name: 'Day Pass (Common Area)', period: '8 HOURS', price: 'KES 1,700' },
        { name: 'Half-Day Pass', period: '4 HOURS', price: 'KES 1,200' },
        { name: 'Hourly Pass', period: 'HOURLY', price: 'KES 500' },
      ]
    },
    {
      id: 'meeting-room',
      title: 'MEETING ROOM (MAX 4 GUESTS)',
      rates: [
        { name: 'Hourly Rate', period: 'HOURLY', price: 'KES 1,500' },
      ]
    },
    {
      id: 'printing',
      title: 'PRINTING / COPYING / SCANNING',
      rates: [
        { name: 'Black and White', period: 'PER PAGE', price: 'KES 10' },
        { name: 'Colour', period: 'PER PAGE', price: 'KES 15' },
      ]
    },
    {
      id: 'zoom-rooms',
      title: 'ZOOM ROOMS',
      rates: [
        { name: 'Hourly Rate', period: 'HOURLY', price: 'KES 1,000' },
      ]
    }
  ]
};

export const workspaceCategories: WorkspaceCategory[] = [
  {
    id: 'coworking',
    name: 'Shared Co-Working Space',
    tagline: 'Book a Seat at Long Common Tables',
    description: 'Shared seats at long tables in the open common area for freelancers, remote workers, and independent creators.',
    longDescription: 'Our shared co-working space features open seating at long tables in the common area. Only office suites are private rooms. Enjoy vibrant community energy and one complimentary hot beverage during your stay.',
    image: pinpoint6Img,
    capacity: 'Single Seat (Common Area)',
    startingPrice: 'KES 17,000 / mo',
    amenities: ['24/7 Secure Access', 'High-Speed Wi-Fi 6', 'One Complimentary Hot Beverage', 'Daily Cleaning'],
    features: ['Monthly Rate: KES 17,000', 'Day Pass (8 Hours): KES 1,700', 'Half-Day Pass (4 Hours): KES 1,200', 'Hourly Pass: KES 500'],
    slug: 'coworking',
  },
  {
    id: 'private-office',
    name: 'Office Suites (Private)',
    tagline: 'Enclosed Unfurnished Lockable Office Suites',
    description: 'Enclosed, unfurnished, lockable private office suites for teams requiring total confidentiality and security.',
    longDescription: 'Only office suites are private enclosed, lockable spaces. Designed for teams requiring total confidentiality and security.',
    image: pinpoint5Img,
    capacity: 'Flexible Layout (Self-Allocated Space)',
    startingPrice: 'KES 45,000 / mo',
    amenities: ['Unfurnished Private Lockable Suite', 'Customizable Layout & Branding', 'Dedicated Ethernet Line', 'Executive Reception Services', 'Daily Office Cleaning'],
    features: ['Small Office Suite (11 sqm): KES 45,000 / mo', 'Medium Office Suite (14 sqm): KES 55,000 / mo', 'Large Office Suite (25 sqm): KES 65,000 / mo', 'Individual Climate Control'],
    slug: 'private-offices',
  },
  {
    id: 'meeting-room',
    name: 'Meeting Room',
    tagline: 'Intimate Collaboration (Max 4 Guests)',
    description: 'Intimate round-table meeting room designed for up to 4 guests, client presentations, and video conferencing.',
    longDescription: 'Designed for focused team syncs and client pitches. Our Meeting Room comfortably seats up to 4 guests around a round wooden table, equipped with presentation screens and fast dedicated internet.',
    image: pinpoint17Img,
    capacity: 'Max 4 Guests',
    startingPrice: 'KES 1,500 / hr',
    amenities: ['4K Presentation Screen', 'Studio Video Bar', 'Magnetic Whiteboard', 'One Complimentary Hot Beverage Per Guest', 'Fast Dedicated Internet'],
    features: ['Hourly Rate: KES 1,500 / hr', 'Half-Day Pass: KES 5,000', 'Full-Day Pass: KES 8,000', 'One Complimentary Hot Beverage Per Guest'],
    slug: 'meeting-room',
  },
  {
    id: 'boardroom',
    name: 'Executive Boardroom',
    tagline: 'High-Level Presentations & Conferences (Max 10 Guests)',
    description: 'Executive boardroom accommodating up to 10 guests for board meetings, strategic planning, and corporate presentations.',
    longDescription: 'Host executive board meetings and high-stakes corporate presentations in our flagship Boardroom accommodating up to 10 guests. Features 75" 4K Polycom video conferencing tools, high-speed fiber, and gourmet catering options on demand.',
    image: boardroomImg,
    capacity: 'Max 10 Guests',
    startingPrice: 'KES 2,000 / hr',
    amenities: ['75" 4K Smart TV', 'Polycom Studio Video Conferencing', 'Magnetic Whiteboard', 'One Complimentary Hot Beverage Per Guest', 'Fast Dedicated Internet'],
    features: ['Hourly Rate: KES 2,000 / hr', 'Half-Day Rate: KES 8,000', 'Full-Day Rate: KES 12,000', 'Gourmet Catering Options On Demand'],
    slug: 'boardroom',
  }
];

export const workspaceSolutions: WorkspaceSolution[] = [
  {
    id: 'freelancers',
    targetAudience: 'Freelancers & Solopreneurs',
    challenge: 'Isolation, inconsistent internet, lack of a formal client meeting setting, and home office distractions.',
    solution: 'We offer an inspiring, community-driven shared co-working space that provides standard-setting enterprise facilities, premium printing, and beautiful open common lounges.',
    recommendation: 'Shared Co-Working Space with flexible monthly commitments.',
    benefits: ['Collaborative networking', 'One complimentary hot beverage per stay', 'Professional presentation environments', 'Low overhead expenses'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'startups',
    targetAudience: 'Startups & Scaleups',
    challenge: 'Unpredictable team growth, lack of capital for long-term commercial leases, and time wasted managing operations.',
    solution: 'Secondesk handles everything—high-speed internet, security, printing, cleaning, and guest reception—so you can focus 100% on building your product.',
    recommendation: 'Hybrid Private Office or Shared Co-Working Space Passes.',
    benefits: ['Dedicated secure Ethernet lines', 'Boosted collaboration and synergy', 'Prestigious business physical base', 'Access to high-spec meeting rooms'],
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'remote-teams',
    targetAudience: 'Remote & Hybrid Teams',
    challenge: 'Team fragmentation, maintaining shared culture, and ensuring secure connection environments.',
    solution: 'Establish a central workspace hub where remote team members can gather, conduct whiteboarding sessions, and work together in beautiful glass-enclosed spaces.',
    recommendation: 'Hybrid Private Office or Shared Co-Working Space Passes.',
    benefits: ['Dedicated secure Ethernet lines', 'Boosted collaboration and synergy', 'Prestigious business physical base', 'Access to high-spec meeting rooms'],
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'smes-agencies',
    targetAudience: 'SMEs & Agencies',
    challenge: 'High cost of commercial fit-outs, maintenance staff recruitment, and utility backup solutions.',
    solution: 'Secondesk provides ready-to-use, premium glass-fronted offices supported by 100% stable generator power, modern server rooms, and client-facing reception services.',
    recommendation: 'Unfurnished Private Office Suites.',
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
    id: 'nyali',
    name: 'Nyali Executive Hub',
    neighborhood: 'Links Road, Nyali',
    address: 'Links Road, Nyali (located above Second Cup Cafe on the 2nd floor)',
    phone: '0719688992',
    email: 'info@secondesk.ke',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.882195289944!2d39.68351541533261!3d-4.041453999080063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012e5c0000000%3A0xd6891cc774fcf373!2sSecond%20Cup%20Mombasa!5e0!3m2!1sen!2ske!4v1655112233445!5m2!1sen!2ske',
    startingPrice: 'KES 17,000 / mo',
    image: workspaceMainImg,
    nearbyLandmarks: ['Second Cup Cafe (Ground Floor)', 'Nyali Centre Mall', 'City Mall Nyali', 'Nyali Golf & Country Club', 'Nyali Beach'],
    spacesAvailable: ['Meeting Room (Max 4)', 'Executive Boardroom (Max 10)', 'Private Office Suites', 'Shared Co-Working Space'],
    amenities: ['Dual Backup Generators', 'Fast Dedicated Internet', 'One Complimentary Hot Beverage Per Stay'],
    gallery: [
      workspaceMainImg,
      boardroomImg,
      pinpoint17Img,
      reception1Img,
      reception2Img
    ],
    meetingRoomDetails: {
      title: 'Meeting Rooms (Max 4) & Boardrooms (Max 10)',
      image: pinpoint17Img,
      features: [
        { iconName: 'PenTool', text: 'On Demand Executive Stationery' },
        { iconName: 'Tv', text: '75" 4K Smart TV with Polycom Video conferencing' },
        { iconName: 'Presentation', text: 'Acoustic Whiteboards & Presentation Setup' },
        { iconName: 'Coffee', text: 'One Complimentary Hot Beverage Per Guest' },
        { iconName: 'Users', text: 'Meeting Room: Max 4 Guests | Boardroom: Max 10 Guests' },
        { iconName: 'Wifi', text: 'Fast Dedicated Internet' },
        { iconName: 'Utensils', text: 'Gourmet Catered lunch services on-demand' }
      ]
    },
    privateOfficeDetails: {
      title: 'Private Office Suites',
      image: reception1Img,
      features: [
        { iconName: 'Lock', text: 'Unfurnished private enclosed suites with secure lockable doors' },
        { iconName: 'Lock', text: 'Acoustically sound-masked glass partitions' },
        { iconName: 'Fingerprint', text: 'Biometric fingerprint keyless security entry' },
        { iconName: 'Wind', text: 'Personalized Nest intelligent climate controls' },
        { iconName: 'Sliders', text: 'Dimmable indirect warm LED ambient lighting' },
        { iconName: 'Wifi', text: 'High-volume secure badge-release cloud printing' }
      ]
    }
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: "Secondesk completely elevated our agency. The beautiful, architectural environment signals trust and high capability to every client we host here, and the facilities are flawlessly managed.",
    author: "Wanjiku Njoroge",
    role: "Founder & Creative Director",
    company: "Sura Creative",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 't2',
    quote: "With a growing distributed remote team, maintaining a sense of culture is hard. The hybrid office suites we rent at Secondesk Nyali give us an incredible base to connect and align.",
    author: "Amir Osei",
    role: "VP of Engineering",
    company: "FintechOne East Africa",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 't3',
    quote: "The quiet shared co-working space and premium coffee are what keep me focused. But the true game-changer is the robust community—investor meetups here connected me to our seed-round lead.",
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
    content: 'The workspace landscape is undergoing a silent revolution. Long gone are the days of fluorescent-lit rows of identical cubicles, but so are the days of the chaotic open-plan startup playroom. Today, ambitious businesses require architectural integrity. They need spaces that foster quiet focus when desired, and structured collaboration when teams need to align.\n\nAt Secondesk, our architectural team spends months studying spatial density. We have found that the optimal layout utilizes a 60/40 design rule: 60% of square footage dedicated to enclosed, high-acoustic privacy suites, and 40% curated as beautiful public lobbies, libraries, coffee stations, and garden terraces. This dualism allows professionals to transition smoothly from head-down work to high-energy community events.',
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
    content: 'One of the largest liabilities on a growing startup balance sheet is long-term commercial lease commitments. When you commit to a 5-year office lease, you are gambling on your growth rate being linear. If you grow faster, you outgrow the space and pay breaking fees. If you scale back, you pay for empty desks.\n\nOur startup members utilize Private Office Suites as an operational strategy. Under a single monthly billing line, they receive an unfurnished, high-security private office suite where space is allocated according to team needs. Operational overhead like water, security, electricity, and premium reception are completely managed, allowing founders to run lean and redirect core capital into active product R&D.',
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
    content: 'Work from home was sold as a perfect utopia of pajamas and zero commute. However, four years into the mass remote work experiment, the cracks are widening. Solitary work at home often leads to cognitive fatigue, blurred lines between work and life, and deep professional isolation.\n\nHuman brains are wired to perform better under low-stakes social presence. Known as "social facilitation", working alongside other focused individuals—even if you are not actively speaking to them—naturally boosts motivation and attention span. A curated, aesthetic environment like Secondesk acts as an outer container for focus. The gentle low hum of the espresso bar, the sight of others creating, and the physical transition of "going to work" restore a crisp psychological structure to your daily workflow.',
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
    title: 'The Digital Nomad Trend in Coastal East Africa: Mombasa as the Hub',
    excerpt: 'Why international tech leaders, creators, and entrepreneurs are selecting Mombasa as their coastal headquarters.',
    content: 'Mombasa has earned its title as Kenya’s coastal commercial titan through continuous trade innovation and business leadership. In recent years, a new wave of international creators, digital nomads, and global tech executives are migrating to the coastal city. Mombasa offers unparalleled lifestyle benefits, coastal breeze work environments, and direct access to maritime commerce.\n\nSecondesk acts as a physical landing pad for this global cohort. With multi-point locations across Nyali, Mombasa CBD, and Tudor, international teams can deploy high-spec secure nodes instantly, connecting directly to the local business elite via our structured investor breakfasts and workshop sessions.',
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
    title: 'Founder Talk: Navigating Seed-to-Series-A in Coastal Markets',
    description: 'An intimate fireside chat with two of Mombasa’s prominent tech founders sharing hard-won lessons on scaling, market expansion, and regional venture fundraising.',
    date: 'July 15, 2026',
    time: '08:30 AM - 10:30 AM',
    type: 'Founder Talks',
    speaker: 'Nelly Nduta & Patrick Korir',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'e2',
    title: 'Monthly Investor Pitch Breakfast',
    description: 'A closed-door, curated pitch session connecting three high-growth startups from the Secondesk ecosystem with leading regional angel networks and VC funds.',
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
    question: "What is included in a Shared Co-Working Space membership?",
    answer: "Our Shared Co-Working Space membership includes a reserved seat at our long tables in the open common area, 24/7 access, ultra-fast Wi-Fi, one complimentary hot beverage per guest during their stay, full utility backups, and access to all standard community networking events."
  },
  {
    question: "Can I try out the space before committing to a membership?",
    answer: "Absolutely. We encourage you to book a personal spatial tour with our community team to experience our amenities, seat comfort, fast dedicated internet, and workspace atmosphere before choosing your membership."
  },
  {
    question: "How do flexible monthly workspace commitments work?",
    answer: "Most of our memberships—including Shared Co-Working Space and select Private Office configurations—are billed on a convenient month-to-month basis. There are no heavy lock-in commitments. If your team needs change, simply provide us with a 30-day notice prior to your next billing cycle."
  },
  {
    question: "How do you guarantee power and internet stability?",
    answer: "We understand that constant connectivity is non-negotiable for business. All Secondesk locations are fully equipped with automatic dual-diesel generators that kick in within 3 seconds of a power disruption. Additionally, we use redundant high-speed fiber internet backbones from separate Tier-1 service providers to ensure 99.9% uptime."
  },
  {
    question: "Are meeting rooms accessible to non-members?",
    answer: "Yes, our high-spec meeting rooms, boardrooms, and event spaces are open for external booking by non-members on an hourly or daily rate. Members enjoy significant discounts and priority reservation via the Secondesk platform using their monthly included credits."
  },
  {
    question: "Where is Secondesk Nyali located?",
    answer: "Our flagship location is located on the 2nd Floor, Links Road, Nyali, Mombasa (Located above Second Cup Cafe)."
  }
];
