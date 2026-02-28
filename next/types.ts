export type PropertyType = 'House' | 'Condo' | 'Apartment' | 'Commercial' | 'Land' | 'Villa' | 'Under Construction';

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  country: string;
  city: string;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  description: string;
  images: string[];
  features: string[];
  agentId: string;
  status: 'For Sale' | 'For Rent' | 'Sold' | 'Pending';
  coordinates: { lat: number; lng: number };
  amenities: string[];
  virtualTourUrl?: string;
  isBoosted?: boolean;
  apartments?: number;
  downPayment?: number;
  monthlyInstallment?: number;
  paymentDuration?: 3 | 4 | 5;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Agent {
  id: string;
  userId?: string;
  name: string;
  role: string;
  bio: string;
  company: string;
  location: string;
  website: string;
  experience: string;
  specialties: string[];
  image: string;
  phone: string;
  email: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'agent' | 'admin';
  agentId?: string;
  savedProperties: string[];
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
}
