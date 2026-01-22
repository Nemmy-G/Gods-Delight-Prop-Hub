
import React, { useState } from 'react';
import { Listing, AssetCategory, ListingType } from '../types';

interface AssetExplorerProps {
  listings: Listing[];
  onContact: (l: Listing) => void;
}

const AssetExplorer: React.FC<AssetExplorerProps> = ({ listings, onContact }) => {
  const [filter, setFilter] = useState<AssetCategory | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<Listing | null>(null);

  const filtered = listings.filter(l => {
    const matchesCategory = filter === 'ALL' || l.category === filter;
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase()) || 
                          l.location.toLowerCase().includes(search.toLowerCase());
    
    const priceNum = Number(l.price);
    const minP = minPrice === '' ? 0 : Number(minPrice);
    const maxP = maxPrice === '' ? Infinity : Number(maxPrice);
    const matchesPrice = priceNum >= minP && priceNum <= maxP;

    return matchesCategory && matchesSearch && matchesPrice && !l.flagged;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Discover Your Next Asset</h1>
        <p className="text-lg text-gray-600">Secure properties and premium hotels verified by our AI.</p>
      </div>

      <div className="sticky top-[4rem] z-30 bg-gray-50 py-4 mb-8">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <input 
                className="w-full pl-12 pr-4 py-3 bg-white border rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-green-500 transition-all"
                placeholder="Search by area, property type, or name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <svg className="w-6 h-6 absolute left-4 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-400 text-sm font-bold">₦</span>
                <input 
                  type="number"
                  className="w-32 pl-8 pr-3 py-3 bg-white border rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                />
              </div>
              <span className="text-gray-400">-</span>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-400 text-sm font-bold">₦</span>
                <input 
                  type="number"
                  className="w-32 pl-8 pr-3 py-3 bg-white border rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            {(['ALL', AssetCategory.HOUSE, AssetCategory.LAND, AssetCategory.HOTEL_ROOM] as const).map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-200 ${filter === cat ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'bg-white text-gray-600 border hover:border-green-200'}`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
            {(minPrice !== '' || maxPrice !== '' || search !== '') && (
              <button 
                onClick={() => { setMinPrice(''); setMaxPrice(''); setSearch(''); }}
                className="text-xs font-bold text-red-500 hover:text-red-700 px-4 underline transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No assets found</h3>
          <p className="text-gray-500">Try adjusting your filters or search keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(listing => (
            <div 
              key={listing.id} 
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border cursor-pointer"
              onClick={() => setSelectedAsset(listing)}
            >
              <div className="relative h-64">
                <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase text-gray-900 shadow-sm">
                    {listing.type}
                  </span>
                  {listing.rating && (
                    <span className="bg-yellow-400 px-3 py-1 rounded-full text-[10px] font-bold text-yellow-900 shadow-sm">
                      {listing.rating}★
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-green-600 text-white p-2 rounded-full shadow-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{listing.title}</h3>
                  <p className="text-lg font-extrabold text-green-700 whitespace-nowrap ml-2">₦{listing.price.toLocaleString()}</p>
                </div>
                <p className="text-sm text-gray-500 mb-4 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {listing.location}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {listing.features.slice(0, 3).map((f, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-md font-medium">{f}</span>
                  ))}
                  {listing.features.length > 3 && <span className="text-[10px] text-gray-400 font-medium">+{listing.features.length - 3} more</span>}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onContact(listing);
                  }}
                  className="w-full bg-gray-900 text-white py-3 rounded-2xl font-bold hover:bg-green-600 transition duration-300"
                >
                  Contact Agent
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Asset Details Drawer/Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex justify-end">
          <div className="bg-white w-full max-w-2xl h-full overflow-y-auto animate-slide-left shadow-2xl">
            <div className="sticky top-0 bg-white z-10 p-6 border-b flex justify-between items-center">
              <button onClick={() => setSelectedAsset(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="flex items-center space-x-2">
                 <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">AI Verified</span>
              </div>
            </div>
            
            <div className="p-8">
              <img src={selectedAsset.images[0]} className="w-full h-80 object-cover rounded-3xl mb-8 shadow-lg" alt="" />
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-1">{selectedAsset.title}</h2>
                  <p className="text-green-600 font-bold text-xl">₦{selectedAsset.price.toLocaleString()}</p>
                </div>
                {selectedAsset.rating && <div className="text-2xl font-bold text-yellow-500">{selectedAsset.rating}★</div>}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-xs text-gray-400 mb-1">Type</p>
                  <p className="font-bold text-sm">{selectedAsset.type}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-xs text-gray-400 mb-1">Category</p>
                  <p className="font-bold text-sm">{selectedAsset.category.replace('_', ' ')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-xs text-gray-400 mb-1">Security</p>
                  <p className="font-bold text-sm text-green-600">AI Guarded</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-xs text-gray-400 mb-1">GPS</p>
                  <p className="font-bold text-sm">Active</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold mb-3">About this Asset</h3>
                <p className="text-gray-600 leading-relaxed">{selectedAsset.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold mb-3">Features & Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAsset.features.map((f, i) => (
                    <span key={i} className="bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold border border-green-100">{f}</span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 p-8 rounded-3xl text-white">
                <h3 className="text-xl font-bold mb-2">Ready to secure this?</h3>
                <p className="text-gray-400 mb-6 text-sm">You will be connected directly to the management/owner for negotiation.</p>
                <button 
                  onClick={() => onContact(selectedAsset)}
                  className="w-full bg-green-500 hover:bg-green-400 py-4 rounded-2xl font-bold transition flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  <span>Negotiate & Pay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetExplorer;
