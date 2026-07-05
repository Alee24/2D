export interface WorkspaceCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  capacity: string;
  startingPrice: string;
  amenities: string[];
  features: string[];
  slug: string;
}

export interface WorkspaceSolution {
  id: string;
  targetAudience: string;
  challenge: string;
  solution: string;
  recommendation: string;
  benefits: string[];
  image: string;
}

export interface DetailFeature {
  title: string;
  image: string;
  features: { iconName: string; text: string }[];
}

export interface LocationData {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  phone: string;
  email: string;
  mapEmbedUrl: string; // Used to simulate map coordinates or visual map container
  startingPrice: string;
  image: string;
  nearbyLandmarks: string[];
  spacesAvailable: string[];
  amenities: string[];
  gallery: string[];
  meetingRoomDetails?: DetailFeature;
  privateOfficeDetails?: DetailFeature;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Business Growth' | 'Productivity' | 'Workspace Design' | 'Remote Work' | 'Leadership' | 'Startups' | 'Entrepreneurship' | 'Technology';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: string;
  speaker?: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}
