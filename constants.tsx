
import React from 'react';
import { Listing, ListingType, AssetCategory, Partner } from './types';

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'p1',
    name: 'Lagos Prime Estates',
    type: 'REAL_ESTATE',
    email: 'info@lagosprime.com',
    isApproved: true,
    contactPerson: 'Segun Adebayo'
  },
  {
    id: 'p2',
    name: 'Transcorp Hilton Abuja',
    type: 'HOTEL',
    email: 'reservations@transcorp.com',
    isApproved: true,
    contactPerson: 'Grace Okon'
  }
];

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'l1',
    partnerId: 'p1',
    title: '5 Bedroom Luxury Duplex',
    description: 'Beautiful modern duplex in the heart of Lekki Phase 1 with automated gates.',
    type: ListingType.SALE,
    category: AssetCategory.HOUSE,
    price: 150000000,
    location: 'Lekki Phase 1, Lagos',
    lat: 6.4483,
    lng: 3.4735,
    features: ['Pool', 'CCTV', 'Cinema Room', 'Borehole'],
    images: ['https://picsum.photos/seed/house1/800/600'],
    verified: true,
    flagged: false,
    createdAt: Date.now()
  },
  {
    id: 'l2',
    partnerId: 'p1',
    title: '2 Acres of Industrial Land',
    description: 'Fenced and gated land suitable for warehouse or factory.',
    type: ListingType.LEASE,
    category: AssetCategory.LAND,
    price: 5000000,
    location: 'Ibeju Lekki, Lagos',
    lat: 6.4589,
    lng: 3.5152,
    features: ['Fenced', 'Corner Piece', 'Global C of O'],
    images: ['https://picsum.photos/seed/land1/800/600'],
    verified: true,
    flagged: false,
    createdAt: Date.now() - 86400000
  },
  {
    id: 'l3',
    partnerId: 'p2',
    title: 'Presidential Suite',
    description: 'Experience world-class hospitality in our premium suite.',
    type: ListingType.HOTEL,
    category: AssetCategory.HOTEL_ROOM,
    price: 250000,
    location: 'Maitama, Abuja',
    lat: 9.0765,
    lng: 7.3986,
    features: ['24/7 Buffet', 'Spa Access', 'City View'],
    images: ['https://picsum.photos/seed/hotel1/800/600'],
    rating: 5,
    verified: true,
    flagged: false,
    createdAt: Date.now() - 172800000
  }
];

export const NIGERIA_LOCATIONS = [
  'Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Enugu', 'Kano', 'Benin City'
];
