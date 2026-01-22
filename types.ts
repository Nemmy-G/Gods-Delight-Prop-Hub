
export enum ListingType {
  SALE = 'SALE',
  LEASE = 'LEASE',
  RENT = 'RENT',
  HOTEL = 'HOTEL'
}

export enum AssetCategory {
  LAND = 'LAND',
  HOUSE = 'HOUSE',
  HOTEL_ROOM = 'HOTEL_ROOM'
}

export interface Listing {
  id: string;
  partnerId: string;
  title: string;
  description: string;
  type: ListingType;
  category: AssetCategory;
  price: number;
  location: string;
  lat: number;
  lng: number;
  features: string[];
  images: string[];
  rating?: number; // For hotels
  verified: boolean;
  flagged: boolean;
  flagReason?: string;
  createdAt: number;
}

export interface Partner {
  id: string;
  name: string;
  type: 'REAL_ESTATE' | 'HOTEL';
  email: string;
  isApproved: boolean;
  contactPerson: string;
}

export interface User {
  role: 'ADMIN' | 'PARTNER' | 'VISITOR';
  partnerId?: string;
}

export interface AIAlert {
  id: string;
  type: 'FRAUD' | 'SECURITY' | 'AUTHENTICITY';
  message: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  timestamp: number;
}
