export interface NavLink {
  id: string;
  title: string;
  isPage?: boolean;
  externalLink?: string;
}

export interface Service {
  title: string;
  icon: string;
}

export interface Technology {
  name: string;
  icon: string;
}

export interface Experience {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
}

export interface Testimonial {
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
  skillCategories?: Array<{
    title: string;
    skills: string[];
  }>;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  challenge?: string;
  role?: string;
  year?: string;
  timeline?: string;
  tools?: string;
  tags: Array<string | { name: string; color: string }>;
  image: string;
  images?: string[];
  source_code_link: string;
  live_demo_link?: string;
  features?: string[];
  resources?: {
    name: string;
    url: string;
  }[];
  goal?: string;
}
